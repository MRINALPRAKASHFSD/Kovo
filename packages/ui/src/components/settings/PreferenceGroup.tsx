'use client';

import React from 'react';

export interface PreferenceGroupProps {
  /**
   * Optional group title.
   */
  title?: string;
  /**
   * Optional descriptive text.
   */
  description?: string;
  /**
   * Group content / preference fields.
   */
  children: React.ReactNode;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Visual grouping container for related preference fields within a settings section.
 */
export function PreferenceGroup({
  title,
  description,
  children,
  className = '',
}: PreferenceGroupProps) {
  const groupId = title
    ? `pref-grp-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
    : undefined;

  return (
    <div
      role="group"
      aria-labelledby={groupId}
      className={`w-full space-y-4 ${className}`}
    >
      {title && (
        <div className="select-none">
          <h4 id={groupId} className="text-sm font-semibold text-white tracking-tight">
            {title}
          </h4>
          {description && (
            <p className="text-xs text-[#8898AA] mt-0.5 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="space-y-4">{children}</div>
    </div>
  );
}
