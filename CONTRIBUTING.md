# Contributing to KOVO

Thank you for your interest in contributing to KOVO! We welcome contributions from engineers at all levels.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/<your-username>/kovo.git`
3. Create a feature branch: `git checkout -b feat/your-feature`
4. Make your changes following our coding standards
5. Write tests for new functionality
6. Run the full test suite
7. Submit a pull request

## Development Setup

See [docs/architecture/local-development.md](docs/architecture/local-development.md) for the full local development guide.

## Branch Naming

| Type      | Pattern                   | Example                       |
|-----------|---------------------------|-------------------------------|
| Feature   | `feat/<description>`      | `feat/message-reactions`      |
| Bug fix   | `fix/<description>`       | `fix/ws-reconnect-loop`       |
| Hotfix    | `hotfix/<description>`    | `hotfix/auth-token-expiry`    |
| Chore     | `chore/<description>`     | `chore/update-dependencies`   |
| Docs      | `docs/<description>`      | `docs/websocket-protocol`     |

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

feat(chat): add message threading support
fix(auth): resolve token refresh race condition
chore(deps): upgrade fastapi to 0.115
```

## Code Review Process

- All PRs require at least **2 approvals**
- CI must pass (tests, lint, type-check, security scan)
- No PR merges on Fridays after 4pm

## Code Style

- **Python**: Black + Ruff, follow PEP 8, type hints required
- **TypeScript**: ESLint + Prettier, strict mode required
- **Dart**: `dart format`, Flutter analysis

## Testing Requirements

- Unit tests for all domain/application logic
- Integration tests for all API endpoints
- E2E tests for critical user flows

## Questions?

Open a [GitHub Discussion](https://github.com/your-org/kovo/discussions) or reach out on #engineering.
