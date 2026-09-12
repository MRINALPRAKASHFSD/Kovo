import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { ThreadTimeline } from './ThreadTimeline';
import { ThreadMessageData } from './types';

const mockMessages: ThreadMessageData[] = [
  {
    id: 'm-1',
    author: { name: 'Daniella Vance', initials: 'DV' },
    content: 'Notification center redesign feedback',
    timestamp: '10:24 AM',
  },
  {
    id: 'm-2',
    author: { name: 'Marcus Aurelius', initials: 'MA' },
    content: 'Looks fantastic!',
    timestamp: '10:30 AM',
  },
];

describe('ThreadTimeline', () => {
  it('renders messages with author names, timestamps, and bubble content', () => {
    const html = renderToString(<ThreadTimeline messages={mockMessages} />);

    expect(html).toContain('Daniella Vance');
    expect(html).toContain('10:24 AM');
    expect(html).toContain('Notification center redesign feedback');

    expect(html).toContain('Marcus Aurelius');
    expect(html).toContain('10:30 AM');
    expect(html).toContain('Looks fantastic!');
  });
});
