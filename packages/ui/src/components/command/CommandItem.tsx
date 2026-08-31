'use client';

import React from 'react';

export interface CommandItemProps {
  /**
   * Primary title or action label.
   */
  title: string;
  /**
   * Optional category or description text (e.g. "in Actions", "in Channels", "in People").
   */
  description?: string;
  /**
   * Slot for leading visual element (icon, avatar, # channel hash).
   */
  leading?: React.ReactNode;
  /**
   * Slot for trailing visual element (custom badge, status dot).
   */
  trailing?: React.ReactNode;
  /**
   * Optional keyboard shortcut string (e.g. "⌘N", "⌥C", "⌘H").
   */
  shortcut?: string;
  /**
   * Whether this item is currently selected/highlighted.
   */
  active?: boolean;
  /**
   * Whether this item is disabled.
   */
  disabled?: boolean;
  /**
   * Click handler callback.
   */
  onClick?: () => void;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Presentational command row item.
 * Supports leading visual slot, title, description, trailing shortcut badge, and active state.
 */
export function CommandItem({
  title,
  description,
  leading,
  trailing,
  shortcut,
  active = false,
  disabled = false,
  onClick,
  className = '',
}: CommandItemProps) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={active}
      disabled={disabled}
      onClick={onClick}
      className={`w-[calc(100%-16px)] mx-2 px-3 py-2.5 rounded-lg flex items-center justify-between text-left transition-colors duration-150 select-none group focus-visible:outline-none disabled:opacity-40 disabled:pointer-events-none ${
        active
          ? 'bg-[#241F47] text-white font-medium shadow-sm'
          : 'text-[#CBD5E1] hover:bg-[#1A1926] hover:text-white'
      } ${className}`}
    >
      {/* Left: Leading icon/avatar + Title + Category description */}
      <div className="flex items-center min-w-0 gap-3 flex-1">
        {leading && (
          <span
            className={`w-5 h-5 flex items-center justify-center flex-shrink-0 transition-colors ${
              active ? 'text-[#7C65FF]' : 'text-[#8898AA] group-hover:text-white'
            }`}
            aria-hidden="true"
          >
            {leading}
          </span>
        )}

        <div className="flex items-baseline min-w-0 truncate">
          <span className="text-sm font-medium text-white truncate">
            {title}
          </span>
          {description && (
            <span className="text-xs text-[#6B7280] ml-1.5 font-normal truncate">
              {description}
            </span>
          )}
        </div>
      </div>

      {/* Right: Custom trailing element or Keyboard shortcut badge */}
      <div className="flex items-center gap-2 flex-shrink-0 ml-3 select-none">
        {trailing}

        {shortcut && (
          <kbd className="text-[11px] font-mono bg-[#1E1D2A] text-[#8898AA] border border-[#282736] px-1.5 py-0.5 rounded leading-none">
            {shortcut}
          </kbd>
        )}
      </div>
    </button>
  );
}
