'use client';

import React from 'react';

export interface ThemeCardProps {
  /**
   * Unique theme identifier.
   */
  id: string;
  /**
   * Display title for the theme.
   */
  title: string;
  /**
   * Whether this theme is currently active/selected.
   */
  selected: boolean;
  /**
   * Selection callback.
   */
  onSelect: () => void;
  /**
   * Slot for custom theme visual preview.
   */
  preview?: React.ReactNode;
  /**
   * Optional supporting description text.
   */
  description?: string;
  /**
   * Optional footer element (e.g., status tag, badge, or recommendation).
   */
  footer?: React.ReactNode;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Interactive card representing a theme option with a slot-driven preview.
 */
export function ThemeCard({
  id,
  title,
  selected,
  onSelect,
  preview,
  description,
  footer,
  className = '',
}: ThemeCardProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect();
    }
  };

  return (
    <div
      role="radio"
      aria-checked={selected}
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
      className={`relative rounded-xl p-3.5 bg-[#13121D] border transition-all duration-150 cursor-pointer select-none flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C65FF] ${
        selected
          ? 'border-[#7C65FF] shadow-[0_0_18px_rgba(124,101,255,0.18)]'
          : 'border-[#1E1D2A] hover:border-[#282736]'
      } ${className}`}
      data-theme-id={id}
    >
      <div>
        {/* Header: Title + Radio Indicator */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs sm:text-sm font-semibold text-white tracking-tight">
            {title}
          </span>

          <div
            aria-hidden="true"
            className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
              selected
                ? 'border-2 border-[#7C65FF]'
                : 'border border-[#3E3D4D] bg-transparent'
            }`}
          >
            {selected && (
              <div className="w-2 h-2 rounded-full bg-[#7C65FF]" />
            )}
          </div>
        </div>

        {description && (
          <p className="text-xs text-[#8898AA] mt-1 leading-normal">
            {description}
          </p>
        )}

        {/* Visual Preview Slot */}
        {preview && (
          <div className="mt-3 w-full rounded-lg overflow-hidden border border-white/5 bg-[#0E0D14]">
            {preview}
          </div>
        )}
      </div>

      {/* Footer Slot */}
      {footer && <div className="mt-3">{footer}</div>}
    </div>
  );
}
