import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { ThreadListItem } from './ThreadListItem';
import { ThreadData } from './types';

const mockThread: ThreadData = {
  id: 'th-1',
  author: {
    name: 'Daniella Vance',
    initials: 'DV',
  },
  preview: 'I finished the latest redesign of the notification center.',
  replyCount: 3,
  lastActivity: '10m ago',
};

describe('ThreadListItem', () => {
  it('renders author name, preview text, relative time, and reply count', () => {
    const html = renderToString(<ThreadListItem thread={mockThread} />);

    expect(html).toContain('Daniella Vance');
    expect(html).toContain(
      'I finished the latest redesign of the notification center.'
    );
    expect(html).toContain('10m ago');
    expect(html).toContain('3 replies');
  });

  it('renders singular reply label when replyCount is 1', () => {
    const html = renderToString(
      <ThreadListItem thread={{ ...mockThread, replyCount: 1 }} />
    );

    expect(html).toContain('1 reply');
  });

  it('applies selected styling and aria-selected attribute', () => {
    const htmlSelected = renderToString(
      <ThreadListItem thread={mockThread} selected={true} />
    );

    expect(htmlSelected).toContain('aria-selected="true"');
    expect(htmlSelected).toContain('border-[#7C65FF]');
  });

  it('renders custom metadata and footer slot when provided', () => {
    const html = renderToString(
      <ThreadListItem
        thread={mockThread}
        metadata={<span id="custom-meta">Tag</span>}
        footer={<div id="custom-footer">Resolved</div>}
      />
    );

    expect(html).toContain('id="custom-meta"');
    expect(html).toContain('id="custom-footer"');
    expect(html).toContain('Resolved');
  });
});
