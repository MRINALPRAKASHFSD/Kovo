import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { CommandItem } from './CommandItem';

describe('CommandItem', () => {
  it('renders title, description, leading slot, and shortcut badge', () => {
    const html = renderToString(
      <CommandItem
        title="New Message"
        description="in Actions"
        leading={<span data-testid="msg-icon">ICON</span>}
        shortcut="⌘N"
      />
    );

    expect(html).toContain('New Message');
    expect(html).toContain('in Actions');
    expect(html).toContain('data-testid="msg-icon"');
    expect(html).toContain('⌘N');
    expect(html).toContain('role="option"');
  });

  it('applies active styling when active is true', () => {
    const html = renderToString(
      <CommandItem
        title="Start Huddle / Call"
        active
      />
    );

    expect(html).toContain('aria-selected="true"');
    expect(html).toContain('bg-[#241F47]');
    expect(html).toContain('text-white');
  });
});
