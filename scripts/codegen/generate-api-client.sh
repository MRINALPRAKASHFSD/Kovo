#!/usr/bin/env bash
# KOVO — Generate TypeScript API client from OpenAPI spec
set -euo pipefail
echo "[KOVO] Generating API client from http://localhost:8000/openapi.json ..."
cd packages/api-client
pnpm generate
echo "[KOVO] API client generated in packages/api-client/src/generated/"
