import React from 'react';
import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';

export interface LoadingStatusProps
  extends Omit<
    React.HTMLAttributes<HTMLParagraphElement>,
    'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag'
  > {
  /**
   * The status message to display.
   */
  text: string;
  /**
   * Politeness setting for screen reader announcements.
   * @default 'polite'
   */
  ariaLive?: 'polite' | 'assertive' | 'off';
  /**
   * Additional CSS classes.
   */
  className?: string;
}

export const LoadingStatus = React.forwardRef<HTMLParagraphElement, LoadingStatusProps>(
  (
    {
      text,
      ariaLive = 'polite',
      className = '',
      style,
      ...restProps
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();

    return (
      <div
        role="status"
        aria-live={ariaLive}
        aria-atomic="true"
        className="flex items-center justify-center text-center"
      >
        <motion.p
          ref={ref}
          key={text}
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={`select-none font-medium ${className}`}
          style={{
            fontSize: '11px',
            lineHeight: '16px',
            letterSpacing: '0.18em',
            color: '#8898AA',
            textTransform: 'uppercase',
            ...style,
          }}
          {...(restProps as HTMLMotionProps<'p'>)}
        >
          {text}
        </motion.p>
      </div>
    );
  }
);

LoadingStatus.displayName = 'LoadingStatus';
