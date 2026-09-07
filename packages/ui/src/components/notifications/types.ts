import React from 'react';

export type NotificationCategory =
  | 'mention'
  | 'thread'
  | 'reaction'
  | 'workspace'
  | (string & {});

export interface NotificationActor {
  name: string;
  avatarUrl?: string;
  presence?: 'online' | 'offline';
}

export interface NotificationData {
  id: string;
  category: NotificationCategory;
  actor?: NotificationActor;
  title: React.ReactNode;
  description?: string;
  unread?: boolean;
  timestamp: string;
  href?: string;
  metadata?: React.ReactNode;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

export interface NotificationGroup {
  id: string;
  title: string;
  notifications: NotificationData[];
}

export interface NotificationFilterTab {
  value: string;
  label: string;
  count?: number;
}
