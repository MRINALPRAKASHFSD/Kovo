import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { ContributionsCard } from './ContributionsCard';
import { UserActivity } from './types';

const mockActivities: UserActivity[] = [
  {
    id: 'act-1',
    title: 'Merged PR #412 in acme-kovo-front',
    description: 'Implemented keyboard-friendly accessibility patterns',
    timestamp: '2h ago',
  },
  {
    id: 'act-2',
    title: 'Published a new telemetry spec document',
    description: 'Shared draft for feedback',
    timestamp: '1d ago',
  },
];

describe('ContributionsCard', () => {
  it('renders section title and list of activities', () => {
    const html = renderToString(
      <ContributionsCard contributions={mockActivities} />
    );

    expect(html).toContain('Recent Contributions');
    expect(html).toContain('Merged PR #412 in acme-kovo-front');
    expect(html).toContain('Published a new telemetry spec document');
  });

  it('supports custom title string', () => {
    const html = renderToString(
      <ContributionsCard
        title="Workspace Activity"
        contributions={mockActivities}
      />
    );

    expect(html).toContain('Workspace Activity');
  });
});
