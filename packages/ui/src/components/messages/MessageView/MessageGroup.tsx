'use client';

import React from 'react';

export interface MessageGroupProps {
  /**
   * Author avatar element (image, avatar component, or initials).
   */
  avatar: React.ReactNode;
  /**
   * Author display name (e.g. "Daniella Vance").
   */
  author: string;
  /**
   * Message timestamp (e.g. "10:14 AM").
   */
  timestamp: string;
  /**
   * Message content, code blocks, reactions, and thread links.
   */
  children: React.ReactNode;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Groups consecutive messages from a single author.
 * Displays author avatar, name header, timestamp, and message stack.
 */
export function MessageGroup({
  avatar,
  author,
  timestamp,
  children,
  className = '',
}: MessageGroupProps) {
  return (
    <div
      className={`flex items-start gap-3 sm:gap-3.5 p-1 sm:p-2 -mx-1 sm:-mx-2 rounded-xl transition-colors hover:bg-white/[0.02] group/group ${className}`}
    >
      {/* Author Avatar */}
      <div className="flex-shrink-0 pt-0.5 select-none">
        {avatar}
      </div>

      {/* Message Group Content */}
      <div className="flex-1 min-w-0">
        {/* Header: Author Name & Timestamp */}
        <div className="flex items-baseline gap-2 mb-1 select-none">
          <span className="text-sm font-semibold text-white tracking-tight">
            {author}
          </span>
          <span className="text-[11px] text-[#6B7280] font-normal">
            {timestamp}
          </span>
        </div>

        {/* Message Items Stack */}
        <div className="space-y-1.5 min-w-0">
          {children}
        </div>
      </div>
    </div>
  );
}
