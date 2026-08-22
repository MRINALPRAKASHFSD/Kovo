/**
 * KOVO Motion Tokens — animations should feel instant but intentional.
 * Durations are short (messaging apps feel sluggish with long animations).
 */
export const motion = {
  duration: {
    instant:  '50ms',
    fast:    '100ms',
    normal:  '150ms',
    slow:    '250ms',
    slower:  '350ms',
  },
  easing: {
    default:     'cubic-bezier(0.16, 1, 0.3, 1)',    // expo out
    decelerate:  'cubic-bezier(0, 0, 0.2, 1)',        // material decelerate
    accelerate:  'cubic-bezier(0.4, 0, 1, 1)',        // material accelerate
    spring:      'cubic-bezier(0.34, 1.56, 0.64, 1)', // spring overshoot
    linear:      'linear',
  },
} as const;
