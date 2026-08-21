'use client';

import React from 'react';

export type PresenceStatus = 'online' | 'offline' | 'busy' | 'away';

export interface PresenceIndicatorProps {
  /**
   * User presence state.
   */
  status?: PresenceStatus;
  /**
   * Size token for the indicator dot. Defaults to 'md'.
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

const statusColors: Record<PresenceStatus, string> = {
  online: 'bg-[#10B981]',
  offline: 'bg-[#6B7280]',
  busy: 'bg-[#EF4444]',
  away: 'bg-[#F59E0B]',
};

const statusLabels: Record<PresenceStatus, string> = {
  online: 'Online',
  offline: 'Offline',
  busy: 'Busy / Do Not Disturb',
  away: 'Away',
};

const sizeClasses: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'w-2 h-2',
  md: 'w-2.5 h-2.5',
  lg: 'w-3 h-3',
};

/**
 * Standardized status dot representing user connectivity / activity.
 */
export function PresenceIndicator({
  status = 'offline',
  size = 'md',
  className = '',
}: PresenceIndicatorProps) {
  return (
    <span
      role="status"
      aria-label={statusLabels[status]}
      className={`rounded-full ring-2 ring-[#0E0D14] flex-shrink-0 inline-block ${statusColors[status]} ${sizeClasses[size]} ${className}`}
    />
  );
}
