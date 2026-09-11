import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { ChannelListItem } from './ChannelListItem';

describe('ChannelListItem', () => {
  it('renders channel name, description, and unread badge', () => {
    const html = renderToString(
      <ChannelListItem
        channel={{
          id: 'general',
          name: 'general',
          description: 'Primary development space',
          unreadCount: 3,
        }}
      />
    );
    expect(html).toContain('general');
    expect(html).toContain('Primary development space');
    expect(html).toContain('3');
    expect(html).toContain('#');
  });

  it('renders 99+ for unread counts over 99', () => {
    const html = renderToString(
      <ChannelListItem
        channel={{
          id: 'random',
          name: 'random',
          unreadCount: 150,
        }}
      />
    );
    expect(html).toContain('99+');
  });

  it('renders metadata slot and custom leading icon', () => {
    const html = renderToString(
      <ChannelListItem
        channel={{
          id: 'private-channel',
          name: 'leadership',
          metadata: <span id="meta-lock">🔒</span>,
        }}
        leading={<span id="custom-icon">★</span>}
      />
    );
    expect(html).toContain('id="meta-lock"');
    expect(html).toContain('id="custom-icon"');
  });

  it('applies selected and disabled states', () => {
    const htmlSelected = renderToString(
      <ChannelListItem
        channel={{ id: '1', name: 'dev' }}
        selected={true}
      />
    );
    expect(htmlSelected).toContain('aria-selected="true"');

    const htmlDisabled = renderToString(
      <ChannelListItem
        channel={{ id: '2', name: 'archive' }}
        disabled={true}
      />
    );
    expect(htmlDisabled).toContain('aria-disabled="true"');
  });
});
