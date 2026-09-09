import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { ProfileField } from './ProfileField';

describe('ProfileField', () => {
  it('renders uppercase label and text value', () => {
    const html = renderToString(
      <ProfileField label="EMAIL ADDRESS" value="alex.chen@acme.com" />
    );

    expect(html).toContain('EMAIL ADDRESS');
    expect(html).toContain('alex.chen@acme.com');
  });

  it('renders rich ReactNode values', () => {
    const html = renderToString(
      <ProfileField
        label="LOCATION"
        value={<span data-testid="rich-loc">Brooklyn, NY</span>}
      />
    );

    expect(html).toContain('LOCATION');
    expect(html).toContain('data-testid="rich-loc"');
  });

  it('renders nothing when value is undefined or empty', () => {
    const html = renderToString(
      <ProfileField label="OPTIONAL" value={undefined} />
    );

    expect(html).toBe('');
  });
});
