'use client';

import React from 'react';

export type MessageAppearance =
  | 'incoming'
  | 'outgoing'
  | 'system'
  | 'bot'
  | 'announcement';

export interface MessageBubbleProps {
  /**
   * Content inside the message bubble (text, code, inline links, etc.).
   */
  children?: React.ReactNode;
  /**
   * Visual appearance style. Defaults to 'incoming'.
   */
  appearance?: MessageAppearance;
  /**
   * Optional author name rendered inside speech card headers.
   */
  author?: string;
  /**
   * Optional timestamp rendered inside speech card headers.
   */
  timestamp?: string;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Presentational message content bubble supporting incoming, outgoing cards, and system notices.
 */
export function MessageBubble({
  children,
  appearance = 'incoming',
  author,
  timestamp,
  className = '',
}: MessageBubbleProps) {
  if (appearance === 'outgoing') {
    return (
      <div
        className={`border border-[#7C65FF] bg-[#181528] rounded-2xl p-3 sm:p-3.5 max-w-[92%] sm:max-w-[80%] ml-auto select-text shadow-lg shadow-[#7C65FF]/10 ${className}`}
      >
        {(author || timestamp) && (
          <div className="flex items-baseline gap-2 mb-1 select-none">
            {author && (
              <span className="text-xs sm:text-sm font-semibold text-[#A78BFA] tracking-tight">
                {author}
              </span>
            )}
            {timestamp && (
              <span className="text-[11px] text-[#8898AA] font-normal">
                {timestamp}
              </span>
            )}
          </div>
        )}
        <div className="text-xs sm:text-sm text-[#E2E8F0] leading-relaxed break-words">
          {children}
        </div>
      </div>
    );
  }

  if (appearance === 'system') {
    return (
      <div className={`text-center text-xs text-[#8898AA] py-1 italic ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div className={`text-xs sm:text-sm text-[#E2E8F0] leading-relaxed break-words ${className}`}>
      {children}
    </div>
  );
}
