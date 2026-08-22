# KOVO — Branding Guide

## Assets Location

All brand assets live in [`assets/branding/`](../assets/branding/):

```
assets/branding/
├── logos/
│   ├── icon.svg            # KOVO monogram (canonical 'K' mark)
│   ├── wordmark.svg        # KOVO wordmark
│   └── logo-horizontal.svg # Monogram + Wordmark lockup
├── icons/                  # App icon (1024×1024), favicon (32×32, 64×64)
├── illustrations/          # Empty state, onboarding, error illustrations
└── social/                 # OG image (1200×630), Twitter/X banner, App Store screenshots
```

## Reusable Logo Component

All applications (`@kovo/web`, `@kovo/admin`, etc.) must use the `<KovoLogo />` component from `@kovo/ui`:

```tsx
import { KovoLogo } from '@kovo/ui';

// Canonical Horizontal Logo (default)
<KovoLogo variant="horizontal" />

// Canonical Wordmark
<KovoLogo variant="wordmark" />

// Canonical Icon / Monogram
<KovoLogo variant="icon" />

// Decorative usage
<KovoLogo variant="icon" decorative />
```

## Brand Asset Rules

- Always use the official assets provided in `assets/branding/logos/`.
- Never recreate, redraw, trace, regenerate, or replace any logo.
- Never embed SVG markup directly into React components.
- Never convert the SVG into JSX.
- Never modify colors, proportions, spacing, rotation, stroke width, or typography.
- Never crop or distort the logo.
- Never apply gradients, shadows, outlines, glows, filters, or animations to the logo itself.


## Color Palette

Defined in [`packages/design-system/src/tokens/colors/index.ts`](../packages/design-system/src/tokens/colors/index.ts).

| Token      | Value     | Usage           |
|------------|-----------|-----------------|
| primary    | `#5B4EFF` | CTAs, links     |
| bgDeep     | `#0E1117` | App background  |
| bgSurface  | `#161B22` | Sidebar         |
| success    | `#22C55E` | Online status   |
| destructive| `#EF4444` | Errors          |

## Typography

- **Sans**: Inter (weights 400/500/600/700)
- **Mono**: JetBrains Mono (code blocks)

Both defined in [`packages/design-system/src/tokens/typography/`](../packages/design-system/src/tokens/typography/index.ts).
