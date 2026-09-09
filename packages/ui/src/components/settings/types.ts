import React from 'react';

export interface SettingsNavigationItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
}

export interface ThemeOption {
  id: string;
  title: string;
  preview?: React.ReactNode;
  description?: string;
  footer?: React.ReactNode;
}

export interface AccentColorOption {
  id: string;
  color: string;
  label: string;
  previewColor?: string;
}

export interface RadioCardOption {
  id: string;
  label: string;
  description?: string;
  badge?: React.ReactNode;
}

export interface AppearancePreferences {
  theme: 'dark' | 'light' | 'system' | (string & {});
  accentColor: string;
  fontScale: number;
  density: 'comfortable' | 'compact' | (string & {});
}

export interface UserPreferences {
  appearance: AppearancePreferences;
  notifications?: Record<string, unknown>;
  privacy?: Record<string, unknown>;
  custom?: Record<string, unknown>;
}
