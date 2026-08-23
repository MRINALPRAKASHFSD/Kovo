'use client';

import React, { useState } from 'react';
import { AuthLayout } from '../AuthLayout';
import { AuthCard } from '../AuthCard';
import { AuthHeader } from '../AuthHeader';
import { OTPInput } from '../OTPInput';
import { ResendStatus, ResendStatusState } from '../ResendStatus';

export interface VerificationScreenProps {
  /**
   * Recipient email address displayed in the subtitle.
   * Default is 'alex@kovo.io'.
   */
  email?: string;
  /**
   * Total number of OTP digits.
   * Default is 6.
   */
  length?: number;
  /**
   * Controlled code value.
   */
  value?: string;
  /**
   * Callback invoked when the verification code updates.
   */
  onChange?: (code: string) => void;
  /**
   * Callback invoked upon form submission.
   */
  onSubmit?: (e: React.FormEvent<HTMLFormElement>, code: string) => void;
  /**
   * Resend timer / action state: 'countdown' | 'available' | 'sending'.
   * Default is 'countdown'.
   */
  resendStatus?: ResendStatusState;
  /**
   * Remaining seconds displayed in 'countdown' state.
   * Default is 58.
   */
  countdownSeconds?: number;
  /**
   * Callback invoked when 'Resend Code' is clicked.
   */
  onResend?: () => void;
  /**
   * Whether the verification request is currently processing.
   */
  isLoading?: boolean;
  /**
   * Optional error message displayed above the OTP fields.
   */
  errorMessage?: string;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Complete KOVO Email Verification (OTP) screen matching the canonical design reference.
 * Composes AuthLayout, AuthCard, AuthHeader, OTPInput, and ResendStatus into a
 * presentational, accessibility-compliant user experience.
 */
export function VerificationScreen({
  email = 'alex@kovo.io',
  length = 6,
  value,
  onChange,
  onSubmit,
  resendStatus = 'countdown',
  countdownSeconds = 58,
  onResend,
  isLoading = false,
  errorMessage,
  className = '',
}: VerificationScreenProps) {
  const isControlled = value !== undefined;
  const [internalCode, setInternalCode] = useState('');
  const currentCode = isControlled ? value : internalCode;

  const handleCodeChange = (nextCode: string) => {
    if (!isControlled) {
      setInternalCode(nextCode);
    }
    onChange?.(nextCode);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(e, currentCode);
  };

  return (
    <AuthLayout ariaLabel="Verify your email" className={className}>
      <AuthCard className="p-8 sm:p-9">
        {/* Brand Header with Natural Title Casing */}
        <AuthHeader
          title="Verify your email"
          isUppercase={false}
          titleClassName="text-lg sm:text-xl font-bold tracking-tight text-white mt-1"
          subtitle={
            <span className="text-xs text-[#8898AA]">
              We sent a secure code to{' '}
              <strong className="text-white font-medium">{email}</strong>
            </span>
          }
          className="mb-7"
        />

        {/* Global Error Notice */}
        {errorMessage && (
          <div
            role="alert"
            className="mb-5 p-3 rounded-lg bg-red-950/40 border border-red-800/50 text-red-200 text-xs text-center select-none"
          >
            {errorMessage}
          </div>
        )}

        {/* Verification Form */}
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
          {/* Segmented OTP Input */}
          <OTPInput
            id="verification-code"
            value={currentCode}
            onChange={handleCodeChange}
            length={length}
            disabled={isLoading}
            autoFocus
          />

          {/* Primary CTA Button (48px chunky CTA) */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 rounded-lg bg-gradient-to-r from-[#7C65FF] to-[#6344E7] text-white text-sm font-semibold tracking-wide shadow-[0_4px_16px_rgba(124,101,255,0.28)] hover:shadow-[0_6px_20px_rgba(124,101,255,0.36)] hover:brightness-105 active:scale-[0.99] transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C65FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#13121A] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:brightness-100 disabled:hover:shadow-none select-none flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Verifying...</span>
              </>
            ) : (
              'Verify & Continue'
            )}
          </button>

          {/* Resend Status Action */}
          <ResendStatus
            status={resendStatus}
            countdownSeconds={countdownSeconds}
            onResend={onResend}
            disabled={isLoading}
          />
        </form>
      </AuthCard>
    </AuthLayout>
  );
}
