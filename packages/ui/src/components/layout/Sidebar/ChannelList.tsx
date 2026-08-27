'use client';

import React from 'react';
import { NavigationSection } from './NavigationSection';

export interface ChannelItem {
  id: string;
  name: string;
  unread?: boolean;
}

export interface SidebarChannelListProps {
  /**
   * Array of channel items.
   */
  channels?: ChannelItem[];
  /**
   * Active channel id.
   */
  activeChannelId?: string;
  /**
   * Callback fired when clicking a channel.
   */
  onSelectChannel?: (id: string) => void;
  /**
   * Callback fired when clicking the '+' add channel button.
   */
  onAddChannel?: () => void;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

const DEFAULT_CHANNELS: ChannelItem[] = [
  { id: 'general', name: 'general' },
  { id: 'engineering', name: 'engineering' },
  { id: 'design', name: 'design' },
];

/**
 * Sidebar channels section with '+' action trigger and hash-prefixed items.
 */
export function ChannelList({
  channels = DEFAULT_CHANNELS,
  activeChannelId,
  onSelectChannel,
  onAddChannel,
  className = '',
}: ChannelListProps) {
  const addAction = (
    <button
      type="button"
      onClick={onAddChannel}
      aria-label="Add channel"
      className="p-1 rounded hover:bg-white/5 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7C65FF]"
    >
      <svg
        className="w-3.5 h-3.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2.5"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    </button>
  );

  return (
    <NavigationSection title="CHANNELS" action={addAction} className={className}>
      {channels.map((channel) => {
        const isActive = activeChannelId === channel.id;
        return (
          <button
            key={channel.id}
            type="button"
            onClick={() => onSelectChannel?.(channel.id)}
            className={`w-full px-3 py-1.5 rounded-lg flex items-center justify-between text-xs font-medium transition-colors select-none text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C65FF] focus-visible:ring-offset-1 focus-visible:ring-offset-[#0E0D14] ${
              isActive
                ? 'bg-[#241F47] text-white'
                : 'text-[#8898AA] hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center min-w-0 gap-2">
              <span className="text-[#5A6578] font-bold">#</span>
              <span className="truncate">{channel.name}</span>
            </div>

            {channel.unread && (
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#7C65FF]"
                aria-label="Unread activity"
              />
            )}
          </button>
        );
      })}
    </NavigationSection>
  );
}

export const SidebarChannelList = ChannelList;
export type ChannelListProps = SidebarChannelListProps;
