import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { RecentActivitySection } from './RecentActivitySection';
import { RecentActivityItem } from './ActivityItem';

describe('RecentActivitySection and RecentActivityItem', () => {
  it('renders activity items with actor initials, subtitle, and timestamp', () => {
    const html = renderToString(
      <RecentActivitySection
        items={[
          {
            id: 'act-1',
            actor: { name: 'Daniella Vance' },
            subtitle: "#design • Let's review the mockups...",
            timestamp: '10m ago',
          },
          {
            id: 'act-2',
            actor: { name: 'Marcus Aurelius' },
            subtitle: '#engineering • Webhooks are deployed...',
            timestamp: '24m ago',
          },
        ]}
      />
    );
    expect(html).toContain('Recent Activity');
    expect(html).toContain('Daniella Vance');
    expect(html).toContain("Let&#x27;s review the mockups...");
    expect(html).toContain('10m ago');
    expect(html).toContain('Marcus Aurelius');
    expect(html).toContain('Webhooks are deployed...');
    expect(html).toContain('24m ago');
  });

  it('renders custom leading and trailing slots in RecentActivityItem', () => {
    const html = renderToString(
      <RecentActivityItem
        id="act-custom"
        title="Custom Item"
        subtitle="Subtitle text"
        leading={<span id="custom-icon">🔔</span>}
        trailing={<span id="custom-badge">Badge</span>}
      />
    );
    expect(html).toContain('id="custom-icon"');
    expect(html).toContain('id="custom-badge"');
    expect(html).toContain('Custom Item');
  });

  it('renders default empty state when items is empty', () => {
    const html = renderToString(<RecentActivitySection items={[]} />);
    expect(html).toContain('No recent activity to show.');
  });

  it('renders custom empty state when provided', () => {
    const html = renderToString(
      <RecentActivitySection
        items={[]}
        emptyState={<div id="custom-empty">Empty Feed</div>}
      />
    );
    expect(html).toContain('id="custom-empty"');
    expect(html).toContain('Empty Feed');
  });
});
