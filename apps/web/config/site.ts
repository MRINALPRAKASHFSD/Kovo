/**
 * KOVO — Site-wide configuration constants.
 */
export const siteConfig = {
  name: 'KOVO',
  description: 'Production-grade communication platform',
  version: '0.1.0-alpha',
  url: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000',
  wsUrl: process.env.NEXT_PUBLIC_WS_URL ?? 'ws://localhost:8000',
  links: {
    github: 'https://github.com/your-org/kovo',
    docs: 'https://docs.kovo.app',
  },
} as const;
