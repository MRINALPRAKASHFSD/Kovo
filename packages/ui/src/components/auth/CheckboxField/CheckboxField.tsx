'use client';

import React, { useId } from 'react';

export interface CheckboxFieldProps {
  /**
   * Controlled checked state.
   */
  checked?: boolean;
  /**
   * Initial checked state for uncontrolled usage.
   */
  defaultChecked?: boolean;
  /**
   * Callback invoked when checked state changes.
   */
  onChange?: (checked: boolean) => void;
  /**
   * Rich label content (text, inline links, or components).
   */
  children?: React.ReactNode;
  /**
   * Accessible text label if children is omitted or non-textual.
   */
  ariaLabel?: string;
  /**
   * Whether the checkbox is disabled.
   */
  disabled?: boolean;
  /**
   * HTML input name attribute for form submission.
   */
  name?: string;
  /**
   * HTML input id attribute.
   */
  id?: string;
  /**
   * Additional CSS class names for container.
   */
  className?: string;
  /**
   * Whether the field is marked required in a form.
   */
  required?: boolean;
}

/**
 * Accessible checkbox primitive supporting rich label content with inline links,
 * visible focus states, and native keyboard interaction.
 */
export function CheckboxField({
  checked,
  defaultChecked,
  onChange,
  children,
  ariaLabel,
  disabled = false,
  name,
  id: customId,
  className = '',
  required = false,
}: CheckboxFieldProps) {
  const generatedId = useId();
  const inputId = customId || generatedId;
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked ?? false);
  const isChecked = isControlled ? checked : internalChecked;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalChecked(e.target.checked);
    }
    onChange?.(e.target.checked);
  };

  return (
    <label
      htmlFor={inputId}
      className={`inline-flex items-start gap-2.5 select-none text-left cursor-pointer ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
    >
      <div className="relative flex items-center justify-center mt-0.5 flex-shrink-0">
        <input
          id={inputId}
          name={name}
          type="checkbox"
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          aria-label={ariaLabel}
          className="peer sr-only"
        />

        {/* Custom styled checkbox surface */}
        <div
          aria-hidden="true"
          className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-all duration-150 ${
            isChecked
              ? 'bg-[#7C65FF] border-[#7C65FF]'
              : 'bg-[#1B1A24] border-[#282736]'
          } peer-focus-visible:ring-2 peer-focus-visible:ring-[#7C65FF] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[#13121A] peer-checked:bg-[#7C65FF] peer-checked:border-[#7C65FF]`}
        >
          {/* Checkmark SVG icon */}
          <svg
            className={`w-2.5 h-2.5 text-white transition-opacity duration-150 ${
              isChecked ? 'opacity-100' : 'opacity-0'
            }`}
            viewBox="0 0 12 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="1.5 5 4.5 8 10.5 2" />
          </svg>
        </div>
      </div>

      {children && (
        <span className="text-xs text-[#8898AA] leading-relaxed">
          {children}
        </span>
      )}
    </label>
  );
}
