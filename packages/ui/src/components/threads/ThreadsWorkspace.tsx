'use client';

import React from 'react';

export interface ThreadsWorkspaceProps {
  /**
   * Thread inbox rail slot (e.g. <ThreadSidebar />).
   */
  sidebar?: React.ReactNode;
  /**
   * Active thread viewport slot (e.g. <ThreadView />).
   */
  children: React.ReactNode;
  /**
   * Whether to show thread details on mobile (< md) instead of the inbox list.
   * Defaults to true if a thread is selected.
   */
  showMobileDetail?: boolean;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Two-pane workspace layout for threaded discussions.
 * Features desktop split-pane layout and mobile master-detail switching.
 */
export function ThreadsWorkspace({
  sidebar,
  children,
  showMobileDetail = false,
  className = '',
}: ThreadsWorkspaceProps) {
  return (
    <div
      className={`h-full max-h-screen w-full flex min-h-0 overflow-hidden bg-[#09080E] ${className}`}
    >
      {/* Thread Inbox Sidebar: Full width on mobile when not in detail mode, pinned rail on desktop */}
      {sidebar && (
        <div
          className={`h-full flex-shrink-0 ${
            showMobileDetail ? 'hidden md:block' : 'w-full md:w-auto'
          }`}
        >
          {sidebar}
        </div>
      )}

      {/* Main Thread Viewport: Hidden on mobile when not in detail mode, flex-1 on desktop */}
      <div
        className={`flex-1 min-w-0 h-full flex flex-col overflow-hidden ${
          showMobileDetail ? 'w-full flex' : 'hidden md:flex'
        }`}
      >
        {children}
      </div>
    </div>
  );
}
