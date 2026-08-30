#!/usr/bin/env bash
# KOVO — Run Alembic migrations
set -euo pipefail
cd "$(dirname "$0")/../../apps/backend"
echo "[KOVO] Running database migrations..."
uv run alembic upgrade head
echo "[KOVO] Migrations complete."
