import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DashboardMetricCard } from './DashboardMetricCard';

describe('DashboardMetricCard', () => {
  it('renders label, value, and helperText', () => {
    const html = renderToString(
      <DashboardMetricCard
        id="m-1"
        label="UNREAD"
        value="12"
        helperText="+3 new replies"
      />
    );
    expect(html).toContain('UNREAD');
    expect(html).toContain('12');
    expect(html).toContain('+3 new replies');
  });

  it('renders icon slot correctly', () => {
    const html = renderToString(
      <DashboardMetricCard
        id="m-2"
        label="ACTIVE"
        value="4"
        icon={<span id="test-icon">#</span>}
      />
    );
    expect(html).toContain('id="test-icon"');
  });
});
