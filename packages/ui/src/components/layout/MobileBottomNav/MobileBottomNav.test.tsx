import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { MobileBottomNav } from './MobileBottomNav';
import { MobileNavItemData } from './types';

const mockItems: MobileNavItemData[] = [
  { id: 'home', label: 'Home', icon: <span>HomeIcon</span> },
  { id: 'messages', label: 'Messages', icon: <span>MsgIcon</span>, badge: '3' },
  { id: 'channels', label: 'Channels', icon: <span>HashIcon</span> },
  { id: 'calls', label: 'Calls', icon: <span>CallsIcon</span> },
  { id: 'profile', label: 'Profile', icon: <span>ProfileIcon</span> },
];

describe('MobileBottomNav', () => {
  it('renders all navigation items', () => {
    const html = renderToString(<MobileBottomNav items={mockItems} value="home" />);
    expect(html).toContain('aria-label="Mobile navigation"');
    expect(html).toContain('Home');
    expect(html).toContain('Messages');
    expect(html).toContain('Channels');
    expect(html).toContain('Calls');
    expect(html).toContain('Profile');
  });

  it('sets aria-current="page" on the active item', () => {
    const html = renderToString(<MobileBottomNav items={mockItems} value="messages" />);
    expect(html).toContain('aria-current="page"');
    expect(html).toContain('text-[#7C65FF]');
  });

  it('renders badges when provided', () => {
    const html = renderToString(<MobileBottomNav items={mockItems} value="home" />);
    expect(html).toContain('3');
  });

  it('renders iOS home indicator when enabled', () => {
    const html = renderToString(<MobileBottomNav items={mockItems} value="home" showHomeIndicator={true} />);
    expect(html).toContain('w-32 h-1 bg-white/20');
  });
});
