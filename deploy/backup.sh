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
#
# Restore the database:
#   pg_restore --clean --if-exists --no-owner -d "$DATABASE_URL" backups/db-YYYYMMDD-HHMMSS.dump
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
for key in DATABASE_URL POSTGRES_USER POSTGRES_DB BACKUP_DIR BACKUP_KEEP_DAYS BACKUP_MODE BACKUP_RCLONE_REMOTE; do
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

DB_FILE="$BACKUP_DIR/db-$STAMP.dump"
if [ "$MODE" = "docker" ]; then
  docker compose -f docker-compose.prod.yml exec -T db \
    pg_dump --format=custom --no-owner -U "${POSTGRES_USER:-eon8}" "${POSTGRES_DB:-eon8}" > "$DB_FILE"
else
  : "${DATABASE_URL:?DATABASE_URL is not set}"
  pg_dump --format=custom --no-owner --dbname="$DATABASE_URL" --file="$DB_FILE"
fi
echo "[backup] database -> $DB_FILE ($(du -h "$DB_FILE" | cut -f1))"

UPLOADS_FILE="$BACKUP_DIR/uploads-$STAMP.tar.gz"
if [ "$MODE" = "docker" ]; then
  docker compose -f docker-compose.prod.yml exec -T web tar -czf - -C /app/public uploads > "$UPLOADS_FILE"
  echo "[backup] uploads  -> $UPLOADS_FILE"
elif [ -d public/uploads ]; then
  # Streamed so paths like C:\... (Windows) are not read as a remote tar host.
  tar -czf - -C public uploads > "$UPLOADS_FILE"
  echo "[backup] uploads  -> $UPLOADS_FILE"
fi

if [ -n "${BACKUP_RCLONE_REMOTE:-}" ]; then
  rclone copy "$BACKUP_DIR" "$BACKUP_RCLONE_REMOTE" --include "*-$STAMP.*"
  echo "[backup] copied to $BACKUP_RCLONE_REMOTE"
fi

find "$BACKUP_DIR" -type f \( -name 'db-*.dump' -o -name 'uploads-*.tar.gz' \) -mtime +"$KEEP_DAYS" -delete
echo "[backup] done; kept the last $KEEP_DAYS days"
