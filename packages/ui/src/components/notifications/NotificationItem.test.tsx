import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { NotificationItem } from './NotificationItem';

describe('NotificationItem', () => {
  it('renders title, description, timestamp, startAdornment, and unread dot', () => {
    const html = renderToString(
      <NotificationItem
        id="notif-1"
        title="Daniella Vance mentioned you in #design"
        description="Micro-interactions look slick"
        timestamp="10m ago"
        unread={true}
        startAdornment={<span data-testid="avatar-slot">AVATAR</span>}
      />
    );

    expect(html).toContain('Daniella Vance mentioned you in #design');
    expect(html).toContain('Micro-interactions look slick');
    expect(html).toContain('10m ago');
    expect(html).toContain('bg-[#7C65FF]');
    expect(html).toContain('data-testid="avatar-slot"');
    expect(html).toContain('role="article"');
  });

  it('renders custom metadata tag and endAdornment override', () => {
    const html = renderToString(
      <NotificationItem
        id="notif-2"
        title="Telemetry updated"
        timestamp="1h ago"
        unread={false}
        metadata={<span data-testid="meta-pill">#engineering</span>}
        endAdornment={<span data-testid="custom-end">ACTIONS</span>}
      />
    );

    expect(html).toContain('Telemetry updated');
    expect(html).toContain('data-testid="meta-pill"');
    expect(html).toContain('data-testid="custom-end"');
    expect(html).not.toContain('bg-[#7C65FF]');
  });
});
