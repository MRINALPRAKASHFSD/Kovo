'use client';

import React from 'react';

export interface SettingsPageProps {
  /**
   * Settings navigation sidebar slot.
   */
  sidebar: React.ReactNode;
  /**
   * Active settings content view.
   */
  children: React.ReactNode;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Responsive layout container for the Settings and Preferences screen.
 * Uses resilient minmax(200px, 220px) 1fr grid on desktop, collapsing cleanly on mobile.
 */
export function SettingsPage({
  sidebar,
  children,
  className = '',
}: SettingsPageProps) {
  return (
    <div className={`flex-1 w-full h-full overflow-y-auto ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(200px,220px)_1fr] gap-8 items-start">
          {/* Secondary Settings Sidebar */}
          <aside className="w-full md:sticky md:top-6 flex-shrink-0">
            {sidebar}
          </aside>

          {/* Settings Main Content Area */}
          <main className="w-full min-w-0 space-y-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
