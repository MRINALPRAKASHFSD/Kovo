import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { NotificationStatusDot } from './NotificationStatusDot';

describe('NotificationStatusDot', () => {
  it('renders unread indicator dot when unread is true', () => {
    const html = renderToString(<NotificationStatusDot unread={true} />);
    expect(html).toContain('bg-[#7C65FF]');
  });

  it('renders clean placeholder slot without dot when unread is false', () => {
    const html = renderToString(<NotificationStatusDot unread={false} />);
    expect(html).not.toContain('bg-[#7C65FF]');
  });
});
