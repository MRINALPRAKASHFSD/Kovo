import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { PreferenceField } from './PreferenceField';

describe('PreferenceField', () => {
  it('renders stacked layout with label, description and control', () => {
    const html = renderToString(
      <PreferenceField
        label="Font Scaling"
        description="Adjust typography throughout the app."
      >
        <input type="range" aria-label="Font scale" />
      </PreferenceField>
    );

    expect(html).toContain('Font Scaling');
    expect(html).toContain('Adjust typography throughout the app.');
    expect(html).toContain('type="range"');
  });

  it('renders horizontal layout cleanly', () => {
    const html = renderToString(
      <PreferenceField
        label="Compact Mode"
        description="High density layout."
        layout="horizontal"
      >
        <button type="button">Toggle</button>
      </PreferenceField>
    );

    expect(html).toContain('Compact Mode');
    expect(html).toContain('High density layout.');
    expect(html).toContain('sm:flex-row');
  });
});
