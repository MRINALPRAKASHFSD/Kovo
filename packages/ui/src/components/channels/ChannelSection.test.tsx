import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { ChannelSection } from './ChannelSection';

describe('ChannelSection', () => {
  it('renders section title and channels', () => {
    const html = renderToString(
      <ChannelSection
        title="STARRED"
        channels={[
          { id: '1', name: 'general', description: 'General channel' },
          { id: '2', name: 'engineering', description: 'Eng team' },
        ]}
      />
    );
    expect(html).toContain('STARRED');
    expect(html).toContain('general');
    expect(html).toContain('engineering');
  });

  it('renders section action when provided', () => {
    const html = renderToString(
      <ChannelSection
        title="ALL CHANNELS"
        action={<button id="manage-action">Manage</button>}
      />
    );
    expect(html).toContain('id="manage-action"');
  });
});
