import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { ConversationSidebar } from './ConversationSidebar';

describe('ConversationSidebar', () => {
  it('renders filter input with controlled value and placeholder', () => {
    const html = renderToString(
      <ConversationSidebar
        searchValue="engin"
        searchPlaceholder="Filter conversations..."
      />
    );

    expect(html).toContain('value="engin"');
    expect(html).toContain('placeholder="Filter conversations..."');
    expect(html).toContain('<aside');
    expect(html).toContain('w-[280px]');
  });

  it('renders children sections inside the scrollable viewport', () => {
    const html = renderToString(
      <ConversationSidebar>
        <div data-testid="section-dm">Direct Messages</div>
        <div data-testid="section-channels">Channels</div>
      </ConversationSidebar>
    );

    expect(html).toContain('Direct Messages');
    expect(html).toContain('Channels');
    expect(html).toContain('overflow-y-auto');
  });
});
