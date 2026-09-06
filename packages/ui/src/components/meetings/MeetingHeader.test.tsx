import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { MeetingContextBar } from './MeetingContextBar';
import { MeetingHeader } from './MeetingHeader';
import { MeetingSession } from './types';

const mockSession: MeetingSession = {
  id: 'huddle-123',
  title: 'Engineering Standup',
  duration: '45:12',
  recording: true,
  encrypted: true,
  securityLabel: 'Secure Huddle',
  participantCount: 5,
  layout: 'speaker',
};

describe('MeetingContextBar', () => {
  it('renders recording indicator, duration, and secure badge', () => {
    const html = renderToString(
      <MeetingContextBar
        isRecording={true}
        duration="45:12"
        isSecure={true}
        secureLabel="Secure Huddle"
      />
    );

    expect(html).toContain('REC');
    expect(html).toContain('45:12');
    expect(html).toContain('Secure Huddle');
    expect(html).toContain('role="status"');
  });
});

describe('MeetingHeader', () => {
  it('renders title, recording status, duration, and secure badge from session', () => {
    const html = renderToString(
      <MeetingHeader session={mockSession} />
    );

    expect(html).toContain('Engineering Standup');
    expect(html).toContain('REC');
    expect(html).toContain('45:12');
    expect(html).toContain('Secure Huddle');
  });

  it('renders custom actions slot', () => {
    const html = renderToString(
      <MeetingHeader
        title="Design Review"
        actions={<button type="button">Settings</button>}
      />
    );

    expect(html).toContain('Design Review');
    expect(html).toContain('Settings');
  });
});
