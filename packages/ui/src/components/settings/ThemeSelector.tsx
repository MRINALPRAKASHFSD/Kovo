'use client';

import React from 'react';
import { ThemeOption } from './types';
import { ThemeCard } from './ThemeCard';

export interface ThemeSelectorProps {
  /**
   * Currently selected theme ID.
   */
  value: string;
  /**
   * Selection change callback.
   */
  onValueChange: (themeId: string) => void;
  /**
   * List of theme options with slot-driven previews.
   */
  options: ThemeOption[];
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Grid layout and selection controller for themes.
 * Renders slot-driven ThemeCard components and handles arrow key keyboard navigation.
 */
export function ThemeSelector({
  value,
  onValueChange,
  options,
  className = '',
}: ThemeSelectorProps) {
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

  return (
    <div
      role="radiogroup"
      aria-label="Theme Selection"
      onKeyDown={handleKeyDown}
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full ${className}`}
    >
      {options.map((option) => (
        <ThemeCard
          key={option.id}
          id={option.id}
          title={option.title}
          selected={value === option.id}
          onSelect={() => onValueChange(option.id)}
          preview={option.preview}
          description={option.description}
          footer={option.footer}
        />
      ))}
    </div>
  );
}
