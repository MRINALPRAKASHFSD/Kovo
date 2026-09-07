import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { NotificationList } from './NotificationList';
import { NotificationGroup } from './types';

describe('NotificationList', () => {
  it('renders groups, section headers, and notification items', () => {
    const mockGroups: NotificationGroup[] = [
      {
        id: 'group-today',
        title: 'TODAY',
        notifications: [
          {
            id: 'notif-1',
            title: 'Daniella Vance mentioned you in #design',
            timestamp: '10m ago',
            category: 'mention',
            unread: true,
          },
        ],
      },
      {
        id: 'group-yesterday',
        title: 'YESTERDAY & EARLIER',
        notifications: [
          {
            id: 'notif-2',
            title: 'Alex Mercer added you to Acme Workspace',
            timestamp: '1d ago',
            category: 'workspace',
            unread: false,
          },
        ],
      },
    ];

    const html = renderToString(<NotificationList groups={mockGroups} />);

    expect(html).toContain('TODAY');
    expect(html).toContain('Daniella Vance mentioned you in #design');
    expect(html).toContain('YESTERDAY &amp; EARLIER');
    expect(html).toContain('Alex Mercer added you to Acme Workspace');
    expect(html).toContain('role="feed"');
  });

  it('renders empty state when groups array is empty', () => {
    const html = renderToString(<NotificationList groups={[]} />);
    expect(html).toContain('No notifications');
  });
});
