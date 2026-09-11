import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { ChannelList } from './ChannelList';

describe('ChannelList', () => {
  it('renders sections and channel items', () => {
    const html = renderToString(
      <ChannelList
        sections={[
          {
            id: 'starred',
            title: 'STARRED',
            channels: [
              { id: '1', name: 'general', description: 'General channel', unreadCount: 3 },
            ],
          },
          {
            id: 'all',
            title: 'ALL CHANNELS',
            channels: [
              { id: '2', name: 'design', description: 'Design syncs' },
            ],
          },
        ]}
      />
    );
    expect(html).toContain('STARRED');
    expect(html).toContain('general');
    expect(html).toContain('ALL CHANNELS');
    expect(html).toContain('design');
  });

  it('renders EmptyChannels when no sections or channels exist', () => {
    const html = renderToString(
      <ChannelList
        sections={[
          { id: 'starred', title: 'STARRED', channels: [] },
        ]}
      />
    );
    expect(html).toContain('No channels available');
  });
});
