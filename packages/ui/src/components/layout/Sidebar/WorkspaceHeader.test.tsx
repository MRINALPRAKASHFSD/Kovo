import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { WorkspaceHeader } from './WorkspaceHeader';

describe('WorkspaceHeader', () => {
  it('renders workspace name, domain, and accessible label', () => {
    const html = renderToString(
      <WorkspaceHeader name="Acme Corp" domain="kovo.acme.com" />
    );

    expect(html).toContain('Acme Corp');
    expect(html).toContain('kovo.acme.com');
    expect(html).toContain('aria-label="Switch workspace from Acme Corp"');
  });

  it('renders canonical monogram logo icon', () => {
    const html = renderToString(<WorkspaceHeader />);

    expect(html).toContain('<svg');
    expect(html).toContain('viewBox="125 38 88 126"');
  });
});
