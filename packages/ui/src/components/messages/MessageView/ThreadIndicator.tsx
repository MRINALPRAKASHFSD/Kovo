'use client';

import React from 'react';

export interface ThreadIndicatorProps {
  /**
   * Number of replies in the thread.
   */
  replyCount: number;
  /**
   * Optional timestamp or text (e.g. "Last reply today at 10:25 AM").
   */
  lastReplyText?: string;
  /**
   * Click handler to open the thread panel.
   */
  onClick?: () => void;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Clickable thread reply counter indicator.
 * Displays reply bubble icon and reply count in brand accent style.
 */
export function ThreadIndicator({
  replyCount,
  lastReplyText,
  onClick,
  className = '',
}: ThreadIndicatorProps) {
  if (replyCount <= 0) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`View thread with ${replyCount} ${replyCount === 1 ? 'reply' : 'replies'}`}
      className={`inline-flex items-center gap-1.5 mt-2 text-xs font-semibold text-[#7C65FF] hover:text-[#9A87FF] transition-colors group select-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7C65FF] rounded px-1.5 py-0.5 -ml-1.5 hover:bg-[#241F47]/30 ${className}`}
    >
      {/* Speech / Thread bubble icon */}
      <svg
        className="w-3.5 h-3.5 flex-shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2.5"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>

      <span className="group-hover:underline">
        {replyCount} {replyCount === 1 ? 'reply' : 'replies'}
      </span>

      {lastReplyText && (
        <span className="text-[11px] font-normal text-[#6B7280] ml-1">
          {lastReplyText}
        </span>
      )}
    </button>
  );
}
