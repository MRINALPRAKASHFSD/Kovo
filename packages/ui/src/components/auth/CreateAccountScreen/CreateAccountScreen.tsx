'use client';

import React, { useState } from 'react';
import { AuthLayout } from '../AuthLayout';
import { AuthCard } from '../AuthCard';
import { AuthHeader } from '../AuthHeader';
import { PasswordField } from '../PasswordField';
import { PasswordStrengthIndicator, PasswordStrength } from '../PasswordStrengthIndicator';
import { CheckboxField } from '../CheckboxField';

export interface CreateAccountFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

export interface CreateAccountScreenProps {
  /**
   * Initial full name.
   */
  defaultName?: string;
  /**
   * Initial email value.
   */
  defaultEmail?: string;
  /**
   * Initial password value.
   */
  defaultPassword?: string;
  /**
   * Initial confirm password value.
   */
  defaultConfirmPassword?: string;
  /**
   * Initial terms agreed state.
   */
  defaultAgreeTerms?: boolean;
  /**
   * Evaluated password strength tier passed by caller.
   * If not provided, dynamically computed via lightweight visual heuristics.
   */
  passwordStrength?: PasswordStrength | null;
  /**
   * Form submission callback.
   */
  onSubmit?: (e: React.FormEvent<HTMLFormElement>, data: CreateAccountFormData) => void;
  /**
   * Callback when "Sign in" footer link is clicked.
   */
  onSignInClick?: () => void;
  /**
   * Href for the "Sign in" footer link.
   */
  signInHref?: string;
  /**
   * Href for "Terms of Service" link.
   */
  termsHref?: string;
  /**
   * Href for "Privacy Policy" link.
   */
  privacyHref?: string;
  /**
   * Whether registration is in progress.
   */
  isLoading?: boolean;
  /**
   * Optional error notice to display above the form.
   */
  errorMessage?: string;
}

/**
 * Lightweight presentational strength heuristic fallback for preview/demo.
 */
function getPresentationalStrength(pwd: string): PasswordStrength | null {
  if (!pwd) return null;
  if (pwd.length < 6) return 'weak';
  if (pwd.length < 10) return 'fair';
  const hasMixed = /[a-z]/.test(pwd) && /[A-Z]/.test(pwd);
  const hasDigitOrSpecial = /[\d\W]/.test(pwd);
  if (hasMixed && hasDigitOrSpecial && pwd.length >= 12) return 'strong';
  if (hasMixed || hasDigitOrSpecial) return 'good';
  return 'fair';
}

/**
 * Complete KOVO Create Account registration screen matching the canonical design reference.
 * Purely presentational: states and submission are driven via props.
 */
export function CreateAccountScreen({
  defaultName = '',
  defaultEmail = '',
  defaultPassword = '',
  defaultConfirmPassword = '',
  defaultAgreeTerms = false,
  passwordStrength,
  onSubmit,
  onSignInClick,
  signInHref = '/login',
  termsHref = '#',
  privacyHref = '#',
  isLoading = false,
  errorMessage,
}: CreateAccountScreenProps) {
  const [name, setName] = useState(defaultName);
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState(defaultPassword);
  const [confirmPassword, setConfirmPassword] = useState(defaultConfirmPassword);
  const [agreeTerms, setAgreeTerms] = useState(defaultAgreeTerms);

  const effectiveStrength =
    passwordStrength !== undefined
      ? passwordStrength
      : getPresentationalStrength(password);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e, {
        name,
        email,
        password,
        confirmPassword,
        agreeTerms,
      });
    }
  };

  return (
    <AuthLayout ariaLabel="Create your KOVO Account">
      <AuthCard>
        {/* Brand Header */}
        <AuthHeader title="CREATE AN ACCOUNT" className="mb-7" />

        {/* Global Error Notice */}
        {errorMessage && (
          <div
            role="alert"
            className="mb-5 rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-xs text-red-300 text-center"
          >
            {errorMessage}
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Full Name Field */}
          <div className="text-left">
            <label
              htmlFor="full-name"
              className="block text-[11px] font-semibold uppercase tracking-wider text-[#7E8B9B] mb-2 select-none"
            >
              FULL NAME
            </label>
            <input
              id="full-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              disabled={isLoading}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe"
              className="w-full h-11 rounded-lg bg-[#1B1A24] border border-[#282736] px-3.5 text-sm text-white placeholder:text-[#5A6578] transition-all duration-150 focus:outline-none focus:border-[#7C65FF] focus:ring-1 focus:ring-[#7C65FF] disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Work Email Field */}
          <div className="text-left">
            <label
              htmlFor="work-email"
              className="block text-[11px] font-semibold uppercase tracking-wider text-[#7E8B9B] mb-2 select-none"
            >
              WORK EMAIL
            </label>
            <input
              id="work-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@company.com"
              className="w-full h-11 rounded-lg bg-[#1B1A24] border border-[#282736] px-3.5 text-sm text-white placeholder:text-[#5A6578] transition-all duration-150 focus:outline-none focus:border-[#7C65FF] focus:ring-1 focus:ring-[#7C65FF] disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Password Field + Presentational Strength Indicator */}
          <div>
            <PasswordField
              id="register-password"
              name="password"
              label="PASSWORD"
              autoComplete="new-password"
              required
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a strong password"
            />
            <PasswordStrengthIndicator strength={effectiveStrength} />
          </div>

          {/* Confirm Password Field */}
          <div>
            <PasswordField
              id="confirm-password"
              name="confirmPassword"
              label="CONFIRM PASSWORD"
              autoComplete="new-password"
              required
              disabled={isLoading}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
            />
          </div>

          {/* Terms Checkbox with Increased Optical Spacing (+6-8px) */}
          <div className="pt-2">
            <CheckboxField
              id="terms-checkbox"
              name="agreeTerms"
              checked={agreeTerms}
              disabled={isLoading}
              onChange={setAgreeTerms}
              required
            >
              I agree to the{' '}
              <a
                href={termsHref}
                className="text-[#7C65FF] hover:text-[#9482FF] font-medium underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7C65FF] rounded-sm"
              >
                Terms of Service
              </a>{' '}
              and{' '}
              <a
                href={privacyHref}
                className="text-[#7C65FF] hover:text-[#9482FF] font-medium underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7C65FF] rounded-sm"
              >
                Privacy Policy
              </a>
            </CheckboxField>
          </div>

          {/* Chunky Primary CTA Button (48px / h-12) */}
          <button
            type="submit"
            disabled={isLoading || !agreeTerms}
            className="w-full h-12 mt-6 rounded-lg bg-[#7C65FF] hover:bg-[#6D54FF] active:bg-[#6145FA] text-white font-medium text-sm select-none transition-all duration-150 hover:-translate-y-[0.5px] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C65FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#13121A] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Footer Link to Sign In */}
        <div className="mt-7 text-center text-xs text-[#8898AA] select-none">
          <span>Already have an account? </span>
          {signInHref ? (
            <a
              href={signInHref}
              onClick={(e) => {
                if (onSignInClick) {
                  e.preventDefault();
                  onSignInClick();
                }
              }}
              className="text-[#7C65FF] hover:text-[#9482FF] font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:underline"
            >
              Sign in
            </a>
          ) : (
            <button
              type="button"
              onClick={onSignInClick}
              className="text-[#7C65FF] hover:text-[#9482FF] font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:underline"
            >
              Sign in
            </button>
          )}
        </div>
      </AuthCard>
    </AuthLayout>
  );
}
