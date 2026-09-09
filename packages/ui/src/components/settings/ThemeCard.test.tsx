import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { ThemeCard } from './ThemeCard';

describe('ThemeCard', () => {
  it('renders selected theme card with active indicator and preview slot', () => {
    const html = renderToString(
      <ThemeCard
        id="dark"
        title="Dark Theme"
        selected={true}
        onSelect={() => {}}
        preview={<div data-testid="dark-preview">Dark Preview Box</div>}
        description="High contrast dark interface"
        footer={<span>Recommended</span>}
      />
    );

    expect(html).toContain('Dark Theme');
    expect(html).toContain('Dark Preview Box');
    expect(html).toContain('Recommended');
    expect(html).toContain('role="radio"');
    expect(html).toContain('aria-checked="true"');
    expect(html).toContain('border-[#7C65FF]');
  });

  it('renders unselected theme card', () => {
    const html = renderToString(
      <ThemeCard
        id="light"
        title="Light Theme"
        selected={false}
        onSelect={() => {}}
        preview={<div>Light Preview</div>}
      />
    );

    expect(html).toContain('Light Theme');
    expect(html).toContain('aria-checked="false"');
    expect(html).toContain('border-[#1E1D2A]');
  });
});
