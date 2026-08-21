# ADR-002: Clean Architecture for Backend

**Status**: Accepted
**Date**: 2024-01-01
**Deciders**: Engineering Team

## Context

The backend must support complex business logic (permissions, channels, threading, reactions,
notifications) that will evolve rapidly. We need an architecture that:
- Isolates business logic from infrastructure concerns
- Enables fast, dependency-free unit tests
- Allows swapping infrastructure (e.g. change from PostgreSQL to CockroachDB) without
  touching business logic

## Decision

Adopt **Clean Architecture** with explicit layers:

```
domain/           → Entities, Value Objects, Domain Events, Repository Interfaces
application/      → Commands, Queries, Handlers, Application Services, DTOs
infrastructure/   → SQLAlchemy repositories, Redis cache, S3 storage, Celery workers
api/              → FastAPI routers, Pydantic schemas, middleware
```

## Dependency Rule

> Dependencies ONLY point inward. Domain has zero external dependencies.

```
api → application → domain
infrastructure → domain (implements domain interfaces)
```

## Consequences

✅ Domain logic is 100% testable without database or network
✅ Infrastructure can be mocked in tests trivially
✅ Clear separation of concerns forces better design
⚠️  More initial boilerplate — worth it for long-term maintainability
