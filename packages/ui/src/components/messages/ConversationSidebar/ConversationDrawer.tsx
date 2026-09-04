'use client';

import React, { useEffect } from 'react';

export interface ConversationDrawerProps {
  /**
   * Whether the drawer is open.
   */
  isOpen: boolean;
  /**
   * Callback fired when closing the drawer (clicking backdrop or close button, or pressing Escape).
   */
  onClose: () => void;
  /**
   * Content inside the drawer (e.g. <ConversationSidebar />).
   */
  children: React.ReactNode;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Off-canvas mobile drawer for conversations.
 * Includes backdrop scrim, accessible close trigger, and Escape key dismissal.
 */
export function ConversationDrawer({
  isOpen,
  onClose,
  children,
  className = '',
}: ConversationDrawerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-40 md:hidden ${className}`}
      aria-modal="true"
      role="dialog"
      aria-label="Conversations drawer"
    >
      {/* Backdrop Scrim */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Off-canvas Surface */}
      <div className="fixed inset-y-0 left-0 z-50 w-[280px] bg-[#0E0D14] shadow-2xl transform transition-transform duration-200 ease-out">
        <div className="relative h-full flex flex-col">
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close conversation drawer"
            className="absolute top-4 right-3 p-1.5 rounded-lg text-[#8898AA] hover:text-white hover:bg-white/5 transition-colors z-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C65FF]"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {children}
        </div>
      </div>
    </div>
  );
}
