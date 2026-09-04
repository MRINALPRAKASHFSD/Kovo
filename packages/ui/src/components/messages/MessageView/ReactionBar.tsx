'use client';

import React from 'react';

export interface ReactionItem {
  emoji: string;
  count: number;
  reacted?: boolean;
}

export interface ReactionBarProps {
  /**
   * List of reaction items with emoji, count, and whether current user reacted.
   */
  reactions: ReactionItem[];
  /**
   * Callback fired when a reaction pill is clicked.
   */
  onReact?: (emoji: string) => void;
  /**
   * Optional callback to open emoji reaction picker.
   */
  onAddReaction?: () => void;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Composable reaction pills row for message items.
 * Displays emoji badges, counts, active states, and optional add reaction trigger.
 */
export function ReactionBar({
  reactions,
  onReact,
  onAddReaction,
  className = '',
}: ReactionBarProps) {
  if (!reactions.length && !onAddReaction) return null;

  return (
    <div className={`flex items-center gap-1.5 flex-wrap mt-2 select-none ${className}`}>
      {reactions.map((r) => (
        <button
          key={r.emoji}
          type="button"
          onClick={() => onReact?.(r.emoji)}
          aria-label={`${r.emoji} ${r.count} reactions`}
          aria-pressed={r.reacted ? 'true' : undefined}
          className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-xs inline-flex items-center gap-1.5 transition-colors border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7C65FF] ${
            r.reacted
              ? 'bg-[#241F47] border-[#7C65FF] text-white font-semibold shadow-sm'
              : 'bg-[#13121D] border-[#1E1D2A] text-[#CBD5E1] hover:border-[#282736] hover:bg-[#1A1926]'
          }`}
        >
          <span className="text-xs sm:text-sm leading-none">{r.emoji}</span>
          <span className="text-[11px] font-medium text-[#8898AA]">{r.count}</span>
        </button>
      ))}

      {onAddReaction && (
        <button
          type="button"
          onClick={onAddReaction}
          aria-label="Add reaction"
          className="p-1 rounded-md text-[#8898AA] hover:text-white hover:bg-white/5 border border-transparent hover:border-[#1E1D2A] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7C65FF]"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      )}
    </div>
  );
}
