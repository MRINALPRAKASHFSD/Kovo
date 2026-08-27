import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { SearchTrigger } from './SearchTrigger';

describe('SearchTrigger', () => {
  it('renders button with placeholder and keyboard shortcut hint', () => {
    const html = renderToString(
      <SearchTrigger placeholder="Search workspace..." shortcut="⌘K" />
    );

    expect(html).toContain('type="button"');
    expect(html).toContain('aria-label="Search workspace"');
    expect(html).toContain('Search workspace...');
    expect(html).toContain('⌘K');
  });
});
