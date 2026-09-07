import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { NotificationSection } from './NotificationSection';

describe('NotificationSection', () => {
  it('renders section title header and card children', () => {
    const html = renderToString(
      <NotificationSection title="TODAY">
        <div data-testid="child-row">Notification Row</div>
      </NotificationSection>
    );

    expect(html).toContain('TODAY');
    expect(html).toContain('data-testid="child-row"');
    expect(html).toContain('bg-[#13121D]');
    expect(html).toContain('divide-[#1E1D2A]');
  });
});
