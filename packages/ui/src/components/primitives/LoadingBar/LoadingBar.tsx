import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export interface LoadingBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Determinate progress value from 0 to 100.
   * If omitted, renders a continuous indeterminate animation.
   */
  value?: number;
  /**
   * Accessible description of what is loading.
   * @default 'Loading progress'
   */
  label?: string;
  /**
   * Additional CSS classes.
   */
  className?: string;
}

export const LoadingBar = React.forwardRef<HTMLDivElement, LoadingBarProps>(
  (
    {
      value,
      label = 'Loading progress',
      className = '',
      style,
      ...restProps
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();
    const isDeterminate = typeof value === 'number';
    const clampedValue = isDeterminate ? Math.min(100, Math.max(0, value)) : undefined;

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={clampedValue}
        className={`relative overflow-hidden rounded-full ${className}`}
        style={{
          width: '216px',
          height: '2px',
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          ...style,
        }}
        {...restProps}
      >
        {isDeterminate ? (
          <motion.div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, #5B4EFF 0%, #9B8CFF 100%)',
              boxShadow: '0 0 8px rgba(91, 78, 255, 0.45)',
            }}
            initial={{ width: 0 }}
            animate={{ width: `${clampedValue}%` }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
            }
          />
        ) : prefersReducedMotion ? (
          <div
            className="h-full w-1/2 rounded-full mx-auto"
            style={{
              background: 'linear-gradient(90deg, #5B4EFF 0%, #9B8CFF 100%)',
              opacity: 0.8,
            }}
          />
        ) : (
          <motion.div
            className="h-full rounded-full absolute top-0"
            style={{
              width: '42%',
              background: 'linear-gradient(90deg, rgba(91, 78, 255, 0.2) 0%, #5B4EFF 50%, #B4A4FF 100%)',
              boxShadow: '0 0 10px rgba(124, 102, 255, 0.55)',
            }}
            initial={{ left: '-45%' }}
            animate={{ left: ['-45%', '105%'] }}
            transition={{
              repeat: Infinity,
              duration: 1.7,
              ease: [0.4, 0, 0.2, 1],
            }}
          />
        )}
      </div>
    );
  }
);

LoadingBar.displayName = 'LoadingBar';
