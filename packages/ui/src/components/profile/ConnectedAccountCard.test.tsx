import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { ConnectedAccountCard } from './ConnectedAccountCard';
import { ConnectedAccount } from './types';

const mockAccount: ConnectedAccount = {
  id: 'acc-gh',
  displayName: 'GitHub Enterprise',
  username: '@alexchen-acme',
  status: 'connected',
  icon: <span data-testid="gh-icon">GH</span>,
};

describe('ConnectedAccountCard', () => {
  it('renders provider display name, username, icon, and Connected status', () => {
    const html = renderToString(<ConnectedAccountCard account={mockAccount} />);

    expect(html).toContain('GitHub Enterprise');
    expect(html).toContain('@alexchen-acme');
    expect(html).toContain('data-testid="gh-icon"');
    expect(html).toContain('Connected');
    expect(html).toContain('text-[#10B981]');
    expect(html).toContain('role="button"');
  });

  it('renders Inactive status and fallback text for unlinked accounts', () => {
    const inactiveAccount: ConnectedAccount = {
      id: 'acc-slack',
      displayName: 'Slack Link',
      status: 'inactive',
    };

    const html = renderToString(
      <ConnectedAccountCard account={inactiveAccount} />
    );

    expect(html).toContain('Slack Link');
    expect(html).toContain('Not linked');
    expect(html).toContain('Inactive');
  });
});
