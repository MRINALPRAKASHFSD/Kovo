'use client';

import React from 'react';

export interface EmptyNotificationsProps {
  /**
   * Title heading for empty state. Default is "No notifications".
   */
  title?: string;
  /**
   * Detailed explanation or prompt. Default is "You're all caught up! Check back later for updates."
   */
  description?: string;
  /**
   * Optional action button label.
   */
  actionLabel?: string;
  /**
   * Callback fired when action button is clicked.
   */
  onAction?: () => void;
  /**
   * Custom decorative icon. Defaults to a bell icon.
   */
  icon?: React.ReactNode;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Presentational empty state displayed when there are no notifications in the selected view/filter.
 */
export function EmptyNotifications({
  title = 'No notifications',
  description = "You're all caught up! Check back later for updates.",
  actionLabel,
  onAction,
  icon,
  className = '',
}: EmptyNotificationsProps) {
  const defaultIcon = (
    <svg
      className="w-6 h-6 text-[#7C65FF]"
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
  );

  return (
    <div
      role="status"
      className={`w-full py-16 px-4 flex flex-col items-center justify-center text-center bg-[#13121D] border border-[#1E1D2A] rounded-2xl select-none ${className}`}
    >
      <div className="w-12 h-12 rounded-2xl bg-[#1A1926] border border-[#282736] flex items-center justify-center mb-4 shadow-sm">
        {icon || defaultIcon}
      </div>

      <h3 className="text-base font-semibold text-white tracking-tight mb-1">
        {title}
      </h3>

      <p className="text-xs text-[#8898AA] max-w-sm leading-relaxed">
        {description}
      </p>

      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-4 px-4 py-2 bg-[#7C65FF] hover:bg-[#684EFA] text-white rounded-lg text-xs font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C65FF]"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
