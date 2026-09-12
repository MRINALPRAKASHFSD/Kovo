import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { EmptyThreads } from './EmptyThreads';

describe('EmptyThreads', () => {
  it('renders default title and description', () => {
    const html = renderToString(<EmptyThreads />);

    expect(html).toContain('No active threads');
    expect(html).toContain('When you participate in discussions');
  });

  it('renders custom title and action node', () => {
    const html = renderToString(
      <EmptyThreads
        title="Custom Title"
        action={<button>Create Thread</button>}
      />
    );

    expect(html).toContain('Custom Title');
    expect(html).toContain('Create Thread');
  });
});
