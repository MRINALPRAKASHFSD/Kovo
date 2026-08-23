'use client';

import React, { useState, forwardRef, useId } from 'react';

export interface PasswordFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /**
   * Label text displayed above the field.
   */
  label?: string;
  /**
   * Optional error message displayed beneath the field.
   */
  error?: string;
  /**
   * Optional container className.
   */
  containerClassName?: string;
}

/**
 * Accessible password input component.
 * Features an integrated, non-competing "SHOW" / "HIDE" toggle button with full
 * keyboard accessibility and screen reader support.
 */
export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  (
    {
      id: customId,
      label = 'PASSWORD',
      error,
      className = '',
      containerClassName = '',
      disabled,
      placeholder = '••••••••••••',
      ...restProps
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = customId || generatedId;
    const errorId = `${inputId}-error`;
    const [showPassword, setShowPassword] = useState(false);

    const toggleVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <div className={`w-full text-left ${containerClassName}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-[11px] font-semibold uppercase tracking-wider text-[#7E8B9B] mb-2 select-none"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          <input
            {...restProps}
            ref={ref}
            id={inputId}
            type={showPassword ? 'text' : 'password'}
            disabled={disabled}
            placeholder={placeholder}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error ? errorId : undefined}
            className={`w-full h-11 rounded-lg bg-[#1B1A24] border ${
              error ? 'border-red-500/80 focus:border-red-500' : 'border-[#282736]'
            } px-3.5 pr-14 text-sm text-white placeholder:text-[#5A6578] transition-all duration-150 focus:outline-none focus:border-[#7C65FF] focus:ring-1 focus:ring-[#7C65FF] disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
          />

          <button
            type="button"
            onClick={toggleVisibility}
            disabled={disabled}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            aria-controls={inputId}
            className="absolute right-3 px-1.5 py-1 text-[11px] font-semibold tracking-wider text-[#7E8B9B] hover:text-[#B0BCCB] focus-visible:text-[#7C65FF] focus-visible:outline-none rounded transition-colors duration-150 select-none disabled:opacity-50"
          >
            {showPassword ? 'HIDE' : 'SHOW'}
          </button>
        </div>

        {error && (
          <p id={errorId} role="alert" className="mt-1.5 text-xs text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  }
);

PasswordField.displayName = 'PasswordField';
