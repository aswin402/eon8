#!/usr/bin/env bash
# Updates the site on the server (Docker setup from docker-compose.prod.yml):
#   1. backs up the database and uploads (if the site is already running)
#   2. pulls the branch and rebuilds the containers
#   3. waits for /api/health; if it does not come up, rolls back to the previous commit
#
#   cd /srv/eon8 && deploy/deploy.sh            # current branch
#   cd /srv/eon8 && deploy/deploy.sh main       # a specific branch
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
COMPOSE=(docker compose -f docker-compose.prod.yml)
PORT="${PORT:-4173}"
BRANCH="${1:-$(git rev-parse --abbrev-ref HEAD)}"
PREVIOUS="$(git rev-parse HEAD)"

healthy() {
  for _ in $(seq 1 45); do
    if curl -fsS "http://127.0.0.1:${PORT}/api/health" 2>/dev/null | grep -q '"ok":true'; then
      return 0
    fi
    sleep 2
  done
  return 1
}

if [ -n "$("${COMPOSE[@]}" ps --status running -q db 2>/dev/null || true)" ]; then
  echo "== Backup before deploy"
  BACKUP_MODE=docker deploy/backup.sh
fi

echo "== Updating code ($BRANCH)"
git fetch origin
git checkout "$BRANCH"
git pull --ff-only origin "$BRANCH"
CURRENT="$(git rev-parse --short HEAD)"

echo "== Building and starting $CURRENT"
"${COMPOSE[@]}" up -d --build

if healthy; then
  echo "== Deployed $CURRENT (previous: ${PREVIOUS:0:7})"
  "${COMPOSE[@]}" image prune -f >/dev/null 2>&1 || true
  exit 0
fi

echo "!! Health check failed for $CURRENT. Recent logs:"
"${COMPOSE[@]}" logs --tail 60 web || true
echo "== Rolling back to ${PREVIOUS:0:7}"
git checkout "$PREVIOUS"
"${COMPOSE[@]}" up -d --build
if healthy; then
  echo "== Rolled back to ${PREVIOUS:0:7}. The code is in 'detached HEAD'; run 'git checkout $BRANCH' after fixing."
else
  echo "!! Rollback is also unhealthy. Check: ${COMPOSE[*]} logs web"
fi
exit 1
