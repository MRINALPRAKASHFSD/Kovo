'use client';

import React, { useState } from 'react';
import { ChannelData } from './types';
import { ChannelListItem, ChannelListItemVariant } from './ChannelListItem';

export interface ChannelSectionProps {
  /**
   * Section heading label (e.g. "STARRED", "ALL CHANNELS").
   */
  title: React.ReactNode;
  /**
   * List of channels belonging to this section.
   */
  channels?: ChannelData[];
  /**
   * Optional section action button or extra slot (e.g. "See all", "Manage").
   */
  action?: React.ReactNode;
  /**
   * Whether the section can be collapsed by the user.
   */
  collapsible?: boolean;
  /**
   * Controlled or default collapsed state.
   */
  collapsed?: boolean;
  /**
   * Custom item renderer function.
   */
  renderItem?: (channel: ChannelData) => React.ReactNode;
  /**
   * Callback fired when a channel is selected.
   */
  onSelectChannel?: (channelId: string) => void;
  /**
   * Custom child nodes if rendering items directly.
   */
  children?: React.ReactNode;
  /**
   * Density variant passed to default ChannelListItem.
   */
  variant?: ChannelListItemVariant;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Section container for channel groups with uppercase heading, optional action button,
 * collapsible state support, and vertical item stack.
 */
export function ChannelSection({
  title,
  channels,
  action,
  collapsible = false,
  collapsed: initialCollapsed = false,
  renderItem,
  onSelectChannel,
  children,
  variant = 'default',
  className = '',
}: ChannelSectionProps) {
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);

  return (
    <section className={`mb-6 sm:mb-7 ${className}`} aria-label={typeof title === 'string' ? title : 'Channel section'}>
      {/* Section Header */}
      <div className="flex items-center justify-between gap-4 mb-2.5 px-0.5 select-none">
        <div className="flex items-center gap-2">
          {collapsible ? (
            <button
              type="button"
              onClick={() => setIsCollapsed((prev) => !prev)}
              className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#8898AA] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7C65FF] rounded"
              aria-expanded={!isCollapsed}
            >
              <svg
                className={`w-3.5 h-3.5 transition-transform ${
                  isCollapsed ? '-rotate-90' : 'rotate-0'
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
              <span>{title}</span>
            </button>
          ) : (
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#8898AA]">
              {title}
            </h2>
          )}
        </div>

        {action && <div className="flex-shrink-0">{action}</div>}
      </div>

      {/* Item Stack */}
      {!isCollapsed && (
        <div className="space-y-2.5" role="list">
          {channels
            ? channels.map((channel) =>
                renderItem ? (
                  renderItem(channel)
                ) : (
                  <ChannelListItem
                    key={channel.id}
                    channel={channel}
                    variant={variant}
                    onSelect={onSelectChannel}
                  />
                )
              )
            : children}
        </div>
      )}
    </section>
  );
}
