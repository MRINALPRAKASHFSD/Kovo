'use client';

import React, { useState } from 'react';

export interface CodeBlockProps {
  /**
   * Raw code string.
   */
  code: string;
  /**
   * Optional language identifier (e.g. "json", "typescript").
   */
  language?: string;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Monospace code block subcomponent for message bubbles.
 * Provides copy-to-clipboard functionality and syntax styling.
 */
export function CodeBlock({
  code,
  language,
  className = '',
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className={`relative group/code my-2.5 rounded-xl border border-[#1E1D2A] bg-[#13121D] overflow-hidden ${className}`}>
      {/* Optional Top Bar for language / copy */}
      <div className="flex items-center justify-between px-3.5 py-1.5 bg-[#0E0D14]/80 border-b border-[#1E1D2A] select-none text-[11px] text-[#6B7280]">
        <span>{language || 'code'}</span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? 'Copied code' : 'Copy code to clipboard'}
          className="text-[#8898AA] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7C65FF]"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Code Text */}
      <pre className="p-4 font-mono text-xs sm:text-sm text-[#E2E8F0] overflow-x-auto leading-relaxed scrollbar-thin scrollbar-thumb-[#282736]">
        <code>{code}</code>
      </pre>
    </div>
  );
}
