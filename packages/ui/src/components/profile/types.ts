import React from 'react';

export type UserStatus = 'active' | 'offline' | 'away' | 'busy' | (string & {});

export interface ProfileMetadata {
  id: string;
  label: string;
  value: React.ReactNode;
}

export interface UserProfile {
  id: string;
  name: string;
  title: string;
  avatarUrl?: string;
  status?: UserStatus;
  statusLabel?: string;
  email?: string;
  timezone?: string;
  location?: string;
  bio?: string;
  metadata?: ProfileMetadata[];
}

export type ConnectedAccountStatus =
  | 'connected'
  | 'inactive'
  | 'pending'
  | 'expired'
  | (string & {});

export interface ConnectedAccount {
  id: string;
  displayName: string;
  username?: string;
  email?: string;
  status: ConnectedAccountStatus;
  icon?: React.ReactNode;
}

export interface UserActivity {
  id: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  timestamp: string;
  icon?: React.ReactNode;
  href?: string;
}

/**
 * Backward-compatibility alias for UserActivity.
 */
export type Contribution = UserActivity;
