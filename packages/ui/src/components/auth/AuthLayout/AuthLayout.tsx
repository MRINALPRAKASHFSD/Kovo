import React from 'react';

export interface AuthLayoutProps {
  /**
   * Content to display within the layout (typically AuthCard).
   */
  children: React.ReactNode;
  /**
   * Additional CSS class names.
   */
  className?: string;
  /**
   * Accessible landmark label for the authentication view.
   */
  ariaLabel?: string;
}

/**
 * Full-viewport centered authentication backdrop.
 * Uses the canonical KOVO dark background (#09080E) with subtle ambient radial glow.
 */
export function AuthLayout({
  children,
  className = '',
  ariaLabel = 'KOVO Authentication',
}: AuthLayoutProps) {
  return (
    <main
      role="main"
      aria-label={ariaLabel}
      className={`min-h-screen w-full flex items-center justify-center bg-[#09080E] p-4 sm:p-6 py-8 sm:py-12 text-white relative selection:bg-[#7C65FF]/30 selection:text-white ${className}`}
    >
      {/* Ambient background radial glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-60"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 700px 500px at 50% 45%, rgba(124, 101, 255, 0.07), transparent 75%)',
        }}
      />

      {/* Foreground container */}
      <div className="relative z-10 w-full flex justify-center">
        {children}
      </div>
    </main>
  );
}
