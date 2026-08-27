'use client';

import React from 'react';

export interface SidebarUserProfileCardProps {
  /**
   * User display name (e.g. "Alex Mercer").
   */
  name?: string;
  /**
   * User role or title (e.g. "Product Owner").
   */
  role?: string;
  /**
   * Optional custom avatar image URL.
   */
  avatarUrl?: string;
  /**
   * Callback fired when clicking the user profile area.
   */
  onClick?: () => void;
  /**
   * Callback fired when clicking the settings gear icon.
   */
  onSettingsClick?: () => void;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Pinned user profile footer in the sidebar.
 * Displays user avatar, name, title, and quick settings trigger.
 */
export function SidebarUserProfileCard({
  name = 'Alex Mercer',
  role = 'Product Owner',
  avatarUrl,
  onClick,
  onSettingsClick,
  className = '',
}: SidebarUserProfileCardProps) {
  return (
    <div
      className={`p-2.5 rounded-xl bg-[#16151F] border border-[#232230] flex items-center justify-between select-none ${className}`}
    >
      <div
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onClick={onClick}
        onKeyDown={
          onClick
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClick();
                }
              }
            : undefined
        }
        className={`flex items-center gap-2.5 min-w-0 flex-1 ${
          onClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''
        }`}
      >
        {/* Avatar */}
        <div className="relative w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 bg-[#282736] border border-white/10">
          {avatarUrl ? (
            <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-[#7C65FF]/40 to-[#6344E7]/40 text-white font-bold text-xs">
              {name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)}
            </div>
          )}
          {/* Online presence dot */}
          <span
            className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-[#16151F]"
            aria-label="Online"
          />
        </div>

        {/* User Details */}
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-semibold text-white truncate leading-tight">
            {name}
          </span>
          <span className="text-[10px] sm:text-[11px] text-[#8898AA] truncate">
            {role}
          </span>
        </div>
      </div>

      {/* Settings Action */}
      <button
        type="button"
        onClick={onSettingsClick}
        aria-label="Open settings"
        className="p-1.5 rounded-lg text-[#8898AA] hover:text-white hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7C65FF] flex-shrink-0 ml-1"
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
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
    </div>
  );
}
