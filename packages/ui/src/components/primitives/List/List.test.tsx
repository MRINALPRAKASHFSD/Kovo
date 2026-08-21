import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { List, ListSection, ListItem } from './List';

describe('List primitives', () => {
  it('renders List with default role and spacing', () => {
    const html = renderToString(
      <List>
        <div>Item 1</div>
      </List>
    );
    expect(html).toContain('role="list"');
    expect(html).toContain('space-y-2.5');
    expect(html).toContain('Item 1');
  });

  it('renders ListSection with title and action', () => {
    const html = renderToString(
      <ListSection
        title="Starred"
        action={<button id="act-btn">Manage</button>}
      >
        <div>Child item</div>
      </ListSection>
    );
    expect(html).toContain('Starred');
    expect(html).toContain('id="act-btn"');
    expect(html).toContain('Child item');
  });

  it('renders ListItem with leading, body, and trailing slots', () => {
    const html = renderToString(
      <ListItem
        leading={<span id="test-leading">#</span>}
        trailing={<span id="test-trailing">Badge</span>}
      >
        <span>Content</span>
      </ListItem>
    );
    expect(html).toContain('id="test-leading"');
    expect(html).toContain('id="test-trailing"');
    expect(html).toContain('Content');
    expect(html).toContain('role="listitem"');
  });
});
