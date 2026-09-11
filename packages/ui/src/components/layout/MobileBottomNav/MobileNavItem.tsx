'use client';

import React from 'react';

export interface MobileNavItemProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  badge?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * Individual touch-friendly item within the mobile bottom navigation bar.
 * Enforces a minimum 44x44pt touch target and accessible states.
 */
export function MobileNavItem({
  id,
  label,
  icon,
  active = false,
  badge,
  disabled = false,
  onClick,
  className = '',
}: MobileNavItemProps) {
  return (
    <button
      type="button"
      id={`nav-item-${id}`}
      aria-label={label}
      aria-current={active ? 'page' : undefined}
      disabled={disabled}
      onClick={onClick}
      className={`relative min-h-[44px] min-w-[44px] flex flex-col items-center justify-center gap-1 py-1 px-2 select-none transition-colors duration-150 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C65FF] disabled:opacity-40 disabled:cursor-not-allowed ${
        active
          ? 'text-[#7C65FF] font-semibold'
          : 'text-[#8898AA] hover:text-white font-medium'
      } ${className}`}
    >
      <span className="relative flex items-center justify-center w-5 h-5 flex-shrink-0">
        {icon}
        {badge && (
          <span className="absolute -top-1 -right-2 flex-shrink-0">
            {typeof badge === 'string' || typeof badge === 'number' ? (
              <span className="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-[#7C65FF] text-white leading-none">
                {badge}
              </span>
            ) : (
              badge
            )}
          </span>
        )}
      </span>
      <span className="text-[11px] tracking-tight leading-none text-center">
        {label}
      </span>
    </button>
  );
}
