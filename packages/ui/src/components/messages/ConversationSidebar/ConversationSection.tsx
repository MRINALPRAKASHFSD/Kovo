'use client';

import React from 'react';

export interface ConversationSectionProps {
  /**
   * Title displayed above the section (e.g. "DIRECT MESSAGES", "CHANNELS").
   */
  title: string;
  /**
   * Optional callback fired when clicking the section's "+" add button.
   */
  onAddClick?: () => void;
  /**
   * Accessible label for the add button. Default is "Add {title}".
   */
  addAriaLabel?: string;
  /**
   * Section items (e.g. <ConversationItem /> components).
   */
  children: React.ReactNode;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Reusable conversation section wrapper.
 * Features uppercase tracked title, optional action button, and content slot.
 */
export function ConversationSection({
  title,
  onAddClick,
  addAriaLabel,
  children,
  className = '',
}: ConversationSectionProps) {
  return (
    <div className={`space-y-1 ${className}`}>
      {/* Section Header */}
      <div className="flex items-center justify-between px-2.5 py-1 select-none">
        <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]">
          {title}
        </h3>

        {onAddClick && (
          <button
            type="button"
            onClick={onAddClick}
            aria-label={addAriaLabel || `Add ${title}`}
            className="w-5 h-5 rounded flex items-center justify-center text-[#8898AA] hover:text-white hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7C65FF]"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        )}
      </div>

      {/* Section Content List */}
      <div className="space-y-0.5">
        {children}
      </div>
    </div>
  );
}
