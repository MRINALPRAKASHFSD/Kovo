/**
 * @kovo/api-client — HTTP + WebSocket client for KOVO Backend.
 *
 * Usage:
 *   import { createKovoClient } from '@kovo/api-client';
 *   const client = createKovoClient({ baseURL: process.env.NEXT_PUBLIC_API_URL });
 *
 * Phase 1 will implement: auth interceptors, retry logic, WS manager.
 */
export * from './generated';
export * from './hooks';
export * from './utils';
