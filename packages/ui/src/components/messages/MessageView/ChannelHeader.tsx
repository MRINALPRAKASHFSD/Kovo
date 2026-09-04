'use client';

import React from 'react';

export interface ChannelHeaderProps {
  /**
   * Optional leading slot (e.g. Kovo monogram or custom icon).
   */
  leading?: React.ReactNode;
  /**
   * Channel or conversation title (e.g. "#engineering").
   */
  title: React.ReactNode;
  /**
   * Optional subtitle slot (e.g. "14 active developers").
   */
  subtitle?: React.ReactNode;
  /**
   * Optional badge or metadata slot (e.g. "128 members").
   */
  badge?: React.ReactNode;
  /**
   * Optional callback to open the mobile conversation drawer (< md).
   */
  onToggleDrawer?: () => void;
  /**
   * Composable actions slot on the right (e.g. Call, Pin, Search, More buttons).
   */
  actions?: React.ReactNode;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Pinned header for the active message channel/conversation.
 * Displays channel title, member count/metadata badge, and composable action buttons.
 */
export function ChannelHeader({
  leading,
  title,
  subtitle,
  badge,
  onToggleDrawer,
  actions,
  className = '',
}: ChannelHeaderProps) {
  return (
    <header
      className={`h-16 px-4 sm:px-6 border-b border-[#1E1D2A] bg-[#0E0D14] flex items-center justify-between flex-shrink-0 select-none z-10 ${className}`}
      aria-label="Conversation header"
    >
      {/* Left: Leading Slot + Drawer Trigger + Channel Title & Subtitle */}
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
        {leading ? (
          <div
            className={`flex-shrink-0 ${onToggleDrawer ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
            onClick={onToggleDrawer}
            role={onToggleDrawer ? 'button' : undefined}
            tabIndex={onToggleDrawer ? 0 : undefined}
            aria-label={onToggleDrawer ? 'Open conversation list' : undefined}
            onKeyDown={
              onToggleDrawer
                ? (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onToggleDrawer();
                    }
                  }
                : undefined
            }
          >
            {leading}
          </div>
        ) : onToggleDrawer ? (
          <button
            type="button"
            onClick={onToggleDrawer}
            aria-label="Open conversation list"
            className="md:hidden p-1.5 -ml-1.5 rounded-lg text-[#8898AA] hover:text-white hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C65FF]"
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
        ) : null}

        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight truncate leading-tight">
              {title}
            </h2>
            {badge && (
              <div className="flex-shrink-0">
                {typeof badge === 'string' ? (
                  <span className="text-xs text-[#8898AA] bg-[#1E1D2A]/80 border border-[#282736] px-2.5 py-0.5 rounded-full font-medium">
                    {badge}
                  </span>
                ) : (
                  badge
                )}
              </div>
            )}
          </div>
          {subtitle && (
            <div className="text-xs text-[#8898AA] font-normal truncate leading-tight mt-0.5">
              {subtitle}
            </div>
          )}
        </div>
      </div>

      {/* Right: Actions Slot (Flex container) */}
      {actions && (
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          {actions}
        </div>
      )}
    </header>
  );
}
