'use client';

import React from 'react';
import { Card } from '../../primitives/Card';
import { Avatar } from '../../primitives/Avatar';
import { ActivityFeedItem } from './types';

export interface RecentActivityItemProps extends ActivityFeedItem {}

/**
 * Single activity row composing the shared Card and Avatar primitives.
 */
export function RecentActivityItem({
  actor,
  title,
  subtitle,
  timestamp,
  unread,
  leading,
  trailing,
  onClick,
  className = '',
}: RecentActivityItemProps) {
  const defaultLeading = actor ? (
    <Avatar
      name={actor.name}
      src={actor.avatarUrl}
      presence={actor.presence}
      size="sm"
    />
  ) : null;

  const defaultTrailing = timestamp ? (
    <span className="text-xs text-[#8898AA] font-normal flex-shrink-0 select-none">
      {timestamp}
    </span>
  ) : null;

  return (
    <Card
      variant={onClick ? 'interactive' : 'default'}
      onClick={onClick}
      className={`p-3.5 sm:p-4 flex items-center justify-between gap-3 ${className}`}
    >
      <div className="flex items-center gap-3 min-w-0">
        {leading !== undefined ? leading : defaultLeading}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-sm sm:text-base font-semibold text-white tracking-tight truncate leading-tight">
              {title || actor?.name}
            </h3>
            {unread && (
              <span className="w-2 h-2 rounded-full bg-[#7C65FF] flex-shrink-0" />
            )}
          </div>
          <p className="text-xs sm:text-sm text-[#8898AA] font-normal truncate leading-tight mt-0.5">
            {subtitle}
          </p>
        </div>
      </div>

      {trailing !== undefined ? trailing : defaultTrailing}
    </Card>
  );
}

// Convenient alias for broader use (audit logs, feeds, summaries)
export const ActivityFeedRow = RecentActivityItem;
export type ActivityFeedRowProps = RecentActivityItemProps;
