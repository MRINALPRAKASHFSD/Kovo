# KOVO — Architecture

## Overview

KOVO is built as a **modular monolith** — a single deployable unit where each business domain
is a fully self-contained module with its own Clean Architecture layers.

## Modules

| Module         | Responsibility                                      |
|----------------|-----------------------------------------------------|
| `auth`         | JWT, Google OAuth, Phone OTP, refresh tokens        |
| `users`        | User profiles, settings, avatar                     |
| `workspaces`   | Server/workspace CRUD, invites, settings            |
| `channels`     | Text/voice/announcement channels, categories        |
| `messages`     | Send/edit/delete, threads, search, reactions        |
| `calls`        | Voice/video via WebRTC signalling                   |
| `files`        | Upload, process, CDN delivery                       |
| `notifications`| Push, in-app, email digest                         |
| `presence`     | Online/away/DND/offline status                      |
| `search`       | Full-text search across messages, channels, users   |

## Module Structure (per module)

```
modules/<name>/
├── domain/
│   ├── entities/         Pure Python dataclasses — no external deps
│   ├── value_objects/    Immutable types (UserId, ChannelSlug)
│   ├── events/           Domain events (MessageSent, UserJoined)
│   └── interfaces/       Abstract repository ports
├── application/
│   ├── commands/         Write intents (SendMessageCommand)
│   ├── queries/          Read intents (GetMessagesQuery)
│   ├── handlers/         Execute commands/queries
│   ├── dtos/             Data Transfer Objects
│   └── services/         Cross-entity application logic
├── infrastructure/
│   ├── repositories/     SQLAlchemy implementations of domain interfaces
│   └── adapters/         Module-specific external service adapters
└── api/
    ├── v1/               FastAPI router for this module
    └── schemas/          Pydantic request/response models
```

## Evolution Path

When KOVO grows beyond monolith limits, each module can be extracted into its own microservice.
The domain/application layers are already infrastructure-agnostic — only the infrastructure/ layer
needs updating. This is the Strangler Fig pattern applied from day one.
