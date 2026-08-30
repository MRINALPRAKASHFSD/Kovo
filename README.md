# KOVO

> **Production-grade communication platform** — v0.1.0-alpha

KOVO is a real-time communication platform engineered to the same quality standards as Discord, Slack, Telegram, and Microsoft Teams. It is built as a multi-tenant monorepo with Clean Architecture at its core.

---

## Architecture Overview

```
kovo/
├── apps/                   # Deployable applications
│   ├── backend/            # FastAPI — Clean Architecture
│   ├── web/                # Next.js 15 — React 19
│   ├── mobile/             # Flutter
│   └── admin/              # Next.js admin panel
├── packages/               # Shared internal packages
│   ├── shared/             # Utilities, constants, helpers
│   ├── config/             # Shared configuration schemas
│   ├── types/              # Canonical TypeScript/Dart types
│   └── api-client/         # Auto-generated API client
├── infrastructure/         # Infrastructure-as-Code
│   ├── docker/             # Docker & Compose files
│   ├── nginx/              # Reverse proxy configuration
│   └── monitoring/         # Prometheus, Grafana, Loki
├── scripts/                # Developer & CI automation scripts
└── docs/                   # Architecture, API, database, product docs
```

---

## Tech Stack

| Layer          | Technology                                      |
|----------------|-------------------------------------------------|
| Backend        | FastAPI, Python 3.13, SQLAlchemy 2, Alembic     |
| Frontend       | Next.js 15, React 19, TypeScript, TailwindCSS   |
| Mobile         | Flutter                                         |
| Database       | PostgreSQL                                      |
| Cache          | Redis                                           |
| Storage        | S3-Compatible (MinIO for local dev)             |
| Realtime       | Native WebSockets                               |
| Auth           | JWT, Google OAuth, Email, Phone OTP             |
| Container      | Docker, Docker Compose                          |
| CI/CD          | GitHub Actions                                  |

---

## Quick Start

```bash
# Clone the repository
git clone https://github.com/your-org/kovo.git
cd kovo

# Copy environment variables
cp .env.example .env

# Start all services
docker compose up --build
```

---

## Documentation

- [Architecture Decisions](docs/architecture/)
- [API Reference](docs/api/)
- [Database Schema](docs/database/)
- [Contributing Guide](CONTRIBUTING.md)
- [Security Policy](SECURITY.md)

---

## License

KOVO is proprietary and confidential commercial software.
Copyright © 2026 Mrinal Prakash. All Rights Reserved.

This repository is **not open source**. No permission is granted to copy, modify, distribute, sublicense, reverse engineer, reproduce, or use any portion of this software without prior written authorization. See the [LICENSE](LICENSE) file for complete details.
