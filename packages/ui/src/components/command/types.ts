import React from 'react';

export interface CommandItemData {
  /**
   * Unique identifier for the command action.
   */
  id: string;
  /**
   * Primary title or action label.
   */
  title: string;
  /**
   * Optional secondary description or category text (e.g. "in Actions", "in Channels", "in People").
   */
  description?: string;
  /**
   * Category or section identifier for grouping.
   */
  groupId: string;
  /**
   * Human-readable section header title (e.g. "RECOMMENDED ACTIONS & RESULTS").
   */
  groupTitle: string;
  /**
   * Slot for leading visual element (icon, avatar, # channel hash).
   */
  leading?: React.ReactNode;
  /**
   * Slot for trailing visual element (custom badge, status dot).
   */
  trailing?: React.ReactNode;
  /**
   * Optional keyboard shortcut string (e.g. "⌘N", "⌥C", "⌘H", "⌥F").
   */
  shortcut?: string;
  /**
   * Whether the command is currently disabled.
   */
  disabled?: boolean;
}

export interface CommandGroup {
  id: string;
  title: string;
  items: CommandItemData[];
}
