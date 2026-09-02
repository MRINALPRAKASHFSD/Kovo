import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { GreetingSection } from './GreetingSection';

describe('GreetingSection', () => {
  it('renders title and subtitle correctly', () => {
    const html = renderToString(
      <GreetingSection
        title="Good morning, Alex"
        subtitle="Here's your huddle status for today."
      />
    );
    expect(html).toContain('Good morning, Alex');
    expect(html).toContain("Here&#x27;s your huddle status for today.");
  });

  it('renders leading and trailing slots', () => {
    const html = renderToString(
      <GreetingSection
        title="Welcome"
        leading={<span id="test-leading">☀️</span>}
        trailing={<span id="test-trailing">Status</span>}
      />
    );
    expect(html).toContain('id="test-leading"');
    expect(html).toContain('id="test-trailing"');
  });
});
