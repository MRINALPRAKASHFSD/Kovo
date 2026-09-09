import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { SettingsSidebar } from './SettingsSidebar';

const sampleNavItems = [
  { id: 'general', label: 'General' },
  { id: 'appearance', label: 'Appearance' },
  { id: 'notifications', label: 'Notifications', badge: <span>3</span> },
];

describe('SettingsSidebar', () => {
  it('renders navigation tabs with active item marked', () => {
    const html = renderToString(
      <SettingsSidebar
        items={sampleNavItems}
        value="appearance"
        onValueChange={() => {}}
      />
    );

    expect(html).toContain('General');
    expect(html).toContain('Appearance');
    expect(html).toContain('Notifications');
    expect(html).toContain('aria-selected="true"');
    expect(html).toContain('aria-selected="false"');
  });

  it('supports custom item slot render prop', () => {
    const html = renderToString(
      <SettingsSidebar
        items={sampleNavItems}
        value="general"
        onValueChange={() => {}}
        renderItem={(item, active) => (
          <div key={item.id} data-active={active}>
            {`Custom ${item.label}`}
          </div>
        )}
      />
    );

    expect(html).toContain('Custom General');
    expect(html).toContain('data-active="true"');
    expect(html).toContain('Custom Appearance');
    expect(html).toContain('data-active="false"');
  });
});
