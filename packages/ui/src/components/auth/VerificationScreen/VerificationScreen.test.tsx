import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { renderToString } from 'react-dom/server';
import { VerificationScreen } from './VerificationScreen';

describe('VerificationScreen', () => {
  it('renders brand header, title, and recipient email', () => {
    const html = renderToString(<VerificationScreen email="user@acme.corp" />);

    expect(html).toContain('Verify your email');
    expect(html).toContain('user@acme.corp');
    expect(html).toContain('We sent a secure code to');
  });

  it('renders 6 segmented OTP inputs and Verify & Continue button', () => {
    const html = renderToString(<VerificationScreen />);

    expect(html).toContain('role="group"');
    expect(html).toContain('aria-label="Verification code"');
    expect(html).toContain('Verify &amp; Continue');

    const inputCount = (html.match(/type="text"/g) || []).length;
    expect(inputCount).toBe(6);
  });

  it('renders prefilled controlled value across inputs', () => {
    const html = renderToString(<VerificationScreen value="842" onChange={vi.fn()} />);

    expect(html).toContain('value="8"');
    expect(html).toContain('value="4"');
    expect(html).toContain('value="2"');
  });

  it('renders resend status component with countdown', () => {
    const html = renderToString(
      <VerificationScreen resendStatus="countdown" countdownSeconds={58} />
    );

    expect(html).toContain('Didn&#x27;t receive code?');
    expect(html).toContain('58s');
  });

  it('renders error notice when errorMessage is provided', () => {
    const html = renderToString(
      <VerificationScreen errorMessage="Invalid verification code. Please try again." />
    );

    expect(html).toContain('role="alert"');
    expect(html).toContain('Invalid verification code. Please try again.');
  });

  it('renders loading state with spinner', () => {
    const html = renderToString(<VerificationScreen isLoading={true} />);

    expect(html).toContain('Verifying...');
    expect(html).toContain('disabled=""');
  });
});
