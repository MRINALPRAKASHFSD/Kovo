'use client';

import React from 'react';
import { ConnectedAccount } from './types';

export interface ConnectedAccountCardProps {
  /**
   * Connected integration account details.
   */
  account: ConnectedAccount;
  /**
   * Callback fired when clicking the account card.
   */
  onClick?: (id: string) => void;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

const statusBadges: Record<string, { label: string; styles: string }> = {
  connected: {
    label: 'Connected',
    styles: 'text-[#10B981] bg-[#10B981]/10 border-[#10B981]/25',
  },
  inactive: {
    label: 'Inactive',
    styles: 'text-[#8898AA] bg-[#1E1D2A] border-[#282736]',
  },
  pending: {
    label: 'Pending',
    styles: 'text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/25',
  },
  expired: {
    label: 'Expired',
    styles: 'text-[#EF4444] bg-[#EF4444]/10 border-[#EF4444]/25',
  },
};

/**
 * Card primitive representing an external integration or connected account.
 */
export function ConnectedAccountCard({
  account,
  onClick,
  className = '',
}: ConnectedAccountCardProps) {
  const badgeConfig =
    statusBadges[account.status] || statusBadges.connected;

  const subtitle =
    account.username || account.email || 'Not linked';

  const handleClick = () => {
    onClick?.(account.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.(account.id);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`bg-[#13121D] border border-[#1E1D2A] rounded-xl p-4 flex flex-col justify-between hover:border-[#282736] transition-all duration-150 group cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7C65FF] select-none ${className}`}
      aria-label={`${account.displayName} (${badgeConfig.label})`}
    >
      {/* Top Bar: Icon + Status Pill */}
      <div className="flex items-center justify-between w-full">
        <div className="w-8 h-8 rounded-lg bg-[#1E1D2A] border border-[#282736] flex items-center justify-center text-white flex-shrink-0">
          {account.icon}
        </div>

        <span
          className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border select-none ${badgeConfig.styles}`}
        >
          {badgeConfig.label}
        </span>
      </div>

      {/* Account Info */}
      <div className="mt-3.5 min-w-0">
        <h4 className="text-sm font-semibold text-white truncate tracking-tight">
          {account.displayName}
        </h4>
        <p className="text-xs text-[#8898AA] mt-0.5 truncate">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
