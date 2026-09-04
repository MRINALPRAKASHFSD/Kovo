import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { ChannelHeader } from './ChannelHeader';

describe('ChannelHeader', () => {
  it('renders channel title and member count badge', () => {
    const html = renderToString(
      <ChannelHeader
        title="#engineering"
        badge="128 members"
      />
    );

    expect(html).toContain('#engineering');
    expect(html).toContain('128 members');
    expect(html).toContain('<header');
  });

  it('renders composable action buttons slot', () => {
    const html = renderToString(
      <ChannelHeader
        title="#engineering"
        actions={<button type="button" data-testid="call-btn">Call</button>}
      />
    );

    expect(html).toContain('data-testid="call-btn"');
    expect(html).toContain('Call');
  });

  it('renders mobile drawer toggle button when callback is provided', () => {
    const html = renderToString(
      <ChannelHeader
        title="#engineering"
        onToggleDrawer={() => {}}
      />
    );

    expect(html).toContain('aria-label="Open conversation list"');
  });
});
