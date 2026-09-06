'use client';

import React from 'react';
import { MeetingSession } from './types';
import { KovoLogo } from '../primitives/KovoLogo';

export interface MeetingHeaderProps {
  /**
   * Meeting title (e.g. "Engineering Standup").
   */
  title?: string;
  /**
   * Optional full meeting session model.
   */
  session?: MeetingSession;
  /**
   * Brand or team logo slot. Defaults to <KovoLogo variant="icon" />.
   */
  logo?: React.ReactNode;
  /**
   * Whether recording is active. Defaults to true.
   */
  isRecording?: boolean;
  /**
   * Formatted elapsed meeting duration (e.g. "45:12").
   */
  duration?: string;
  /**
   * Whether the session is end-to-end encrypted / secure.
   */
  isSecure?: boolean;
  /**
   * Label for the security status badge. Defaults to "Secure Huddle".
   */
  secureLabel?: string;
  /**
   * Optional context bar override slot.
   */
  contextSlot?: React.ReactNode;
  /**
   * Additional right-aligned header actions slot.
   */
  actions?: React.ReactNode;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Pinned top bar for video meetings and huddles.
 * Displays brand monogram, meeting title, active recording telemetry, and security badge.
 */
export function MeetingHeader({
  title = 'Engineering Standup',
  session,
  logo,
  isRecording,
  duration,
  isSecure,
  secureLabel,
  contextSlot,
  actions,
  className = '',
}: MeetingHeaderProps) {
  const meetingTitle = session?.title || title;
  const recordingActive =
    isRecording !== undefined
      ? isRecording
      : session?.recording !== undefined
      ? session.recording
      : true;
  const timer = duration || session?.duration || '45:12';
  const secure =
    isSecure !== undefined
      ? isSecure
      : session?.encrypted !== undefined
      ? session.encrypted
      : true;
  const badgeLabel = secureLabel || session?.securityLabel || 'Secure Huddle';

  return (
    <header
      className={`w-full flex items-center justify-between px-4 sm:px-6 py-3.5 select-none flex-shrink-0 bg-[#09080E] border-b border-white/[0.04] z-20 ${className}`}
    >
      {/* Left: Brand Monogram + Meeting Title + Recording Timer */}
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="flex-shrink-0">
          {logo || (
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#7C65FF] to-[#6344E7] flex items-center justify-center text-white font-bold text-sm shadow-md shadow-[#7C65FF]/20">
              K
            </div>
          )}
        </div>

        <div className="min-w-0">
          <h1 className="text-sm sm:text-base font-bold text-white tracking-tight truncate leading-none">
            {meetingTitle}
          </h1>

          <div className="flex items-center gap-1.5 mt-1 text-xs text-[#8898AA]">
            {recordingActive && (
              <>
                <span
                  className="w-2 h-2 rounded-full bg-[#EF4444] animate-pulse inline-block flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="font-semibold text-[#EF4444] tracking-wider text-[10px] uppercase">
                  REC
                </span>
                <span className="text-[#3E3D4D]">•</span>
              </>
            )}
            <span className="tabular-nums tracking-wide text-xs">{timer}</span>
          </div>
        </div>
      </div>

      {/* Right: Security Badge / Context Bar + Actions */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {contextSlot ? (
          contextSlot
        ) : (
          secure && (
            <div
              role="status"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] text-xs font-semibold shadow-sm"
              title="End-to-end encrypted meeting"
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
              <span>{badgeLabel}</span>
            </div>
          )
        )}

        {actions}
      </div>
    </header>
  );
}
