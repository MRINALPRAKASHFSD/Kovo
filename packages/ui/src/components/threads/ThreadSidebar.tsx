'use client';

import React from 'react';
import { ThreadData } from './types';
import { ThreadListItem, ThreadListItemVariant } from './ThreadListItem';
import { EmptyThreads } from './EmptyThreads';

export interface ThreadSidebarProps {
  /**
   * Title heading for the thread inbox (defaults to "Active Threads").
   */
  title?: React.ReactNode;
  /**
   * Array of threads to display in the list.
   */
  threads?: ThreadData[];
  /**
   * Currently active/selected thread ID.
   */
  selectedId?: string;
  /**
   * Callback fired when a thread is selected.
   */
  onSelectThread?: (threadId: string) => void;
  /**
   * Optional custom action or control in the sidebar header.
   */
  headerActions?: React.ReactNode;
  /**
   * Optional custom empty state when threads array is empty.
   */
  emptyState?: React.ReactNode;
  /**
   * Custom child nodes if rendering items directly.
   */
  children?: React.ReactNode;
  /**
   * Density variant passed to default ThreadListItem cards.
   */
  variant?: ThreadListItemVariant;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Thread inbox sidebar component displaying active threads with sticky header and scrollable card stack.
 */
export function ThreadSidebar({
  title = 'Active Threads',
  threads,
  selectedId,
  onSelectThread,
  headerActions,
  emptyState,
  children,
  variant = 'default',
  className = '',
}: ThreadSidebarProps) {
  return (
    <aside
      className={`w-full md:w-[340px] lg:w-[360px] h-full flex flex-col bg-[#0E0D14] border-r border-[#1E1D2A] flex-shrink-0 select-none ${className}`}
      aria-label="Threads inbox"
    >
      {/* Pinned Header */}
      <div className="h-16 px-4 sm:px-5 border-b border-[#1E1D2A] flex items-center justify-between flex-shrink-0 bg-[#0E0D14]">
        <h2 className="text-base font-bold text-white tracking-tight">
          {title}
        </h2>
        {headerActions && <div className="flex-shrink-0">{headerActions}</div>}
      </div>

      {/* Scrollable Thread Items Stack */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 min-h-0 scrollbar-thin scrollbar-thumb-[#262536]">
        {threads ? (
          threads.length > 0 ? (
            threads.map((thread) => (
              <ThreadListItem
                key={thread.id}
                thread={thread}
                selected={thread.id === selectedId}
                variant={variant}
                onSelect={onSelectThread}
              />
            ))
          ) : (
            emptyState || <EmptyThreads />
          )
        ) : (
          children
        )}
      </div>
    </aside>
  );
}
