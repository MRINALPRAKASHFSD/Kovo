'use client';

import React from 'react';

export interface MeetingContextBarProps {
  /**
   * Whether meeting recording is actively in progress.
   */
  isRecording?: boolean;
  /**
   * Formatted elapsed meeting duration string (e.g. "45:12").
   */
  duration?: string;
  /**
   * Whether meeting transmission is verified and secure.
   */
  isSecure?: boolean;
  /**
   * Label for the security status badge. Defaults to "Secure Huddle".
   */
  secureLabel?: string;
  /**
   * Additional context status children.
   */
  children?: React.ReactNode;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Metadata and security context indicator bar for meetings.
 * Displays recording status, duration timer, encryption badge, and future telemetry.
 */
export function MeetingContextBar({
  isRecording = true,
  duration = '45:12',
  isSecure = true,
  secureLabel = 'Secure Huddle',
  children,
  className = '',
}: MeetingContextBarProps) {
  return (
    <div
      role="status"
      aria-label="Meeting status context"
      className={`flex items-center gap-4 text-xs select-none ${className}`}
    >
      {/* Recording & Duration Timer */}
      {isRecording && (
        <div className="flex items-center gap-1.5 text-[#8898AA] font-medium">
          <span
            className="w-2 h-2 rounded-full bg-[#EF4444] animate-pulse inline-block"
            aria-hidden="true"
          />
          <span className="font-semibold text-white tracking-wide">REC</span>
          <span className="text-[#3E3D4D]">•</span>
          <span className="tabular-nums tracking-wider">{duration}</span>
        </div>
      )}

      {children}

      {/* Security Status Badge */}
      {isSecure && (
        <div
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] text-xs font-semibold shadow-sm"
          title="End-to-end encrypted session"
        >
          <svg
            className="w-3.5 h-3.5 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span>{secureLabel}</span>
        </div>
      )}
    </div>
  );
}
