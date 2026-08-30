#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────
# KOVO — Local Development Setup Script
# Run once after cloning: ./scripts/setup/setup.sh
# ─────────────────────────────────────────────────────────────
set -euo pipefail

CYAN='\033[0;36m'
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

info() { echo -e "${CYAN}[KOVO]${NC} $*"; }
success() { echo -e "${GREEN}[✓]${NC} $*"; }
error() { echo -e "${RED}[✗]${NC} $*" >&2; exit 1; }

info "Checking prerequisites..."

command -v docker >/dev/null 2>&1 || error "Docker is required. Install from https://docker.com"
command -v docker-compose >/dev/null 2>&1 || docker compose version >/dev/null 2>&1 || error "Docker Compose is required"
command -v node >/dev/null 2>&1 || error "Node.js 22+ is required"
command -v pnpm >/dev/null 2>&1 || error "pnpm is required: npm install -g pnpm"
command -v python3 >/dev/null 2>&1 || error "Python 3.13+ is required"

success "Prerequisites OK"

# Copy env file
if [ ! -f .env ]; then
    cp .env.example .env
    info "Created .env from .env.example — please review and update values"
fi

# Install Node dependencies
info "Installing Node.js dependencies..."
pnpm install
success "Node.js dependencies installed"

# Install Python dependencies
info "Installing Python dependencies (backend)..."
cd apps/backend
uv sync --group dev
cd ../..
success "Python dependencies installed"

# Start services
info "Starting Docker services..."
docker compose up -d postgres redis minio
success "Infrastructure services started"

# Run DB migrations
info "Running database migrations..."
sleep 3  # wait for postgres to be ready
cd apps/backend
uv run alembic upgrade head
cd ../..
success "Database migrations applied"

echo ""
success "KOVO setup complete!"
echo ""
echo "  Start all services:  docker compose up --build"
echo "  Backend only:        cd apps/backend && uv run uvicorn main:app --reload"
echo "  Web only:            cd apps/web && pnpm dev"
echo "  API docs:            http://localhost:8000/docs"
echo ""
