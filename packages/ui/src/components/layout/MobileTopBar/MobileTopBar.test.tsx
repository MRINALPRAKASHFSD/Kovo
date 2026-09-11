import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { MobileTopBar } from './MobileTopBar';

describe('MobileTopBar', () => {
  it('renders workspace name and notification button', () => {
    const html = renderToString(<MobileTopBar workspaceName="Acme Workspace" />);
    expect(html).toContain('Acme Workspace');
    expect(html).toContain('aria-label="View notifications"');
  });

  it('renders title and leading slot overriding default logo/name', () => {
    const html = renderToString(
      <MobileTopBar
        leading={<button id="back-btn">Back</button>}
        title="Channels"
      />
    );
    expect(html).toContain('id="back-btn"');
    expect(html).toContain('Channels');
  });

  it('renders unread notification dot when hasNotifications is true', () => {
    const html = renderToString(<MobileTopBar hasNotifications={true} />);
    expect(html).toContain('aria-label="Unread notifications"');
  });

  it('renders custom actions slot replacing default controls', () => {
    const html = renderToString(
      <MobileTopBar actions={<button id="custom-action">Custom Action</button>} />
    );
    expect(html).toContain('id="custom-action"');
    expect(html).not.toContain('aria-label="View notifications"');
  });

  it('renders custom avatar when passed', () => {
    const html = renderToString(
      <MobileTopBar avatar={<span id="custom-avatar">Custom Avatar</span>} />
    );
    expect(html).toContain('id="custom-avatar"');
  });
});
