# ADR-001: Monorepo Structure

**Status**: Accepted
**Date**: 2024-01-01
**Deciders**: Engineering Team

## Context

KOVO has multiple applications (backend, web, mobile, admin) that share types, utilities,
and configuration. We need a repository structure that:
- Maximises code sharing without duplication
- Allows independent deployability of each application
- Supports CI/CD pipelines per-app with caching
- Scales as the team grows

## Decision

Use a **monorepo** managed with pnpm workspaces (for JS apps) with Python apps co-located.

## Structure

```
apps/        → Independently deployable applications
packages/    → Internal shared libraries (not published to npm)
```

## Consequences

✅ Single source of truth for types and contracts
✅ Atomic commits across app and library changes
✅ Shared tooling configuration (ESLint, Prettier, TypeScript)
⚠️  Larger repository — mitigated by sparse checkouts and path-based CI triggers
