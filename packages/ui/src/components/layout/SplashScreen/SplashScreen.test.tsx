import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { SplashScreen } from './SplashScreen';

describe('SplashScreen', () => {
  it('renders semantic main container with accessible label', () => {
    const html = renderToString(<SplashScreen />);
    expect(html).toContain('<main');
    expect(html).toContain('aria-label="KOVO Application Loading"');
  });

  it('renders official brand icon as decorative and wordmark with accessible alt', () => {
    const html = renderToString(<SplashScreen />);
    expect(html).toContain('src="/branding/logos/icon.svg"');
    expect(html).toContain('aria-hidden="true"');
    expect(html).toContain('src="/branding/logos/wordmark.svg"');
    expect(html).toContain('alt="KOVO"');
  });

  it('renders Enterprise Collaboration subtitle', () => {
    const html = renderToString(<SplashScreen />);
    expect(html).toContain('ENTERPRISE COLLABORATION');
  });

  it('renders default status and loading indicator', () => {
    const html = renderToString(<SplashScreen />);
    expect(html).toContain('role="progressbar"');
    expect(html).toContain('role="status"');
    expect(html).toContain('Connecting to Secure Cloud...');
  });

  it('renders custom status and determinate progress', () => {
    const html = renderToString(
      <SplashScreen status="Restoring session..." progress={42} />
    );
    expect(html).toContain('Restoring session...');
    expect(html).toContain('aria-valuenow="42"');
  });

  it('renders error state when error prop is provided', () => {
    const html = renderToString(
      <SplashScreen error="Unable to connect to server" />
    );
    expect(html).toContain('role="alert"');
    expect(html).toContain('Unable to connect to server');
  });
});
