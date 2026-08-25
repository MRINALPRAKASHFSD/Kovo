# ─────────────────────────────────────────────────────────────
# KOVO Backend — Multi-stage Dockerfile
# Stage 1: base  — minimal python + uv
# Stage 2: dev   — full dev dependencies
# Stage 3: prod  — optimised production image
# ─────────────────────────────────────────────────────────────

# ── Base ─────────────────────────────────────────────────────
FROM python:3.13-slim AS base

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONFAULTHANDLER=1 \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    UV_SYSTEM_PYTHON=1

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install uv (fast Python package manager)
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /usr/local/bin/

# ── Development ───────────────────────────────────────────────
FROM base AS development

COPY pyproject.toml ./
RUN uv sync --group dev

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]

# ── Production builder ────────────────────────────────────────
FROM base AS builder

COPY pyproject.toml ./
RUN uv sync --no-group dev

COPY . .

# ── Production runtime ────────────────────────────────────────
FROM python:3.13-slim AS production

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONFAULTHANDLER=1

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq5 \
    && rm -rf /var/lib/apt/lists/* \
    && addgroup --system kovo \
    && adduser --system --ingroup kovo kovo

COPY --from=builder --chown=kovo:kovo /app/.venv /app/.venv
COPY --from=builder --chown=kovo:kovo /app /app

USER kovo

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

CMD ["/app/.venv/bin/uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]
