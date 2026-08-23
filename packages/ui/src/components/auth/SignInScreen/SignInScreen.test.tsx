import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { SignInScreen } from './SignInScreen';

describe('SignInScreen', () => {
  it('renders semantic main landmark with accessible label', () => {
    const html = renderToString(<SignInScreen />);
    expect(html).toContain('<main');
    expect(html).toContain('aria-label="Sign In to KOVO"');
  });

  it('renders official brand header and uppercase title', () => {
    const html = renderToString(<SignInScreen />);
    expect(html).toContain('SIGN IN TO KOVO');
    expect(html).toContain('aria-label="KOVO"');
  });

  it('renders enterprise email field with label and placeholder', () => {
    const html = renderToString(<SignInScreen defaultEmail="user@enterprise.com" />);
    expect(html).toContain('ENTERPRISE EMAIL');
    expect(html).toContain('id="enterprise-email"');
    expect(html).toContain('type="email"');
    expect(html).toContain('value="user@enterprise.com"');
    expect(html).toContain('placeholder="admin@kovo.io"');
  });

  it('renders password field with accessible label and SHOW toggle', () => {
    const html = renderToString(<SignInScreen />);
    expect(html).toContain('PASSWORD');
    expect(html).toContain('id="password"');
    expect(html).toContain('type="password"');
    expect(html).toContain('SHOW');
  });

  it('renders forgot password link and primary submit button', () => {
    const html = renderToString(<SignInScreen />);
    expect(html).toContain('Forgot password?');
    expect(html).toContain('type="submit"');
    expect(html).toContain('Sign In');
  });

  it('renders OR divider and enterprise alternative sign-in options', () => {
    const html = renderToString(<SignInScreen />);
    expect(html).toContain('role="separator"');
    expect(html).toContain('OR');
    expect(html).toContain('Continue with Google');
    expect(html).toContain('Single Sign-On (SAML)');
  });

  it('renders account creation footer link', () => {
    const html = renderToString(<SignInScreen />);
    expect(html).toContain('New to the platform?');
    expect(html).toContain('Create an account');
  });

  it('renders error notice when errorMessage is provided', () => {
    const html = renderToString(
      <SignInScreen errorMessage="Invalid credentials. Please try again." />
    );
    expect(html).toContain('role="alert"');
    expect(html).toContain('Invalid credentials. Please try again.');
  });

  it('handles loading state properly', () => {
    const html = renderToString(<SignInScreen isLoading={true} />);
    expect(html).toContain('Signing In...');
    expect(html).toContain('disabled=""');
  });
});
