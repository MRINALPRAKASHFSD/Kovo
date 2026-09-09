import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { RadioCardGroup } from './RadioCardGroup';

const densityOptions = [
  { id: 'comfortable', label: 'Comfortable (Default)', description: 'Spacious layout' },
  { id: 'compact', label: 'Compact (High-density)', description: 'Dense layout' },
];

describe('RadioCardGroup', () => {
  it('renders radio options with accessible radiogroup markup', () => {
    const html = renderToString(
      <RadioCardGroup
        options={densityOptions}
        value="comfortable"
        onValueChange={() => {}}
        ariaLabel="Layout Density"
      />
    );

    expect(html).toContain('role="radiogroup"');
    expect(html).toContain('aria-label="Layout Density"');
    expect(html).toContain('Comfortable (Default)');
    expect(html).toContain('Compact (High-density)');
    expect(html).toContain('aria-checked="true"');
    expect(html).toContain('aria-checked="false"');
  });

  it('supports vertical orientation layout', () => {
    const html = renderToString(
      <RadioCardGroup
        options={densityOptions}
        value="compact"
        onValueChange={() => {}}
        orientation="vertical"
      />
    );

    expect(html).toContain('aria-orientation="vertical"');
    expect(html).toContain('flex flex-col');
  });
});
