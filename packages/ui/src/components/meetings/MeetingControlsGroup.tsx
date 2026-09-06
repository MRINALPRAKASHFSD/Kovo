'use client';

import React from 'react';

export interface MeetingControlsGroupProps {
  /**
   * Child control buttons (typically <MeetingControlButton /> instances).
   */
  children: React.ReactNode;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Control cluster container for in-call action buttons.
 * Groups microphone, camera, screen share, and collaboration tools with unified spacing.
 */
export function MeetingControlsGroup({
  children,
  className = '',
}: MeetingControlsGroupProps) {
  return (
    <div
      role="toolbar"
      aria-label="Meeting in-call controls"
      className={`inline-flex items-center justify-center gap-2 sm:gap-2.5 p-1.5 rounded-full bg-[#13121D]/90 backdrop-blur-lg border border-white/[0.08] shadow-2xl shadow-black/60 ${className}`}
    >
      {children}
    </div>
  );
}
