'use client';

import React from 'react';
import { MeetingLayout } from './types';

export interface ParticipantGridProps {
  /**
   * Layout strategy for positioning participant video feeds. Defaults to 'speaker'.
   */
  layout?: MeetingLayout;
  /**
   * Slot for the featured speaker (used in 'speaker' and 'presentation' modes).
   */
  speakerSlot?: React.ReactNode;
  /**
   * Slot for the participant grid (typically a 2x2 or multi-participant grid).
   */
  gridSlot?: React.ReactNode;
  /**
   * Direct children slot if custom layout composition is preferred.
   */
  children?: React.ReactNode;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Responsive layout canvas for participant feeds during real-time meetings.
 * Implements speaker, gallery grid, and presentation layout modes with fluid breakpoint wrapping.
 */
export function ParticipantGrid({
  layout = 'speaker',
  speakerSlot,
  gridSlot,
  children,
  className = '',
}: ParticipantGridProps) {
  if (children) {
    return (
      <div className={`w-full h-full flex-1 min-h-0 ${className}`}>
        {children}
      </div>
    );
  }

  // Canonical 'speaker' layout: Left 2x2 grid + Right featured active speaker column
  if (layout === 'speaker') {
    return (
      <div
        className={`w-full h-full flex-1 min-h-0 flex flex-col lg:flex-row gap-2 sm:gap-3 md:gap-4 items-stretch overflow-y-auto lg:overflow-hidden scrollbar-thin scrollbar-thumb-[#282736] ${className}`}
      >
        {/* Left Sub-Grid (typically 2x2 grid of participants) */}
        {gridSlot && (
          <div className="flex-1 min-w-0 grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 min-h-[240px] sm:min-h-[280px] lg:min-h-0">
            {gridSlot}
          </div>
        )}

        {/* Right Featured Speaker Slot */}
        {speakerSlot && (
          <div className="w-full lg:w-[380px] xl:w-[460px] 2xl:w-[520px] flex-shrink-0 min-h-[180px] sm:min-h-[240px] lg:min-h-0 flex flex-col">
            {speakerSlot}
          </div>
        )}
      </div>
    );
  }

  // Standard gallery grid layout
  return (
    <div
      className={`w-full h-full flex-1 min-h-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 ${className}`}
    >
      {gridSlot}
      {speakerSlot}
    </div>
  );
}
