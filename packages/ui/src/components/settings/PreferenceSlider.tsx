'use client';

import React, { useRef } from 'react';

export interface PreferenceSliderProps {
  /**
   * Current numeric slider value.
   */
  value: number;
  /**
   * Value change callback.
   */
  onValueChange: (val: number) => void;
  /**
   * Minimum slider value. Defaults to 0.
   */
  min?: number;
  /**
   * Maximum slider value. Defaults to 100.
   */
  max?: number;
  /**
   * Step increment. Defaults to 1.
   */
  step?: number;
  /**
   * Optional formatting callback for screen readers and labels.
   */
  formatValue?: (val: number) => string;
  /**
   * Slot rendered to the left of the slider (e.g. small "Aa").
   */
  leftLabel?: React.ReactNode;
  /**
   * Slot rendered to the right of the slider (e.g. large "Aa").
   */
  rightLabel?: React.ReactNode;
  /**
   * Accessible name for the slider. Defaults to "Preference Slider".
   */
  ariaLabel?: string;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Reusable, accessible slider primitive for continuous or stepped preferences.
 * Supports arrow keys, Home, End, PageUp, PageDown, and custom value formatters.
 */
export function PreferenceSlider({
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  formatValue,
  leftLabel,
  rightLabel,
  ariaLabel = 'Preference Slider',
  className = '',
}: PreferenceSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const clampedValue = Math.min(Math.max(value, min), max);
  const percentage = ((clampedValue - min) / (max - min)) * 100;
  const valueText = formatValue ? formatValue(clampedValue) : String(clampedValue);

  const updateFromPosition = (clientX: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const rawRatio = (clientX - rect.left) / rect.width;
    const clampedRatio = Math.min(Math.max(rawRatio, 0), 1);
    const rawVal = min + clampedRatio * (max - min);
    const steppedVal = Math.round(rawVal / step) * step;
    const finalVal = Math.min(Math.max(steppedVal, min), max);
    onValueChange(finalVal);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromPosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.buttons > 0) {
      updateFromPosition(e.clientX);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    let nextVal = clampedValue;
    const largeStep = step * 10 || 10;

    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        nextVal = Math.max(clampedValue - step, min);
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        nextVal = Math.min(clampedValue + step, max);
        break;
      case 'PageDown':
        nextVal = Math.max(clampedValue - largeStep, min);
        break;
      case 'PageUp':
        nextVal = Math.min(clampedValue + largeStep, max);
        break;
      case 'Home':
        nextVal = min;
        break;
      case 'End':
        nextVal = max;
        break;
      default:
        return;
    }

    e.preventDefault();
    onValueChange(nextVal);
  };

  return (
    <div
      className={`w-full flex items-center gap-4 bg-[#13121D] border border-[#1E1D2A] rounded-xl px-4 py-3 select-none ${className}`}
    >
      {/* Left Slot (e.g., small Aa) */}
      {leftLabel && (
        <div className="flex-shrink-0 text-xs text-[#8898AA] font-medium">
          {leftLabel}
        </div>
      )}

      {/* Slider Interactive Track */}
      <div
        ref={trackRef}
        role="slider"
        tabIndex={0}
        aria-label={ariaLabel}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={clampedValue}
        aria-valuetext={valueText}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onKeyDown={handleKeyDown}
        className="relative flex-1 h-6 flex items-center cursor-pointer focus-visible:outline-none group"
      >
        {/* Track Background */}
        <div className="w-full h-1.5 rounded-full bg-[#1E1D2A] relative overflow-hidden">
          {/* Active Filled Range */}
          <div
            className="h-full bg-gradient-to-r from-[#7C65FF] to-[#8D78FF] rounded-full transition-[width] duration-75"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white shadow-md shadow-black/40 border border-white/20 group-hover:scale-110 group-focus-visible:ring-2 group-focus-visible:ring-[#7C65FF] group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-[#13121D] transition-transform"
          style={{ left: `${percentage}%` }}
        />
      </div>

      {/* Right Slot (e.g., large Aa) */}
      {rightLabel && (
        <div className="flex-shrink-0 text-base text-white font-bold">
          {rightLabel}
        </div>
      )}
    </div>
  );
}
