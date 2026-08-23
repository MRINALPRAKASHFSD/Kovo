import React from 'react';

export type PasswordStrength = 'weak' | 'fair' | 'good' | 'strong';

export interface PasswordStrengthIndicatorProps {
  /**
   * Evaluated password strength state supplied by caller.
   * Renders 0 active segments when null or undefined.
   */
  strength?: PasswordStrength | null;
  /**
   * Additional CSS class names.
   */
  className?: string;
}

interface StrengthConfig {
  activeCount: number;
  label: string;
  activeColorClass: string;
  labelColorClass: string;
}

const STRENGTH_MAP: Record<PasswordStrength, StrengthConfig> = {
  weak: {
    activeCount: 1,
    label: 'Weak',
    activeColorClass: 'bg-red-500',
    labelColorClass: 'text-red-400',
  },
  fair: {
    activeCount: 2,
    label: 'Fair',
    activeColorClass: 'bg-amber-500',
    labelColorClass: 'text-amber-400',
  },
  good: {
    activeCount: 3,
    label: 'Good',
    activeColorClass: 'bg-blue-500',
    labelColorClass: 'text-blue-400',
  },
  strong: {
    activeCount: 4,
    label: 'Strong',
    activeColorClass: 'bg-emerald-500',
    labelColorClass: 'text-emerald-400',
  },
};

/**
 * Presentational password strength indicator featuring four horizontal segments
 * and an accessible live region. Does not contain scoring logic.
 */
export function PasswordStrengthIndicator({
  strength,
  className = '',
}: PasswordStrengthIndicatorProps) {
  const config = strength ? STRENGTH_MAP[strength] : null;
  const activeCount = config?.activeCount ?? 0;
  const label = config?.label ?? '';

  return (
    <div className={`w-full mt-2 select-none ${className}`}>
      {/* 4 Segment Bars */}
      <div className="flex items-center gap-1.5 w-full" aria-hidden="true">
        {[0, 1, 2, 3].map((index) => {
          const isActive = index < activeCount;
          return (
            <div
              key={index}
              className={`h-1 flex-1 rounded-full transition-all duration-200 ease-out ${
                isActive && config ? config.activeColorClass : 'bg-white/[0.08]'
              }`}
            />
          );
        })}
      </div>

      {/* Accessible Live Region & Status Label */}
      <div
        role="status"
        aria-live="polite"
        className="mt-1.5 flex items-center justify-between text-[11px] font-medium"
      >
        <span className="text-[#8898AA]">Password strength</span>
        {label ? (
          <span className={`${config?.labelColorClass ?? 'text-[#8898AA]'}`}>
            {label}
          </span>
        ) : (
          <span className="sr-only">Not evaluated</span>
        )}
      </div>
    </div>
  );
}
