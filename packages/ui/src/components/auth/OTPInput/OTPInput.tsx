'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

export interface OTPInputProps {
  /**
   * Complete verification code as a single controlled string.
   */
  value: string;
  /**
   * Callback fired with the updated complete verification code.
   */
  onChange: (value: string) => void;
  /**
   * Total number of digit segments. Default is 6.
   */
  length?: number;
  /**
   * Whether all inputs are disabled.
   */
  disabled?: boolean;
  /**
   * Whether to auto-focus the first empty slot on mount.
   */
  autoFocus?: boolean;
  /**
   * HTML id prefix for inputs.
   */
  id?: string;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

interface OTPCellProps {
  index: number;
  digit: string;
  isFilled: boolean;
  isFocused: boolean;
  disabled: boolean;
  total: number;
  inputId: string;
  inputRef: (el: HTMLInputElement | null) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, index: number) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  onPaste: (e: React.ClipboardEvent<HTMLInputElement>, index: number) => void;
  onFocus: (index: number) => void;
  onBlur: (index: number) => void;
  onCompositionStart: () => void;
  onCompositionEnd: () => void;
}

/**
 * Memoized individual OTP digit cell.
 * Prevents unnecessary re-renders of unaffected slots when a single digit updates.
 */
const OTPCell = React.memo(function OTPCell({
  index,
  digit,
  isFilled,
  isFocused,
  disabled,
  total,
  inputId,
  inputRef,
  onKeyDown,
  onChange,
  onPaste,
  onFocus,
  onBlur,
  onCompositionStart,
  onCompositionEnd,
}: OTPCellProps) {
  return (
    <input
      ref={inputRef}
      id={inputId}
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      autoComplete="one-time-code"
      maxLength={2}
      value={digit}
      disabled={disabled}
      aria-label={`Digit ${index + 1} of ${total}`}
      onKeyDown={(e) => onKeyDown(e, index)}
      onChange={(e) => onChange(e, index)}
      onPaste={(e) => onPaste(e, index)}
      onFocus={() => onFocus(index)}
      onBlur={() => onBlur(index)}
      onCompositionStart={onCompositionStart}
      onCompositionEnd={onCompositionEnd}
      className={`w-11 sm:w-12 md:w-[50px] h-14 sm:h-[58px] rounded-xl text-center text-xl sm:text-2xl font-semibold select-none caret-[#7C65FF] transition-all duration-150 ease-out focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
        isFocused
          ? 'bg-[#1B1A24] border-2 border-[#7C65FF] text-white ring-2 ring-[#7C65FF]/30'
          : isFilled
            ? 'bg-[#1B1A24] border border-[#7C65FF] text-white'
            : 'bg-[#16151F] border border-[#282736] text-white/50 hover:border-[#3E3D52]'
      }`}
    />
  );
});

/**
 * Controlled-only segmented One-Time Passcode (OTP) input.
 * Represents code as a single string, derives digit states, and internally manages
 * focus, arrow navigation, backspace, and paste distribution.
 */
export function OTPInput({
  value,
  onChange,
  length = 6,
  disabled = false,
  autoFocus = false,
  id = 'otp-input',
  className = '',
}: OTPInputProps) {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const isComposingRef = useRef<boolean>(false);

  // Derive individual digits strictly from the single string value
  const digits = Array.from({ length }, (_, i) => value[i] || '');

  // Auto-focus first empty slot or first slot on mount
  useEffect(() => {
    if (autoFocus && !disabled) {
      const firstEmptyIndex = digits.findIndex((d) => !d);
      const targetIndex = firstEmptyIndex === -1 ? 0 : firstEmptyIndex;
      inputRefs.current[targetIndex]?.focus();
    }
  }, [autoFocus, disabled]); // run once when autoFocus/disabled is ready

  const handleFocus = useCallback((index: number) => {
    setFocusedIndex(index);
  }, []);

  const handleBlur = useCallback((index: number) => {
    setFocusedIndex((current) => (current === index ? null : current));
  }, []);

  const handleCompositionStart = useCallback(() => {
    isComposingRef.current = true;
  }, []);

  const handleCompositionEnd = useCallback(() => {
    isComposingRef.current = false;
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      if (isComposingRef.current) return;

      if (e.key === 'Backspace') {
        e.preventDefault();
        const chars = Array.from({ length }, (_, i) => value[i] || '');

        if (!chars[index] && index > 0) {
          // Current cell is already empty: clear previous cell and jump focus back
          chars[index - 1] = '';
          onChange(chars.join('').trimEnd());
          inputRefs.current[index - 1]?.focus();
        } else {
          // Current cell has a digit: clear it and remain focused
          chars[index] = '';
          onChange(chars.join('').trimEnd());
        }
        return;
      }

      if (e.key === 'ArrowLeft' && index > 0) {
        e.preventDefault();
        inputRefs.current[index - 1]?.focus();
        return;
      }

      if (e.key === 'ArrowRight' && index < length - 1) {
        e.preventDefault();
        inputRefs.current[index + 1]?.focus();
        return;
      }
    },
    [length, value, onChange]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      if (isComposingRef.current) return;

      const raw = e.target.value;
      const digitsOnly = raw.replace(/\D/g, '');

      if (!digitsOnly) {
        // If user highlighted and cleared
        const chars = Array.from({ length }, (_, i) => value[i] || '');
        chars[index] = '';
        onChange(chars.join('').trimEnd());
        return;
      }

      // Take the latest entered digit
      const nextDigit = digitsOnly.slice(-1);
      const chars = Array.from({ length }, (_, i) => value[i] || '');
      chars[index] = nextDigit;
      const nextValue = chars.join('').trimEnd();
      onChange(nextValue);

      // Automatically advance focus to the next cell
      if (index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [length, value, onChange]
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>, startIndex: number) => {
      e.preventDefault();
      const pasteText = e.clipboardData.getData('text');
      const digitsOnly = pasteText.replace(/\D/g, '');

      if (!digitsOnly) return;

      const chars = Array.from({ length }, (_, i) => value[i] || '');
      let pastePointer = 0;
      let lastPopulatedIndex = startIndex;

      for (
        let i = startIndex;
        i < length && pastePointer < digitsOnly.length;
        i++, pastePointer++
      ) {
        chars[i] = digitsOnly[pastePointer];
        lastPopulatedIndex = i;
      }

      const nextValue = chars.join('').trimEnd();
      onChange(nextValue);

      // Move focus to the last populated input or the next empty one
      const nextFocus =
        lastPopulatedIndex < length - 1
          ? lastPopulatedIndex + 1
          : lastPopulatedIndex;
      inputRefs.current[nextFocus]?.focus();
    },
    [length, value, onChange]
  );

  return (
    <div
      role="group"
      aria-label="Verification code"
      className={`flex items-center justify-center gap-2 sm:gap-2.5 ${className}`}
    >
      {digits.map((digit, index) => (
        <OTPCell
          key={index}
          index={index}
          digit={digit}
          isFilled={Boolean(digit)}
          isFocused={focusedIndex === index}
          disabled={disabled}
          total={length}
          inputId={`${id}-${index}`}
          inputRef={(el) => {
            inputRefs.current[index] = el;
          }}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          onPaste={handlePaste}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
        />
      ))}
    </div>
  );
}
