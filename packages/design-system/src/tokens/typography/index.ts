export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
  },
  fontSize: {
    xs:   ['11px', { lineHeight: '16px' }],
    sm:   ['13px', { lineHeight: '20px' }],
    base: ['14px', { lineHeight: '20px' }],
    md:   ['15px', { lineHeight: '24px' }],
    lg:   ['16px', { lineHeight: '24px' }],
    xl:   ['18px', { lineHeight: '28px' }],
    '2xl': ['20px', { lineHeight: '28px' }],
    '3xl': ['24px', { lineHeight: '32px' }],
    '4xl': ['30px', { lineHeight: '36px' }],
  },
  fontWeight: {
    normal:   '400',
    medium:   '500',
    semibold: '600',
    bold:     '700',
  },
} as const;
