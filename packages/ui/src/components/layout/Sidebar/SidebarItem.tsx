'use client';

import React from 'react';

export interface SidebarItemProps {
  /**
   * Text label for the navigation item.
   */
  label: string;
  /**
   * Icon element displayed before the label.
   */
  icon: React.ReactNode;
  /**
   * Whether the item is currently active.
   */
  active?: boolean;
  /**
   * Optional badge count or text (e.g. 3).
   */
  badge?: string | number;
  /**
   * Badge style variant. Default is 'primary' (brand violet).
   */
  badgeVariant?: 'primary' | 'muted';
  /**
   * Click handler for the item.
   */
  onClick?: () => void;
  /**
   * Optional link target if rendering as an anchor.
   */
  href?: string;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Reusable, route-agnostic sidebar navigation item.
 * Supports active states, leading icons, pill badges, and accessible focus states.
 */
export function SidebarItem({
  label,
  icon,
  active = false,
  badge,
  badgeVariant = 'primary',
  onClick,
  href,
  className = '',
}: SidebarItemProps) {
  const content = (
    <>
      <div className="flex items-center min-w-0 gap-2.5">
        <span
          className={`w-4 h-4 flex items-center justify-center flex-shrink-0 transition-colors duration-150 ${
            active ? 'text-[#7C65FF]' : 'text-[#8898AA] group-hover:text-white'
          }`}
          aria-hidden="true"
        >
          {icon}
        </span>
        <span className="truncate">{label}</span>
      </div>

      {badge !== undefined && (
        <span
          className={`text-[11px] font-semibold px-2 py-0.5 rounded-full min-w-[20px] text-center flex-shrink-0 ${
            badgeVariant === 'primary'
              ? 'bg-[#7C65FF] text-white'
              : 'bg-[#282736] text-[#8898AA]'
          }`}
        >
          {badge}
        </span>
      )}
    </>
  );

  const sharedClasses = `w-full px-3 py-2 rounded-lg flex items-center justify-between text-xs sm:text-sm font-medium transition-colors duration-150 select-none group text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C65FF] focus-visible:ring-offset-1 focus-visible:ring-offset-[#0E0D14] ${
    active
      ? 'bg-[#241F47] text-white'
      : 'text-[#8898AA] hover:text-white hover:bg-white/5'
  } ${className}`;

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        aria-current={active ? 'page' : undefined}
        className={sharedClasses}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={sharedClasses}
    >
      {content}
    </button>
  );
}
