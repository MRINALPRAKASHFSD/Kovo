'use client';

import React from 'react';
import { SearchTrigger } from './SearchTrigger';

export interface TopBarProps {
  /**
   * Title displayed on the left side of the top bar. Default is 'Dashboard'.
   */
  title?: string;
  /**
   * Callback fired when clicking the search command palette trigger.
   */
  onSearchClick?: () => void;
  /**
   * Callback fired when clicking the notifications button.
   */
  onNotificationClick?: () => void;
  /**
   * Whether to display an unread notification indicator.
   */
  hasNotifications?: boolean;
  /**
   * User avatar image URL.
   */
  userAvatarUrl?: string;
  /**
   * User display name for the avatar alt text. Default is 'Alex Mercer'.
   */
  userName?: string;
  /**
   * Callback fired when clicking the user avatar.
   */
  onAvatarClick?: () => void;
  /**
   * Callback fired when clicking the mobile menu toggle button.
   */
  onMenuClick?: () => void;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Pinned top bar for authenticated pages.
 * Displays page title, command palette search trigger, notifications trigger, and user avatar.
 */
export function TopBar({
  title = 'Dashboard',
  onSearchClick,
  onNotificationClick,
  hasNotifications = false,
  userAvatarUrl,
  userName = 'Alex Mercer',
  onAvatarClick,
  onMenuClick,
  className = '',
}: TopBarProps) {
  return (
    <header
      className={`h-16 border-b border-[#1E1D2A] bg-[#0E0D14] px-4 sm:px-6 flex items-center justify-between flex-shrink-0 select-none z-10 ${className}`}
      aria-label="Application header"
    >
      {/* Left Area: Mobile Menu Toggle + Page Title */}
      <div className="flex items-center gap-3 min-w-0">
        {onMenuClick && (
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 rounded-lg text-[#8898AA] hover:text-white hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C65FF]"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}

        <h1 className="text-base sm:text-lg font-bold text-white tracking-tight truncate">
          {title}
        </h1>
      </div>

      {/* Right Area: Search, Notifications, Avatar */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search Command Trigger */}
        <SearchTrigger onClick={onSearchClick} />

        {/* Notifications Icon Button */}
        <button
          type="button"
          onClick={onNotificationClick}
          aria-label="Notifications"
          className="relative w-9 h-9 rounded-lg bg-[#16151F] border border-[#252433] hover:border-[#3E3D52] flex items-center justify-center text-[#8898AA] hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C65FF] focus-visible:ring-offset-1 focus-visible:ring-offset-[#0E0D14]"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.75"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>

          {hasNotifications && (
            <span
              className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#7C65FF]"
              aria-label="New notifications available"
            />
          )}
        </button>

        {/* User Avatar */}
        <button
          type="button"
          onClick={onAvatarClick}
          aria-label={`${userName}'s profile`}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-white/10 hover:ring-[#7C65FF] transition-all bg-[#282736] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C65FF] cursor-pointer"
        >
          {userAvatarUrl ? (
            <img
              src={userAvatarUrl}
              alt={userName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-[#7C65FF]/40 to-[#6344E7]/40 text-white font-semibold text-xs">
              {userName
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)}
            </div>
          )}
        </button>
      </div>
    </header>
  );
}
