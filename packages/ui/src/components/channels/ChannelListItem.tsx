'use client';

import React from 'react';
import { Card } from '../primitives/Card';
import { ChannelData } from './types';

export type ChannelListItemVariant = 'default' | 'compact' | 'dense';

export interface ChannelListItemProps {
  /**
   * Channel data object.
   */
  channel: ChannelData;
  /**
   * Visual density variant. Defaults to 'default'.
   */
  variant?: ChannelListItemVariant;
  /**
   * Whether the channel item is currently selected.
   */
  selected?: boolean;
  /**
   * Whether the channel item is disabled.
   */
  disabled?: boolean;
  /**
   * Custom leading slot (overrides default hash icon).
   */
  leading?: React.ReactNode;
  /**
   * Custom trailing slot (overrides default unread badge).
   */
  trailing?: React.ReactNode;
  /**
   * Optional contextual metadata slot (e.g. 🔒 Private, 🔕 Muted, 👥 128 members).
   */
  metadata?: React.ReactNode;
  /**
   * Callback fired with the channel object when clicked.
   */
  onClick?: (channel: ChannelData) => void;
  /**
   * Callback fired with the channel id when selected.
   */
  onSelect?: (channelId: string) => void;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

const variantPadding: Record<ChannelListItemVariant, string> = {
  default: 'p-3.5 sm:p-4 rounded-2xl',
  compact: 'py-2.5 px-3.5 rounded-xl',
  dense: 'py-2 px-3 rounded-lg',
};

/**
 * Reusable channel list row supporting density variants, custom leading/trailing slots,
 * metadata badges, and keyboard accessibility.
 */
export function ChannelListItem({
  channel,
  variant = 'default',
  selected = false,
  disabled = false,
  leading,
  trailing,
  metadata,
  onClick,
  onSelect,
  className = '',
}: ChannelListItemProps) {
  const handleClick = () => {
    if (disabled) return;
    onClick?.(channel);
    onSelect?.(channel.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  // Default leading hash icon
  const defaultLeading = channel.icon || (
    <span
      className="text-[#8898AA] font-bold text-base sm:text-lg flex items-center justify-center w-5 select-none"
      aria-hidden="true"
    >
      #
    </span>
  );

  // Default trailing unread badge
  const unreadCount = channel.unreadCount;
  const defaultTrailing =
    unreadCount !== undefined && unreadCount > 0 ? (
      <span
        className="min-w-[20px] h-5 px-1.5 rounded-full bg-[#7C65FF] text-white text-[11px] font-semibold flex items-center justify-center select-none shadow-sm shadow-[#7C65FF]/30"
        aria-label={`${unreadCount} unread messages`}
      >
        {unreadCount > 99 ? '99+' : unreadCount}
      </span>
    ) : null;

  const cardVariant = selected
    ? 'elevated'
    : disabled
    ? 'outlined'
    : 'default';

  return (
    <Card
      variant={cardVariant}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
      role="button"
      aria-selected={selected}
      aria-disabled={disabled}
      className={`flex items-center justify-between gap-3 transition-all ${
        variantPadding[variant]
      } ${
        disabled
          ? 'opacity-50 cursor-not-allowed'
          : selected
          ? 'border-[#7C65FF] bg-[#1A182E] cursor-pointer'
          : 'hover:border-[#7C65FF]/40 hover:bg-[#181628] cursor-pointer'
      } ${className}`}
    >
      {/* Left: Leading Icon + Channel Details */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="flex-shrink-0">
          {leading !== undefined ? leading : defaultLeading}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm sm:text-base font-bold text-white tracking-tight truncate leading-tight">
              {channel.name.startsWith('#') ? channel.name.slice(1) : channel.name}
            </h3>
            {(metadata || channel.metadata) && (
              <div className="flex-shrink-0">
                {metadata || channel.metadata}
              </div>
            )}
          </div>

          {channel.description && (
            <p className="text-xs sm:text-sm text-[#8898AA] font-normal truncate leading-tight mt-0.5">
              {channel.description}
            </p>
          )}
        </div>
      </div>

      {/* Right: Trailing / Unread Badge */}
      {(trailing !== undefined || defaultTrailing) && (
        <div className="flex-shrink-0">
          {trailing !== undefined ? trailing : defaultTrailing}
        </div>
      )}
    </Card>
  );
}
