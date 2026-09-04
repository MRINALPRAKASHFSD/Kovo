'use client';

import React from 'react';

export interface MessageViewProps {
  /**
   * Top pinned header (e.g. <ChannelHeader />).
   */
  header?: React.ReactNode;
  /**
   * Scrollable timeline content (e.g. <MessageList />).
   */
  children: React.ReactNode;
  /**
   * Bottom pinned composer (e.g. <MessageComposer />).
   */
  footer?: React.ReactNode;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Master message viewport layout component.
 * Composes pinned channel header, scrollable message timeline, and bottom sticky composer.
 */
export function MessageView({
  header,
  children,
  footer,
  className = '',
}: MessageViewProps) {
  return (
    <section
      className={`flex-1 h-full max-h-screen bg-[#0E0D14] flex flex-col min-w-0 overflow-hidden ${className}`}
      aria-label="Conversation view"
    >
      {/* Pinned Top Header Slot */}
      {header && <div className="flex-shrink-0">{header}</div>}

      {/* Main Message Timeline Slot */}
      <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
        {children}
      </div>

      {/* Pinned Bottom Composer Slot */}
      {footer && <div className="flex-shrink-0">{footer}</div>}
    </section>
  );
}
