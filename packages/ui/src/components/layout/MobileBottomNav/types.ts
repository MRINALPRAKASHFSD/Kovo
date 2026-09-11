import React from 'react';

export interface MobileNavItemData {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: React.ReactNode;
  href?: string;
  disabled?: boolean;
}

export interface MobileBottomNavProps {
  /**
   * List of navigation items rendered in the navigation bar.
   */
  items: MobileNavItemData[];
  /**
   * Currently active navigation item ID.
   */
  value: string;
  /**
   * Selection callback fired when a tab is pressed.
   */
  onValueChange?: (id: string) => void;
  /**
   * Navigation orientation. Defaults to 'horizontal'.
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Whether to show the iOS home indicator pill bar. Defaults to true.
   */
  showHomeIndicator?: boolean;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}
