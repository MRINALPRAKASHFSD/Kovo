# KOVO — Architecture Documentation

This directory contains the architectural decisions, diagrams, and guides for KOVO.

## Contents

| Document | Description |
|----------|-------------|
| [decisions/](decisions/) | Architecture Decision Records (ADRs) |
| [diagrams/](diagrams/) | System, sequence, and component diagrams |
| [local-development.md](local-development.md) | Local dev setup guide |
| [deployment.md](deployment.md) | Production deployment guide |

## Architecture Principles

1. **Clean Architecture** — Dependency flows inward (domain → application → infrastructure)
2. **Domain-Driven Design** — Business logic lives in the domain layer, not the database
3. **Event-Driven** — Real-time features use WebSocket events; async tasks use Celery
4. **API-First** — OpenAPI spec is the contract between backend and frontend
5. **Observability-First** — Prometheus metrics, structured logging, and distributed tracing from day one
6. **Security-by-Default** — JWT auth, RBAC, rate limiting, input validation at every layer
