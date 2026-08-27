'use client';

import React from 'react';

export interface SearchTriggerProps {
  /**
   * Placeholder prompt text. Default is 'Search workspace...'.
   */
  placeholder?: string;
  /**
   * Keyboard shortcut indicator. Default is '⌘K'.
   */
  shortcut?: string;
  /**
   * Callback fired when clicking the search trigger.
   */
  onClick?: () => void;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Accessible command palette trigger styled as a search input with keyboard shortcut hint.
 */
export function SearchTrigger({
  placeholder = 'Search workspace...',
  shortcut = '⌘K',
  onClick,
  className = '',
}: SearchTriggerProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Search workspace"
      className={`w-52 sm:w-64 md:w-72 lg:w-80 h-9 bg-[#15141E] border border-[#252433] hover:border-[#3E3D52] rounded-lg px-3 flex items-center justify-between transition-colors duration-150 select-none text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C65FF] focus-visible:ring-offset-1 focus-visible:ring-offset-[#0E0D14] ${className}`}
    >
      <div className="flex items-center min-w-0 gap-2 text-xs text-[#5A6578]">
        <svg
          className="w-3.5 h-3.5 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <span className="truncate">{placeholder}</span>
      </div>

      {shortcut && (
        <kbd
          className="text-[10px] text-[#8898AA] bg-[#222130] px-1.5 py-0.5 rounded border border-[#2D2C3D] font-mono leading-none select-none flex-shrink-0 ml-2"
          aria-label={`Shortcut: ${shortcut}`}
        >
          {shortcut}
        </kbd>
      )}
    </button>
  );
}
