import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { renderToString } from 'react-dom/server';
import { SidebarItem } from './SidebarItem';

describe('SidebarItem', () => {
  const DummyIcon = <svg data-testid="dummy-icon" />;

  it('renders label, icon, and default inactive button', () => {
    const html = renderToString(
      <SidebarItem label="Messages" icon={DummyIcon} />
    );

    expect(html).toContain('Messages');
    expect(html).toContain('data-testid="dummy-icon"');
    expect(html).toContain('type="button"');
    expect(html).not.toContain('aria-current="page"');
  });

  it('applies active styling and aria-current when active is true', () => {
    const html = renderToString(
      <SidebarItem label="Home" icon={DummyIcon} active={true} />
    );

    expect(html).toContain('aria-current="page"');
    expect(html).toContain('bg-[#241F47]');
    expect(html).toContain('text-white');
  });

  it('renders badge count when badge prop is provided', () => {
    const html = renderToString(
      <SidebarItem label="Messages" icon={DummyIcon} badge="3" />
    );

    expect(html).toContain('3');
    expect(html).toContain('bg-[#7C65FF]');
  });

  it('renders as anchor when href is provided', () => {
    const html = renderToString(
      <SidebarItem label="Files" icon={DummyIcon} href="/files" />
    );

    expect(html).toContain('href="/files"');
    expect(html).not.toContain('type="button"');
  });
});
