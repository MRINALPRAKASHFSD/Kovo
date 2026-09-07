'use client';

import React from 'react';

export interface NotificationSectionProps {
  /**
   * Title or date grouping label (e.g. "TODAY", "YESTERDAY & EARLIER").
   */
  title: string;
  /**
   * Child notification items to render inside the section card.
   */
  children: React.ReactNode;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Section container for a group of notifications.
 * Renders an uppercase tracking header and a dark bordered card dividing rows.
 */
export function NotificationSection({
  title,
  children,
  className = '',
}: NotificationSectionProps) {
  return (
    <section className={`w-full ${className}`} aria-label={title}>
      <h2 className="text-[11px] font-semibold tracking-wider text-[#6B6A7D] uppercase mb-2.5 px-0.5 select-none">
        {title}
      </h2>

      <div className="bg-[#13121D] border border-[#1E1D2A] rounded-xl overflow-hidden divide-y divide-[#1E1D2A] shadow-sm">
        {children}
      </div>
    </section>
  );
}
