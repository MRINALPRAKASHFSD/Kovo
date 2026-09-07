import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { NotificationsPage } from './NotificationsPage';

describe('NotificationsPage', () => {
  it('renders header, toolbar, and children in max-w-5xl layout', () => {
    const html = renderToString(
      <NotificationsPage
        header={<header data-testid="page-header">Header</header>}
        toolbar={<div data-testid="page-toolbar">Toolbar</div>}
      >
        <div data-testid="page-list">List</div>
      </NotificationsPage>
    );

    expect(html).toContain('data-testid="page-header"');
    expect(html).toContain('data-testid="page-toolbar"');
    expect(html).toContain('data-testid="page-list"');
    expect(html).toContain('max-w-5xl');
  });
});
