import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { MessagesWorkspace } from './MessagesWorkspace';

describe('MessagesWorkspace', () => {
  it('renders sidebar and main content', () => {
    const html = renderToString(
      <MessagesWorkspace
        sidebar={<div data-testid="test-sidebar">Sidebar Content</div>}
      >
        <div data-testid="test-main">Main Viewport Content</div>
      </MessagesWorkspace>
    );

    expect(html).toContain('Sidebar Content');
    expect(html).toContain('Main Viewport Content');
    expect(html).toContain('hidden md:block');
  });

  it('renders mobile drawer when provided', () => {
    const html = renderToString(
      <MessagesWorkspace
        drawer={<div data-testid="test-drawer">Drawer Content</div>}
      >
        <div>Main Viewport</div>
      </MessagesWorkspace>
    );

    expect(html).toContain('Drawer Content');
  });
});
