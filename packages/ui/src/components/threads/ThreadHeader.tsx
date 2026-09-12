'use client';

import React from 'react';

export interface ThreadHeaderProps {
  /**
   * Primary leading slot (e.g. avatar or mobile back button).
   */
  leading?: React.ReactNode;
  /**
   * Thread author / participant title (e.g. "Daniella Vance").
   */
  title?: React.ReactNode;
  /**
   * Thread subject / topic subtitle (e.g. "Notification Center Redesign").
   */
  subtitle?: React.ReactNode;
  /**
   * Trailing custom actions slot.
   */
  actions?: React.ReactNode;
  /**
   * Whether the thread is starred/favorited.
   */
  isFavorite?: boolean;
  /**
   * Callback fired when clicking the star/favorite button.
   */
  onFavoriteClick?: () => void;
  /**
   * Callback fired when clicking the more options button.
   */
  onOptionsClick?: () => void;
  /**
   * Whether to display a mobile back button.
   */
  showBackButton?: boolean;
  /**
   * Callback fired when mobile back button is clicked.
   */
  onBackClick?: () => void;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Pinned header for the active thread view displaying author avatar, subject subtitle, and quick actions.
 */
export function ThreadHeader({
  leading,
  title = 'Daniella Vance',
  subtitle = 'Notification Center Redesign',
  actions,
  isFavorite = false,
  onFavoriteClick,
  onOptionsClick,
  showBackButton = false,
  onBackClick,
  className = '',
}: ThreadHeaderProps) {
  const defaultActions = (
    <div className="flex items-center gap-1 sm:gap-2">
      {/* Star / Favorite Button */}
      <button
        type="button"
        onClick={onFavoriteClick}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
          isFavorite
            ? 'text-[#7C65FF] hover:text-[#6344E7]'
            : 'text-[#8898AA] hover:text-white'
        } hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C65FF]`}
      >
        <svg
          className="w-5 h-5"
          fill={isFavorite ? 'currentColor' : 'none'}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      </button>

      {/* More Options Button */}
      <button
        type="button"
        onClick={onOptionsClick}
        aria-label="Thread options"
        className="w-9 h-9 rounded-xl flex items-center justify-center text-[#8898AA] hover:text-white hover:bg-white/[0.04] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C65FF]"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 12h.01M12 12h.01M19 12h.01"
          />
        </svg>
      </button>
    </div>
  );

  return (
    <header
      className={`h-16 px-4 sm:px-6 bg-[#0E0D14] border-b border-[#1E1D2A] flex items-center justify-between flex-shrink-0 select-none z-10 ${className}`}
      aria-label="Thread details header"
    >
      {/* Left: Optional Back Button + Leading Slot + Title & Subtitle */}
      <div className="flex items-center gap-3 min-w-0">
        {showBackButton && (
          <button
            type="button"
            onClick={onBackClick}
            aria-label="Back to threads list"
            className="md:hidden w-8 h-8 -ml-1 rounded-lg flex items-center justify-center text-[#8898AA] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C65FF]"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        {leading && <div className="flex-shrink-0">{leading}</div>}

        <div className="min-w-0">
          <h1 className="text-sm sm:text-base font-bold text-white tracking-tight truncate leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs text-[#8898AA] font-normal truncate leading-tight mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex-shrink-0">
        {actions !== undefined ? actions : defaultActions}
      </div>
    </header>
  );
}
