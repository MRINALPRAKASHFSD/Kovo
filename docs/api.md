# KOVO — API Reference

## REST API

- **Base URL**: `https://api.kovo.app/api/v1`
- **Docs (Swagger)**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`
- **OpenAPI JSON**: `http://localhost:8000/openapi.json`

## Authentication

```http
Authorization: Bearer <access_token>
```

Access tokens expire in **15 minutes**. Use `POST /api/v1/auth/refresh` with the HttpOnly refresh
cookie to obtain a new one.

## Module Routers

| Prefix                  | Module         |
|-------------------------|----------------|
| `/api/v1/auth`          | auth           |
| `/api/v1/users`         | users          |
| `/api/v1/workspaces`    | workspaces     |
| `/api/v1/channels`      | channels       |
| `/api/v1/messages`      | messages       |
| `/api/v1/files`         | files          |
| `/api/v1/notifications` | notifications  |
| `/api/v1/search`        | search         |
| `/ws`                   | WebSocket hub  |

## WebSocket

See [diagrams/socket-flow.md](diagrams/socket-flow.md) for the full event protocol.
