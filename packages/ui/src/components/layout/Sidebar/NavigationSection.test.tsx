import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { NavigationSection } from './NavigationSection';

describe('NavigationSection', () => {
  it('renders section title in uppercase tracking', () => {
    const html = renderToString(
      <NavigationSection title="CHANNELS">
        <div>Channel Item</div>
      </NavigationSection>
    );

    expect(html).toContain('CHANNELS');
    expect(html).toContain('tracking-wider');
    expect(html).toContain('Channel Item');
  });

  it('renders optional action trigger', () => {
    const html = renderToString(
      <NavigationSection
        title="CHANNELS"
        action={<button data-testid="add-btn">+</button>}
      >
        <div>Channel Item</div>
      </NavigationSection>
    );

    expect(html).toContain('data-testid="add-btn"');
  });
});
