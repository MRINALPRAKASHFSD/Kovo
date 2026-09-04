'use client';

import React, { useRef, useEffect } from 'react';
import { ToolbarButton } from './ToolbarButton';

export type MessageComposerVariant = 'rich' | 'compact' | 'thread';

export interface MessageComposerProps {
  /**
   * Layout/style variant: 'rich' (desktop toolbar), 'compact' (mobile touch bar), or 'thread' (single-line reply with avatar & send).
   * Defaults to 'rich'.
   */
  variant?: MessageComposerVariant;
  /**
   * Layout alias for variant (e.g. layout="thread").
   */
  layout?: MessageComposerVariant;
  /**
   * Optional leading avatar node (used in 'thread' layout).
   */
  avatar?: React.ReactNode;
  /**
   * Current text value in the composer.
   */
  value?: string;
  /**
   * Callback fired when text changes.
   */
  onChange?: (value: string) => void;
  /**
   * Callback fired when submitting a message (clicking Send or pressing Enter without Shift).
   */
  onSend?: (content: string) => void;
  /**
   * Placeholder text. Default is "Message #engineering..." or "Reply to this thread...".
   */
  placeholder?: string;
  /**
   * Whether the composer is disabled.
   */
  disabled?: boolean;
  /**
   * Optional callbacks for formatting toolbar actions.
   */
  onAttach?: () => void;
  onBold?: () => void;
  onItalic?: () => void;
  onCode?: () => void;
  onLink?: () => void;
  onEmoji?: () => void;
  onMention?: () => void;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Pinned message composer supporting rich desktop composition, compact mobile touch inputs,
 * and single-line thread replies.
 */
export function MessageComposer({
  variant = 'rich',
  layout,
  avatar,
  value = '',
  onChange,
  onSend,
  placeholder,
  disabled = false,
  onAttach,
  onBold,
  onItalic,
  onCode,
  onLink,
  onEmoji,
  onMention,
  className = '',
}: MessageComposerProps) {
  const activeLayout = layout || variant;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const activePlaceholder =
    placeholder ||
    (activeLayout === 'thread'
      ? 'Reply to this thread...'
      : 'Message #engineering...');

  // Auto-grow textarea up to max-height (144px) when in rich mode
  useEffect(() => {
    if (activeLayout === 'rich' && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.min(scrollHeight, 144)}px`;
    }
  }, [value, activeLayout]);

  const handleSendClick = () => {
    if (value.trim() && onSend && !disabled) {
      onSend(value.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendClick();
    }
  };

  // Single-Line Thread Reply Layout (Canonical reference)
  if (activeLayout === 'thread') {
    const defaultAvatar = (
      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#282736] border border-white/10 flex items-center justify-center text-xs font-semibold text-white select-none flex-shrink-0">
        AM
      </div>
    );

    return (
      <div className={`p-3 sm:px-6 sm:py-4 bg-[#0E0D14] border-t border-[#1E1D2A] flex-shrink-0 select-none ${className}`}>
        <div className="flex items-center gap-3 max-w-full">
          {/* Leading Avatar */}
          <div className="flex-shrink-0">
            {avatar !== undefined ? avatar : defaultAvatar}
          </div>

          {/* Input Pill with Emoji Trigger */}
          <div className="flex-1 bg-[#151420] border border-[#262536] focus-within:border-[#7C65FF] rounded-xl px-4 py-2 transition-colors flex items-center gap-2 shadow-inner">
            <input
              type="text"
              value={value}
              onChange={(e) => onChange?.(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={activePlaceholder}
              disabled={disabled}
              aria-label={activePlaceholder}
              className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-[#8898AA] focus:outline-none"
            />
            {/* Emoji Trigger */}
            <button
              type="button"
              onClick={onEmoji}
              disabled={disabled}
              aria-label="Insert emoji"
              title="Insert emoji"
              className="text-[#8898AA] hover:text-white transition-colors focus-visible:outline-none p-1 rounded hover:bg-white/5 flex-shrink-0"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>

          {/* Send Button */}
          <button
            type="button"
            onClick={handleSendClick}
            disabled={disabled || !value.trim()}
            aria-label="Send reply"
            className="bg-[#7C65FF] hover:bg-[#6344E7] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C65FF] flex-shrink-0 shadow-lg shadow-[#7C65FF]/20"
          >
            Send
          </button>
        </div>
      </div>
    );
  }

  // Compact Single-Line Touch Layout (Mobile reference)
  if (activeLayout === 'compact') {
    return (
      <div className={`p-2.5 sm:p-3 bg-[#0E0D14] border-t border-[#1E1D2A] flex-shrink-0 select-none ${className}`}>
        <div className="flex items-center gap-2 max-w-full">
          {/* Attachment Button */}
          <button
            type="button"
            onClick={onAttach}
            aria-label="Add attachment"
            title="Add attachment"
            disabled={disabled}
            className="p-2 rounded-xl text-[#8898AA] hover:text-white hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C65FF] flex-shrink-0 min-w-[40px] min-h-[40px] flex items-center justify-center disabled:opacity-40"
          >
            <svg
              className="w-5 h-5 -rotate-45"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
          </button>

          {/* Text Input Pill */}
          <div className="flex-1 bg-[#13121D] border border-[#1E1D2A] focus-within:border-[#7C65FF] rounded-xl px-3.5 py-2 transition-colors flex items-center shadow-inner">
            <input
              type="text"
              value={value}
              onChange={(e) => onChange?.(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={activePlaceholder}
              disabled={disabled}
              aria-label={activePlaceholder}
              className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-[#6B7280] focus:outline-none"
            />
          </div>

          {/* Purple Action Button (Send) */}
          <button
            type="button"
            onClick={handleSendClick}
            disabled={disabled || !value.trim()}
            aria-label="Send message"
            title="Send message"
            className="w-10 h-10 rounded-xl bg-[#7C65FF] hover:bg-[#8D78FF] active:scale-95 text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#7C65FF]/25 disabled:opacity-40 disabled:cursor-not-allowed transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C65FF]"
          >
            <svg
              className="w-4 h-4 translate-x-0.5 -translate-y-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3 21l18-9L3 3l3 9zm0 0h6" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  // Rich Multi-line Desktop Layout
  return (
    <div className={`p-3 sm:px-6 sm:pb-6 sm:pt-2 bg-[#0E0D14] flex-shrink-0 ${className}`}>
      <div className="bg-[#13121D] border border-[#1E1D2A] rounded-xl p-3 focus-within:border-[#7C65FF] transition-colors shadow-lg">
        {/* Text Area */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={activePlaceholder}
          disabled={disabled}
          rows={1}
          aria-label={activePlaceholder}
          className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-[#6B7280] focus:outline-none resize-none min-h-[36px] max-h-[144px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#282736]"
        />

        {/* Formatting Toolbar */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#1E1D2A]/60 select-none">
          {/* Left Toolbar Items */}
          <div className="flex items-center gap-0.5 sm:gap-1 flex-wrap">
            {/* Attachment Button */}
            <ToolbarButton
              icon={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              }
              aria-label="Add attachment"
              title="Add attachment"
              disabled={disabled}
              onClick={onAttach}
            />

            <div className="h-4 w-px bg-[#1E1D2A] mx-0.5 sm:mx-1" aria-hidden="true" />

            {/* Bold */}
            <ToolbarButton
              icon={<span className="font-bold text-xs">B</span>}
              aria-label="Bold text"
              title="Bold (⌘B)"
              disabled={disabled}
              onClick={onBold}
            />

            {/* Italic */}
            <ToolbarButton
              icon={<span className="italic font-serif text-xs font-semibold">I</span>}
              aria-label="Italic text"
              title="Italic (⌘I)"
              disabled={disabled}
              onClick={onItalic}
            />

            {/* Code */}
            <ToolbarButton
              icon={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              }
              aria-label="Code block"
              title="Code block"
              disabled={disabled}
              onClick={onCode}
            />

            {/* Link */}
            <ToolbarButton
              icon={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              }
              aria-label="Insert link"
              title="Insert link (⌘K)"
              disabled={disabled}
              onClick={onLink}
            />

            {/* Emoji */}
            <ToolbarButton
              icon={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              aria-label="Insert emoji"
              title="Insert emoji"
              disabled={disabled}
              onClick={onEmoji}
            />
          </div>

          {/* Right Toolbar Items: Mention + Send */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            {/* Mention */}
            <ToolbarButton
              icon={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              }
              aria-label="Mention teammate"
              title="Mention (@)"
              disabled={disabled}
              onClick={onMention}
            />

            {/* Send Button */}
            <ToolbarButton
              variant="primary"
              icon={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              }
              aria-label="Send message"
              title="Send (Enter)"
              disabled={disabled || !value.trim()}
              onClick={handleSendClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
