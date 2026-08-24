import React from 'react';

export type KovoLogoVariant = 'icon' | 'wordmark' | 'horizontal';

export interface KovoLogoProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  /**
   * The logo variant to render:
   * - 'icon': Canonical KOVO monogram ('K' mark)
   * - 'wordmark': Canonical KOVO wordmark
   * - 'horizontal': Combined canonical horizontal lockup (monogram + wordmark)
   */
  variant?: KovoLogoVariant;
  /**
   * Custom alt text. If omitted, canonical accessible alt text is used.
   */
  alt?: string;
  /**
   * Mark as decorative. Sets alt="" and aria-hidden="true".
   */
  decorative?: boolean;
  /**
   * Optional custom source path if assets are hosted elsewhere.
   */
  src?: string;
}

const LOGO_PATHS: Record<KovoLogoVariant, string> = {
  icon: '/branding/logos/icon.svg',
  wordmark: '/branding/logos/wordmark.svg',
  horizontal: '/branding/logos/logo-horizontal.svg',
};

const DEFAULT_ALT_TEXT: Record<KovoLogoVariant, string> = {
  icon: 'KOVO',
  wordmark: 'KOVO',
  horizontal: 'KOVO Logo',
};

export const KovoLogo = React.forwardRef<HTMLImageElement, KovoLogoProps>(
  (props: KovoLogoProps, ref: React.ForwardedRef<HTMLImageElement>) => {
    const {
      variant = 'horizontal',
      alt,
      decorative = false,
      src,
      className,
      style,
      ...restProps
    } = props;

    const computedAlt = decorative ? '' : (alt !== undefined ? alt : DEFAULT_ALT_TEXT[variant]);
    const computedSrc = src !== undefined ? src : LOGO_PATHS[variant];

    return (
      <img
        ref={ref}
        src={computedSrc}
        alt={computedAlt}
        aria-hidden={decorative ? true : undefined}
        className={className}
        style={{
          display: 'inline-block',
          objectFit: 'contain',
          ...style,
        }}
        {...restProps}
      />
    );
  }
);

KovoLogo.displayName = 'KovoLogo';
