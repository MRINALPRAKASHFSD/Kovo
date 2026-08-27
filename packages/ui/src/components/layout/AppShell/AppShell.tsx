'use client';

import React, { useEffect, useState } from 'react';
import { Sidebar } from '../Sidebar';
import { TopBar } from '../Header';

export interface AppShellProps {
  /**
   * Main page content displayed inside the scrollable viewport.
   */
  children: React.ReactNode;
  /**
   * Optional custom sidebar node. Defaults to canonical <Sidebar />.
   */
  sidebar?: React.ReactNode;
  /**
   * Responsive header slot. Accepts custom or responsive header components.
   */
  header?: React.ReactNode;
  /**
   * Optional custom top bar node (backwards-compatible alias for header).
   */
  topBar?: React.ReactNode;
  /**
   * Disables outer padding and scroll clipping to allow full-height multi-column workspaces.
   */
  fullBleed?: boolean;
  /**
   * Optional neutral bottom slot (e.g. MobileBottomNav, audio dock, or collaboration bar).
   * Typically rendered on mobile screens (< md).
   */
  bottomSlot?: React.ReactNode;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Master authenticated application shell.
 * Uses CSS Grid on desktop (240px sidebar, 1fr main column) with independent
 * content area scrolling, fixed top bar, and mobile off-canvas drawer navigation.
 */
export function AppShell({
  children,
  sidebar,
  header,
  topBar,
  bottomSlot,
  fullBleed = false,
  className = '',
}: AppShellProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeHeader = header !== undefined ? header : topBar;

  // Close mobile drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const defaultSidebar = <Sidebar />;
  const defaultTopBar = (
    <TopBar onMenuClick={() => setIsMobileMenuOpen(true)} />
  );

  const showSidebar = sidebar !== null;
  const gridLayout = !showSidebar
    ? 'grid grid-cols-1'
    : fullBleed
    ? 'lg:grid lg:grid-cols-[240px_1fr]'
    : 'md:grid md:grid-cols-[240px_1fr]';

  return (
    <div
      className={`h-screen max-h-screen w-full bg-[#09080E] text-white overflow-hidden ${gridLayout} ${className}`}
    >
      {/* Desktop Fixed Sidebar (Column 1) */}
      {showSidebar && (
        <div
          className={`${
            fullBleed ? 'hidden lg:block' : 'hidden md:block'
          } h-screen max-h-screen overflow-hidden flex-shrink-0`}
        >
          {sidebar !== undefined ? sidebar : defaultSidebar}
        </div>
      )}

      {/* Main Column: TopBar + Scrollable Content Area + Optional Bottom Slot (Column 2) */}
      <div className="flex flex-col h-screen max-h-screen overflow-hidden min-w-0">
        {/* Header / Top Bar (if not explicitly passed as null) */}
        {activeHeader !== null && (
          <div className="flex-shrink-0">
            {activeHeader !== undefined ? activeHeader : defaultTopBar}
          </div>
        )}

        {/* Content Viewport */}
        {fullBleed ? (
          <main className="flex-1 overflow-hidden min-h-0 flex flex-col" tabIndex={-1}>
            {children}
          </main>
        ) : (
          <main
            className="flex-1 overflow-y-auto px-4 sm:px-5 md:px-6 py-6 sm:py-8 scrollbar-thin scrollbar-thumb-[#282736] scrollbar-track-transparent"
            tabIndex={-1}
          >
            {/* Max-width container to prevent excessive stretching on 4K/ultra-wide displays */}
            <div className="max-w-[1440px] mx-auto w-full">
              {children}
            </div>
          </main>
        )}

        {/* Neutral Bottom Slot (Pinned at bottom on mobile < md, e.g. MobileBottomNav) */}
        {bottomSlot && (
          <div className="flex-shrink-0 block md:hidden z-30">
            {bottomSlot}
          </div>
        )}
      </div>

      {/* Mobile Off-Canvas Drawer (< md or < lg in fullBleed) */}
      {isMobileMenuOpen && (
        <div
          className={`fixed inset-0 z-40 ${fullBleed ? 'lg:hidden' : 'md:hidden'}`}
          aria-modal="true"
          role="dialog"
        >
          {/* Backdrop Scrim */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Off-canvas Sidebar Surface */}
          <div className="fixed inset-y-0 left-0 z-50 w-60 bg-[#0E0D14] shadow-2xl transform transition-transform duration-200 ease-out">
            <div className="relative h-full flex flex-col">
              {/* Close Button for Accessibility */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close navigation menu"
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

              {sidebar !== undefined ? sidebar : defaultSidebar}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
