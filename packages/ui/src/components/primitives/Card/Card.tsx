'use client';

import React from 'react';

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'interactive';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: CardVariant;
  className?: string;
  as?: React.ElementType;
}

const variantClasses: Record<CardVariant, string> = {
  default: 'bg-[#13121C] border border-[#212030]',
  elevated: 'bg-[#161522] border border-[#282736] shadow-lg shadow-black/20',
  outlined: 'bg-transparent border border-[#282736]',
  interactive:
    'bg-[#13121C] border border-[#212030] hover:border-[#7C65FF]/50 hover:bg-[#181628] transition-all cursor-pointer',
};

/**
 * Reusable surface container primitive standardizing dark backgrounds, borders, and rounded corners.
 */
export function Card({
  children,
  variant = 'default',
  className = '',
  as: Component = 'div',
  ...rest
}: CardProps) {
  return (
    <Component
      className={`rounded-2xl ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {children}
    </Component>
  );
}
