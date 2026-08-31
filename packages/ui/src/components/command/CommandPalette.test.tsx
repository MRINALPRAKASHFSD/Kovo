import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { CommandPalette } from './CommandPalette';
import { CommandItemData } from './types';

describe('CommandPalette', () => {
  const mockItems: CommandItemData[] = [
    {
      id: 'cmd-1',
      title: 'New Message',
      description: 'in Actions',
      groupId: 'rec',
      groupTitle: 'RECOMMENDED ACTIONS & RESULTS',
      shortcut: '⌘N',
    },
  ];

  it('renders dialog when open is true', () => {
    const html = renderToString(
      <CommandPalette
        open={true}
        query="new"
        items={mockItems}
      />
    );

    expect(html).toContain('role="dialog"');
    expect(html).toContain('aria-modal="true"');
    expect(html).toContain('value="new"');
    expect(html).toContain('New Message');
    expect(html).toContain('KOVO Command Palette');
  });

  it('renders nothing when open is false', () => {
    const html = renderToString(
      <CommandPalette
        open={false}
        query=""
        items={mockItems}
      />
    );

    expect(html).toBe('');
  });

  it('renders empty state when items list is empty', () => {
    const html = renderToString(
      <CommandPalette
        open={true}
        query="nonexistent"
        items={[]}
      />
    );

    expect(html).toContain('No results found');
    expect(html).toContain('nonexistent');
  });
});
