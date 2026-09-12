'use client';

import React from 'react';
import { Card } from '../primitives/Card';
import { ThreadData } from './types';

export type ThreadListItemVariant = 'default' | 'compact';

export interface ThreadListItemProps {
  /**
   * Thread data object.
   */
  thread: ThreadData;
  /**
   * Whether this thread is currently selected/active.
   */
  selected?: boolean;
  /**
   * Density variant: 'default' or 'compact'.
   */
  variant?: ThreadListItemVariant;
  /**
   * Custom avatar slot (overrides default initials/avatar).
   */
  avatar?: React.ReactNode;
  /**
   * Optional extra metadata node.
   */
  metadata?: React.ReactNode;
  /**
   * Optional custom footer node (overrides default reply count indicator).
   */
  footer?: React.ReactNode;
  /**
   * Callback fired when clicked with the thread object.
   */
  onClick?: (thread: ThreadData) => void;
  /**
   * Callback fired when selected with thread ID.
   */
  onSelect?: (threadId: string) => void;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Presentational card item representing a thread in sidebars, inboxes, or search results.
 */
export function ThreadListItem({
  thread,
  selected = false,
  variant = 'default',
  avatar,
  metadata,
  footer,
  onClick,
  onSelect,
  className = '',
}: ThreadListItemProps) {
  const handleClick = () => {
    onClick?.(thread);
    onSelect?.(thread.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const authorInitial =
    thread.author.initials ||
    thread.author.name.trim().charAt(0).toUpperCase() ||
    '?';

  const defaultAvatar = thread.author.avatarUrl ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={thread.author.avatarUrl}
      alt={thread.author.name}
      className="w-7 h-7 rounded-full object-cover"
    />
  ) : (
    <div className="w-7 h-7 rounded-full bg-[#282736] border border-white/10 flex items-center justify-center text-xs font-semibold text-white select-none">
      {authorInitial}
    </div>
  );

  const defaultFooter = (
    <div className="flex items-center gap-1.5 text-xs font-medium text-[#7C65FF] select-none">
      <svg
        className="w-3.5 h-3.5 flex-shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
      <span>
        {`${thread.replyCount} ${thread.replyCount === 1 ? 'reply' : 'replies'}`}
      </span>
    </div>
  );

  return (
    <Card
      role="button"
      tabIndex={0}
      aria-selected={selected}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`transition-all cursor-pointer select-none ${
        variant === 'compact' ? 'p-2.5 sm:p-3 rounded-xl' : 'p-3.5 sm:p-4 rounded-2xl'
      } ${
        selected
          ? 'border-[#7C65FF] bg-[#1A182E] shadow-lg shadow-[#7C65FF]/10'
          : 'border-[#262536] bg-[#151420] hover:border-[#7C65FF]/40 hover:bg-[#181628]'
      } ${className}`}
    >
      {/* Top Row: Avatar + Author + Timestamp */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex-shrink-0">
            {avatar !== undefined ? avatar : defaultAvatar}
          </div>
          <span className="text-sm font-bold text-white tracking-tight truncate">
            {thread.author.name}
          </span>
          {metadata && <div className="flex-shrink-0">{metadata}</div>}
        </div>

        <span className="text-xs text-[#8898AA] flex-shrink-0 font-normal">
          {thread.lastActivity}
        </span>
      </div>

      {/* Snippet / Preview Text */}
      {thread.preview && (
        <p className="text-xs sm:text-sm text-[#C5C4D4] leading-relaxed line-clamp-2 mb-2.5 font-normal">
          {thread.preview}
        </p>
      )}

      {/* Footer Row: Reply Count / Metadata */}
      {footer !== undefined ? footer : defaultFooter}
    </Card>
  );
}
