'use client';

import React from 'react';

export interface EmptyThreadsProps {
  /**
   * Main title heading.
   */
  title?: React.ReactNode;
  /**
   * Explanatory text.
   */
  description?: React.ReactNode;
  /**
   * Optional action button or custom node.
   */
  action?: React.ReactNode;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Empty state component displayed when a thread inbox or filter produces no results.
 */
export function EmptyThreads({
  title = 'No active threads',
  description = "When you participate in discussions, they'll appear here.",
  action,
  className = '',
}: EmptyThreadsProps) {
  return (
    <div
      className={`p-8 sm:p-12 text-center rounded-2xl border border-dashed border-[#282736] bg-[#13121C]/50 select-none ${className}`}
      role="status"
    >
      <div className="w-12 h-12 rounded-xl bg-[#1B1A26] border border-[#2B2A3A] flex items-center justify-center text-[#7C65FF] mx-auto mb-3.5 shadow-sm">
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </div>

      <h3 className="text-sm sm:text-base font-semibold text-white tracking-tight">
        {title}
      </h3>

      {description && (
        <p className="mt-1 text-xs sm:text-sm text-[#8898AA] max-w-sm mx-auto leading-relaxed">
          {description}
        </p>
      )}

      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
