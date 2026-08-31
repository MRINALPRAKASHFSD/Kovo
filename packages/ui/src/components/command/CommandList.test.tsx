import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { CommandList } from './CommandList';
import { CommandItemData } from './types';

describe('CommandList', () => {
  const mockItems: CommandItemData[] = [
    {
      id: 'cmd-1',
      title: 'New Message',
      description: 'in Actions',
      groupId: 'actions',
      groupTitle: 'RECOMMENDED ACTIONS',
      shortcut: '⌘N',
    },
    {
      id: 'cmd-2',
      title: 'Create Channel',
      description: 'in Actions',
      groupId: 'actions',
      groupTitle: 'RECOMMENDED ACTIONS',
      shortcut: '⌥C',
    },
  ];

  it('renders grouped items with section title', () => {
    const html = renderToString(
      <CommandList
        items={mockItems}
        selectedIndex={0}
      />
    );

    expect(html).toContain('RECOMMENDED ACTIONS');
    expect(html).toContain('New Message');
    expect(html).toContain('Create Channel');
  });

  it('marks the item at selectedIndex as active', () => {
    const html = renderToString(
      <CommandList
        items={mockItems}
        selectedIndex={1}
      />
    );

    expect(html).toContain('aria-selected="true"');
    expect(html).toContain('bg-[#241F47]');
  });
});
