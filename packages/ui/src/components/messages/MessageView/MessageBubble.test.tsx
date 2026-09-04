import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { MessageBubble } from './MessageBubble';
import { CodeBlock } from './CodeBlock';
import { ReactionBar } from './ReactionBar';
import { ThreadIndicator } from './ThreadIndicator';
import { MessageGroup } from './MessageGroup';

describe('Message Subcomponents', () => {
  it('renders MessageBubble text content', () => {
    const html = renderToString(<MessageBubble>Hello world from KOVO</MessageBubble>);
    expect(html).toContain('Hello world from KOVO');
  });

  it('renders outgoing message card with purple border and author header', () => {
    const html = renderToString(
      <MessageBubble
        appearance="outgoing"
        author="Alex Mercer"
        timestamp="Just now"
      >
        Awesome work Marcus. I will run the quarterly checklist demo now.
      </MessageBubble>
    );

    expect(html).toContain('border-[#7C65FF]');
    expect(html).toContain('bg-[#181528]');
    expect(html).toContain('Alex Mercer');
    expect(html).toContain('text-[#A78BFA]');
    expect(html).toContain('Just now');
    expect(html).toContain('Awesome work Marcus');
  });

  it('renders system message with italic styling', () => {
    const html = renderToString(
      <MessageBubble appearance="system">
        Alex Mercer joined the channel
      </MessageBubble>
    );

    expect(html).toContain('italic');
    expect(html).toContain('Alex Mercer joined the channel');
  });

  it('renders CodeBlock with syntax styling and language label', () => {
    const html = renderToString(
      <CodeBlock
        code={`const x = 42;`}
        language="typescript"
      />
    );

    expect(html).toContain('typescript');
    expect(html).toContain('const x = 42;');
  });

  it('renders ReactionBar items', () => {
    const html = renderToString(
      <ReactionBar
        reactions={[
          { emoji: '👍', count: 3, reacted: true },
          { emoji: '🚀', count: 2 },
        ]}
      />
    );

    expect(html).toContain('👍');
    expect(html).toContain('3');
    expect(html).toContain('🚀');
    expect(html).toContain('2');
    expect(html).toContain('bg-[#241F47]');
  });

  it('renders ThreadIndicator with reply count', () => {
    const html = renderToString(
      <ThreadIndicator replyCount={4} />
    );

    expect(html).toContain('4 replies');
    expect(html).toContain('#7C65FF');
  });

  it('renders MessageGroup with author and timestamp', () => {
    const html = renderToString(
      <MessageGroup
        avatar={<div data-testid="avatar">AV</div>}
        author="Daniella Vance"
        timestamp="10:14 AM"
      >
        <MessageBubble>Test message</MessageBubble>
      </MessageGroup>
    );

    expect(html).toContain('Daniella Vance');
    expect(html).toContain('10:14 AM');
    expect(html).toContain('Test message');
    expect(html).toContain('data-testid="avatar"');
  });
});
