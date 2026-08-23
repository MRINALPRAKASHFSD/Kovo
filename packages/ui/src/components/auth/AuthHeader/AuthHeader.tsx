import React from 'react';

export interface AuthHeaderProps {
  /**
   * Title text displayed below the brand monogram (e.g. "SIGN IN TO KOVO" or "Verify your email").
   */
  title?: React.ReactNode;
  /**
   * Optional subtitle or description text / elements.
   */
  subtitle?: React.ReactNode;
  /**
   * Additional CSS class names for the container.
   */
  className?: string;
  /**
   * Additional CSS class names for the heading element.
   */
  titleClassName?: string;
  /**
   * Whether to transform title to uppercase. Defaults to true for backward compatibility.
   */
  isUppercase?: boolean;
}

/**
 * Centered brand header for authentication screens.
 * Displays the official KOVO monogram in brand violet (#7C65FF) with breathing room
 * and a styled heading.
 */
export function AuthHeader({
  title = 'SIGN IN TO KOVO',
  subtitle,
  className = '',
  titleClassName = '',
  isUppercase = true,
}: AuthHeaderProps) {
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      {/* KOVO Monogram in Brand Violet (#7C65FF) */}
      <div className="mb-2.5 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="125 38 88 126"
          className="w-10 h-12 text-[#7C65FF] fill-current drop-shadow-[0_4px_12px_rgba(124,101,255,0.25)]"
          aria-label="KOVO"
          role="img"
        >
          <path
            d="M 177.250 60.616 C 166.662 70.821, 158 79.708, 158 80.364 C 158 81.021, 160.929 84.461, 164.510 88.009 L 171.019 94.461 190.010 75.490 C 200.454 65.057, 209 56.052, 209 55.481 C 209 54.910, 206.188 51.657, 202.750 48.252 L 196.500 42.062 177.250 60.616 M 131 110.421 L 131 149.842 138.250 150.171 C 150.738 150.738, 150 151.364, 150 140.193 L 150 130.524 165.262 145.762 C 173.656 154.143, 181.207 161, 182.043 161 C 183.696 161, 195 150.060, 195 148.461 C 195 147.209, 157.797 110, 156.545 110 C 156.030 110, 154.347 111.209, 152.805 112.687 L 150 115.374 150 93.187 L 150 71 140.500 71 L 131 71 131 110.421"
            fillRule="evenodd"
          />
        </svg>
      </div>

      {/* Header Title */}
      <h1
        className={`text-sm sm:text-base font-bold tracking-[0.08em] text-white select-none ${
          isUppercase ? 'uppercase' : ''
        } ${titleClassName}`}
      >
        {title}
      </h1>

      {subtitle && (
        <div className="mt-1.5 text-xs text-[#8898AA]">
          {subtitle}
        </div>
      )}
    </div>
  );
}
