import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { PreferenceSlider } from './PreferenceSlider';

describe('PreferenceSlider', () => {
  it('renders accessible slider with role, min, max, value, and labels', () => {
    const html = renderToString(
      <PreferenceSlider
        value={50}
        onValueChange={() => {}}
        min={0}
        max={100}
        step={5}
        formatValue={(val) => `${val}%`}
        leftLabel="Aa"
        rightLabel="Aa"
        ariaLabel="Font Scaling Slider"
      />
    );

    expect(html).toContain('role="slider"');
    expect(html).toContain('aria-valuemin="0"');
    expect(html).toContain('aria-valuemax="100"');
    expect(html).toContain('aria-valuenow="50"');
    expect(html).toContain('aria-valuetext="50%"');
    expect(html).toContain('aria-label="Font Scaling Slider"');
    expect(html).toContain('Aa');
  });

  it('clamps percentage accurately for thumb position', () => {
    const html = renderToString(
      <PreferenceSlider
        value={75}
        onValueChange={() => {}}
        min={0}
        max={100}
      />
    );

    expect(html).toContain('width:75%');
    expect(html).toContain('left:75%');
  });
});
