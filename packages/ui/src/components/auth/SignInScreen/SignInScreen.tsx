'use client';

import React, { useState } from 'react';
import { AuthLayout } from '../AuthLayout';
import { AuthCard } from '../AuthCard';
import { AuthHeader } from '../AuthHeader';
import { PasswordField } from '../PasswordField';
import { AuthDivider } from '../AuthDivider';
import { SocialAuthButton } from '../SocialAuthButton';

export interface SignInScreenProps {
  /**
   * Optional initial email value (useful for redirects or remembered logins).
   */
  defaultEmail?: string;
  /**
   * Optional initial password value.
   */
  defaultPassword?: string;
  /**
   * Form submission callback.
   */
  onSubmit?: (e: React.FormEvent<HTMLFormElement>, data: { email: string; password: string }) => void;
  /**
   * Callback when "Continue with Google" is clicked.
   */
  onGoogleSignIn?: () => void;
  /**
   * Callback when "Single Sign-On (SAML)" is clicked.
   */
  onSamlSignIn?: () => void;
  /**
   * Callback when "Forgot password?" is clicked.
   */
  onForgotPasswordClick?: () => void;
  /**
   * Callback when "Create an account" is clicked.
   */
  onCreateAccountClick?: () => void;
  /**
   * Href for "Forgot password?" if rendering as an anchor.
   */
  forgotPasswordHref?: string;
  /**
   * Href for "Create an account" if rendering as an anchor.
   */
  createAccountHref?: string;
  /**
   * Whether authentication is currently in progress.
   */
  isLoading?: boolean;
  /**
   * Optional error message to display at form top.
   */
  errorMessage?: string;
}

/**
 * Complete KOVO Sign In screen matching the canonical design reference.
 * Composes AuthLayout, AuthCard, AuthHeader, PasswordField, AuthDivider,
 * and SocialAuthButton into an accessible, responsive enterprise sign-in interface.
 */
export function SignInScreen({
  defaultEmail = '',
  defaultPassword = '',
  onSubmit,
  onGoogleSignIn,
  onSamlSignIn,
  onForgotPasswordClick,
  onCreateAccountClick,
  forgotPasswordHref = '/forgot-password',
  createAccountHref = '/register',
  isLoading = false,
  errorMessage,
}: SignInScreenProps) {
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState(defaultPassword);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e, { email, password });
    }
  };

  return (
    <AuthLayout ariaLabel="Sign In to KOVO">
      <AuthCard>
        {/* Brand Header */}
        <AuthHeader title="SIGN IN TO KOVO" className="mb-7" />

        {/* Global Error Notice if applicable */}
        {errorMessage && (
          <div
            role="alert"
            className="mb-5 rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-xs text-red-300 text-center"
          >
            {errorMessage}
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Enterprise Email Field */}
          <div className="text-left">
            <label
              htmlFor="enterprise-email"
              className="block text-[11px] font-semibold uppercase tracking-wider text-[#7E8B9B] mb-2 select-none"
            >
              ENTERPRISE EMAIL
            </label>
            <input
              id="enterprise-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@kovo.io"
              className="w-full h-11 rounded-lg bg-[#1B1A24] border border-[#282736] px-3.5 text-sm text-white placeholder:text-[#5A6578] transition-all duration-150 focus:outline-none focus:border-[#7C65FF] focus:ring-1 focus:ring-[#7C65FF] disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Password Field */}
          <div>
            <PasswordField
              id="password"
              name="password"
              label="PASSWORD"
              autoComplete="current-password"
              required
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="supersecretpass"
            />

            {/* Forgot Password Link */}
            <div className="mt-2 text-right">
              {forgotPasswordHref ? (
                <a
                  href={forgotPasswordHref}
                  onClick={(e) => {
                    if (onForgotPasswordClick) {
                      e.preventDefault();
                      onForgotPasswordClick();
                    }
                  }}
                  className="text-xs text-[#7C65FF] hover:text-[#9482FF] font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:underline"
                >
                  Forgot password?
                </a>
              ) : (
                <button
                  type="button"
                  onClick={onForgotPasswordClick}
                  className="text-xs text-[#7C65FF] hover:text-[#9482FF] font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:underline"
                >
                  Forgot password?
                </button>
              )}
            </div>
          </div>

          {/* Primary Sign In Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 mt-6 rounded-lg bg-[#7C65FF] hover:bg-[#6D54FF] active:bg-[#6145FA] text-white font-medium text-sm select-none transition-all duration-150 hover:-translate-y-[0.5px] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C65FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#13121A] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* Divider */}
        <AuthDivider label="OR" />

        {/* Alternative Sign-In Options */}
        <div className="space-y-3">
          <SocialAuthButton
            provider="google"
            disabled={isLoading}
            onClick={onGoogleSignIn}
          >
            Continue with Google
          </SocialAuthButton>

          <SocialAuthButton
            provider="saml"
            disabled={isLoading}
            onClick={onSamlSignIn}
          >
            Single Sign-On (SAML)
          </SocialAuthButton>
        </div>

        {/* Create Account Footer */}
        <div className="mt-7 text-center text-xs text-[#8898AA] select-none">
          <span>New to the platform? </span>
          {createAccountHref ? (
            <a
              href={createAccountHref}
              onClick={(e) => {
                if (onCreateAccountClick) {
                  e.preventDefault();
                  onCreateAccountClick();
                }
              }}
              className="text-[#7C65FF] hover:text-[#9482FF] font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:underline"
            >
              Create an account
            </a>
          ) : (
            <button
              type="button"
              onClick={onCreateAccountClick}
              className="text-[#7C65FF] hover:text-[#9482FF] font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:underline"
            >
              Create an account
            </button>
          )}
        </div>
      </AuthCard>
    </AuthLayout>
  );
}
