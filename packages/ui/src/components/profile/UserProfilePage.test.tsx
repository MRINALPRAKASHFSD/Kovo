import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { UserProfilePage } from './UserProfilePage';

describe('UserProfilePage', () => {
  it('renders leftSlot and rightSlot in 2-column layout', () => {
    const html = renderToString(
      <UserProfilePage
        leftSlot={<div data-testid="left-card">Profile Left</div>}
        rightSlot={<div data-testid="right-grid">Accounts and Activity</div>}
      />
    );

    expect(html).toContain('data-testid="left-card"');
    expect(html).toContain('data-testid="right-grid"');
    expect(html).toContain('lg:grid-cols-[380px_1fr]');
  });
});
