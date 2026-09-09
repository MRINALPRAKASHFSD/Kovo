import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { SettingsSection } from './SettingsSection';

describe('SettingsSection', () => {
  it('renders section title, description and children', () => {
    const html = renderToString(
      <SettingsSection
        title="Theme Preferences"
        description="Customize the look of the KOVO platform."
      >
        <div data-testid="child-control">Control Content</div>
      </SettingsSection>
    );

    expect(html).toContain('Theme Preferences');
    expect(html).toContain('Customize the look of the KOVO platform.');
    expect(html).toContain('Control Content');
    expect(html).toContain('aria-labelledby="settings-sec-theme-preferences"');
  });

  it('renders without description gracefully', () => {
    const html = renderToString(
      <SettingsSection title="General">
        <div>Content</div>
      </SettingsSection>
    );

    expect(html).toContain('General');
    expect(html).toContain('settings-sec-general');
  });
});
