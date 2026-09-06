'use client';

import React from 'react';
import { MeetingParticipant } from './types';

export interface ParticipantTileProps {
  /**
   * Optional participant data model.
   */
  participant?: MeetingParticipant;
  /**
   * Media content slot (typically a <MediaSurface />).
   */
  media?: React.ReactNode;
  /**
   * Overlay slot (typically a <ParticipantOverlay />).
   */
  overlay?: React.ReactNode;
  /**
   * Explicit active speaker override. Defaults to participant?.state.speaking.
   */
  isActiveSpeaker?: boolean;
  /**
   * Explicit pinned state. Defaults to participant?.state.pinned.
   */
  isPinned?: boolean;
  /**
   * Optional click callback for tile interaction.
   */
  onClick?: () => void;
  /**
   * Arbitrary children inside the tile.
   */
  children?: React.ReactNode;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Presentational container card for a single participant's video or media feed.
 * Features rounded corners, active speaker glow ring, and separate media/overlay slots.
 */
export function ParticipantTile({
  participant,
  media,
  overlay,
  isActiveSpeaker,
  isPinned,
  onClick,
  children,
  className = '',
}: ParticipantTileProps) {
  const speaking =
    isActiveSpeaker !== undefined
      ? isActiveSpeaker
      : !!participant?.state?.speaking;

  const pinned =
    isPinned !== undefined
      ? isPinned
      : !!participant?.state?.pinned;

  return (
    <div
      role="region"
      aria-label={`${participant?.name || 'Participant'} tile`}
      aria-current={speaking ? 'true' : undefined}
      tabIndex={onClick ? 0 : -1}
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`relative w-full h-full rounded-2xl overflow-hidden bg-[#13121D] transition-all duration-200 select-none flex flex-col items-center justify-center group ${
        speaking
          ? 'border-2 border-[#7C65FF] shadow-[0_0_24px_rgba(124,101,255,0.25)]'
          : 'border border-[#1E1D2A] hover:border-[#282736]'
      } ${onClick ? 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C65FF]' : ''} ${className}`}
      data-participant-id={participant?.id}
      data-pinned={pinned ? 'true' : undefined}
    >
      {/* Media Feed Layer */}
      <div className="w-full h-full absolute inset-0 z-0">
        {media}
      </div>

      {/* Children Layer */}
      {children}

      {/* Overlay Layer */}
      {overlay}
    </div>
  );
}
