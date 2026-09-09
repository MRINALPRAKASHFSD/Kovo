'use client';

import React from 'react';
import { AccentColorOption } from './types';

export interface AccentColorPickerProps {
  /**
   * Available accent color options.
   */
  colors: AccentColorOption[];
  /**
   * Currently selected color ID.
   */
  value: string;
  /**
   * Callback fired when color selection changes.
   */
  onValueChange: (colorId: string) => void;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Palette picker component for workspace and brand accent colors.
 * Displays accessible circular color swatches with active checkmark badge.
 */
export function AccentColorPicker({
  colors,
  value,
  onValueChange,
  className = '',
}: AccentColorPickerProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'].includes(e.key)) {
      e.preventDefault();
      const currentIndex = colors.findIndex((c) => c.id === value);
      if (currentIndex === -1) return;

      let nextIndex = currentIndex;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        nextIndex = (currentIndex + 1) % colors.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        nextIndex = (currentIndex - 1 + colors.length) % colors.length;
      }

      onValueChange(colors[nextIndex].id);
    }
  };

  return (
    <div
      role="radiogroup"
      aria-label="Accent Color Selection"
      onKeyDown={handleKeyDown}
      className={`flex items-center gap-3 flex-wrap ${className}`}
    >
      {colors.map((c) => {
        const isSelected = value === c.id;
        const colorBg = c.previewColor || c.color;

        return (
          <button
            key={c.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={c.label}
            title={c.label}
            onClick={() => onValueChange(c.id)}
            style={{ backgroundColor: colorBg }}
            className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-150 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E0D14] hover:scale-105 active:scale-95 ${
              isSelected
                ? 'ring-2 ring-white shadow-lg'
                : 'opacity-90 hover:opacity-100 ring-1 ring-white/15'
            }`}
          >
            {isSelected && (
              <svg
                className="w-4 h-4 text-white drop-shadow-sm"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            )}
          </button>
        );
      })}
    </div>
  );
}
