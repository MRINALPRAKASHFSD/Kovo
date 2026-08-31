import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { CommandSearch } from './CommandSearch';

describe('CommandSearch', () => {
  it('renders input with placeholder, value, and purple indicator', () => {
    const html = renderToString(
      <CommandSearch
        value="engineering"
        onChange={() => {}}
        placeholder="Search commands, files, or people..."
      />
    );

    expect(html).toContain('value="engineering"');
    expect(html).toContain('placeholder="Search commands, files, or people..."');
    expect(html).toContain('bg-[#7C65FF]');
  });

  it('renders accessible ESC close button when onClose is provided', () => {
    const html = renderToString(
      <CommandSearch
        value=""
        onChange={() => {}}
        onClose={() => {}}
      />
    );

    expect(html).toContain('aria-label="Close command palette"');
    expect(html).toContain('ESC');
  });
});
