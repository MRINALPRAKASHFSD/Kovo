'use client';

import React from 'react';
import { KovoLogo } from '../../primitives/KovoLogo';
import { Avatar } from '../../primitives/Avatar';

export interface MobileTopBarProps {
  /**
   * Primary leading slot (e.g. Back button, custom menu trigger, or logo).
   * Takes precedence over logo if provided.
   */
  leading?: React.ReactNode;
  /**
   * Custom logo slot. Defaults to Kovo monogram.
   */
  logo?: React.ReactNode;
  /**
   * Primary header title (e.g. "Channels", "Dashboard", "Settings").
   * Takes precedence over workspaceName if provided.
   */
  title?: React.ReactNode;
  /**
   * Workspace title / brand name. Defaults to "Kovo".
   */
  workspaceName?: string;
  /**
   * Custom actions slot. If provided, replaces the default notification/avatar controls.
   */
  actions?: React.ReactNode;
  /**
   * Callback fired when the notification bell is clicked.
   */
  onNotificationClick?: () => void;
  /**
   * Whether an unread notification indicator dot is shown.
   */
  hasNotifications?: boolean;
  /**
   * Custom avatar node.
   */
  avatar?: React.ReactNode;
  /**
   * User full name for avatar initials fallback.
   */
  userName?: string;
  /**
   * User avatar image URL.
   */
  userAvatarUrl?: string;
  /**
   * Callback fired when avatar is clicked.
   */
  onAvatarClick?: () => void;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Pinned mobile header matching canonical KOVO mobile design.
 * Displays leading brand logo/back button, title, and quick-access actions/notification & avatar controls.
 */
export function MobileTopBar({
  leading,
  logo,
  title,
  workspaceName = 'Kovo',
  actions,
  onNotificationClick,
  hasNotifications = false,
  avatar,
  userName = 'Alex Mercer',
  userAvatarUrl,
  onAvatarClick,
  className = '',
}: MobileTopBarProps) {
  const defaultLogo = (
    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#7C65FF] to-[#6344E7] p-1 flex items-center justify-center shadow-md shadow-[#7C65FF]/20 flex-shrink-0">
      <KovoLogo variant="icon" className="w-5 h-5 object-contain" />
    </div>
  );

  const activeLeading =
    leading !== undefined ? leading : logo !== undefined ? logo : defaultLogo;
  const activeTitle = title !== undefined ? title : workspaceName;

  const defaultAvatar = avatar || (
    <Avatar
      name={userName}
      src={userAvatarUrl}
      size="sm"
      presence="online"
      onClick={onAvatarClick}
    />
  );

  return (
    <header
      className={`h-16 px-4 bg-[#09080E] border-b border-[#1E1D2A] flex items-center justify-between flex-shrink-0 select-none z-20 ${className}`}
      aria-label="Mobile workspace header"
    >
      {/* Left: Leading (Logo / Back Button) + Title */}
      <div className="flex items-center gap-2.5 min-w-0">
        {activeLeading}
        {typeof activeTitle === 'string' ? (
          <span className="text-lg font-bold text-white tracking-tight truncate">
            {activeTitle}
          </span>
        ) : (
          activeTitle
        )}
      </div>

      {/* Right: Actions or Built-in Notification & Avatar */}
      {actions ? (
        <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>
      ) : (
        <div className="flex items-center gap-2.5 flex-shrink-0">
          {/* Notification Bell Button (>=44x44 touch target) */}
          <button
            type="button"
            onClick={onNotificationClick}
            aria-label="View notifications"
            className="relative w-10 h-10 rounded-xl bg-[#151420] border border-[#262536] flex items-center justify-center text-[#8898AA] hover:text-white hover:border-[#7C65FF]/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C65FF]"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
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
                className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#7C65FF] ring-2 ring-[#09080E]"
                aria-label="Unread notifications"
              />
            )}
          </button>

          {/* User Avatar */}
          <div className="flex-shrink-0 cursor-pointer">{defaultAvatar}</div>
        </div>
      )}
    </header>
  );
}
