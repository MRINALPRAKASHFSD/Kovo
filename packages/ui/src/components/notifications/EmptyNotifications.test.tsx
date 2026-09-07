import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { EmptyNotifications } from './EmptyNotifications';

describe('EmptyNotifications', () => {
  it('renders default empty notification text and icon', () => {
    const html = renderToString(<EmptyNotifications />);

    expect(html).toContain('No notifications');
    expect(html).toContain("You&#x27;re all caught up! Check back later for updates.");
    expect(html).toContain('role="status"');
  });

  it('renders custom title, description, and action button', () => {
    const html = renderToString(
      <EmptyNotifications
        title="No Mentions"
        description="You have no unread mentions in any channel."
        actionLabel="View All Notifications"
        onAction={() => {}}
      />
    );

    expect(html).toContain('No Mentions');
    expect(html).toContain('You have no unread mentions in any channel.');
    expect(html).toContain('View All Notifications');
  });
});
