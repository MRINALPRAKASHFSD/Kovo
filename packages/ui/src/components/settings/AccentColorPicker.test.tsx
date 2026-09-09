import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { AccentColorPicker } from './AccentColorPicker';

const sampleColors = [
  { id: 'purple', color: '#7C65FF', label: 'Purple' },
  { id: 'pink', color: '#EC4899', label: 'Pink' },
  { id: 'indigo', color: '#6366F1', label: 'Indigo' },
  { id: 'emerald', color: '#10B981', label: 'Emerald' },
  { id: 'blue', color: '#3B82F6', label: 'Blue' },
];

describe('AccentColorPicker', () => {
  it('renders all color swatches in radiogroup', () => {
    const html = renderToString(
      <AccentColorPicker
        colors={sampleColors}
        value="purple"
        onValueChange={() => {}}
      />
    );

    expect(html).toContain('role="radiogroup"');
    expect(html).toContain('aria-label="Purple"');
    expect(html).toContain('aria-label="Pink"');
    expect(html).toContain('aria-label="Emerald"');
  });

  it('renders checkmark icon only for selected color', () => {
    const html = renderToString(
      <AccentColorPicker
        colors={sampleColors}
        value="emerald"
        onValueChange={() => {}}
      />
    );

    expect(html).toContain('aria-checked="true"');
    expect(html).toContain('stroke-width="2.5"');
  });
});
