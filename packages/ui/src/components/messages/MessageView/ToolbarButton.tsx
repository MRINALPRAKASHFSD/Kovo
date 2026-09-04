'use client';

import React from 'react';

export interface ToolbarButtonProps {
  /**
   * Icon element displayed inside the button.
   */
  icon: React.ReactNode;
  /**
   * Optional text label displayed next to the icon.
   */
  label?: string;
  /**
   * Accessible description for screen readers and tooltips.
   */
  'aria-label': string;
  /**
   * Optional title tooltip on hover.
   */
  title?: string;
  /**
   * Whether the button is in an active/toggled state (e.g. bold active).
   */
  active?: boolean;
  /**
   * Whether the button is disabled.
   */
  disabled?: boolean;
  /**
   * Click handler callback.
   */
  onClick?: () => void;
  /**
   * Button variant: 'ghost' (default for toolbar) or 'primary' (for send).
   */
  variant?: 'ghost' | 'primary';
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Reusable toolbar button primitive for message composer and action headers.
 */
export function ToolbarButton({
  icon,
  label,
  'aria-label': ariaLabel,
  title,
  active = false,
  disabled = false,
  onClick,
  variant = 'ghost',
  className = '',
}: ToolbarButtonProps) {
  const isPrimary = variant === 'primary';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      title={title || ariaLabel}
      aria-pressed={active ? 'true' : undefined}
      className={`inline-flex items-center justify-center rounded-lg text-xs font-medium transition-colors select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C65FF] disabled:opacity-40 disabled:pointer-events-none ${
        isPrimary
          ? 'bg-[#7C65FF] hover:bg-[#6852ED] text-white p-2 shadow-sm'
          : active
          ? 'bg-[#241F47] text-white p-1.5'
          : 'text-[#8898AA] hover:text-white hover:bg-white/5 p-1.5'
      } ${className}`}
    >
      <span className="w-4 h-4 flex items-center justify-center flex-shrink-0" aria-hidden="true">
        {icon}
      </span>
      {label && <span className="ml-1.5">{label}</span>}
    </button>
  );
}
