'use client';

import React from 'react';

export interface ConversationItemProps {
  /**
   * Slot for leading element such as Avatar, # channel hash, or icon.
   */
  leading?: React.ReactNode;
  /**
   * Main title text (channel name, user name, etc.).
   */
  title: string;
  /**
   * Optional subtitle or secondary text.
   */
  subtitle?: string;
  /**
   * Slot for trailing element such as unread badge or status icon.
   */
  trailing?: React.ReactNode;
  /**
   * Whether the conversation item is currently active/selected.
   */
  active?: boolean;
  /**
   * Click callback handler.
   */
  onClick?: () => void;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Composable, slot-based conversation item.
 * Decoupled from specific conversation types (DM vs Channel).
 */
export function ConversationItem({
  leading,
  title,
  subtitle,
  trailing,
  active = false,
  onClick,
  className = '',
}: ConversationItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? 'true' : undefined}
      className={`w-full px-2.5 py-1.5 rounded-lg flex items-center justify-between text-left text-xs sm:text-sm transition-colors duration-150 select-none group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C65FF] focus-visible:ring-offset-1 focus-visible:ring-offset-[#09080E] ${
        active
          ? 'bg-[#241F47] text-white font-medium shadow-sm'
          : 'text-[#8898AA] hover:text-white hover:bg-[#1A1926]'
      } ${className}`}
    >
      <div className="flex items-center min-w-0 gap-2.5 flex-1">
        {leading && (
          <div className="flex-shrink-0 flex items-center justify-center">
            {leading}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className={`truncate leading-snug ${active ? 'text-white font-medium' : 'text-[#8898AA] group-hover:text-white'}`}>
            {title}
          </div>
          {subtitle && (
            <div className="text-[11px] text-[#6B7280] truncate leading-tight">
              {subtitle}
            </div>
          )}
        </div>
      </div>

      {trailing && (
        <div className="flex-shrink-0 ml-2">
          {trailing}
        </div>
      )}
    </button>
  );
}
