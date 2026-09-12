'use client';

import React from 'react';
import { ThreadMessageData } from './types';
import { MessageGroup } from '../messages/MessageView/MessageGroup';
import { MessageBubble } from '../messages/MessageView/MessageBubble';

export interface ThreadTimelineProps {
  /**
   * Chronological list of messages in this thread.
   */
  messages?: ThreadMessageData[];
  /**
   * Custom child nodes if rendering messages or blocks directly.
   */
  children?: React.ReactNode;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Scrollable thread conversation timeline composing MessageGroup and MessageBubble primitives.
 */
export function ThreadTimeline({
  messages,
  children,
  className = '',
}: ThreadTimelineProps) {
  return (
    <div
      className={`flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 sm:space-y-8 min-h-0 scrollbar-thin scrollbar-thumb-[#262536] ${className}`}
      role="log"
      aria-label="Thread conversation timeline"
    >
      {messages
        ? messages.map((msg) => {
            const authorInitial =
              msg.author.initials ||
              msg.author.name.trim().charAt(0).toUpperCase() ||
              '?';

            const avatarNode = msg.author.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={msg.author.avatarUrl}
                alt={msg.author.name}
                className="w-9 h-9 rounded-full object-cover"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-[#282736] border border-white/10 flex items-center justify-center text-xs font-semibold text-white select-none">
                {authorInitial}
              </div>
            );

            return (
              <MessageGroup
                key={msg.id}
                avatar={avatarNode}
                author={msg.author.name}
                timestamp={msg.timestamp}
              >
                <MessageBubble appearance="incoming">
                  {msg.content}
                </MessageBubble>
              </MessageGroup>
            );
          })
        : children}
    </div>
  );
}
