/**
 * KOVO Color Tokens
 * Based on HSL for easy theming. All values map to CSS custom properties.
 */
export const colors = {
  // Brand
  primary:   { h: 252, s: 100, l: 60 },  // #5B4EFF
  primaryDk: { h: 245, s:  58, l: 51 },  // #4338CA

  // Dark surface scale
  bgDeep:     '#0E1117',
  bgSurface:  '#161B22',
  bgElevated: '#1E2330',
  bgOverlay:  '#252D3D',

  // Text
  textPrimary: '#F0F4F8',
  textMuted:   '#8898AA',
  textSubtle:  '#4A5568',

  // Borders
  border:       '#2D3A4A',
  borderSubtle: '#1E2A38',

  // Semantic
  success:     '#22C55E',
  warning:     '#F59E0B',
  destructive: '#EF4444',
  info:        '#3B82F6',

  // Presence
  online:  '#22C55E',
  away:    '#F59E0B',
  dnd:     '#EF4444',
  offline: '#6B7280',
} as const;

export type ColorToken = keyof typeof colors;
