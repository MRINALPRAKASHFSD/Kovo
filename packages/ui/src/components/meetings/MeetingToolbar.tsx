'use client';

import React from 'react';

export interface MeetingToolbarProps {
  /**
   * Region rendered on the start / left side (typically <MeetingFooter />).
   */
  start?: React.ReactNode;
  /**
   * Region rendered in the center (typically <MeetingControlsGroup />).
   */
  center?: React.ReactNode;
  /**
   * Region rendered on the end / right side (typically the Leave Call button).
   */
  end?: React.ReactNode;
  /**
   * Direct children slot for custom toolbar compositions.
   */
  children?: React.ReactNode;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Bottom in-call toolbar component.
 * Features start (participant count), center (floating controls cluster), and end (leave call button) regions.
 */
export function MeetingToolbar({
  start,
  center,
  end,
  children,
  className = '',
}: MeetingToolbarProps) {
  if (children) {
    return (
      <footer
        className={`w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4 z-20 flex-shrink-0 bg-[#09080E] border-t border-white/[0.04] select-none ${className}`}
      >
        {children}
      </footer>
    );
  }

  return (
    <footer
      className={`w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4 z-20 flex-shrink-0 bg-[#09080E] border-t border-white/[0.04] select-none ${className}`}
    >
      {/* Start / Left Region */}
      <div className="hidden sm:flex flex-1 items-center justify-start min-w-0">
        {start}
      </div>

      {/* Center Controls Region */}
      <div className="flex-shrink-0 flex items-center justify-center">
        {center}
      </div>

      {/* End / Right Region */}
      <div className="flex sm:flex-1 items-center justify-end min-w-0">
        {end}
      </div>
    </footer>
  );
}
