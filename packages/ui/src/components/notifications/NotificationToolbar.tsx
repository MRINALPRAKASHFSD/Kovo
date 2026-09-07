'use client';

import React from 'react';

export interface NotificationToolbarProps {
  /**
   * Content displayed on the left side (typically NotificationFilterTabs).
   */
  leftSlot?: React.ReactNode;
  /**
   * Action controls displayed on the right side (e.g. "Mark all read", "Archive", "Settings").
   */
  rightSlot?: React.ReactNode;
  /**
   * Optional children for full custom toolbar layouts.
   */
  children?: React.ReactNode;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Toolbar for notification actions and filter tabs.
 * Decoupled from specific actions, providing clean leftSlot and rightSlot boundaries.
 */
export function NotificationToolbar({
  leftSlot,
  rightSlot,
  children,
  className = '',
}: NotificationToolbarProps) {
  if (children) {
    return (
      <div
        role="toolbar"
        aria-label="Notification toolbar"
        className={`flex items-center justify-between gap-4 mb-6 flex-wrap ${className}`}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      role="toolbar"
      aria-label="Notification toolbar"
      className={`flex items-center justify-between gap-4 mb-6 flex-wrap ${className}`}
    >
      <div className="flex items-center gap-2 flex-wrap">{leftSlot}</div>
      <div className="flex items-center gap-2 flex-shrink-0">{rightSlot}</div>
    </div>
  );
}
