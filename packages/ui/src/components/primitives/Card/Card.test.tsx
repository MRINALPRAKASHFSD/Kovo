import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { Card } from './Card';

describe('Card', () => {
  it('renders children with default variant classes', () => {
    const html = renderToString(<Card><span>Card Content</span></Card>);
    expect(html).toContain('Card Content');
    expect(html).toContain('rounded-2xl');
    expect(html).toContain('bg-[#13121C]');
  });

  it('renders elevated variant correctly', () => {
    const html = renderToString(<Card variant="elevated">Elevated</Card>);
    expect(html).toContain('bg-[#161522]');
    expect(html).toContain('shadow-lg');
  });

  it('renders interactive variant correctly', () => {
    const html = renderToString(<Card variant="interactive">Interactive</Card>);
    expect(html).toContain('cursor-pointer');
    expect(html).toContain('hover:border-[#7C65FF]/50');
  });

  it('renders custom element type via as prop', () => {
    const html = renderToString(<Card as="section">Section</Card>);
    expect(html).toContain('<section');
  });
});
