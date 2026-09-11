'use client';

import React from 'react';

export interface EmptyChannelsProps {
  /**
   * Main heading for the empty state.
   */
  title?: React.ReactNode;
  /**
   * Informative description.
   */
  description?: React.ReactNode;
  /**
   * Optional action button or link (e.g. "Create Channel", "Browse Directory").
   */
  action?: React.ReactNode;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Empty state component displayed when a channel list or section has no channels.
 */
export function EmptyChannels({
  title = 'No channels available',
  description = 'You are not a member of any channels in this section yet.',
  action,
  className = '',
}: EmptyChannelsProps) {
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
            d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
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

      {action && <div className="mt-4 flex justify-center">{action}</div>}
    </div>
  );
}
