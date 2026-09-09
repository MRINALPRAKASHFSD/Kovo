'use client';

import React from 'react';
import { UserActivity } from './types';
import { ActivityItem } from './ActivityItem';

export interface ContributionsCardProps {
  /**
   * Section heading title. Defaults to "Recent Contributions".
   */
  title?: string;
  /**
   * List of activities / contributions to display.
   */
  contributions?: UserActivity[];
  /**
   * Optional alias for contributions.
   */
  activities?: UserActivity[];
  /**
   * Callback fired when clicking an activity item row.
   */
  onContributionClick?: (id: string) => void;
  /**
   * Optional custom children override.
   */
  children?: React.ReactNode;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Card section container displaying recent user contributions or activity history.
 */
export function ContributionsCard({
  title = 'Recent Contributions',
  contributions,
  activities,
  onContributionClick,
  children,
  className = '',
}: ContributionsCardProps) {
  const items = contributions || activities || [];

  return (
    <section className={`w-full ${className}`} aria-label={title}>
      {title && (
        <h3 className="text-base font-bold text-white mb-4 select-none tracking-tight">
          {title}
        </h3>
      )}

      <div className="bg-[#13121D] border border-[#1E1D2A] rounded-xl overflow-hidden divide-y divide-[#1E1D2A] shadow-sm">
        {children ? (
          children
        ) : (
          items.map((item) => (
            <ActivityItem
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              timestamp={item.timestamp}
              icon={item.icon}
              href={item.href}
              onClick={onContributionClick}
            />
          ))
        )}
      </div>
    </section>
  );
}

/**
 * Backward-compatibility alias for ContributionsCard.
 */
export const ActivityCard = ContributionsCard;
export type ActivityCardProps = ContributionsCardProps;
