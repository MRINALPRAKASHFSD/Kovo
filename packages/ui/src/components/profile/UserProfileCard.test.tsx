import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { UserProfileCard } from './UserProfileCard';
import { UserProfile } from './types';

const mockUser: UserProfile = {
  id: 'user-alex',
  name: 'Alex Chen',
  title: 'Engineering Lead',
  status: 'active',
  statusLabel: 'Active Offline',
  email: 'alex.chen@acme.com',
  timezone: 'EST (UTC-5) — New York',
  location: 'Brooklyn, NY',
  bio: 'Building core products and micro-frontend structures at Acme.',
  metadata: [
    { id: 'm1', label: 'DEPARTMENT', value: 'Platform Engineering' },
  ],
};

describe('UserProfileCard', () => {
  it('renders user name, role, status badge, fields, and default action', () => {
    const html = renderToString(<UserProfileCard user={mockUser} />);

    expect(html).toContain('Alex Chen');
    expect(html).toContain('Engineering Lead');
    expect(html).toContain('Active Offline');
    expect(html).toContain('EMAIL ADDRESS');
    expect(html).toContain('alex.chen@acme.com');
    expect(html).toContain('TIMEZONE');
    expect(html).toContain('DEPARTMENT');
    expect(html).toContain('Platform Engineering');
    expect(html).toContain('Edit Profile');
  });

  it('renders custom primaryAction when provided', () => {
    const html = renderToString(
      <UserProfileCard
        user={mockUser}
        primaryAction={<button data-testid="custom-btn">Follow</button>}
      />
    );

    expect(html).toContain('data-testid="custom-btn"');
    expect(html).not.toContain('Edit Profile');
  });
});
