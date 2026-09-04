import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { ConversationItem } from './ConversationItem';

describe('ConversationItem', () => {
  it('renders leading element, title, and subtitle', () => {
    const html = renderToString(
      <ConversationItem
        leading={<span data-testid="leading-avatar">Avatar</span>}
        title="Daniella Vance"
        subtitle="Active now"
      />
    );

    expect(html).toContain('data-testid="leading-avatar"');
    expect(html).toContain('Daniella Vance');
    expect(html).toContain('Active now');
  });

  it('renders trailing badge when provided', () => {
    const html = renderToString(
      <ConversationItem
        title="engineering"
        trailing={<span data-testid="unread-badge">4</span>}
      />
    );

    expect(html).toContain('data-testid="unread-badge"');
    expect(html).toContain('4');
  });

  it('applies active styling when active is true', () => {
    const html = renderToString(
      <ConversationItem
        title="engineering"
        active
      />
    );

    expect(html).toContain('aria-current="true"');
    expect(html).toContain('bg-[#241F47]');
    expect(html).toContain('text-white');
  });
});
