import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { ParticipantOverlay } from './ParticipantOverlay';
import { ParticipantTile } from './ParticipantTile';
import { ActiveSpeakerBadge } from './ActiveSpeakerBadge';
import { MeetingParticipant } from './types';

const mockParticipant: MeetingParticipant = {
  id: 'user-alex',
  name: 'Alex Mercer',
  isCurrentUser: true,
  media: { camera: true, microphone: true },
  state: { speaking: true },
};

describe('ParticipantOverlay', () => {
  it('renders participant name and current user tag', () => {
    const html = renderToString(
      <ParticipantOverlay
        name="Alex Mercer"
        isCurrentUser={true}
        isMuted={false}
      />
    );

    expect(html).toContain('Alex Mercer (You)');
  });

  it('renders muted icon when isMuted is true', () => {
    const html = renderToString(
      <ParticipantOverlay
        name="Daniella Vance"
        isMuted={true}
      />
    );

    expect(html).toContain('Daniella Vance');
    expect(html).toContain('aria-label="Muted"');
    expect(html).toContain('text-[#EF4444]');
  });

  it('renders slots in appropriate positions', () => {
    const html = renderToString(
      <ParticipantOverlay
        topLeft={<ActiveSpeakerBadge />}
        topRight={<span data-testid="pin">Pinned</span>}
      />
    );

    expect(html).toContain('ACTIVE SPEAKER');
    expect(html).toContain('Pinned');
  });
});

describe('ParticipantTile', () => {
  it('renders active speaker border and aria-current attribute', () => {
    const html = renderToString(
      <ParticipantTile
        participant={mockParticipant}
        isActiveSpeaker={true}
        overlay={<div data-testid="overlay">Overlay</div>}
        media={<div data-testid="media">Media</div>}
      />
    );

    expect(html).toContain('border-[#7C65FF]');
    expect(html).toContain('aria-current="true"');
    expect(html).toContain('Overlay');
    expect(html).toContain('Media');
  });

  it('renders inactive border when not speaking', () => {
    const html = renderToString(
      <ParticipantTile
        participant={{
          ...mockParticipant,
          state: { speaking: false },
        }}
        isActiveSpeaker={false}
      />
    );

    expect(html).toContain('border-[#1E1D2A]');
    expect(html).not.toContain('aria-current="true"');
  });
});
