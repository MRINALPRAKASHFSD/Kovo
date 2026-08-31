import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { CommandEmptyState } from './CommandEmptyState';

describe('CommandEmptyState', () => {
  it('renders default empty state title and message', () => {
    const html = renderToString(<CommandEmptyState />);

    expect(html).toContain('No results found');
    expect(html).toContain('Try searching for commands, files, or teammates.');
    expect(html).toContain('role="status"');
  });

  it('echoes search query in message', () => {
    const html = renderToString(<CommandEmptyState query="xyz" />);

    expect(html).toContain('No commands, files, or people match &quot;xyz&quot;.');
  });
});
