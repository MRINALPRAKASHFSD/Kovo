'use client';

import React from 'react';

export interface GreetingSectionProps {
  /**
   * Main greeting title (e.g. "Good morning, Alex").
   */
  title: React.ReactNode;
  /**
   * Optional descriptive subtitle text (e.g. "Here's your huddle status for today.").
   */
  subtitle?: React.ReactNode;
  /**
   * Optional leading element (e.g. weather icon, avatar, brand badge).
   */
  leading?: React.ReactNode;
  /**
   * Optional trailing element or quick action (e.g. status badge, date picker, CTA).
   */
  trailing?: React.ReactNode;
  /**
   * Optional action button slot (alias for trailing or action button below).
   */
  action?: React.ReactNode;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Reusable hero greeting section for mobile and desktop dashboards.
 * Displays title, subtitle, and extensible leading/trailing slots.
 */
export function GreetingSection({
  title,
  subtitle,
  leading,
  trailing,
  action,
  className = '',
}: GreetingSectionProps) {
  const rightSlot = trailing || action;

  return (
    <section className={`mb-6 select-none ${className}`} aria-label="Greeting header">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 min-w-0">
          {leading && <div className="flex-shrink-0 mt-1">{leading}</div>}
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-1.5 text-sm sm:text-base text-[#8898AA] leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {rightSlot && <div className="flex-shrink-0">{rightSlot}</div>}
      </div>
    </section>
  );
}
