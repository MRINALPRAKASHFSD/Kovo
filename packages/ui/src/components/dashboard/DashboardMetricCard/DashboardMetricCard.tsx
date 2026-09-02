'use client';

import React from 'react';
import { Card } from '../../primitives/Card';
import { DashboardMetricCardProps } from './types';

/**
 * Reusable metric card composing the shared Card primitive.
 * Displays an uppercase label, contextual icon, large metric value, and helper text.
 */
export function DashboardMetricCard({
  label,
  value,
  helperText,
  icon,
  onClick,
  className = '',
}: DashboardMetricCardProps) {
  return (
    <Card
      variant={onClick ? 'interactive' : 'default'}
      onClick={onClick}
      className={`p-4 sm:p-5 flex flex-col justify-between min-h-[116px] select-none ${className}`}
    >
      {/* Top Row: Label + Icon */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#8898AA]">
          {label}
        </span>
        {icon && (
          <div className="text-[#7C65FF] flex-shrink-0 flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>

      {/* Middle: Value */}
      <div className="my-1.5">
        <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-none">
          {value}
        </span>
      </div>

      {/* Bottom: Helper Text */}
      {helperText && (
        <div className="text-xs text-[#8898AA] font-normal leading-tight truncate">
          {helperText}
        </div>
      )}
    </Card>
  );
}
