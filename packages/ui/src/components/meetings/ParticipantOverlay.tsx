'use client';

import React from 'react';

export interface ParticipantOverlayProps {
  /**
   * Slot for top-left corner indicators (e.g., ActiveSpeakerBadge).
   */
  topLeft?: React.ReactNode;
  /**
   * Slot for top-right corner indicators (e.g., pin, connection bars).
   */
  topRight?: React.ReactNode;
  /**
   * Slot for bottom-left corner (defaults to participant name pill).
   */
  bottomLeft?: React.ReactNode;
  /**
   * Slot for bottom-right corner (e.g., hand raised, reactions).
   */
  bottomRight?: React.ReactNode;
  /**
   * Participant name used if bottomLeft is omitted.
   */
  name?: string;
  /**
   * Microphone mute state. Renders red mic-slash icon in default name pill.
   */
  isMuted?: boolean;
  /**
   * Indicates if this participant is the local current user.
   */
  isCurrentUser?: boolean;
  /**
   * Arbitrary overlay children.
   */
  children?: React.ReactNode;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Standardized overlay layer for participant tiles.
 * Positionally manages badges, status indicators, and name tags across all video conferencing modes.
 */
export function ParticipantOverlay({
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  name,
  isMuted = false,
  isCurrentUser = false,
  children,
  className = '',
}: ParticipantOverlayProps) {
  const displayName = isCurrentUser && name ? `${name} (You)` : name;

  const defaultNamePill = displayName ? (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/65 backdrop-blur-md border border-white/10 text-xs font-medium text-white shadow-md select-none">
      <span className="truncate max-w-[140px] sm:max-w-[200px]">{displayName}</span>
      {isMuted && (
        <svg
          className="w-3.5 h-3.5 text-[#EF4444] flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          aria-label="Muted"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 9.75v1.5a5.25 5.25 0 01-9.52 3.09M12 18.75v3m-3.75-3h7.5m-3.75-9a3 3 0 00-3-3m0 0l12 12M6 6l12 12"
          />
        </svg>
      )}
    </div>
  ) : null;

  return (
    <div
      className={`absolute inset-0 pointer-events-none p-3.5 flex flex-col justify-between z-10 ${className}`}
    >
      {/* Top Row: Top-Left & Top-Right slots */}
      <div className="flex items-start justify-between w-full pointer-events-auto">
        <div>{topLeft}</div>
        <div>{topRight}</div>
      </div>

      {/* Children center overlay slot (e.g. reaction emojis, alerts) */}
      {children && (
        <div className="flex-1 flex items-center justify-center pointer-events-auto">
          {children}
        </div>
      )}

      {/* Bottom Row: Bottom-Left & Bottom-Right slots */}
      <div className="flex items-end justify-between w-full pointer-events-auto">
        <div>{bottomLeft !== undefined ? bottomLeft : defaultNamePill}</div>
        <div>{bottomRight}</div>
      </div>
    </div>
  );
}
