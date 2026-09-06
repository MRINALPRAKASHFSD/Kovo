'use client';

import React from 'react';
import { MeetingControlButtonVariant } from './types';

export interface MeetingControlButtonProps {
  /**
   * Action icon element.
   */
  icon: React.ReactNode;
  /**
   * Optional text label displayed alongside or inside the button (e.g. "Leave Call").
   */
  label?: string;
  /**
   * Visual button styling variant: 'default' | 'active' | 'danger'.
   */
  variant?: MeetingControlButtonVariant;
  /**
   * Convenience boolean flag for active state.
   */
  active?: boolean;
  /**
   * Convenience boolean flag for danger state.
   */
  danger?: boolean;
  /**
   * Accessible name for screen readers. Defaults to label.
   */
  ariaLabel?: string;
  /**
   * Click handler callback.
   */
  onClick?: () => void;
  /**
   * Whether the button is disabled.
   */
  disabled?: boolean;
  /**
   * Optional badge indicator.
   */
  badge?: React.ReactNode;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Accessible meeting action button with circular or pill layouts.
 * Supports default, active (purple), and danger (red) states with keyboard focus rings.
 */
export function MeetingControlButton({
  icon,
  label,
  variant = 'default',
  active = false,
  danger = false,
  ariaLabel,
  onClick,
  disabled = false,
  badge,
  className = '',
}: MeetingControlButtonProps) {
  const resolvedVariant: MeetingControlButtonVariant = danger
    ? 'danger'
    : active
    ? 'active'
    : variant;

  const accessibleName = ariaLabel || label || 'Meeting action';

  const baseStyles =
    'relative flex items-center justify-center font-semibold text-xs select-none transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C65FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09080E] disabled:opacity-40 disabled:cursor-not-allowed';

  // Variant styling
  const variantStyles = {
    default:
      'bg-[#1E1D2A] hover:bg-[#282736] text-white border border-white/5 active:scale-95',
    active:
      'bg-[#7C65FF] hover:bg-[#8D78FF] text-white shadow-lg shadow-[#7C65FF]/30 active:scale-95',
    danger:
      'bg-[#EF4444] hover:bg-[#DC2626] text-white shadow-lg shadow-[#EF4444]/25 active:scale-95',
  }[resolvedVariant];

  // If label is provided, render pill; otherwise render perfect circle
  const shapeStyles = label
    ? 'px-4 py-2.5 rounded-xl gap-2 h-10'
    : 'w-10 h-10 rounded-full p-2.5';

  return (
    <button
      type="button"
      aria-label={accessibleName}
      aria-pressed={resolvedVariant === 'active' ? true : undefined}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles} ${shapeStyles} ${className}`}
    >
      <span className="flex items-center justify-center w-5 h-5 flex-shrink-0">
        {icon}
      </span>
      {label && <span className="truncate">{label}</span>}
      {badge && <div className="absolute -top-1 -right-1">{badge}</div>}
    </button>
  );
}
