'use client';

import React from 'react';

export type ResendStatusState = 'countdown' | 'available' | 'sending';

export interface ResendStatusProps {
  /**
   * Presentational state of the resend action.
   * Default is 'countdown'.
   */
  status?: ResendStatusState;
  /**
   * Remaining seconds to display during 'countdown' state.
   * Default is 58.
   */
  countdownSeconds?: number;
  /**
   * Callback fired when the user clicks 'Resend Code' while available.
   */
  onResend?: () => void;
  /**
   * Whether the resend trigger is disabled.
   */
  disabled?: boolean;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Presentational resend status component.
 * Displays countdown, resend trigger button, or sending feedback without embedding timer logic.
 */
export function ResendStatus({
  status = 'countdown',
  countdownSeconds = 58,
  onResend,
  disabled = false,
  className = '',
}: ResendStatusProps) {
  return (
    <div
      className={`flex items-center justify-center gap-1 text-xs text-[#8898AA] select-none ${className}`}
      aria-live="polite"
    >
      <span>Didn&apos;t receive code?</span>

      {status === 'countdown' && (
        <span>
          Resend in{' '}
          <span className="text-[#7C65FF] font-medium">{`${countdownSeconds}s`}</span>
        </span>
      )}

      {status === 'available' && (
        <button
          type="button"
          onClick={onResend}
          disabled={disabled}
          className="text-[#7C65FF] hover:text-[#9482FF] font-medium underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7C65FF] rounded-sm transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Resend Code
        </button>
      )}

      {status === 'sending' && (
        <span className="text-[#8898AA] font-medium italic">Sending...</span>
      )}
    </div>
  );
}
