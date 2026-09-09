'use client';

import React, { useId } from 'react';

export interface PreferenceFieldProps {
  /**
   * Field label describing the preference control.
   */
  label: string;
  /**
   * Optional supporting description text.
   */
  description?: string;
  /**
   * The preference control component (slider, switch, color picker, etc.).
   */
  children: React.ReactNode;
  /**
   * Optional layout orientation: stacked (default) or horizontal.
   */
  layout?: 'stacked' | 'horizontal';
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Standardized field wrapper for individual preference controls.
 * Ensures consistent typographic hierarchy, spacing, and accessible labeling.
 */
export function PreferenceField({
  label,
  description,
  children,
  layout = 'stacked',
  className = '',
}: PreferenceFieldProps) {
  const generatedId = useId();
  const labelId = `pref-lbl-${generatedId}`;
  const descId = description ? `pref-desc-${generatedId}` : undefined;

  if (layout === 'horizontal') {
    return (
      <div
        className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-xl bg-[#13121D] border border-[#1E1D2A] ${className}`}
      >
        <div className="select-none min-w-0 flex-1">
          <label id={labelId} className="text-sm font-semibold text-white tracking-tight block">
            {label}
          </label>
          {description && (
            <p id={descId} className="text-xs text-[#8898AA] mt-0.5 leading-relaxed">
              {description}
            </p>
          )}
        </div>

        <div className="flex-shrink-0">{children}</div>
      </div>
    );
  }

  return (
    <div className={`w-full space-y-2.5 ${className}`}>
      <div className="select-none">
        <label id={labelId} className="text-sm font-semibold text-white tracking-tight block">
          {label}
        </label>
        {description && (
          <p id={descId} className="text-xs text-[#8898AA] mt-0.5 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      <div className="w-full">{children}</div>
    </div>
  );
}
