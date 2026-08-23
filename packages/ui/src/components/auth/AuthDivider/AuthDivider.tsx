import React from 'react';

export interface AuthDividerProps {
  /**
   * Label to display in the center of the divider (defaults to "OR").
   */
  label?: string;
  /**
   * Additional CSS class names.
   */
  className?: string;
}

/**
 * Accessible horizontal divider with a centered label for separating authentication options.
 */
export function AuthDivider({
  label = 'OR',
  className = '',
}: AuthDividerProps) {
  return (
    <div
      role="separator"
      aria-label={label}
      className={`relative my-6 flex items-center select-none ${className}`}
    >
      <div className="flex-grow border-t border-white/[0.08]" />
      {label && (
        <span className="flex-shrink mx-3 text-[11px] font-semibold uppercase tracking-widest text-[#5A6578]">
          {label}
        </span>
      )}
      <div className="flex-grow border-t border-white/[0.08]" />
    </div>
  );
}
