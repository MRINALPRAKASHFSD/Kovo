import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { TopBar } from './TopBar';

describe('TopBar', () => {
  it('renders page title and header landmark', () => {
    const html = renderToString(<TopBar title="Dashboard" />);

    expect(html).toContain('<header');
    expect(html).toContain('Dashboard');
    expect(html).toContain('aria-label="Application header"');
  });

  it('renders SearchTrigger and notification trigger', () => {
    const html = renderToString(<TopBar title="Messages" />);

    expect(html).toContain('Search workspace...');
    expect(html).toContain('⌘K');
    expect(html).toContain('aria-label="Notifications"');
  });

  it('renders unread indicator on notifications when hasNotifications is true', () => {
    const html = renderToString(<TopBar hasNotifications={true} />);

    expect(html).toContain('aria-label="New notifications available"');
    expect(html).toContain('bg-[#7C65FF]');
  });
});
