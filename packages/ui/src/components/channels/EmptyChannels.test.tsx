import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { EmptyChannels } from './EmptyChannels';

describe('EmptyChannels', () => {
  it('renders default empty state message', () => {
    const html = renderToString(<EmptyChannels />);
    expect(html).toContain('No channels available');
    expect(html).toContain('You are not a member of any channels in this section yet.');
  });

  it('renders custom action button and title', () => {
    const html = renderToString(
      <EmptyChannels
        title="No Starred Channels"
        action={<button id="create-btn">Create Channel</button>}
      />
    );
    expect(html).toContain('No Starred Channels');
    expect(html).toContain('id="create-btn"');
  });
});
