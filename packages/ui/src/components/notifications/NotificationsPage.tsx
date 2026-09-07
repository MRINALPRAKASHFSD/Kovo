'use client';

import React from 'react';

export interface NotificationsPageProps {
  /**
   * Optional custom page-level header slot.
   */
  header?: React.ReactNode;
  /**
   * Optional toolbar slot containing tabs and action buttons.
   */
  toolbar?: React.ReactNode;
  /**
   * Main notification content (typically a NotificationList).
   */
  children: React.ReactNode;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Top-level layout container for the Notifications view.
 * Constrains width to max-w-5xl with responsive padding and independent scrolling.
 */
export function NotificationsPage({
  header,
  toolbar,
  children,
  className = '',
}: NotificationsPageProps) {
  return (
    <div className={`flex-1 w-full h-full overflow-y-auto ${className}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-6 space-y-6">
        {header}
        {toolbar}
        {children}
      </div>
    </div>
  );
}
