'use client';
/* eslint-disable @next/next/no-img-element */

import React, { useState } from 'react';
import { PresenceIndicator, PresenceStatus } from './PresenceIndicator';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  /**
   * Image source URL.
   */
  src?: string;
  /**
   * User full name used for initials fallback and accessibility alt.
   */
  name?: string;
  /**
   * Alternative text for the image. Defaults to name.
   */
  alt?: string;
  /**
   * Size token. Defaults to 'md'.
   */
  size?: AvatarSize;
  /**
   * Optional real-time presence status.
   */
  presence?: PresenceStatus;
  /**
   * Optional click handler.
   */
  onClick?: () => void;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

const sizeContainerClasses: Record<AvatarSize, string> = {
  xs: 'w-5 h-5 text-[10px]',
  sm: 'w-7 h-7 text-xs',
  md: 'w-9 h-9 text-xs',
  lg: 'w-11 h-11 text-sm',
  xl: 'w-14 h-14 text-base',
};

const presenceSizeMap: Record<AvatarSize, 'sm' | 'md' | 'lg'> = {
  xs: 'sm',
  sm: 'sm',
  md: 'md',
  lg: 'md',
  xl: 'lg',
};

/**
 * Shared Avatar primitive supporting image loading, automatic initials fallback,
 * and integrated presence status badges.
 */
export function Avatar({
  src,
  name = '',
  alt,
  size = 'md',
  presence,
  onClick,
  className = '',
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);

  const initials = name
    ? name
        .trim()
        .split(/\s+/)
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'U';

  const showImage = Boolean(src && !imageError);

  const containerClasses = `relative rounded-full flex-shrink-0 select-none flex items-center justify-center font-semibold text-white ${
    sizeContainerClasses[size]
  } ${onClick ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''} ${className}`;

  return (
    <div
      className={containerClasses}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={name || alt || 'User avatar'}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt || name || 'User avatar'}
          onError={() => setImageError(true)}
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#7C65FF]/40 to-[#6344E7]/40 border border-[#282736] flex items-center justify-center font-bold tracking-tight">
          {initials}
        </div>
      )}

      {presence && (
        <div className="absolute -bottom-0.5 -right-0.5 flex-shrink-0">
          <PresenceIndicator
            status={presence}
            size={presenceSizeMap[size]}
          />
        </div>
      )}
    </div>
  );
}
