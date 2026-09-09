'use client';

import React from 'react';
import { RadioCardOption } from './types';

export interface RadioCardGroupProps {
  /**
   * Radio card options.
   */
  options: RadioCardOption[];
  /**
   * Currently active option ID.
   */
  value: string;
  /**
   * Selection change callback.
   */
  onValueChange: (id: string) => void;
  /**
   * Layout orientation: horizontal (default) or vertical.
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Accessible group label. Defaults to "Options".
   */
  ariaLabel?: string;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Segmented radio card group primitive with full keyboard accessibility.
 * Supports horizontal and vertical orientations with roving arrow keys.
 */
export function RadioCardGroup({
  options,
  value,
  onValueChange,
  orientation = 'horizontal',
  ariaLabel = 'Options',
  className = '',
}: RadioCardGroupProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'].includes(e.key)) {
      e.preventDefault();
      const currentIndex = options.findIndex((opt) => opt.id === value);
      if (currentIndex === -1) return;

      let nextIndex = currentIndex;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        nextIndex = (currentIndex + 1) % options.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        nextIndex = (currentIndex - 1 + options.length) % options.length;
      }

      onValueChange(options[nextIndex].id);
    }
  };

  const layoutClass =
    orientation === 'vertical'
      ? 'flex flex-col gap-3'
      : 'grid grid-cols-1 sm:grid-cols-2 gap-4';

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      aria-orientation={orientation}
      onKeyDown={handleKeyDown}
      className={`w-full ${layoutClass} ${className}`}
    >
      {options.map((opt) => {
        const isSelected = value === opt.id;

        return (
          <div
            key={opt.id}
            role="radio"
            aria-checked={isSelected}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => onValueChange(opt.id)}
            className={`rounded-xl p-3.5 bg-[#13121D] border flex items-center justify-between gap-3 cursor-pointer select-none transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C65FF] ${
              isSelected
                ? 'border-[#7C65FF] shadow-[0_0_16px_rgba(124,101,255,0.14)]'
                : 'border-[#1E1D2A] hover:border-[#282736]'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              {/* Radio Dot Indicator */}
              <div
                aria-hidden="true"
                className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                  isSelected
                    ? 'border-2 border-[#7C65FF]'
                    : 'border border-[#3E3D4D] bg-transparent'
                }`}
              >
                {isSelected && (
                  <div className="w-2 h-2 rounded-full bg-[#7C65FF]" />
                )}
              </div>

              {/* Label & Description */}
              <div className="min-w-0">
                <span
                  className={`text-xs sm:text-sm font-semibold tracking-tight truncate block ${
                    isSelected ? 'text-white' : 'text-[#8898AA]'
                  }`}
                >
                  {opt.label}
                </span>
                {opt.description && (
                  <p className="text-xs text-[#6B7280] mt-0.5 truncate">
                    {opt.description}
                  </p>
                )}
              </div>
            </div>

            {/* Optional Badge */}
            {opt.badge && (
              <div className="flex-shrink-0">{opt.badge}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
