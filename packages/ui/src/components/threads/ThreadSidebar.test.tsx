import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { ThreadSidebar } from './ThreadSidebar';
import { ThreadData } from './types';

const mockThreads: ThreadData[] = [
  {
    id: 'th-1',
    author: { name: 'Daniella Vance' },
    preview: 'Redesign of notification center',
    replyCount: 3,
    lastActivity: '10m ago',
  },
  {
    id: 'th-2',
    author: { name: 'Marcus Aurelius' },
    preview: 'Webhooks integration',
    replyCount: 1,
    lastActivity: '24m ago',
  },
];

describe('ThreadSidebar', () => {
  it('renders default title and all threads', () => {
    const html = renderToString(<ThreadSidebar threads={mockThreads} />);

    expect(html).toContain('Active Threads');
    expect(html).toContain('Daniella Vance');
    expect(html).toContain('Marcus Aurelius');
    expect(html).toContain('Redesign of notification center');
    expect(html).toContain('Webhooks integration');
  });

  it('renders empty state when thread list is empty', () => {
    const html = renderToString(<ThreadSidebar threads={[]} />);

    expect(html).toContain('No active threads');
  });
});
