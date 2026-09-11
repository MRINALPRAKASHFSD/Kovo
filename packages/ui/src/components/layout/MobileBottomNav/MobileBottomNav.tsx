'use client';

import React from 'react';
import { MobileBottomNavProps } from './types';
import { MobileNavItem } from './MobileNavItem';

/**
 * Mobile-first bottom navigation bar matching canonical KOVO mobile design.
 * Features safe area insets, iOS home indicator, active state styling, and touch-target enforcement.
 */
export function MobileBottomNav({
  items,
  value,
  onValueChange,
  orientation = 'horizontal',
  showHomeIndicator = true,
  className = '',
}: MobileBottomNavProps) {
  return (
    <nav
      role="navigation"
      aria-label="Mobile navigation"
      className={`w-full bg-[#0B0A11]/95 backdrop-blur-lg border-t border-[#1E1D2A] select-none flex-shrink-0 z-30 pb-[max(env(safe-area-inset-bottom,0px),8px)] ${className}`}
    >
      {/* Items Container */}
      <div
        className={`w-full max-w-lg mx-auto px-2 pt-1.5 flex ${
          orientation === 'vertical'
            ? 'flex-col items-center gap-1'
            : 'items-center justify-around'
        }`}
      >
        {items.map((item) => (
          <MobileNavItem
            key={item.id}
            id={item.id}
            label={item.label}
            icon={item.icon}
            badge={item.badge}
            disabled={item.disabled}
            active={value === item.id}
            onClick={() => onValueChange?.(item.id)}
          />
        ))}
      </div>

      {/* iOS Home Indicator Pill */}
      {showHomeIndicator && (
        <div
          className="w-32 h-1 bg-white/20 rounded-full mx-auto mt-2 mb-0.5 pointer-events-none"
          aria-hidden="true"
        />
      )}
    </nav>
  );
}
