import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { renderToString } from 'react-dom/server';
import { ResendStatus } from './ResendStatus';

describe('ResendStatus', () => {
  it('renders countdown state with specified seconds', () => {
    const html = renderToString(
      <ResendStatus status="countdown" countdownSeconds={58} />
    );

    expect(html).toContain('Didn&#x27;t receive code?');
    expect(html).toContain('Resend in');
    expect(html).toContain('58s');
    expect(html).toContain('text-[#7C65FF]');
  });

  it('renders available state with interactive button', () => {
    const html = renderToString(
      <ResendStatus status="available" onResend={vi.fn()} />
    );

    expect(html).toContain('type="button"');
    expect(html).toContain('Resend Code');
  });

  it('renders sending state with status indicator', () => {
    const html = renderToString(<ResendStatus status="sending" />);

    expect(html).toContain('Sending...');
  });

  it('renders disabled button when disabled is true in available state', () => {
    const html = renderToString(
      <ResendStatus status="available" disabled={true} />
    );

    expect(html).toContain('disabled=""');
  });
});
