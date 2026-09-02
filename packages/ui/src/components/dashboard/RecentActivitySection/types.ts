import React from 'react';

export interface ActivityFeedItem {
  /**
   * Unique identifier for the activity item.
   */
  id: string;
  /**
   * Optional actor details (name, avatar, presence).
   */
  actor?: {
    name: string;
    avatarUrl?: string;
    initials?: string;
    presence?: 'online' | 'offline' | 'busy' | 'away';
  };
  /**
   * Primary title (defaults to actor.name if omitted).
   */
  title?: React.ReactNode;
  /**
   * Subtitle text / channel context (e.g. "#design • Let's review the mockups...").
   */
  subtitle: React.ReactNode;
  /**
   * Relative or absolute timestamp (e.g. "10m ago").
   */
  timestamp?: string;
  /**
   * Unread dot status indicator.
   */
  unread?: boolean;
  /**
   * Custom leading slot (overrides default actor avatar).
   */
  leading?: React.ReactNode;
  /**
   * Custom trailing slot (overrides default timestamp).
   */
  trailing?: React.ReactNode;
  /**
   * Optional click handler for row interaction.
   */
  onClick?: () => void;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

// Backwards-compatible alias
export type ActivityItemData = ActivityFeedItem;
