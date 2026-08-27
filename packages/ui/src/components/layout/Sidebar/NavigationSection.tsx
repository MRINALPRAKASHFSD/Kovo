'use client';

import React from 'react';

export interface NavigationSectionProps {
  /**
   * Title of the navigation section (e.g. "CHANNELS", "WORKSPACE").
   */
  title: string;
  /**
   * Optional right-aligned action element (e.g. '+' add button).
   */
  action?: React.ReactNode;
  /**
   * Child items (SidebarItems, channels, etc.).
   */
  children: React.ReactNode;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Extensible sidebar section wrapper with tracked uppercase header and optional action button.
 */
export function NavigationSection({
  title,
  action,
  children,
  className = '',
}: NavigationSectionProps) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex items-center justify-between px-3">
        <span className="text-[11px] font-semibold text-[#5A6578] tracking-wider uppercase select-none">
          {title}
        </span>
        {action && (
          <div className="flex items-center text-[#5A6578] hover:text-white transition-colors">
            {action}
          </div>
        )}
      </div>

      <div className="space-y-0.5">{children}</div>
    </div>
  );
}
