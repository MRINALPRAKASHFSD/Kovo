import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { NotificationFilterTabs } from './NotificationFilterTabs';

describe('NotificationFilterTabs', () => {
  it('renders default filter tabs and marks active tab as selected', () => {
    const html = renderToString(
      <NotificationFilterTabs
        value="all"
        onValueChange={() => {}}
      />
    );

    expect(html).toContain('All');
    expect(html).toContain('Mentions');
    expect(html).toContain('Threads');
    expect(html).toContain('Reactions');
    expect(html).toContain('aria-selected="true"');
  });

  it('renders custom tabs and optional badges', () => {
    const customTabs = [
      { value: 'unread', label: 'Unread', count: 4 },
      { value: 'archived', label: 'Archived' },
    ];

    const html = renderToString(
      <NotificationFilterTabs
        tabs={customTabs}
        value="unread"
        onValueChange={() => {}}
      />
    );

    expect(html).toContain('Unread');
    expect(html).toContain('4');
    expect(html).toContain('Archived');
  });
});
