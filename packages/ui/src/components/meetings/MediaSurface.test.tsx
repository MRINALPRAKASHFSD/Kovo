import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { MediaSurface } from './MediaSurface';
import { ActiveSpeakerBadge } from './ActiveSpeakerBadge';

describe('MediaSurface', () => {
  it('renders image variant when src is provided', () => {
    const html = renderToString(
      <MediaSurface
        variant="image"
        src="https://example.com/avatar.jpg"
        alt="Marcus feed"
      />
    );

    expect(html).toContain('src="https://example.com/avatar.jpg"');
    expect(html).toContain('alt="Marcus feed"');
  });

  it('renders initials fallback when avatar variant is active', () => {
    const html = renderToString(
      <MediaSurface variant="avatar" avatarName="Marcus Aurelius" />
    );

    expect(html).toContain('MA');
  });

  it('renders screen share indicator for screen variant', () => {
    const html = renderToString(<MediaSurface variant="screen" />);
    expect(html).toContain('Screen Share Presentation');
  });
});

describe('ActiveSpeakerBadge', () => {
  it('renders default ACTIVE SPEAKER label and soundwaves icon', () => {
    const html = renderToString(<ActiveSpeakerBadge />);
    expect(html).toContain('ACTIVE SPEAKER');
    expect(html).toContain('role="status"');
    expect(html).toContain('bg-[#7C65FF]');
  });

  it('renders custom badge label', () => {
    const html = renderToString(<ActiveSpeakerBadge label="PRIMARY SPEAKER" />);
    expect(html).toContain('PRIMARY SPEAKER');
  });
});
