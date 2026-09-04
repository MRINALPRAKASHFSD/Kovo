'use client';

import React from 'react';

export interface MessagesWorkspaceProps {
  /**
   * Desktop conversation rail slot (e.g. <ConversationSidebar />).
   */
  sidebar?: React.ReactNode;
  /**
   * Main message viewport slot (e.g. <MessageView />).
   */
  children: React.ReactNode;
  /**
   * Optional mobile conversation drawer slot (e.g. <ConversationDrawer />).
   */
  drawer?: React.ReactNode;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Two-pane workspace container for messaging.
 * Displays 280px conversation rail alongside the message viewport on desktop/tablet,
 * and manages responsive drawer presentation on mobile.
 */
export function MessagesWorkspace({
  sidebar,
  children,
  drawer,
  className = '',
}: MessagesWorkspaceProps) {
  return (
    <div className={`h-full max-h-screen w-full flex min-h-0 overflow-hidden bg-[#09080E] ${className}`}>
      {/* Desktop/Tablet Conversation Rail (Hidden on mobile < md) */}
      {sidebar && (
        <div className="hidden md:block h-full flex-shrink-0">
          {sidebar}
        </div>
      )}

      {/* Main Message Viewport (Occupies 100% on mobile, remaining space on desktop) */}
      <div className="flex-1 min-w-0 h-full flex flex-col overflow-hidden">
        {children}
      </div>

      {/* Mobile Off-Canvas Drawer (< md) */}
      {drawer}
    </div>
  );
}
