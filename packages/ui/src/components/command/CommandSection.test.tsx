import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { CommandSection } from './CommandSection';

describe('CommandSection', () => {
  it('renders uppercase group heading and children', () => {
    const html = renderToString(
      <CommandSection title="RECOMMENDED ACTIONS & RESULTS">
        <div data-testid="child-item">Item 1</div>
      </CommandSection>
    );

    expect(html).toContain('RECOMMENDED ACTIONS &amp; RESULTS');
    expect(html).toContain('data-testid="child-item"');
    expect(html).toContain('role="group"');
  });
});
