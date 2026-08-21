import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { LoadingStatus } from './LoadingStatus';

describe('LoadingStatus', () => {
  it('renders status text inside an accessible live region', () => {
    const html = renderToString(<LoadingStatus text="Connecting to Secure Cloud..." />);
    expect(html).toContain('role="status"');
    expect(html).toContain('aria-live="polite"');
    expect(html).toContain('aria-atomic="true"');
    expect(html).toContain('Connecting to Secure Cloud...');
  });

  it('supports custom aria-live politeness levels', () => {
    const html = renderToString(
      <LoadingStatus text="Retrying connection..." ariaLive="assertive" />
    );
    expect(html).toContain('aria-live="assertive"');
  });

  it('renders custom class names and styles', () => {
    const html = renderToString(
      <LoadingStatus text="Ready" className="custom-status" />
    );
    expect(html).toContain('custom-status');
  });
});
