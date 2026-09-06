'use client';

import React from 'react';

export interface ActiveSpeakerBadgeProps {
  /**
   * Custom badge label. Defaults to "ACTIVE SPEAKER".
   */
  label?: string;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * High-visibility badge indicating the current active speaker in a meeting.
 */
export function ActiveSpeakerBadge({
  label = 'ACTIVE SPEAKER',
  className = '',
}: ActiveSpeakerBadgeProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#7C65FF] text-white text-[11px] font-bold uppercase tracking-wider shadow-lg shadow-[#7C65FF]/30 select-none ${className}`}
    >
      <svg
        className="w-3.5 h-3.5 fill-current animate-pulse"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.5A2.25 2.25 0 002.25 9.75v4.5A2.25 2.25 0 004.5 16.5h1.94l4.5 4.5c.944.945 2.56.276 2.56-1.06V4.06zM18.54 5.46a.75.75 0 011.06 0A12.72 12.72 0 0122.5 12c0 2.55-.75 4.93-2.05 6.94a.75.75 0 11-1.28-.78A11.22 11.22 0 0021 12c0-2.25-.66-4.35-1.81-6.14a.75.75 0 010-1.06zM15.36 8.64a.75.75 0 011.06 0A7.47 7.47 0 0118 12a7.47 7.47 0 01-1.58 4.5.75.75 0 11-1.18-.92A5.97 5.97 0 0016.5 12c0-1.28-.4-2.47-1.08-3.46a.75.75 0 010-1.06z" />
      </svg>
      <span>{label}</span>
    </div>
  );
}
