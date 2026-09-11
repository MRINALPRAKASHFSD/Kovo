'use client';

import React from 'react';
import { ChannelSectionData } from './types';
import { ChannelSection } from './ChannelSection';
import { ChannelListItemVariant } from './ChannelListItem';
import { EmptyChannels } from './EmptyChannels';

export interface ChannelListProps {
  /**
   * Array of channel sections (e.g. STARRED, ALL CHANNELS).
   */
  sections?: ChannelSectionData[];
  /**
   * Callback fired when any channel in the list is selected.
   */
  onSelectChannel?: (channelId: string) => void;
  /**
   * Optional custom empty state when sections or channels are empty.
   */
  emptyState?: React.ReactNode;
  /**
   * Visual density variant passed to channel items.
   */
  variant?: ChannelListItemVariant;
  /**
   * Custom child nodes if rendering sections directly.
   */
  children?: React.ReactNode;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Master channel directory component rendering grouped channel sections with consistent rhythm.
 */
export function ChannelList({
  sections,
  onSelectChannel,
  emptyState,
  variant = 'default',
  children,
  className = '',
}: ChannelListProps) {
  const hasChannels =
    sections && sections.some((section) => section.channels.length > 0);

  if (sections && !hasChannels) {
    return (
      <div className={className}>
        {emptyState || <EmptyChannels />}
      </div>
    );
  }

  return (
    <div className={`space-y-6 sm:space-y-8 ${className}`} role="region" aria-label="Channels directory">
      {sections
        ? sections.map((section) => (
            <ChannelSection
              key={section.id}
              title={section.title}
              channels={section.channels}
              action={section.action}
              collapsible={section.collapsible}
              collapsed={section.collapsed}
              variant={variant}
              onSelectChannel={onSelectChannel}
            />
          ))
        : children}
    </div>
  );
}
