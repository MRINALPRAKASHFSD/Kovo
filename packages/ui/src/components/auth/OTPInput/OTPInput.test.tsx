import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { renderToString } from 'react-dom/server';
import { OTPInput } from './OTPInput';

describe('OTPInput', () => {
  it('renders 6 segmented digit inputs by default with accessible attributes', () => {
    const html = renderToString(<OTPInput value="" onChange={vi.fn()} />);

    expect(html).toContain('role="group"');
    expect(html).toContain('aria-label="Verification code"');
    expect(html).toContain('aria-label="Digit 1 of 6"');
    expect(html).toContain('aria-label="Digit 6 of 6"');
    expect(html).toContain('inputMode="numeric"');
    expect(html).toContain('pattern="[0-9]*"');
    expect(html).toContain('autoComplete="one-time-code"');

    const inputCount = (html.match(/type="text"/g) || []).length;
    expect(inputCount).toBe(6);
  });

  it('derives digit values from a single controlled string', () => {
    const html = renderToString(<OTPInput value="842" onChange={vi.fn()} />);

    expect(html).toContain('value="8"');
    expect(html).toContain('value="4"');
    expect(html).toContain('value="2"');
  });

  it('respects custom length prop', () => {
    const html = renderToString(<OTPInput value="1234" length={4} onChange={vi.fn()} />);

    const inputCount = (html.match(/type="text"/g) || []).length;
    expect(inputCount).toBe(4);
    expect(html).toContain('aria-label="Digit 4 of 4"');
  });

  it('disables all inputs when disabled is true', () => {
    const html = renderToString(<OTPInput value="" disabled onChange={vi.fn()} />);

    const disabledMatches = (html.match(/disabled=""/g) || []).length;
    expect(disabledMatches).toBe(6);
  });
});
