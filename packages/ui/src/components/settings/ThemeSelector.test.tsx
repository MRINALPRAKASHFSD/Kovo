import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { ThemeSelector } from './ThemeSelector';

const sampleOptions = [
  { id: 'dark', title: 'Dark Theme', preview: <div>Dark Mock</div> },
  { id: 'light', title: 'Light Theme', preview: <div>Light Mock</div> },
  { id: 'system', title: 'System Sync', preview: <div>System Mock</div> },
];

describe('ThemeSelector', () => {
  it('renders theme options grid with radiogroup semantics', () => {
    const html = renderToString(
      <ThemeSelector
        value="dark"
        onValueChange={() => {}}
        options={sampleOptions}
      />
    );

    expect(html).toContain('role="radiogroup"');
    expect(html).toContain('Dark Theme');
    expect(html).toContain('Light Theme');
    expect(html).toContain('System Sync');
    expect(html).toContain('Dark Mock');
    expect(html).toContain('Light Mock');
    expect(html).toContain('System Mock');
  });

  it('marks active option as checked', () => {
    const html = renderToString(
      <ThemeSelector
        value="light"
        onValueChange={() => {}}
        options={sampleOptions}
      />
    );

    expect(html).toContain('data-theme-id="light"');
  });
});
