import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { PasswordStrengthIndicator } from './PasswordStrengthIndicator';

describe('PasswordStrengthIndicator', () => {
  it('renders live status region with polite announcements', () => {
    const html = renderToString(<PasswordStrengthIndicator />);
    expect(html).toContain('role="status"');
    expect(html).toContain('aria-live="polite"');
    expect(html).toContain('Password strength');
    expect(html).toContain('Not evaluated');
  });

  it('renders 1 active segment and Weak label when strength is weak', () => {
    const html = renderToString(<PasswordStrengthIndicator strength="weak" />);
    expect(html).toContain('Weak');
    expect(html).toContain('bg-red-500');
    expect(html).toContain('text-red-400');
  });

  it('renders 2 active segments and Fair label when strength is fair', () => {
    const html = renderToString(<PasswordStrengthIndicator strength="fair" />);
    expect(html).toContain('Fair');
    expect(html).toContain('bg-amber-500');
    expect(html).toContain('text-amber-400');
  });

  it('renders 3 active segments and Good label when strength is good', () => {
    const html = renderToString(<PasswordStrengthIndicator strength="good" />);
    expect(html).toContain('Good');
    expect(html).toContain('bg-blue-500');
    expect(html).toContain('text-blue-400');
  });

  it('renders 4 active segments and Strong label when strength is strong', () => {
    const html = renderToString(<PasswordStrengthIndicator strength="strong" />);
    expect(html).toContain('Strong');
    expect(html).toContain('bg-emerald-500');
    expect(html).toContain('text-emerald-400');
  });
});
