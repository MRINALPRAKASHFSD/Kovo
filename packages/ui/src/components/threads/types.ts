import React from 'react';

export interface ThreadAuthor {
  /**
   * Unique author identifier.
   */
  id?: string;
  /**
   * Display name of the author (e.g. "Daniella Vance").
   */
  name: string;
  /**
   * Optional author avatar image URL.
   */
  avatarUrl?: string;
  /**
   * Optional fallback initials (e.g. "DV").
   */
  initials?: string;
  /**
   * Optional online presence status.
   */
  presence?: 'online' | 'offline' | 'busy' | 'away';
}

export interface ThreadMessageData {
  /**
   * Unique message identifier.
   */
  id: string;
  /**
   * Message author details.
   */
  author: ThreadAuthor;
  /**
   * Message text or rich content.
   */
  content: React.ReactNode;
  /**
   * Message timestamp (e.g. "10:24 AM").
   */
  timestamp: string;
  /**
   * Optional reactions attached to this message.
   */
  reactions?: Array<{
    emoji: string;
    count: number;
    reacted?: boolean;
  }>;
}

export interface ThreadData {
  /**
   * Unique thread identifier.
   */
  id: string;
  /**
   * Optional thread topic/title (e.g. "Notification Center Redesign").
   */
  title?: string;
  /**
   * Associated channel name if originated from a channel (e.g. "engineering").
   */
  channel?: string;
  /**
   * Thread author / initiator.
   */
  author: ThreadAuthor;
  /**
   * Snippet / text preview of the initial message.
   */
  preview?: string;
  /**
   * Total number of replies in this thread.
   */
  replyCount: number;
  /**
   * Relative or formatted time of last activity (e.g. "10m ago").
   */
  lastActivity: string;
  /**
   * Whether the thread has unread replies for the current user.
   */
  unread?: boolean;
  /**
   * Teammates participating in this thread.
   */
  participants?: ThreadAuthor[];
  /**
   * Whether the thread has been marked as resolved.
   */
  resolved?: boolean;
  /**
   * Whether the thread is pinned.
   */
  pinned?: boolean;
  /**
   * Whether the thread is locked to further replies.
   */
  locked?: boolean;
  /**
   * Optional metadata slot (e.g. badges, tags, channel pills).
   */
  metadata?: React.ReactNode;
  /**
   * Optional custom footer slot (overrides default reply count indicator).
   */
  footer?: React.ReactNode;
  /**
   * Chronological messages belonging to this thread.
   */
  messages?: ThreadMessageData[];
}
