#!/usr/bin/env bash
# Backs up the EON8 database and uploaded images, and deletes old backups.
#
#   deploy/backup.sh                 # PostgreSQL reachable via DATABASE_URL (pg_dump installed)
#   BACKUP_MODE=docker deploy/backup.sh   # stack from docker-compose.prod.yml
#
# Daily at 02:30 (crontab -e):
#   30 2 * * * cd /srv/eon8 && deploy/backup.sh >> logs/backup.log 2>&1
#
# Settings (environment or .env):
#   BACKUP_DIR          where backups go (default: ./backups)
#   BACKUP_KEEP_DAYS    days to keep (default: 14)
#   BACKUP_RCLONE_REMOTE  optional rclone destination for an off-server copy, e.g. "b2:eon8-backups"
#   BACKUP_PASSPHRASE   optional but recommended: encrypts both files with
#                       openssl (AES-256-CBC, PBKDF2 200000 iterations, salted).
#                       The files are then named *.dump.enc and *.tar.gz.enc and
#                       no unencrypted copy is written to disk. Keep the passphrase
#                       in the company password manager: without it the backups
#                       cannot be restored.
#
# Restore the database (unencrypted backup):
#   pg_restore --clean --if-exists --no-owner -d "$DATABASE_URL" backups/db-YYYYMMDD-HHMMSS.dump
#
# Restore encrypted backups (the passphrase is read into the environment, not typed on the command line):
#   read -rs BACKUP_PASSPHRASE && export BACKUP_PASSPHRASE
#   openssl enc -d -aes-256-cbc -pbkdf2 -iter 200000 -pass env:BACKUP_PASSPHRASE \
#       -in backups/db-YYYYMMDD-HHMMSS.dump.enc \
#     | pg_restore --clean --if-exists --no-owner -d "$DATABASE_URL"
#   openssl enc -d -aes-256-cbc -pbkdf2 -iter 200000 -pass env:BACKUP_PASSPHRASE \
#       -in backups/uploads-YYYYMMDD-HHMMSS.tar.gz.enc \
#     | tar -xzf - -C public
#   # Check a backup without restoring it:
#   openssl enc -d ... -in backups/db-YYYYMMDD-HHMMSS.dump.enc | pg_restore --list > /dev/null && echo OK
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

# Read only the settings this script needs from .env. The file is not run as
# shell code: values like "a@x.com, b@y.com" or passwords with "$" are fine.
env_value() {
  [ -f .env ] || return 0
  { grep -E "^[[:space:]]*$1[[:space:]]*=" .env || true; } | tail -n 1 | cut -d= -f2- \
    | sed -E 's/^[[:space:]]+//; s/[[:space:]]+$//; s/^"(.*)"$/\1/; s/^'"'"'(.*)'"'"'$/\1/'
}
for key in DATABASE_URL POSTGRES_USER POSTGRES_DB BACKUP_DIR BACKUP_KEEP_DAYS BACKUP_MODE BACKUP_RCLONE_REMOTE BACKUP_PASSPHRASE; do
  if [ -z "${!key:-}" ]; then
    value="$(env_value "$key")"
    if [ -n "$value" ]; then export "$key=$value"; fi
  fi
done

BACKUP_DIR="${BACKUP_DIR:-$ROOT/backups}"
KEEP_DAYS="${BACKUP_KEEP_DAYS:-14}"
MODE="${BACKUP_MODE:-direct}"
STAMP="$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"
umask 077   # backups contain personal data (leads): owner-only

ENC_SUFFIX=""
if [ -n "${BACKUP_PASSPHRASE:-}" ]; then
  command -v openssl > /dev/null || { echo "[backup] BACKUP_PASSPHRASE is set but openssl is not installed" >&2; exit 1; }
  export BACKUP_PASSPHRASE   # openssl reads it from the environment (-pass env:), never from the command line
  ENC_SUFFIX=".enc"
elif [ -n "${BACKUP_RCLONE_REMOTE:-}" ]; then
  echo "[backup] WARNING: BACKUP_RCLONE_REMOTE is set but BACKUP_PASSPHRASE is not:" \
       "backups (with lead and admin personal data) are copied off the server unencrypted." >&2
fi

# Writes stdin to a file: encrypted when BACKUP_PASSPHRASE is set, as is otherwise.
# Output goes to "<file>.part" first and is renamed only when the whole pipeline
# succeeded, so a failed run never leaves a truncated backup that looks complete.
write_backup() {
  if [ -n "$ENC_SUFFIX" ]; then
    openssl enc -aes-256-cbc -pbkdf2 -iter 200000 -salt -pass env:BACKUP_PASSPHRASE -out "$1.part"
  else
    cat > "$1.part"
  fi
}
finish_backup() { mv -f "$1.part" "$1"; }
cleanup() { rm -f "$BACKUP_DIR"/db-"$STAMP".*.part "$BACKUP_DIR"/uploads-"$STAMP".*.part; }
trap cleanup EXIT

DB_FILE="$BACKUP_DIR/db-$STAMP.dump$ENC_SUFFIX"
if [ "$MODE" = "docker" ]; then
  docker compose -f docker-compose.prod.yml exec -T db \
    pg_dump --format=custom --no-owner -U "${POSTGRES_USER:-eon8}" "${POSTGRES_DB:-eon8}" | write_backup "$DB_FILE"
else
  : "${DATABASE_URL:?DATABASE_URL is not set}"
  pg_dump --format=custom --no-owner --dbname="$DATABASE_URL" | write_backup "$DB_FILE"
fi
finish_backup "$DB_FILE"
echo "[backup] database -> $DB_FILE ($(du -h "$DB_FILE" | cut -f1))"

UPLOADS_FILE="$BACKUP_DIR/uploads-$STAMP.tar.gz$ENC_SUFFIX"
if [ "$MODE" = "docker" ]; then
  docker compose -f docker-compose.prod.yml exec -T web tar -czf - -C /app/public uploads | write_backup "$UPLOADS_FILE"
  finish_backup "$UPLOADS_FILE"
  echo "[backup] uploads  -> $UPLOADS_FILE"
elif [ -d public/uploads ]; then
  # Streamed so paths like C:\... (Windows) are not read as a remote tar host.
  tar -czf - -C public uploads | write_backup "$UPLOADS_FILE"
  finish_backup "$UPLOADS_FILE"
  echo "[backup] uploads  -> $UPLOADS_FILE"
fi
if [ -n "$ENC_SUFFIX" ]; then
  echo "[backup] files are encrypted (openssl aes-256-cbc, pbkdf2); see the restore commands at the top of this script"
fi

if [ -n "${BACKUP_RCLONE_REMOTE:-}" ]; then
  rclone copy "$BACKUP_DIR" "$BACKUP_RCLONE_REMOTE" --include "*-$STAMP.*"
  echo "[backup] copied to $BACKUP_RCLONE_REMOTE"
fi

find "$BACKUP_DIR" -type f \( -name 'db-*.dump' -o -name 'db-*.dump.enc' -o -name 'uploads-*.tar.gz' -o -name 'uploads-*.tar.gz.enc' \) \
  -mtime +"$KEEP_DAYS" -delete
echo "[backup] done; kept the last $KEEP_DAYS days"
