'use client';

import React from 'react';
import { DashboardMetricCardData } from '../DashboardMetricCard/types';
import { DashboardMetricCard } from '../DashboardMetricCard/DashboardMetricCard';

export interface DashboardMetricGridProps {
  /**
   * Array of metric items to render.
   */
  items?: DashboardMetricCardData[];
  /**
   * Custom child nodes if rendering custom cards directly.
   */
  children?: React.ReactNode;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Responsive CSS grid container for dashboard metric cards.
 * Renders 2 columns on mobile/tablet and up to 4 columns on desktop.
 */
export function DashboardMetricGrid({
  items,
  children,
  className = '',
}: DashboardMetricGridProps) {
  return (
    <div
      className={`grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 ${className}`}
      aria-label="Dashboard metrics"
    >
      {items
        ? items.map((metric) => (
            <DashboardMetricCard key={metric.id} {...metric} />
          ))
        : children}
    </div>
  );
}
