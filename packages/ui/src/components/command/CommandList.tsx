'use client';

import React, { useMemo, useRef, useEffect } from 'react';
import { CommandItemData } from './types';
import { CommandSection } from './CommandSection';
import { CommandItem } from './CommandItem';

export interface CommandListProps {
  /**
   * List of command items to render.
   */
  items: CommandItemData[];
  /**
   * 0-based index of the currently highlighted item.
   */
  selectedIndex?: number;
  /**
   * Callback fired when active index changes (e.g. mouse hover or arrow navigation).
   */
  onSelectIndex?: (index: number) => void;
  /**
   * Callback fired when an item is executed (clicked or Enter pressed).
   */
  onSelect?: (item: CommandItemData) => void;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Command list primitive managing grouping, active row tracking,
 * and scrolling active item into view.
 */
export function CommandList({
  items,
  selectedIndex = 0,
  onSelectIndex,
  onSelect,
  className = '',
}: CommandListProps) {
  const selectedRef = useRef<HTMLDivElement>(null);

  // Auto-scroll selected item into view
  useEffect(() => {
    if (selectedRef.current && typeof selectedRef.current.scrollIntoView === 'function') {
      selectedRef.current.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  // Group items preserving order
  const groups = useMemo(() => {
    const map = new Map<string, { id: string; title: string; items: { item: CommandItemData; flatIndex: number }[] }>();
    let currentIndex = 0;

    items.forEach((item) => {
      const gId = item.groupId || 'default';
      const gTitle = item.groupTitle || 'RESULTS';
      if (!map.has(gId)) {
        map.set(gId, { id: gId, title: gTitle, items: [] });
      }
      map.get(gId)!.items.push({ item, flatIndex: currentIndex });
      currentIndex++;
    });

    return Array.from(map.values());
  }, [items]);

  return (
    <div
      role="listbox"
      aria-label="Commands"
      className={`space-y-3 ${className}`}
    >
      {groups.map((group) => (
        <CommandSection key={group.id} title={group.title}>
          {group.items.map(({ item, flatIndex }) => {
            const isSelected = selectedIndex === flatIndex;
            return (
              <div
                key={item.id}
                ref={isSelected ? selectedRef : undefined}
                onMouseEnter={() => onSelectIndex?.(flatIndex)}
              >
                <CommandItem
                  title={item.title}
                  description={item.description}
                  leading={item.leading}
                  trailing={item.trailing}
                  shortcut={item.shortcut}
                  disabled={item.disabled}
                  active={isSelected}
                  onClick={() => onSelect?.(item)}
                />
              </div>
            );
          })}
        </CommandSection>
      ))}
    </div>
  );
}
