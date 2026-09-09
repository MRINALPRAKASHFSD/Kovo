import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { ConnectedAccountsGrid } from './ConnectedAccountsGrid';
import { ConnectedAccount } from './types';

const mockAccounts: ConnectedAccount[] = [
  {
    id: 'gh',
    displayName: 'GitHub Enterprise',
    username: '@alexchen',
    status: 'connected',
  },
  {
    id: 'google',
    displayName: 'Google Workspace',
    email: 'alex@acme.com',
    status: 'connected',
  },
];

describe('ConnectedAccountsGrid', () => {
  it('renders section heading and grid of account cards', () => {
    const html = renderToString(
      <ConnectedAccountsGrid accounts={mockAccounts} />
    );

    expect(html).toContain('Connected Accounts');
    expect(html).toContain('GitHub Enterprise');
    expect(html).toContain('Google Workspace');
  });

  it('renders custom children when provided', () => {
    const html = renderToString(
      <ConnectedAccountsGrid>
        <div data-testid="custom-account">Custom Account</div>
      </ConnectedAccountsGrid>
    );

    expect(html).toContain('data-testid="custom-account"');
  });
});
