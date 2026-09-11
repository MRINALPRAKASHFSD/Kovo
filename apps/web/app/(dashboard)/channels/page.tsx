'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChannelList,
  ChannelSectionData,
  EmptyChannels,
} from '@kovo/ui';

// Canonical channel data matching the iPhone reference screenshot
const canonicalChannelSections: ChannelSectionData[] = [
  {
    id: 'starred',
    title: 'STARRED',
    channels: [
      {
        id: 'general',
        name: 'general',
        description: 'Primary development space',
        unreadCount: 3,
        starred: true,
      },
      {
        id: 'engineering',
        name: 'engineering',
        description: 'Primary development space',
        unreadCount: 3,
        starred: true,
      },
    ],
  },
  {
    id: 'all-channels',
    title: 'ALL CHANNELS',
    channels: [
      {
        id: 'design',
        name: 'design',
        description: 'Discussion & syncs',
      },
      {
        id: 'marketing',
        name: 'marketing',
        description: 'Discussion & syncs',
      },
      {
        id: 'telemetry',
        name: 'telemetry',
        description: 'Discussion & syncs',
      },
    ],
  },
];

export default function ChannelsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter sections and channels if search is active
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return canonicalChannelSections;
    const query = searchQuery.toLowerCase();

    return canonicalChannelSections
      .map((section) => ({
        ...section,
        channels: section.channels.filter(
          (ch) =>
            ch.name.toLowerCase().includes(query) ||
            (typeof ch.description === 'string' &&
              ch.description.toLowerCase().includes(query))
        ),
      }))
      .filter((section) => section.channels.length > 0);
  }, [searchQuery]);

  const handleSelectChannel = (channelId: string) => {
    router.push('/messages');
  };

  return (
    <div className="max-w-4xl mx-auto w-full px-4 py-4 sm:py-8">
      {/* Desktop Page Title & Header Info */}
      <div className="hidden md:flex items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Channels</h1>
          <p className="text-sm text-[#8898AA] mt-1">
            Browse, join, and collaborate in team communication spaces.
          </p>
        </div>

        {/* Desktop Search Input */}
        <div className="relative w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter channels..."
            aria-label="Filter channels"
            className="w-full h-10 pl-9 pr-4 bg-[#151420] border border-[#262536] rounded-xl text-sm text-white placeholder-[#8898AA] focus:outline-none focus:border-[#7C65FF] focus:ring-1 focus:ring-[#7C65FF] transition-all"
          />
          <svg
            className="w-4 h-4 text-[#8898AA] absolute left-3 top-3 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          </svg>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Clear filter"
              className="absolute right-3 top-2.5 text-xs text-[#8898AA] hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Main Channel List Component */}
      <ChannelList
        sections={filteredSections}
        onSelectChannel={handleSelectChannel}
        emptyState={
          <EmptyChannels
            title="No channels found"
            description={`No channels matched "${searchQuery}". Try a different keyword.`}
            action={
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="px-3.5 py-1.5 rounded-lg bg-[#7C65FF] hover:bg-[#6344E7] text-white text-xs font-semibold transition-colors"
              >
                Clear filter
              </button>
            }
          />
        }
      />
    </div>
  );
}
