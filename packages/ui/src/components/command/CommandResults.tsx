'use client';

import React from 'react';

export interface CommandResultsProps {
  /**
   * Whether results are currently loading.
   */
  loading?: boolean;
  /**
   * Results content (e.g. <CommandList /> or <CommandEmptyState />).
   */
  children: React.ReactNode;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Scrollable results viewport for the Command Palette.
 */
export function CommandResults({
  loading = false,
  children,
  className = '',
}: CommandResultsProps) {
  if (loading) {
    return (
      <div className="py-12 flex flex-col items-center justify-center text-center select-none">
        <div className="w-6 h-6 border-2 border-[#7C65FF] border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-xs text-[#8898AA]">Searching workspace...</p>
      </div>
    );
  }

  return (
    <div
      tabIndex={-1}
      className={`max-h-[380px] overflow-y-auto py-2 scrollbar-thin scrollbar-thumb-[#282736] scrollbar-track-transparent ${className}`}
    >
      {children}
    </div>
  );
}
