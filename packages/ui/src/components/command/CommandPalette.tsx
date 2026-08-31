'use client';

import React, { useEffect, useCallback } from 'react';
import { CommandItemData } from './types';
import { CommandSearch } from './CommandSearch';
import { CommandResults } from './CommandResults';
import { CommandList } from './CommandList';
import { CommandEmptyState } from './CommandEmptyState';
import { CommandFooter } from './CommandFooter';

export interface CommandPaletteProps {
  /**
   * Whether the command palette dialog is currently open.
   */
  open: boolean;
  /**
   * Controlled search query string.
   */
  query?: string;
  /**
   * List of command items to display.
   */
  items?: CommandItemData[];
  /**
   * 0-based index of the currently highlighted row.
   */
  selectedIndex?: number;
  /**
   * Whether results are currently loading.
   */
  loading?: boolean;
  /**
   * Optional custom empty state when items are empty.
   */
  emptyState?: React.ReactNode;
  /**
   * Optional custom search header slot.
   */
  header?: React.ReactNode;
  /**
   * Optional custom footer slot. Defaults to canonical <CommandFooter />.
   */
  footer?: React.ReactNode;
  /**
   * Callback fired when query text changes.
   */
  onQueryChange?: (query: string) => void;
  /**
   * Callback fired when active row index changes.
   */
  onSelectIndex?: (index: number) => void;
  /**
   * Callback fired when a command is selected (via click or Enter).
   */
  onSelect?: (id: string) => void;
  /**
   * Callback fired when closing the dialog (ESC key, backdrop click, or close button).
   */
  onClose?: () => void;
  /**
   * Whether the search input should autofocus when opened. Defaults to false.
   */
  autoFocus?: boolean;
  /**
   * Placeholder prompt text for search input.
   */
  placeholder?: string;
  /**
   * Optional custom children if overriding the default search+list hierarchy.
   */
  children?: React.ReactNode;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Global presentational Command Palette modal dialog.
 * Accessible, keyboard-navigable launcher for actions, channels, people, and files.
 */
export function CommandPalette({
  open,
  query = '',
  items = [],
  selectedIndex = 0,
  loading = false,
  emptyState,
  header,
  footer = <CommandFooter />,
  onQueryChange,
  onSelectIndex,
  onSelect,
  onClose,
  autoFocus = false,
  placeholder = 'Search commands, files, or people...',
  children,
  className = '',
}: CommandPaletteProps) {
  // Handle keyboard navigation (ArrowDown, ArrowUp, Enter, Escape)
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!open) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose?.();
        return;
      }

      if (!items.length) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = selectedIndex >= items.length - 1 ? 0 : selectedIndex + 1;
        onSelectIndex?.(nextIndex);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = selectedIndex <= 0 ? items.length - 1 : selectedIndex - 1;
        onSelectIndex?.(prevIndex);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selectedItem = items[selectedIndex];
        if (selectedItem && !selectedItem.disabled) {
          onSelect?.(selectedItem.id);
        }
      }
    },
    [open, items, selectedIndex, onClose, onSelectIndex, onSelect]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Lock body scroll when dialog is open
  useEffect(() => {
    if (open) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [open]);

  if (!open) return null;

  const defaultContent = (
    <>
      {header !== undefined ? (
        header
      ) : (
        <CommandSearch
          value={query}
          onChange={(val) => onQueryChange?.(val)}
          onClose={onClose}
          placeholder={placeholder}
          autoFocus={autoFocus}
        />
      )}

      <CommandResults loading={loading}>
        {items.length === 0 ? (
          emptyState || <CommandEmptyState query={query} />
        ) : (
          <CommandList
            items={items}
            selectedIndex={selectedIndex}
            onSelectIndex={onSelectIndex}
            onSelect={(item) => onSelect?.(item.id)}
          />
        )}
      </CommandResults>

      {footer}
    </>
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      className={`fixed inset-0 z-50 flex items-start sm:items-center justify-center p-3 sm:p-4 md:p-6 overflow-hidden ${className}`}
    >
      {/* Semi-transparent Backdrop Scrim */}
      <div
        className="fixed inset-0 bg-black/55 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Centered Modal Dialog Card */}
      <div className="relative w-full max-w-[640px] bg-[#13121D] border border-[#1E1D2A] rounded-2xl shadow-2xl overflow-hidden flex flex-col mt-12 sm:mt-0 transition-all duration-150 ease-out z-10">
        {children || defaultContent}
      </div>
    </div>
  );
}
