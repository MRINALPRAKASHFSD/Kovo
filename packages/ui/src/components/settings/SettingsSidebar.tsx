'use client';

import React from 'react';
import { SettingsNavigationItem } from './types';

export interface SettingsSidebarProps {
  /**
   * List of settings category items.
   */
  items: SettingsNavigationItem[];
  /**
   * Currently active category ID.
   */
  value: string;
  /**
   * Category change callback.
   */
  onValueChange: (id: string) => void;
  /**
   * Custom item render prop for badges, icons, and indicators.
   */
  renderItem?: (item: SettingsNavigationItem, active: boolean) => React.ReactNode;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Secondary navigation sidebar for settings categories.
 * Renders vertical navigation on desktop and a clean horizontal pill list on mobile.
 */
export function SettingsSidebar({
  items,
  value,
  onValueChange,
  renderItem,
  className = '',
}: SettingsSidebarProps) {
  return (
    <nav
      aria-label="Settings navigation"
      className={`w-full flex md:flex-col gap-1 overflow-x-auto md:overflow-x-visible scrollbar-none py-1 select-none ${className}`}
    >
      {items.map((item) => {
        const isActive = value === item.id;

        if (renderItem) {
          return (
            <React.Fragment key={item.id}>
              {renderItem(item, isActive)}
            </React.Fragment>
          );
        }

        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onValueChange(item.id)}
            className={`flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm transition-all duration-150 text-left whitespace-nowrap md:whitespace-normal flex-shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C65FF] ${
              isActive
                ? 'bg-[#1E1D2A] text-white font-semibold shadow-sm'
                : 'text-[#8898AA] hover:text-white hover:bg-white/[0.04] font-medium'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {item.icon && (
                <span
                  className={`flex-shrink-0 ${
                    isActive ? 'text-[#7C65FF]' : 'text-[#8898AA]'
                  }`}
                >
                  {item.icon}
                </span>
              )}
              <span className="truncate">{item.label}</span>
            </div>

            {item.badge && (
              <span className="flex-shrink-0 ml-auto">{item.badge}</span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
