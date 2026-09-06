import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { ParticipantGrid } from './ParticipantGrid';

describe('ParticipantGrid', () => {
  it('renders speaker layout with grid slot and featured speaker slot', () => {
    const html = renderToString(
      <ParticipantGrid
        layout="speaker"
        gridSlot={<div data-testid="grid-slot">2x2 Grid Content</div>}
        speakerSlot={<div data-testid="speaker-slot">Featured Speaker</div>}
      />
    );

    expect(html).toContain('2x2 Grid Content');
    expect(html).toContain('Featured Speaker');
    expect(html).toContain('lg:flex-row');
  });

  it('renders gallery grid layout', () => {
    const html = renderToString(
      <ParticipantGrid
        layout="grid"
        gridSlot={<div>Gallery Grid Content</div>}
      />
    );

    expect(html).toContain('Gallery Grid Content');
    expect(html).toContain('lg:grid-cols-3');
  });

  it('renders direct children when provided', () => {
    const html = renderToString(
      <ParticipantGrid>
        <div data-testid="custom-canvas">Custom Canvas Content</div>
      </ParticipantGrid>
    );

    expect(html).toContain('Custom Canvas Content');
  });
});
