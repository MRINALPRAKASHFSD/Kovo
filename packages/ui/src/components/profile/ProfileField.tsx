'use client';

import React from 'react';

export interface ProfileFieldProps {
  /**
   * Uppercase field section label (e.g. "EMAIL ADDRESS", "LOCATION").
   */
  label: string;
  /**
   * Field value. Accepts strings, links, chips, or rich nodes.
   */
  value?: React.ReactNode;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Labeled profile metadata field.
 * Renders an uppercase tracked label and rich value node.
 */
export function ProfileField({
  label,
  value,
  className = '',
}: ProfileFieldProps) {
  if (value === undefined || value === null || value === '') return null;

  return (
    <div className={`flex flex-col space-y-1 text-left w-full ${className}`}>
      <span className="text-[11px] font-semibold text-[#6B6A7D] uppercase tracking-wider select-none">
        {label}
      </span>
      <div className="text-sm text-[#E2E8F0] font-normal leading-relaxed break-words">
        {value}
      </div>
    </div>
  );
}
