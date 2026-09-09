import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { PreferenceGroup } from './PreferenceGroup';

describe('PreferenceGroup', () => {
  it('renders group with title, description, and accessibility role', () => {
    const html = renderToString(
      <PreferenceGroup
        title="Interface"
        description="Configure sidebar and density."
      >
        <div>Group Controls</div>
      </PreferenceGroup>
    );

    expect(html).toContain('Interface');
    expect(html).toContain('Configure sidebar and density.');
    expect(html).toContain('Group Controls');
    expect(html).toContain('role="group"');
    expect(html).toContain('aria-labelledby="pref-grp-interface"');
  });

  it('renders without title or description', () => {
    const html = renderToString(
      <PreferenceGroup>
        <div>Anonymous Group</div>
      </PreferenceGroup>
    );

    expect(html).toContain('Anonymous Group');
    expect(html).toContain('role="group"');
  });
});
