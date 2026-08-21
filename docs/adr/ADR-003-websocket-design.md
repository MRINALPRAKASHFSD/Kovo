# ADR-003: Native WebSockets for Real-Time

**Status**: Accepted
**Date**: 2024-01-01

## Context

KOVO requires real-time messaging, typing indicators, presence, and notifications.
Options considered: Socket.IO, native WebSockets, Server-Sent Events, WebRTC data channels.

## Decision

Use **native WebSockets** via FastAPI's built-in WebSocket support.

**Connection model:**
- Each user maintains a single authenticated WebSocket connection per device
- A `ConnectionManager` in Redis tracks active connections across backend instances
- Events are routed via Redis pub/sub for horizontal scalability

**Event envelope format:**
```json
{
  "type": "message:send",
  "payload": { ... },
  "meta": {
    "id": "uuid",
    "timestamp": "iso8601",
    "version": 1
  }
}
```

## Consequences

✅ No Socket.IO vendor lock-in
✅ Binary (MessagePack) or JSON payloads supported
✅ Horizontally scalable via Redis pub/sub
⚠️  Requires manual reconnection logic on clients — standard practice for production apps
