# KOVO — Database

## Engine

**PostgreSQL 16** managed by **Alembic** migrations.

## Conventions

| Convention           | Rule                                             |
|----------------------|--------------------------------------------------|
| Primary keys         | `UUID v4` via `uuid_generate_v4()`              |
| Timestamps           | `TIMESTAMPTZ` (always timezone-aware)            |
| Soft deletes         | `deleted_at TIMESTAMPTZ NULL`                    |
| Enums                | PostgreSQL native `CREATE TYPE`                  |
| Naming               | `snake_case` for all tables and columns          |
| Indexes              | Named: `ix_<table>_<column>`                    |
| Foreign keys         | Named: `fk_<table>_<ref_table>_<column>`        |

## Planned Tables (Phase 1)

```
users              workspaces         workspace_members
sessions           channels           messages
attachments        reactions          roles
role_permissions   invites            notifications
```

## Migration Workflow

```bash
# Create migration
uv run alembic revision --autogenerate -m "description"

# Apply
uv run alembic upgrade head

# Rollback one step
uv run alembic downgrade -1

# History
uv run alembic history --verbose
```
