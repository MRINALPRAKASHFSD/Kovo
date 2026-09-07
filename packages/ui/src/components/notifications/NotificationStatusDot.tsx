'use client';

import React from 'react';

export interface NotificationStatusDotProps {
  /**
   * Whether the notification is unread. When false, preserves layout spacing.
   */
  unread?: boolean;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Standalone unread status indicator.
 * Renders a glowing purple dot when unread, maintaining layout alignment when read.
 */
export function NotificationStatusDot({
  unread = true,
  className = '',
}: NotificationStatusDotProps) {
  return (
    <div
      className={`w-2.5 h-2.5 flex items-center justify-center flex-shrink-0 ${className}`}
      aria-hidden="true"
    >
      {unread ? (
        <span className="w-2 h-2 rounded-full bg-[#7C65FF] shadow-[0_0_8px_rgba(124,101,255,0.6)] animate-pulse" />
      ) : null}
    </div>
  );
}
