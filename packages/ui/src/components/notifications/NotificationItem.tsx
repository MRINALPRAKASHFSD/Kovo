'use client';

import React from 'react';
import { NotificationCategory } from './types';
import { NotificationStatusDot } from './NotificationStatusDot';

export interface NotificationItemProps {
  /**
   * Unique identifier for the notification.
   */
  id: string;
  /**
   * Primary title or notification message.
   */
  title: React.ReactNode;
  /**
   * Secondary description, quote, or details snippet.
   */
  description?: React.ReactNode;
  /**
   * Relative or formatted timestamp string (e.g. "10m ago", "Yesterday").
   */
  timestamp: string;
  /**
   * Whether the notification is currently unread.
   */
  unread?: boolean;
  /**
   * Notification category for semantic categorization.
   */
  category?: NotificationCategory;
  /**
   * Optional metadata badge or channel tag.
   */
  metadata?: React.ReactNode;
  /**
   * Leading content slot (e.g. user avatar, channel icon, integration logo).
   */
  startAdornment?: React.ReactNode;
  /**
   * Custom trailing content slot. Overrides the default timestamp display if provided.
   */
  endAdornment?: React.ReactNode;
  /**
   * Callback fired when clicking or activating the notification row.
   */
  onClick?: (id: string) => void;
  /**
   * Callback fired on right-click / context menu.
   */
  onContextMenu?: (id: string, e: React.MouseEvent) => void;
  /**
   * Callback fired to toggle read/unread status.
   */
  onToggleRead?: (id: string) => void;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Reusable notification item row.
 * Decoupled from avatars and domain actions, supports rich start/end adornments,
 * unread status indicators, and keyboard accessibility.
 */
export function NotificationItem({
  id,
  title,
  description,
  timestamp,
  unread = false,
  metadata,
  startAdornment,
  endAdornment,
  onClick,
  onContextMenu,
  onToggleRead,
  className = '',
}: NotificationItemProps) {
  const handleClick = () => {
    onClick?.(id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.(id);
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    if (onContextMenu) {
      onContextMenu(id, e);
    }
  };

  return (
    <article
      role="article"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onContextMenu={handleContextMenu}
      className={`relative flex items-start gap-3 px-4 py-3.5 transition-colors duration-150 select-none group cursor-pointer hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7C65FF] ${className}`}
      aria-label={typeof title === 'string' ? `${title} (${timestamp})` : undefined}
    >
      {/* Unread Indicator Column */}
      <div className="pt-2">
        <NotificationStatusDot unread={unread} />
      </div>

      {/* Leading Adornment Slot */}
      {startAdornment && (
        <div className="flex-shrink-0 flex items-center justify-center">
          {startAdornment}
        </div>
      )}

      {/* Body Content */}
      <div className="flex-1 min-w-0 pr-3">
        <div className="flex items-baseline gap-2 flex-wrap">
          <div className="text-sm font-medium text-white tracking-tight leading-snug break-words">
            {title}
          </div>
          {metadata && (
            <div className="flex-shrink-0 inline-flex items-center">
              {metadata}
            </div>
          )}
        </div>

        {description && (
          <div className="text-xs text-[#8898AA] mt-1 leading-relaxed line-clamp-2 break-words">
            {description}
          </div>
        )}
      </div>

      {/* Trailing Slot / Timestamp */}
      <div className="flex-shrink-0 pt-0.5 text-right">
        {endAdornment !== undefined ? (
          endAdornment
        ) : (
          <span className="text-xs text-[#6B7280] font-normal tracking-wide">
            {timestamp}
          </span>
        )}
      </div>
    </article>
  );
}
