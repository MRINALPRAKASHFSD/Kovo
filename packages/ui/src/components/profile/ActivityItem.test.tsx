import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { ActivityItem } from './ActivityItem';

describe('ActivityItem', () => {
  it('renders title, description, timestamp, and icon badge', () => {
    const html = renderToString(
      <ActivityItem
        id="act-1"
        title="Merged PR #412 in acme-kovo-front"
        description="Implemented keyboard-friendly accessibility patterns"
        timestamp="2h ago"
        icon={<span data-testid="code-icon">&lt;&gt;</span>}
      />
    );

    expect(html).toContain('Merged PR #412 in acme-kovo-front');
    expect(html).toContain('Implemented keyboard-friendly accessibility patterns');
    expect(html).toContain('2h ago');
    expect(html).toContain('data-testid="code-icon"');
    expect(html).toContain('role="article"');
  });
});
