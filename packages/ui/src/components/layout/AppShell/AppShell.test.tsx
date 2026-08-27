import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { AppShell } from './AppShell';

describe('AppShell', () => {
  it('renders CSS grid layout with sidebar, topbar, and main content area', () => {
    const html = renderToString(
      <AppShell>
        <div data-testid="test-content">Dashboard Content</div>
      </AppShell>
    );

    expect(html).toContain('md:grid-cols-[240px_1fr]');
    expect(html).toContain('<aside');
    expect(html).toContain('<header');
    expect(html).toContain('<main');
    expect(html).toContain('Dashboard Content');
    expect(html).toContain('max-w-[1440px]');
  });

  it('renders custom sidebar and topbar when provided', () => {
    const html = renderToString(
      <AppShell
        sidebar={<div data-testid="custom-sidebar">Custom Sidebar</div>}
        topBar={<div data-testid="custom-topbar">Custom TopBar</div>}
      >
        <div>Content</div>
      </AppShell>
    );

    expect(html).toContain('Custom Sidebar');
    expect(html).toContain('Custom TopBar');
  });
});
