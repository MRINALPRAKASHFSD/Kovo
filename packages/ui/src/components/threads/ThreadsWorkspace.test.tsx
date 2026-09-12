import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { ThreadsWorkspace } from './ThreadsWorkspace';

describe('ThreadsWorkspace', () => {
  it('renders sidebar and children viewport', () => {
    const html = renderToString(
      <ThreadsWorkspace
        sidebar={<div id="thread-sidebar">Sidebar Content</div>}
      >
        <div id="thread-view">Thread Content</div>
      </ThreadsWorkspace>
    );

    expect(html).toContain('id="thread-sidebar"');
    expect(html).toContain('id="thread-view"');
  });
});
