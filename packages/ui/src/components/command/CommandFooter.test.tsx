import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { CommandFooter } from './CommandFooter';

describe('CommandFooter', () => {
  it('renders keyboard hints and brand name', () => {
    const html = renderToString(<CommandFooter />);

    expect(html).toContain('to select');
    expect(html).toContain('to navigate');
    expect(html).toContain('KOVO Command Palette');
  });

  it('renders custom hints when provided', () => {
    const html = renderToString(
      <CommandFooter
        selectHint="to execute"
        navigateHint="to cycle"
        brandText="Acme Launcher"
      />
    );

    expect(html).toContain('to execute');
    expect(html).toContain('to cycle');
    expect(html).toContain('Acme Launcher');
  });
});
