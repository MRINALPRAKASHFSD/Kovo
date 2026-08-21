# ADR-004: Authentication Strategy

**Status**: Accepted
**Date**: 2024-01-01

## Decision

Multi-method authentication with short-lived JWT access tokens:

| Method         | Use Case                        |
|----------------|---------------------------------|
| Email/Password | Primary signup                  |
| Google OAuth   | Social login                    |
| Phone OTP      | Verification + passwordless     |
| JWT            | Stateless API authentication    |

**Token Strategy:**
- Access token: 15 minutes, HS256
- Refresh token: 7 days, stored in HttpOnly cookie
- WebSocket auth: Short-lived WS ticket (60s) issued by REST API

## Consequences

✅ Stateless API — no server-side session state
✅ WebSocket ticket pattern prevents long-lived tokens in URL query strings
✅ Multiple auth methods without complexity in core logic
