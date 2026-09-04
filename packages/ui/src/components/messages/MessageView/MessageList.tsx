'use client';

import React from 'react';

export interface MessageListProps {
  /**
   * Message groups and timeline elements.
   */
  children: React.ReactNode;
  /**
   * Optional custom bottom inset to prevent messages from being obscured by sticky composers.
   */
  bottomInset?: number | string;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Scrollable message viewport.
 * Composes message groups, divider dates, and system notices.
 */
export function MessageList({
  children,
  bottomInset,
  className = '',
}: MessageListProps) {
  const style = bottomInset !== undefined ? { paddingBottom: bottomInset } : undefined;

  return (
    <div
      tabIndex={-1}
      role="region"
      aria-label="Message timeline"
      style={style}
      className={`flex-1 overflow-y-auto px-3 sm:px-6 py-3 sm:py-6 space-y-4 sm:space-y-6 scrollbar-thin scrollbar-thumb-[#282736] scrollbar-track-transparent ${className}`}
    >
      {children}
    </div>
  );
}
