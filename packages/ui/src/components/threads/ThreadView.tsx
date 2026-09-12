'use client';

import React from 'react';

export interface ThreadViewProps {
  /**
   * Pinned top header slot (e.g. <ThreadHeader />).
   */
  header?: React.ReactNode;
  /**
   * Middle scrollable message timeline slot (e.g. <ThreadTimeline />).
   */
  timeline?: React.ReactNode;
  /**
   * Pinned bottom composer slot (e.g. <MessageComposer layout="thread" />).
   */
  composer?: React.ReactNode;
  /**
   * Custom child nodes if rendering content directly.
   */
  children?: React.ReactNode;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Thread viewport component composing pinned header, scrollable message timeline, and bottom composer.
 */
export function ThreadView({
  header,
  timeline,
  composer,
  children,
  className = '',
}: ThreadViewProps) {
  return (
    <div
      className={`flex-1 min-w-0 h-full flex flex-col overflow-hidden bg-[#09080E] relative ${className}`}
      role="region"
      aria-label="Active thread discussion"
    >
      {/* Pinned Top Header */}
      {header && <div className="flex-shrink-0 z-10">{header}</div>}

      {/* Middle Scrollable Content / Timeline */}
      {timeline !== undefined ? timeline : children}

      {/* Pinned Bottom Composer */}
      {composer && <div className="flex-shrink-0 z-10">{composer}</div>}
    </div>
  );
}
