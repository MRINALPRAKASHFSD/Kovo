'use client';

import React from 'react';
import { UserStatus } from './types';

export interface StatusBadgeProps {
  /**
   * Current user presence status.
   */
  status?: UserStatus;
  /**
   * Custom label text. If not provided, defaults to capitalized status name.
   */
  label?: string;
  /**
   * Optional custom CSS class override for badge colors.
   */
  colorOverride?: string;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

const statusConfigs: Record<
  string,
  { dotColor: string; pillStyles: string; defaultLabel: string }
> = {
  active: {
    dotColor: 'bg-[#10B981]',
    pillStyles: 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/25',
    defaultLabel: 'Active',
  },
  offline: {
    dotColor: 'bg-[#6B7280]',
    pillStyles: 'bg-[#6B7280]/10 text-[#9CA3AF] border-[#6B7280]/25',
    defaultLabel: 'Offline',
  },
  away: {
    dotColor: 'bg-[#F59E0B]',
    pillStyles: 'bg-[#F59E0B]/10 text-[#FBBF24] border-[#F59E0B]/25',
    defaultLabel: 'Away',
  },
  busy: {
    dotColor: 'bg-[#EF4444]',
    pillStyles: 'bg-[#EF4444]/10 text-[#F87171] border-[#EF4444]/25',
    defaultLabel: 'Busy',
  },
};

/**
 * Reusable user presence status pill badge.
 * Supports active, offline, away, and busy variants with customizable labels and colors.
 */
export function StatusBadge({
  status = 'active',
  label,
  colorOverride,
  className = '',
}: StatusBadgeProps) {
  const config = statusConfigs[status] || statusConfigs.active;
  const displayLabel = label || config.defaultLabel;

  return (
    <span
      role="status"
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border select-none transition-colors ${
        colorOverride || config.pillStyles
      } ${className}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${config.dotColor} shadow-sm`}
        aria-hidden="true"
      />
      <span>{displayLabel}</span>
    </span>
  );
}
