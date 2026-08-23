import React from 'react';

export type SocialAuthProvider = 'google' | 'saml' | 'custom';

export interface SocialAuthButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Provider identifier ('google', 'saml', or 'custom').
   */
  provider?: SocialAuthProvider;
  /**
   * Custom icon element (overrides default provider icon).
   */
  icon?: React.ReactNode;
  /**
   * Additional CSS class names.
   */
  className?: string;
}

/**
 * Renders the provider icon matching the design reference.
 */
function ProviderIcon({ provider }: { provider?: SocialAuthProvider }) {
  if (provider === 'google') {
    return (
      <svg
        className="w-4 h-4 text-[#8E9CAE] flex-shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="m15 9-6 6" />
        <path d="m9 9 6 6" />
      </svg>
    );
  }

  if (provider === 'saml') {
    return (
      <svg
        className="w-4 h-4 text-[#8E9CAE] flex-shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="8" cy="15" r="4" />
        <path d="M11 12 20 3" />
        <path d="m16 4 3 3" />
        <path d="m13 7 2 2" />
      </svg>
    );
  }

  return null;
}

/**
 * Secondary authentication button for Enterprise SSO and social providers.
 * Adheres strictly to the 44px height, subtle hover translation (-translate-y-[1px]),
 * and restrained enterprise styling specified in the design reference.
 */
export function SocialAuthButton({
  provider = 'custom',
  icon,
  children,
  className = '',
  disabled,
  type = 'button',
  ...restProps
}: SocialAuthButtonProps) {
  return (
    <button
      {...restProps}
      type={type}
      disabled={disabled}
      className={`w-full h-11 flex items-center justify-center gap-2.5 rounded-lg bg-[#161520] hover:bg-[#1C1B28] border border-[#262534] hover:border-white/[0.14] text-xs font-medium text-[#E2E8F0] select-none transition-all duration-150 hover:-translate-y-[1px] active:translate-y-0 active:bg-[#13121D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C65FF] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:bg-[#161520] disabled:hover:border-[#262534] ${className}`}
    >
      {icon ? icon : <ProviderIcon provider={provider} />}
      <span>{children}</span>
    </button>
  );
}
