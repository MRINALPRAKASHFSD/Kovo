import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { CreateAccountScreen } from './CreateAccountScreen';

describe('CreateAccountScreen', () => {
  it('renders semantic main landmark with accessible label', () => {
    const html = renderToString(<CreateAccountScreen />);
    expect(html).toContain('<main');
    expect(html).toContain('aria-label="Create your KOVO Account"');
  });

  it('renders brand header with CREATE AN ACCOUNT title', () => {
    const html = renderToString(<CreateAccountScreen />);
    expect(html).toContain('CREATE AN ACCOUNT');
    expect(html).toContain('aria-label="KOVO"');
  });

  it('renders Full Name and Work Email fields', () => {
    const html = renderToString(
      <CreateAccountScreen
        defaultName="Jane Doe"
        defaultEmail="jane@enterprise.com"
      />
    );
    expect(html).toContain('FULL NAME');
    expect(html).toContain('id="full-name"');
    expect(html).toContain('value="Jane Doe"');
    expect(html).toContain('WORK EMAIL');
    expect(html).toContain('id="work-email"');
    expect(html).toContain('value="jane@enterprise.com"');
  });

  it('renders Password and Confirm Password fields with SHOW toggles', () => {
    const html = renderToString(<CreateAccountScreen />);
    expect(html).toContain('id="register-password"');
    expect(html).toContain('id="confirm-password"');
    expect(html).toContain('PASSWORD');
    expect(html).toContain('CONFIRM PASSWORD');
    expect(html).toContain('SHOW');
  });

  it('renders presentational password strength indicator', () => {
    const html = renderToString(
      <CreateAccountScreen passwordStrength="strong" />
    );
    expect(html).toContain('Password strength');
    expect(html).toContain('Strong');
    expect(html).toContain('bg-emerald-500');
  });

  it('renders Terms of Service and Privacy Policy checkbox with clickable links', () => {
    const html = renderToString(
      <CreateAccountScreen
        termsHref="/terms-of-service"
        privacyHref="/privacy-policy"
      />
    );
    expect(html).toContain('type="checkbox"');
    expect(html).toContain('id="terms-checkbox"');
    expect(html).toContain('href="/terms-of-service"');
    expect(html).toContain('Terms of Service');
    expect(html).toContain('href="/privacy-policy"');
    expect(html).toContain('Privacy Policy');
  });

  it('renders chunky 48px primary button and sign-in footer link', () => {
    const html = renderToString(<CreateAccountScreen signInHref="/login" />);
    expect(html).toContain('type="submit"');
    expect(html).toContain('Create Account');
    expect(html).toContain('Already have an account?');
    expect(html).toContain('href="/login"');
    expect(html).toContain('Sign in');
  });

  it('renders error notice when errorMessage is provided', () => {
    const html = renderToString(
      <CreateAccountScreen errorMessage="Email already in use." />
    );
    expect(html).toContain('role="alert"');
    expect(html).toContain('Email already in use.');
  });

  it('reflects loading state properly', () => {
    const html = renderToString(<CreateAccountScreen isLoading={true} />);
    expect(html).toContain('Creating Account...');
    expect(html).toContain('disabled=""');
  });
});
