import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { NotificationToolbar } from './NotificationToolbar';

describe('NotificationToolbar', () => {
  it('renders leftSlot and rightSlot boundaries', () => {
    const html = renderToString(
      <NotificationToolbar
        leftSlot={<div data-testid="tabs">Tabs</div>}
        rightSlot={<button data-testid="mark-read">Mark all read</button>}
      />
    );

    expect(html).toContain('data-testid="tabs"');
    expect(html).toContain('data-testid="mark-read"');
    expect(html).toContain('role="toolbar"');
  });

  it('renders custom children when provided', () => {
    const html = renderToString(
      <NotificationToolbar>
        <span data-testid="custom-bar">Custom content</span>
      </NotificationToolbar>
    );

    expect(html).toContain('data-testid="custom-bar"');
  });
});
