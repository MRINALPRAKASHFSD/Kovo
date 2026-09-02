import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DashboardMetricGrid } from './DashboardMetricGrid';

describe('DashboardMetricGrid', () => {
  it('renders items list correctly', () => {
    const html = renderToString(
      <DashboardMetricGrid
        items={[
          { id: '1', label: 'UNREAD', value: '12' },
          { id: '2', label: 'ACTIVE', value: '4' },
        ]}
      />
    );
    expect(html).toContain('UNREAD');
    expect(html).toContain('ACTIVE');
    expect(html).toContain('12');
    expect(html).toContain('4');
  });

  it('renders custom children correctly', () => {
    const html = renderToString(
      <DashboardMetricGrid>
        <div id="child-card">Custom Child</div>
      </DashboardMetricGrid>
    );
    expect(html).toContain('id="child-card"');
    expect(html).toContain('Custom Child');
  });
});
