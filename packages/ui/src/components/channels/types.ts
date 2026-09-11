import React from 'react';

export interface ChannelData {
  /**
   * Unique channel identifier (e.g. "general", "engineering").
   */
  id: string;
  /**
   * Display name of the channel.
   */
  name: string;
  /**
   * Optional description or topic (e.g. "Primary development space").
   */
  description?: React.ReactNode;
  /**
   * Number of unread messages.
   */
  unreadCount?: number;
  /**
   * Whether the channel is starred/favorited.
   */
  starred?: boolean;
  /**
   * Whether the channel is private.
   */
  isPrivate?: boolean;
  /**
   * Whether the channel is archived.
   */
  isArchived?: boolean;
  /**
   * Whether notifications are muted.
   */
  isMuted?: boolean;
  /**
   * Total number of members.
   */
  memberCount?: number;
  /**
   * Optional custom icon node (overrides default hash icon).
   */
  icon?: React.ReactNode;
  /**
   * Optional custom metadata badge/node (e.g. 🔒 Private, 🔕 Muted, 👥 128 members).
   */
  metadata?: React.ReactNode;
}

export interface ChannelSectionData {
  /**
   * Unique section identifier (e.g. "starred", "all-channels").
   */
  id: string;
  /**
   * Section display heading (e.g. "STARRED", "ALL CHANNELS").
   */
  title: React.ReactNode;
  /**
   * List of channels belonging to this section.
   */
  channels: ChannelData[];
  /**
   * Optional section action button or menu (e.g. "See all", "Manage").
   */
  action?: React.ReactNode;
  /**
   * Whether this section can be collapsed.
   */
  collapsible?: boolean;
  /**
   * Initial or controlled collapsed state.
   */
  collapsed?: boolean;
}
