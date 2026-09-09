import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { StatusBadge } from './StatusBadge';

describe('StatusBadge', () => {
  it('renders active status with default green styles and label', () => {
    const html = renderToString(<StatusBadge status="active" />);
    expect(html).toContain('Active');
    expect(html).toContain('bg-[#10B981]');
    expect(html).toContain('role="status"');
  });

  it('renders custom label and offline status', () => {
    const html = renderToString(
      <StatusBadge status="active" label="Active Offline" />
    );
    expect(html).toContain('Active Offline');
  });

  it('renders busy and away status variants', () => {
    const busyHtml = renderToString(<StatusBadge status="busy" />);
    expect(busyHtml).toContain('Busy');
    expect(busyHtml).toContain('bg-[#EF4444]');

    const awayHtml = renderToString(<StatusBadge status="away" />);
    expect(awayHtml).toContain('Away');
    expect(awayHtml).toContain('bg-[#F59E0B]');
  });
});
