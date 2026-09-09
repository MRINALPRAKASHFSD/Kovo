'use client';

import React from 'react';
import { ConnectedAccount } from './types';
import { ConnectedAccountCard } from './ConnectedAccountCard';

export interface ConnectedAccountsGridProps {
  /**
   * Section heading title. Defaults to "Connected Accounts".
   */
  title?: string;
  /**
   * List of connected accounts to display in the grid.
   */
  accounts?: ConnectedAccount[];
  /**
   * Callback fired when clicking an individual account card.
   */
  onAccountClick?: (id: string) => void;
  /**
   * Optional custom children override.
   */
  children?: React.ReactNode;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Grid container for connected integrations and accounts.
 * Wraps responsive 3-column layout on desktop, 2-column on tablet, and 1-column on mobile.
 */
export function ConnectedAccountsGrid({
  title = 'Connected Accounts',
  accounts = [],
  onAccountClick,
  children,
  className = '',
}: ConnectedAccountsGridProps) {
  return (
    <section className={`w-full ${className}`} aria-label={title}>
      {title && (
        <h3 className="text-base font-bold text-white mb-4 select-none tracking-tight">
          {title}
        </h3>
      )}

      {children ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {children}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {accounts.map((account) => (
            <ConnectedAccountCard
              key={account.id}
              account={account}
              onClick={onAccountClick}
            />
          ))}
        </div>
      )}
    </section>
  );
}
