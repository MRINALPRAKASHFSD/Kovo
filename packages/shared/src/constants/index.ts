// KOVO — Shared constants
export const API_VERSION = 'v1';
export const WS_EVENTS = {
  // Connection lifecycle
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  HEARTBEAT: 'heartbeat',
  // Messaging
  MESSAGE_SEND: 'message:send',
  MESSAGE_EDIT: 'message:edit',
  MESSAGE_DELETE: 'message:delete',
  MESSAGE_REACTION: 'message:reaction',
  // Typing
  TYPING_START: 'typing:start',
  TYPING_STOP: 'typing:stop',
  // Presence
  PRESENCE_UPDATE: 'presence:update',
  // Channels
  CHANNEL_JOIN: 'channel:join',
  CHANNEL_LEAVE: 'channel:leave',
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_ERROR: 500,
} as const;
