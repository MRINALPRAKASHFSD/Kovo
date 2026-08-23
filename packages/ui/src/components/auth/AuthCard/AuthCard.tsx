import React from 'react';

export interface AuthCardProps {
  /**
   * Content to display within the card.
   */
  children: React.ReactNode;
  /**
   * Additional CSS class names.
   */
  className?: string;
  /**
   * Optional custom test ID or HTML element type.
   */
  as?: React.ElementType;
}

/**
 * Surface container for authentication screens.
 * Features an elevated dark charcoal background (#13121A), subtle border,
 * and a deep soft drop-shadow matching the canonical enterprise design reference.
 */
export function AuthCard({
  children,
  className = '',
  as: Component = 'section',
}: AuthCardProps) {
  return (
    <Component
      className={`w-full max-w-[420px] rounded-2xl bg-[#13121A] border border-white/[0.08] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.5)] p-7 sm:p-8 relative ${className}`}
    >
      {children}
    </Component>
  );
}
