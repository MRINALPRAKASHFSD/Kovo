'use client';

import React from 'react';

export interface ActivityItemProps {
  /**
   * Unique identifier for the activity or contribution.
   */
  id: string;
  /**
   * Activity title or event description.
   */
  title: React.ReactNode;
  /**
   * Optional supporting description, PR details, or channel note.
   */
  description?: React.ReactNode;
  /**
   * Formatted relative timestamp (e.g. "2h ago", "1d ago").
   */
  timestamp: string;
  /**
   * Activity type icon (e.g. code brackets, document icon).
   */
  icon?: React.ReactNode;
  /**
   * Optional destination URL or external link.
   */
  href?: string;
  /**
   * Callback fired when clicking the activity row.
   */
  onClick?: (id: string) => void;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Single activity / contribution event row.
 * Displays leading type icon badge, title, subtitle description, and right-aligned timestamp.
 */
export function ActivityItem({
  id,
  title,
  description,
  timestamp,
  icon,
  onClick,
  className = '',
}: ActivityItemProps) {
  const handleClick = () => {
    onClick?.(id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.(id);
    }
  };

  return (
    <article
      role="article"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`flex items-center justify-between gap-4 p-4 hover:bg-white/[0.02] transition-colors cursor-pointer select-none group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7C65FF] ${className}`}
    >
      <div className="flex items-center gap-3.5 min-w-0">
        {icon && (
          <div className="w-9 h-9 rounded-lg bg-[#1E1D2A] border border-[#282736] flex items-center justify-center text-[#7C65FF] flex-shrink-0 group-hover:border-[#7C65FF]/40 transition-colors">
            {icon}
          </div>
        )}

        <div className="min-w-0">
          <h4 className="text-sm font-semibold text-white tracking-tight break-words">
            {title}
          </h4>
          {description && (
            <p className="text-xs text-[#8898AA] mt-0.5 line-clamp-2 break-words">
              {description}
            </p>
          )}
        </div>
      </div>

      <span className="text-xs text-[#6B7280] font-normal flex-shrink-0 pl-2">
        {timestamp}
      </span>
    </article>
  );
}

/**
 * Backward-compatibility alias for ActivityItem.
 */
export const ContributionItem = ActivityItem;
export type ContributionItemProps = ActivityItemProps;
