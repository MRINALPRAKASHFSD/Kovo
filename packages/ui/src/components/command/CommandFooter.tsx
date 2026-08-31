'use client';

import React from 'react';

export interface CommandFooterProps {
  /**
   * Label for enter key selection hint. Default is "to select".
   */
  selectHint?: string;
  /**
   * Label for arrow keys navigation hint. Default is "to navigate".
   */
  navigateHint?: string;
  /**
   * Branding text displayed on the right. Default is "KOVO Command Palette".
   */
  brandText?: string;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Bottom legend for the Command Palette.
 * Displays keyboard shortcut hints (Enter to select, Up/Down to navigate) and brand label.
 */
export function CommandFooter({
  selectHint = 'to select',
  navigateHint = 'to navigate',
  brandText = 'KOVO Command Palette',
  className = '',
}: CommandFooterProps) {
  return (
    <footer
      className={`h-10 px-4 border-t border-[#1E1D2A] bg-[#0E0D14] flex items-center justify-between text-xs text-[#6B7280] select-none flex-shrink-0 ${className}`}
      aria-label="Command palette legend"
    >
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-1.5">
          <kbd className="font-mono bg-[#1E1D2A] border border-[#282736] px-1 py-0.5 rounded text-[10px] text-[#A0AEC0] leading-none">
            ↵
          </kbd>
          <span>{selectHint}</span>
        </span>

        <span className="inline-flex items-center gap-1.5">
          <kbd className="font-mono bg-[#1E1D2A] border border-[#282736] px-1 py-0.5 rounded text-[10px] text-[#A0AEC0] leading-none">
            ↑↓
          </kbd>
          <span>{navigateHint}</span>
        </span>
      </div>

      <span className="text-[11px] font-medium text-[#6B7280]">
        {brandText}
      </span>
    </footer>
  );
}
