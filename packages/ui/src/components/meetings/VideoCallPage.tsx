'use client';

import React from 'react';

export interface VideoCallPageProps {
  /**
   * Pinned top meeting header slot (typically <MeetingHeader />).
   */
  header?: React.ReactNode;
  /**
   * Main participant grid or screen share canvas.
   */
  children: React.ReactNode;
  /**
   * Pinned bottom in-call toolbar slot (typically <MeetingToolbar />).
   */
  toolbar?: React.ReactNode;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Master responsive layout primitive for video meetings and huddles.
 * Provides an edge-to-edge immersive meeting canvas with pinned header and toolbar slots.
 */
export function VideoCallPage({
  header,
  children,
  toolbar,
  className = '',
}: VideoCallPageProps) {
  return (
    <div
      className={`w-full h-screen max-h-screen bg-[#09080E] text-white flex flex-col justify-between overflow-hidden select-none ${className}`}
    >
      {/* Top Header Slot */}
      {header && <div className="flex-shrink-0">{header}</div>}

      {/* Main Video Canvas Area */}
      <main className="flex-1 w-full p-3 sm:p-4 md:p-5 lg:p-6 overflow-hidden min-h-0 flex flex-col">
        {children}
      </main>

      {/* Bottom Floating/Pinned Toolbar Slot */}
      {toolbar && <div className="flex-shrink-0">{toolbar}</div>}
    </div>
  );
}
