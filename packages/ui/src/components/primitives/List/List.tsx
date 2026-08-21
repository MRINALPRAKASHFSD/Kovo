'use client';

import React from 'react';
import { Card, CardVariant } from '../Card';

export interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  as?: React.ElementType;
}

const spacingClasses = {
  none: 'space-y-0',
  sm: 'space-y-1.5',
  md: 'space-y-2.5',
  lg: 'space-y-4',
};

/**
 * Shared List primitive providing standard vertical spacing and ARIA list semantics.
 */
export function List({
  children,
  spacing = 'md',
  className = '',
  as: Component = 'div',
  ...rest
}: ListProps) {
  return (
    <Component
      className={`${spacingClasses[spacing]} ${className}`}
      role="list"
      {...rest}
    >
      {children}
    </Component>
  );
}

export interface ListSectionProps {
  /**
   * Uppercase section heading label.
   */
  title?: React.ReactNode;
  /**
   * Optional trailing action slot (e.g. "See all", "Manage").
   */
  action?: React.ReactNode;
  /**
   * Child rows or items.
   */
  children?: React.ReactNode;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Shared section container with standard uppercase section header and item stack.
 */
export function ListSection({
  title,
  action,
  children,
  className = '',
}: ListSectionProps) {
  return (
    <section className={`mb-6 ${className}`}>
      {(title || action) && (
        <div className="flex items-center justify-between gap-4 mb-2.5 select-none">
          {title && (
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#8898AA]">
              {title}
            </h2>
          )}
          {action && <div className="flex-shrink-0">{action}</div>}
        </div>
      )}
      <div className="space-y-2.5" role="list">
        {children}
      </div>
    </section>
  );
}

export interface ListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  variant?: CardVariant;
  interactive?: boolean;
  className?: string;
}

/**
 * Shared list item row composing Card with leading, body, and trailing slots.
 */
export function ListItem({
  children,
  leading,
  trailing,
  variant,
  interactive,
  className = '',
  onClick,
  ...rest
}: ListItemProps) {
  const cardVariant: CardVariant =
    variant || (interactive || onClick ? 'interactive' : 'default');

  return (
    <Card
      variant={cardVariant}
      onClick={onClick}
      role="listitem"
      className={`p-3.5 sm:p-4 flex items-center justify-between gap-3 select-none ${className}`}
      {...rest}
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {leading && <div className="flex-shrink-0">{leading}</div>}
        <div className="min-w-0 flex-1">{children}</div>
      </div>
      {trailing && <div className="flex-shrink-0">{trailing}</div>}
    </Card>
  );
}
