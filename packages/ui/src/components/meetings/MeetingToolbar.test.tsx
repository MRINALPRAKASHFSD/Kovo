import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { MeetingControlButton } from './MeetingControlButton';
import { MeetingControlsGroup } from './MeetingControlsGroup';
import { MeetingFooter } from './MeetingFooter';
import { MeetingToolbar } from './MeetingToolbar';
import { VideoCallPage } from './VideoCallPage';

describe('MeetingControlButton', () => {
  it('renders default button styling', () => {
    const html = renderToString(
      <MeetingControlButton
        icon={<span>Mic</span>}
        ariaLabel="Toggle Microphone"
      />
    );

    expect(html).toContain('aria-label="Toggle Microphone"');
    expect(html).toContain('bg-[#1E1D2A]');
  });

  it('renders active purple styling and aria-pressed', () => {
    const html = renderToString(
      <MeetingControlButton
        icon={<span>Chat</span>}
        variant="active"
        ariaLabel="Chat"
      />
    );

    expect(html).toContain('aria-pressed="true"');
    expect(html).toContain('bg-[#7C65FF]');
  });

  it('renders danger red variant with label', () => {
    const html = renderToString(
      <MeetingControlButton
        icon={<span>Leave</span>}
        label="Leave Call"
        variant="danger"
      />
    );

    expect(html).toContain('Leave Call');
    expect(html).toContain('bg-[#EF4444]');
  });
});

describe('MeetingControlsGroup', () => {
  it('renders controls group with toolbar role', () => {
    const html = renderToString(
      <MeetingControlsGroup>
        <button type="button">Action</button>
      </MeetingControlsGroup>
    );

    expect(html).toContain('role="toolbar"');
    expect(html).toContain('Action');
  });
});

describe('MeetingFooter', () => {
  it('renders participant count label', () => {
    const html = renderToString(<MeetingFooter count={5} />);
    expect(html).toContain('5 People connected');
    expect(html).toContain('role="status"');
  });
});

describe('MeetingToolbar', () => {
  it('renders start, center, and end regions', () => {
    const html = renderToString(
      <MeetingToolbar
        start={<span data-testid="start">5 People</span>}
        center={<span data-testid="center">Controls</span>}
        end={<span data-testid="end">Leave Call</span>}
      />
    );

    expect(html).toContain('5 People');
    expect(html).toContain('Controls');
    expect(html).toContain('Leave Call');
  });
});

describe('VideoCallPage', () => {
  it('renders header, video canvas children, and toolbar slots', () => {
    const html = renderToString(
      <VideoCallPage
        header={<div data-testid="header">Header</div>}
        toolbar={<div data-testid="toolbar">Toolbar</div>}
      >
        <div data-testid="canvas">Canvas Content</div>
      </VideoCallPage>
    );

    expect(html).toContain('Header');
    expect(html).toContain('Canvas Content');
    expect(html).toContain('Toolbar');
  });
});
