import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { ThreadHeader } from './ThreadHeader';

describe('ThreadHeader', () => {
  it('renders author title and subject subtitle', () => {
    const html = renderToString(
      <ThreadHeader
        title="Daniella Vance"
        subtitle="Notification Center Redesign"
      />
    );

    expect(html).toContain('Daniella Vance');
    expect(html).toContain('Notification Center Redesign');
  });

  it('renders favorite button with filled styling when isFavorite is true', () => {
    const html = renderToString(<ThreadHeader isFavorite={true} />);

    expect(html).toContain('aria-label="Remove from favorites"');
    expect(html).toContain('text-[#7C65FF]');
  });

  it('renders mobile back button when requested', () => {
    const html = renderToString(<ThreadHeader showBackButton={true} />);

    expect(html).toContain('aria-label="Back to threads list"');
  });
});
