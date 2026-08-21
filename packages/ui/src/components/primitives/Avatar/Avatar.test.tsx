import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { Avatar } from './Avatar';
import { PresenceIndicator } from './PresenceIndicator';

describe('PresenceIndicator', () => {
  it('renders online status correctly', () => {
    const html = renderToString(<PresenceIndicator status="online" />);
    expect(html).toContain('aria-label="Online"');
    expect(html).toContain('bg-[#10B981]');
  });

  it('renders offline status correctly', () => {
    const html = renderToString(<PresenceIndicator status="offline" />);
    expect(html).toContain('aria-label="Offline"');
    expect(html).toContain('bg-[#6B7280]');
  });
});

describe('Avatar', () => {
  it('renders initials when src is not provided', () => {
    const html = renderToString(<Avatar name="Daniella Vance" />);
    expect(html).toContain('DV');
  });

  it('renders presence indicator when specified', () => {
    const html = renderToString(<Avatar name="Marcus Aurelius" presence="online" />);
    expect(html).toContain('aria-label="Online"');
    expect(html).toContain('bg-[#10B981]');
  });

  it('renders accessible name attribute', () => {
    const html = renderToString(<Avatar name="Alex Mercer" />);
    expect(html).toContain('aria-label="Alex Mercer"');
  });
});
