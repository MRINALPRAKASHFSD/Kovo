import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { SettingsPage } from './SettingsPage';

describe('SettingsPage', () => {
  it('renders responsive grid with sidebar and main content', () => {
    const html = renderToString(
      <SettingsPage
        sidebar={<div data-testid="settings-nav">Settings Nav</div>}
      >
        <div data-testid="settings-body">Appearance Section</div>
      </SettingsPage>
    );

    expect(html).toContain('Settings Nav');
    expect(html).toContain('Appearance Section');
    expect(html).toContain('grid-cols-[minmax(200px,220px)_1fr]');
  });
});
