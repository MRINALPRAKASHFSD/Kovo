'use client';

import React from 'react';

export interface WorkspaceHeaderProps {
  /**
   * Workspace display name (e.g. "Acme Corp").
   */
  name?: string;
  /**
   * Workspace domain or slug (e.g. "kovo.acme.com").
   */
  domain?: string;
  /**
   * Optional custom logo element. Defaults to the canonical KOVO monogram badge.
   */
  logo?: React.ReactNode;
  /**
   * Callback fired when clicking the workspace switcher trigger.
   */
  onToggle?: () => void;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Pinned workspace switcher header in the sidebar.
 * Displays the workspace logo badge, name, domain, and dropdown toggle chevron.
 */
export function WorkspaceHeader({
  name = 'Acme Corp',
  domain = 'kovo.acme.com',
  logo,
  onToggle,
  className = '',
}: WorkspaceHeaderProps) {
  const defaultLogo = (
    <div
      className="w-8 h-8 rounded-lg bg-[#191824] border border-[#2B2A3D] flex items-center justify-center text-[#7C65FF] flex-shrink-0 shadow-sm"
      aria-hidden="true"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="125 38 88 126"
        className="w-4 h-5 fill-current"
      >
        <path
          d="M 177.250 60.616 C 166.662 70.821, 158 79.708, 158 80.364 C 158 81.021, 160.929 84.461, 164.510 88.009 L 171.019 94.461 190.010 75.490 C 200.454 65.057, 209 56.052, 209 55.481 C 209 54.910, 206.188 51.657, 202.750 48.252 L 196.500 42.062 177.250 60.616 M 131 110.421 L 131 149.842 138.250 150.171 C 150.738 150.738, 150 151.364, 150 140.193 L 150 130.524 165.262 145.762 C 173.656 154.143, 181.207 161, 182.043 161 C 183.696 161, 195 150.060, 195 148.461 C 195 147.209, 157.797 110, 156.545 110 C 156.030 110, 154.347 111.209, 152.805 112.687 L 150 115.374 150 93.187 L 150 71 140.500 71 L 131 71 131 110.421"
          fillRule="evenodd"
        />
      </svg>
    </div>
  );

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Switch workspace from ${name}`}
      className={`w-full p-4 border-b border-[#1E1D2A] flex items-center justify-between text-left group hover:bg-white/[0.02] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C65FF] focus-visible:ring-offset-1 focus-visible:ring-offset-[#0E0D14] select-none ${className}`}
    >
      <div className="flex items-center gap-3 min-w-0">
        {logo || defaultLogo}
        <div className="min-w-0 flex flex-col">
          <span className="text-sm font-semibold text-white truncate tracking-tight">
            {name}
          </span>
          <span className="text-[11px] text-[#8898AA] truncate">
            {domain}
          </span>
        </div>
      </div>

      <svg
        className="w-4 h-4 text-[#8898AA] group-hover:text-white transition-colors flex-shrink-0 ml-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
}
