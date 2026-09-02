'use client';

import React from 'react';
import { ActivityFeedItem } from './types';
import { RecentActivityItem } from './ActivityItem';

export interface RecentActivitySectionProps {
  /**
   * Section heading title. Defaults to "Recent Activity".
   */
  title?: React.ReactNode;
  /**
   * Optional trailing action slot (e.g. "View all" link).
   */
  action?: React.ReactNode;
  /**
   * Array of activity feed items.
   */
  items?: ActivityFeedItem[];
  /**
   * Optional empty state node when items list is empty.
   */
  emptyState?: React.ReactNode;
  /**
   * Custom child nodes if rendering items directly.
   */
  children?: React.ReactNode;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Activity feed section rendering a list of RecentActivityItem cards with optional empty state.
 */
export function RecentActivitySection({
  title = 'Recent Activity',
  action,
  items,
  emptyState,
  children,
  className = '',
}: RecentActivitySectionProps) {
  const defaultEmpty = (
    <div className="p-8 text-center rounded-2xl border border-dashed border-[#282736] bg-[#13121C]/50 text-xs text-[#8898AA]">
      No recent activity to show.
    </div>
  );

  return (
    <section className={`mb-6 ${className}`} aria-label="Recent activity feed">
      <div className="flex items-center justify-between gap-4 mb-3">
        <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
          {title}
        </h2>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>

      <div className="space-y-2.5">
        {items ? (
          items.length > 0 ? (
            items.map((item) => <RecentActivityItem key={item.id} {...item} />)
          ) : (
            emptyState || defaultEmpty
          )
        ) : (
          children
        )}
      </div>
    </section>
  );
}
