import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { PasswordField } from './PasswordField';

describe('PasswordField', () => {
  it('renders input with password type by default', () => {
    const html = renderToString(<PasswordField id="test-pwd" label="PASSWORD" />);
    expect(html).toContain('type="password"');
    expect(html).toContain('id="test-pwd"');
    expect(html).toContain('for="test-pwd"');
    expect(html).toContain('PASSWORD');
  });

  it('renders SHOW toggle button with accessible aria-label and type="button"', () => {
    const html = renderToString(<PasswordField id="test-pwd" />);
    expect(html).toContain('type="button"');
    expect(html).toContain('aria-label="Show password"');
    expect(html).toContain('aria-controls="test-pwd"');
    expect(html).toContain('SHOW');
  });

  it('renders error message and aria-describedby when error prop is present', () => {
    const html = renderToString(
      <PasswordField id="test-pwd" error="Password is required" />
    );
    expect(html).toContain('aria-invalid="true"');
    expect(html).toContain('aria-describedby="test-pwd-error"');
    expect(html).toContain('id="test-pwd-error"');
    expect(html).toContain('role="alert"');
    expect(html).toContain('Password is required');
  });

  it('respects disabled state', () => {
    const html = renderToString(<PasswordField disabled />);
    expect(html).toContain('disabled=""');
  });
});
