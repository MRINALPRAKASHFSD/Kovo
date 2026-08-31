'use client';

import React from 'react';

export interface CommandSectionProps {
  /**
   * Uppercase section heading label.
   */
  title: string;
  /**
   * Child items (e.g. <CommandItem /> components).
   */
  children: React.ReactNode;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Grouped section for categorized command items.
 */
export function CommandSection({
  title,
  children,
  className = '',
}: CommandSectionProps) {
  return (
    <div role="group" aria-label={title} className={`space-y-0.5 ${className}`}>
      <div className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280] px-4 pt-3.5 pb-1.5 select-none">
        {title}
      </div>
      <div className="space-y-0.5">
        {children}
      </div>
    </div>
  );
}
