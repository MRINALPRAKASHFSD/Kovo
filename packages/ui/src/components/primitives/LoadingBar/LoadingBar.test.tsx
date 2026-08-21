import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { LoadingBar } from './LoadingBar';

describe('LoadingBar', () => {
  it('renders indeterminate progressbar with accessible role and label', () => {
    const html = renderToString(<LoadingBar label="Connecting..." />);
    expect(html).toContain('role="progressbar"');
    expect(html).toContain('aria-label="Connecting..."');
    expect(html).toContain('aria-valuemin="0"');
    expect(html).toContain('aria-valuemax="100"');
  });

  it('renders determinate progressbar with aria-valuenow', () => {
    const html = renderToString(<LoadingBar value={60} label="Uploading" />);
    expect(html).toContain('aria-valuenow="60"');
  });

  it('clamps determinate value between 0 and 100', () => {
    const htmlOver = renderToString(<LoadingBar value={150} />);
    expect(htmlOver).toContain('aria-valuenow="100"');

    const htmlUnder = renderToString(<LoadingBar value={-20} />);
    expect(htmlUnder).toContain('aria-valuenow="0"');
  });
});
