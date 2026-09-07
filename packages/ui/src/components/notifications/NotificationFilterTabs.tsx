'use client';

import React from 'react';
import { NotificationFilterTab } from './types';

export const defaultNotificationFilterTabs: NotificationFilterTab[] = [
  { value: 'all', label: 'All' },
  { value: 'mentions', label: 'Mentions' },
  { value: 'threads', label: 'Threads' },
  { value: 'reactions', label: 'Reactions' },
];

export interface NotificationFilterTabsProps {
  /**
   * List of available filter tabs.
   */
  tabs?: NotificationFilterTab[];
  /**
   * Currently active tab value.
   */
  value: string;
  /**
   * Callback fired when a tab is clicked.
   */
  onValueChange: (value: string) => void;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Controlled horizontal filter pill tabs for notifications.
 */
export function NotificationFilterTabs({
  tabs = defaultNotificationFilterTabs,
  value,
  onValueChange,
  className = '',
}: NotificationFilterTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Notification filters"
      className={`flex items-center gap-2 flex-wrap ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = tab.value === value;
        return (
          <button
            key={tab.value}
            role="tab"
            type="button"
            aria-selected={isActive}
            onClick={() => onValueChange(tab.value)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C65FF] flex items-center gap-1.5 ${
              isActive
                ? 'bg-[#13121D] text-white border border-[#7C65FF] shadow-sm shadow-[#7C65FF]/10'
                : 'bg-[#16151F] text-[#8898AA] border border-[#282736] hover:text-white hover:border-[#3E3D52]'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`text-[10px] font-semibold px-1.5 py-0.2 rounded-full ${
                  isActive
                    ? 'bg-[#7C65FF]/20 text-[#A594FD]'
                    : 'bg-[#282736] text-[#8898AA]'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
