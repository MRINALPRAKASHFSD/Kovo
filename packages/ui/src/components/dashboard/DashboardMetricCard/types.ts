import React from 'react';

export interface DashboardMetricCardData {
  /**
   * Unique identifier for the metric.
   */
  id: string;
  /**
   * Uppercase metric label (e.g. "UNREAD", "ACTIVE", "BUILDS").
   */
  label: string;
  /**
   * Main statistic value (e.g. "12", "4", "99.8%").
   */
  value: React.ReactNode;
  /**
   * Optional helper text below the value (e.g. "+3 new replies", "2 threads open").
   */
  helperText?: React.ReactNode;
  /**
   * Optional icon slot rendered in the top-right corner.
   */
  icon?: React.ReactNode;
  /**
   * Optional click handler if the card is interactive.
   */
  onClick?: () => void;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

export interface DashboardMetricCardProps extends DashboardMetricCardData {}
