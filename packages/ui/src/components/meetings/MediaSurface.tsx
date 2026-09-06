'use client';
/* eslint-disable @next/next/no-img-element */

import React, { useState } from 'react';
import { MediaSurfaceVariant } from './types';

export interface MediaSurfaceProps {
  /**
   * Surface rendering mode. Defaults to 'image'.
   */
  variant?: MediaSurfaceVariant;
  /**
   * Media source URL (image or video stream).
   */
  src?: string;
  /**
   * Alternative text for accessibility.
   */
  alt?: string;
  /**
   * Participant display name used for avatar fallback.
   */
  avatarName?: string;
  /**
   * Custom children or video element slot.
   */
  children?: React.ReactNode;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Reusable presentational media surface for video meetings.
 * Supports image feeds, video streams, avatar fallbacks, screen shares, and loading states.
 */
export function MediaSurface({
  variant = 'image',
  src,
  alt = 'Participant media',
  avatarName = '',
  children,
  className = '',
}: MediaSurfaceProps) {
  const [hasError, setHasError] = useState(false);

  const initials = avatarName
    ? avatarName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'U';

  const showAvatarFallback =
    variant === 'avatar' || hasError || (!src && variant !== 'screen' && variant !== 'loading');

  return (
    <div
      className={`w-full h-full relative overflow-hidden bg-[#13121D] flex items-center justify-center select-none ${className}`}
    >
      {/* Custom Children Slot (e.g. native video track or custom stream) */}
      {children}

      {!children && showAvatarFallback && (
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#7C65FF]/30 to-[#6344E7]/30 border border-white/10 flex items-center justify-center text-white text-xl font-bold tracking-tight shadow-inner">
          {initials}
        </div>
      )}

      {!children && !showAvatarFallback && variant === 'loading' && (
        <div className="flex flex-col items-center gap-2 text-[#8898AA]">
          <div className="w-8 h-8 rounded-full border-2 border-[#7C65FF] border-t-transparent animate-spin" />
          <span className="text-xs font-medium">Connecting...</span>
        </div>
      )}

      {!children && !showAvatarFallback && variant === 'screen' && (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#09080E] text-[#8898AA] p-4">
          <svg
            className="w-12 h-12 text-[#7C65FF]/60 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
            />
          </svg>
          <span className="text-xs font-medium">Screen Share Presentation</span>
        </div>
      )}

      {!children && !showAvatarFallback && (variant === 'image' || variant === 'video') && src && (
        <img
          src={src}
          alt={alt}
          onError={() => setHasError(true)}
          className="w-full h-full object-cover transition-opacity duration-300"
        />
      )}
    </div>
  );
}
