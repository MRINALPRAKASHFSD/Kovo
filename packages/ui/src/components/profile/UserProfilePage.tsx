'use client';

import React from 'react';

export interface UserProfilePageProps {
  /**
   * Content displayed in the left column (typically UserProfileCard).
   */
  leftSlot?: React.ReactNode;
  /**
   * Content displayed in the right column (typically ConnectedAccounts and Contributions).
   */
  rightSlot?: React.ReactNode;
  /**
   * Ergonomic alias for leftSlot.
   */
  profile?: React.ReactNode;
  /**
   * Children slot rendered in the right column if rightSlot is omitted.
   */
  children?: React.ReactNode;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Responsive two-column layout primitive for user profile views.
 * 380px column on desktop, cleanly collapsing to single column on tablet and mobile.
 */
export function UserProfilePage({
  leftSlot,
  rightSlot,
  profile,
  children,
  className = '',
}: UserProfilePageProps) {
  const leftContent = leftSlot || profile;
  const rightContent = rightSlot || children;

  return (
    <div className={`flex-1 w-full h-full overflow-y-auto ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 items-start">
          {leftContent && (
            <aside className="w-full lg:max-w-[380px] flex-shrink-0">
              {leftContent}
            </aside>
          )}

          {rightContent && (
            <main className="w-full min-w-0 space-y-8">
              {rightContent}
            </main>
          )}
        </div>
      </div>
    </div>
  );
}
