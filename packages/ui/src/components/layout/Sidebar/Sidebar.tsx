'use client';

import React from 'react';
import { WorkspaceHeader } from './WorkspaceHeader';
import { SidebarItem } from './SidebarItem';
import { ChannelList } from './ChannelList';
import { SidebarUserProfileCard } from './SidebarUserProfileCard';

export interface SidebarProps {
  /**
   * Pinned top header slot. Defaults to <WorkspaceHeader />.
   */
  header?: React.ReactNode;
  /**
   * Scrollable navigation content. Defaults to the canonical KOVO navigation and channels.
   */
  children?: React.ReactNode;
  /**
   * Pinned bottom footer slot. Defaults to <UserProfileCard />.
   */
  footer?: React.ReactNode;
  /**
   * Active navigation item key when using default navigation.
   */
  activeItem?: 'home' | 'messages' | 'channels' | 'threads' | 'calls' | 'files' | string;
  /**
   * Optional route URLs for navigation items.
   */
  hrefs?: Partial<Record<'home' | 'messages' | 'channels' | 'threads' | 'calls' | 'files' | string, string>>;
  /**
   * Navigation click handler when using default navigation.
   */
  onItemClick?: (key: string) => void;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

// Canonical navigation icons (inline SVGs for zero-dependency performance)
const HomeIcon = (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const MessagesIcon = (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const HashIcon = (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
  </svg>
);

const ThreadsIcon = (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
  </svg>
);

const CallsIcon = (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const FilesIcon = (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const NotificationsIcon = (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    />
  </svg>
);

const defaultRouteHrefs: Record<string, string> = {
  home: '/dashboard',
  messages: '/messages',
  channels: '/channels',
  threads: '/threads',
  calls: '/calls',
  files: '/files',
  notifications: '/notifications',
};

/**
 * Composable application sidebar.
 * Features pinned header (WorkspaceHeader), independent scrollable navigation area,
 * and pinned footer (UserProfileCard).
 */
export function Sidebar({
  header = <WorkspaceHeader />,
  children,
  footer = <SidebarUserProfileCard />,
  activeItem = 'home',
  hrefs = defaultRouteHrefs,
  onItemClick,
  className = '',
}: SidebarProps) {
  const defaultNavigation = (
    <div className="space-y-4">
      {/* Primary Navigation List */}
      <nav aria-label="Primary navigation" className="space-y-0.5">
        <SidebarItem
          label="Home"
          icon={HomeIcon}
          active={activeItem === 'home'}
          href={hrefs?.home}
          onClick={() => onItemClick?.('home')}
        />
        <SidebarItem
          label="Messages"
          icon={MessagesIcon}
          badge="3"
          active={activeItem === 'messages'}
          href={hrefs?.messages}
          onClick={() => onItemClick?.('messages')}
        />
        <SidebarItem
          label="Channels"
          icon={HashIcon}
          active={activeItem === 'channels'}
          href={hrefs?.channels}
          onClick={() => onItemClick?.('channels')}
        />
        <SidebarItem
          label="Threads"
          icon={ThreadsIcon}
          active={activeItem === 'threads'}
          href={hrefs?.threads}
          onClick={() => onItemClick?.('threads')}
        />
        <SidebarItem
          label="Calls"
          icon={CallsIcon}
          active={activeItem === 'calls'}
          href={hrefs?.calls}
          onClick={() => onItemClick?.('calls')}
        />
        <SidebarItem
          label="Files"
          icon={FilesIcon}
          active={activeItem === 'files'}
          href={hrefs?.files}
          onClick={() => onItemClick?.('files')}
        />
        <SidebarItem
          label="Notifications"
          icon={NotificationsIcon}
          active={activeItem === 'notifications'}
          href={hrefs?.notifications}
          onClick={() => onItemClick?.('notifications')}
        />
      </nav>

      {/* Channels Section */}
      <ChannelList />
    </div>
  );

  return (
    <aside
      className={`w-60 h-screen max-h-screen bg-[#0E0D14] border-r border-[#1E1D2A] flex flex-col justify-between select-none flex-shrink-0 ${className}`}
      aria-label="Workspace sidebar"
    >
      {/* Pinned Top Slot */}
      {header && <div className="flex-shrink-0">{header}</div>}

      {/* Independent Scrollable Navigation Slot */}
      <div className="flex-1 overflow-y-auto px-3 py-3 scrollbar-thin scrollbar-thumb-[#282736] scrollbar-track-transparent">
        {children || defaultNavigation}
      </div>

      {/* Pinned Bottom Slot */}
      {footer && <div className="flex-shrink-0 p-3">{footer}</div>}
    </aside>
  );
}
