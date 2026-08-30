# KOVO WebSocket Protocol Specification

## Connection

```
WS /ws?ticket=<ws_ticket>
```

Obtain a `ws_ticket` via `POST /api/v1/auth/ws-ticket` (requires valid JWT).
Ticket is valid for 60 seconds and single-use.

## Message Envelope

All messages use a consistent envelope:

```json
{
  "type": "namespace:event",
  "payload": {},
  "meta": {
    "id": "uuid-v4",
    "timestamp": "2024-01-01T00:00:00Z",
    "version": 1
  }
}
```

## Client → Server Events

| Event              | Description                          |
|--------------------|--------------------------------------|
| `heartbeat`        | Keep-alive ping                      |
| `message:send`     | Send a message to a channel          |
| `message:edit`     | Edit an existing message             |
| `message:delete`   | Delete a message                     |
| `message:reaction` | Add/remove a reaction                |
| `typing:start`     | Start typing indicator               |
| `typing:stop`      | Stop typing indicator                |
| `channel:join`     | Subscribe to channel events          |
| `channel:leave`    | Unsubscribe from channel events      |
| `presence:update`  | Update own presence status           |

## Server → Client Events

| Event                | Description                          |
|----------------------|--------------------------------------|
| `heartbeat:ack`      | Heartbeat acknowledgement            |
| `message:new`        | New message received                 |
| `message:updated`    | Message was edited                   |
| `message:deleted`    | Message was deleted                  |
| `message:reaction`   | Reaction added/removed               |
| `typing:indicator`   | User is typing                       |
| `presence:changed`   | User presence changed                |
| `channel:updated`    | Channel metadata changed             |
| `notification:new`   | New notification                     |
| `error`              | Error response                       |
