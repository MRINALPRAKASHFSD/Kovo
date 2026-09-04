'use client';

import React from 'react';

export interface ConversationSidebarProps {
  /**
   * Controlled search query value.
   */
  searchValue?: string;
  /**
   * Callback fired when search query changes.
   */
  onSearchChange?: (value: string) => void;
  /**
   * Placeholder text for the search/filter input. Default is "Filter conversations...".
   */
  searchPlaceholder?: string;
  /**
   * Optional custom header slot (replaces standard search input).
   */
  header?: React.ReactNode;
  /**
   * Content inside the scrollable conversation rail (e.g. <ConversationSection />).
   */
  children?: React.ReactNode;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Controlled 280px middle conversation rail.
 * Contains filter input at top and independent scrollable sections below.
 */
export function ConversationSidebar({
  searchValue = '',
  onSearchChange,
  searchPlaceholder = 'Filter conversations...',
  header,
  children,
  className = '',
}: ConversationSidebarProps) {
  return (
    <aside
      className={`w-[280px] h-full max-h-screen bg-[#0E0D14] border-r border-[#1E1D2A] flex flex-col flex-shrink-0 select-none ${className}`}
      aria-label="Conversation list"
    >
      {/* Pinned Top Bar: Filter / Search Input (Height: 64px aligned with shell) */}
      <div className="h-16 px-3 border-b border-[#1E1D2A] flex items-center flex-shrink-0">
        {header !== undefined ? (
          header
        ) : (
          <div className="relative w-full flex items-center">
            <svg
              className="w-4 h-4 absolute left-3 text-[#6B7280] pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
              />
            </svg>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              className="w-full bg-[#13121D] border border-[#1E1D2A] rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-[#6B7280] focus:outline-none focus:border-[#7C65FF] focus:ring-1 focus:ring-[#7C65FF] transition-all"
            />
          </div>
        )}
      </div>

      {/* Scrollable Conversation Content Viewport */}
      <div className="flex-1 overflow-y-auto p-3 space-y-5 scrollbar-thin scrollbar-thumb-[#282736] scrollbar-track-transparent">
        {children}
      </div>
    </aside>
  );
}
