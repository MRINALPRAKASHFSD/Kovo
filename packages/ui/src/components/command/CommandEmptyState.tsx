'use client';

import React from 'react';

export interface CommandEmptyStateProps {
  /**
   * Search query that yielded no results.
   */
  query?: string;
  /**
   * Main empty title. Default is "No results found".
   */
  title?: string;
  /**
   * Description message.
   */
  description?: string;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Standardized empty state displayed when search produces zero results.
 */
export function CommandEmptyState({
  query,
  title = 'No results found',
  description,
  className = '',
}: CommandEmptyStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`py-12 px-6 text-center select-none ${className}`}
    >
      <div className="w-10 h-10 mx-auto rounded-full bg-[#1A1926] border border-[#282736] flex items-center justify-center text-[#6B7280] mb-3">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <h3 className="text-sm font-semibold text-white">
        {title}
      </h3>

      <p className="mt-1 text-xs text-[#8898AA] max-w-xs mx-auto">
        {description || (query ? `No commands, files, or people match "${query}".` : 'Try searching for commands, files, or teammates.')}
      </p>
    </div>
  );
}
