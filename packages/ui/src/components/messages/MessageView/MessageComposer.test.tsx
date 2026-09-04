import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { MessageComposer } from './MessageComposer';

describe('MessageComposer', () => {
  it('renders textarea with placeholder and initial value', () => {
    const html = renderToString(
      <MessageComposer
        placeholder="Message #engineering..."
        value="Hello team"
      />
    );

    expect(html).toContain('placeholder="Message #engineering..."');
    expect(html).toContain('Hello team');
    expect(html).toContain('textarea');
  });

  it('renders toolbar buttons for formatting', () => {
    const html = renderToString(
      <MessageComposer />
    );

    expect(html).toContain('aria-label="Add attachment"');
    expect(html).toContain('aria-label="Bold text"');
    expect(html).toContain('aria-label="Italic text"');
    expect(html).toContain('aria-label="Code block"');
    expect(html).toContain('aria-label="Insert link"');
    expect(html).toContain('aria-label="Insert emoji"');
    expect(html).toContain('aria-label="Mention teammate"');
    expect(html).toContain('aria-label="Send message"');
  });

  it('disables textarea and send button when disabled is true', () => {
    const html = renderToString(
      <MessageComposer
        value="Testing"
        disabled
      />
    );

    expect(html).toContain('disabled=""');
  });

  it('renders compact single-line input bar when variant="compact"', () => {
    const html = renderToString(
      <MessageComposer
        variant="compact"
        placeholder="Message #engineering..."
        value="Mobile text"
      />
    );

    expect(html).toContain('placeholder="Message #engineering..."');
    expect(html).toContain('value="Mobile text"');
    expect(html).toContain('aria-label="Add attachment"');
    expect(html).toContain('aria-label="Send message"');
    expect(html).toContain('bg-[#7C65FF]');
  });

  it('renders single-line thread reply bar when layout="thread"', () => {
    const html = renderToString(
      <MessageComposer
        layout="thread"
        value="Reply text"
      />
    );

    expect(html).toContain('placeholder="Reply to this thread..."');
    expect(html).toContain('value="Reply text"');
    expect(html).toContain('aria-label="Insert emoji"');
    expect(html).toContain('aria-label="Send reply"');
    expect(html).toContain('Send');
  });
});
