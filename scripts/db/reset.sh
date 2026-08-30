#!/usr/bin/env bash
# KOVO — Reset database (DESTRUCTIVE — dev only)
set -euo pipefail
read -p "This will DROP all data. Are you sure? [y/N] " confirm
if [[ "$confirm" != "y" ]]; then echo "Aborted."; exit 0; fi
cd "$(dirname "$0")/../../apps/backend"
uv run alembic downgrade base
uv run alembic upgrade head
echo "[KOVO] Database reset complete."
