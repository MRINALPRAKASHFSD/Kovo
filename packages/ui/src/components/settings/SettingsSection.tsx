'use client';

import React from 'react';

export interface SettingsSectionProps {
  /**
   * Title heading for the settings section.
   */
  title: string;
  /**
   * Optional descriptive helper text displayed below the title.
   */
  description?: string;
  /**
   * Section content / controls.
   */
  children: React.ReactNode;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Top-level semantic section container for settings categories.
 */
export function SettingsSection({
  title,
  description,
  children,
  className = '',
}: SettingsSectionProps) {
  const titleId = `settings-sec-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

  return (
    <section aria-labelledby={titleId} className={`w-full ${className}`}>
      <div className="mb-4 select-none">
        <h3 id={titleId} className="text-base font-bold text-white tracking-tight">
          {title}
        </h3>
        {description && (
          <p className="text-xs text-[#8898AA] mt-1 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      <div className="w-full">{children}</div>
    </section>
  );
}
