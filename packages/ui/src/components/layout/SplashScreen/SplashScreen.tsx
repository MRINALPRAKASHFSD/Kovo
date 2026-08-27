'use client';

import React, { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { KovoLogo } from '../../primitives/KovoLogo';
import { LoadingBar } from '../../primitives/LoadingBar';
import { LoadingStatus } from '../../primitives/LoadingStatus';

export interface SplashScreenProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Current loading status text.
   * @default 'Connecting to Secure Cloud...'
   */
  status?: string;
  /**
   * Optional determinate progress percentage (0 - 100).
   * If not provided, animates continuously.
   */
  progress?: number;
  /**
   * Callback invoked once the entrance animations have completed.
   */
  onReady?: () => void;
  /**
   * Optional error message to display if startup initialization fails.
   */
  error?: string | null;
  /**
   * Additional CSS classes for root element.
   */
  className?: string;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  status = 'Connecting to Secure Cloud...',
  progress,
  onReady,
  error,
  className = '',
  style,
  ...restProps
}) => {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (onReady) {
      const timer = setTimeout(() => {
        onReady();
      }, prefersReducedMotion ? 50 : 800);
      return () => clearTimeout(timer);
    }
  }, [onReady, prefersReducedMotion]);

  const easeOutExpo = [0.16, 1, 0.3, 1] as const;

  return (
    <main
      className={`select-none ${className}`}
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: '#09080E',
        margin: 0,
        padding: 0,
        ...style,
      }}
      aria-label="KOVO Application Loading"
      {...restProps}
    >
      {/* Ambient center radial glow matching design reference */}
      <div
        className="pointer-events-none"
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 0,
        }}
      >
        <div
          style={{
            width: '640px',
            height: '640px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(91, 78, 255, 0.18) 0%, rgba(67, 56, 202, 0.05) 45%, rgba(9, 8, 14, 0) 70%)',
          }}
        />
      </div>

      {/* Main vertical content stack */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        {/* Logo Lockup */}
        <motion.div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          initial={
            prefersReducedMotion
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.96 }
          }
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, ease: easeOutExpo }}
        >
          {/* Canonical KOVO Monogram Icon */}
          <KovoLogo
            variant="icon"
            decorative
            style={{
              height: '72px',
              width: 'auto',
              filter: 'brightness(0) invert(1)',
            }}
          />

          {/* Canonical KOVO Wordmark */}
          <div style={{ marginTop: '20px' }}>
            <KovoLogo
              variant="wordmark"
              alt="KOVO"
              style={{
                height: '24px',
                width: 'auto',
                filter: 'brightness(0) invert(1)',
              }}
            />
          </div>
        </motion.div>

        {/* Enterprise Collaboration Subtitle */}
        <motion.p
          style={{
            marginTop: '10px',
            fontSize: '11px',
            lineHeight: '16px',
            letterSpacing: '0.22em',
            color: '#8898AA',
            fontWeight: 500,
            textTransform: 'uppercase',
          }}
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.6,
            delay: prefersReducedMotion ? 0 : 0.18,
            ease: easeOutExpo,
          }}
        >
          ENTERPRISE COLLABORATION
        </motion.p>

        {/* Loading Indicator & Status Container */}
        <motion.div
          style={{
            marginTop: '48px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.6,
            delay: prefersReducedMotion ? 0 : 0.32,
            ease: easeOutExpo,
          }}
        >
          {error ? (
            <div
              role="alert"
              style={{
                fontSize: '12px',
                fontWeight: 500,
                color: '#EF4444',
                letterSpacing: '0.05em',
              }}
            >
              {error}
            </div>
          ) : (
            <>
              <LoadingBar value={progress} />
              <div style={{ marginTop: '14px' }}>
                <LoadingStatus text={status} />
              </div>
            </>
          )}
        </motion.div>
      </div>
    </main>
  );
};

SplashScreen.displayName = 'SplashScreen';
