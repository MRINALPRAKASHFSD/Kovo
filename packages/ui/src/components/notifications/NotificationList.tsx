'use client';

import React from 'react';
import { NotificationGroup } from './types';
import { NotificationSection } from './NotificationSection';
import { NotificationItem } from './NotificationItem';
import { EmptyNotifications } from './EmptyNotifications';

export interface NotificationListProps {
  /**
   * Grouped notification data. When supplied, NotificationList automatically manages
   * section and item hierarchy.
   */
  groups?: NotificationGroup[];
  /**
   * Callback fired when clicking a notification row.
   */
  onNotificationClick?: (id: string) => void;
  /**
   * Callback fired on right-click / context menu on a notification row.
   */
  onContextMenu?: (id: string, e: React.MouseEvent) => void;
  /**
   * Callback fired to toggle read status.
   */
  onToggleRead?: (id: string) => void;
  /**
   * Custom empty state when there are no notifications in any group.
   */
  emptyState?: React.ReactNode;
  /**
   * Optional manual children override if custom layout is needed.
   */
  children?: React.ReactNode;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * List container that owns grouped notification rendering.
 * Automatically delegates to NotificationSection and NotificationItem.
 */
export function NotificationList({
  groups,
  onNotificationClick,
  onContextMenu,
  onToggleRead,
  emptyState,
  children,
  className = '',
}: NotificationListProps) {
  if (children) {
    return (
      <div className={`space-y-6 w-full ${className}`} role="feed" aria-label="Notifications list">
        {children}
      </div>
    );
  }

  if (!groups || groups.length === 0) {
    return <>{emptyState || <EmptyNotifications />}</>;
  }

  const totalNotifications = groups.reduce(
    (acc, group) => acc + (group.notifications?.length || 0),
    0
  );

  if (totalNotifications === 0) {
    return <>{emptyState || <EmptyNotifications />}</>;
  }

  return (
    <div
      className={`space-y-6 w-full ${className}`}
      role="feed"
      aria-label="Notifications list"
    >
      {groups.map((group) => {
        if (!group.notifications || group.notifications.length === 0) {
          return null;
        }

        return (
          <NotificationSection key={group.id} title={group.title}>
            {group.notifications.map((item) => (
              <NotificationItem
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
                timestamp={item.timestamp}
                unread={item.unread}
                category={item.category}
                metadata={item.metadata}
                startAdornment={item.startAdornment}
                endAdornment={item.endAdornment}
                onClick={onNotificationClick}
                onContextMenu={onContextMenu}
                onToggleRead={onToggleRead}
              />
            ))}
          </NotificationSection>
        );
      })}
    </div>
  );
}
