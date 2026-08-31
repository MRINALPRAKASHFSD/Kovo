'use client';

import React from 'react';

export interface CommandSearchProps {
  /**
   * Current controlled search query value.
   */
  value: string;
  /**
   * Callback fired when the search query changes.
   */
  onChange: (value: string) => void;
  /**
   * Optional callback fired when the ESC close button is triggered.
   */
  onClose?: () => void;
  /**
   * Placeholder text. Default is "Search commands, files, or people...".
   */
  placeholder?: string;
  /**
   * Whether to automatically focus the search input on mount. Defaults to false.
   */
  autoFocus?: boolean;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Top search input for the Command Palette.
 * Features a glowing purple indicator, controlled input, and accessible ESC button.
 */
export function CommandSearch({
  value,
  onChange,
  onClose,
  placeholder = 'Search commands, files, or people...',
  autoFocus = false,
  className = '',
}: CommandSearchProps) {
  return (
    <div
      className={`h-14 px-4 sm:px-5 border-b border-[#1E1D2A] bg-[#13121D] flex items-center justify-between flex-shrink-0 select-none ${className}`}
    >
      <div className="flex items-center flex-1 min-w-0 mr-3">
        {/* Leading glowing purple indicator matching reference */}
        <span
          className="w-2.5 h-2.5 rounded-full bg-[#7C65FF] shadow-[0_0_8px_rgba(124,101,255,0.8)] mr-3.5 flex-shrink-0"
          aria-hidden="true"
        />

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          aria-label={placeholder}
          className="w-full bg-transparent text-sm text-white placeholder-[#6B7280] focus:outline-none"
        />
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close command palette"
          className="inline-flex items-center justify-center p-1 rounded-md text-[#6B7280] hover:text-white hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7C65FF]"
        >
          <kbd className="text-[10px] font-mono border border-[#282736] bg-[#1A1926] text-[#8898AA] px-1.5 py-0.5 rounded leading-none select-none">
            ESC
          </kbd>
        </button>
      )}
    </div>
  );
}
