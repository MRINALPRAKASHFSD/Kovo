'use client';

import React from 'react';

export interface DashboardHeaderProps {
  /**
   * Main page heading (e.g. "Good morning, Alex").
   */
  title: string;
  /**
   * Optional descriptive subtitle text.
   */
  subtitle?: string;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Reusable page greeting / header component for authenticated views.
 */
export function DashboardHeader({
  title,
  subtitle,
  className = '',
}: DashboardHeaderProps) {
  return (
    <div className={`mb-8 select-none ${className}`}>
      <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-1 text-xs sm:text-sm text-[#8898AA]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
