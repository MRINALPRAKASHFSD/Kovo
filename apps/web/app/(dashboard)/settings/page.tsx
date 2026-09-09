'use client';

import React, { useState } from 'react';
import {
  SettingsPage,
  SettingsSidebar,
  SettingsSection,
  PreferenceField,
  ThemeSelector,
  AccentColorPicker,
  PreferenceSlider,
  RadioCardGroup,
  SettingsNavigationItem,
  ThemeOption,
  AccentColorOption,
  RadioCardOption,
  UserPreferences,
} from '@kovo/ui';

// Canonical Settings Navigation Categories
const canonicalSettingsNav: SettingsNavigationItem[] = [
  { id: 'general', label: 'General' },
  { id: 'appearance', label: 'Appearance' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'privacy', label: 'Privacy' },
  { id: 'integrations', label: 'Integrations' },
  { id: 'billing', label: 'Billing' },
];

// Canonical Theme Options with Slot-Driven Previews
const canonicalThemeOptions: ThemeOption[] = [
  {
    id: 'dark',
    title: 'Dark Theme',
    preview: (
      <div className="p-3 h-16 w-full bg-[#0E0D14] flex flex-col justify-center gap-1.5">
        <div className="h-1.5 w-16 bg-[#282736] rounded-sm" />
        <div className="h-1.5 w-28 bg-[#1E1D2A] rounded-sm" />
      </div>
    ),
  },
  {
    id: 'light',
    title: 'Light Theme',
    preview: (
      <div className="p-3 h-16 w-full bg-[#EDEDF0] flex flex-col justify-center gap-1.5">
        <div className="h-1.5 w-16 bg-[#C5C4D4] rounded-sm" />
        <div className="h-1.5 w-28 bg-[#D8D7E3] rounded-sm" />
      </div>
    ),
  },
  {
    id: 'system',
    title: 'System Sync',
    preview: (
      <div className="p-3 h-16 w-full bg-[#EDEDF0] flex flex-col justify-center gap-1.5">
        <div className="h-1.5 w-16 bg-[#C5C4D4] rounded-sm" />
        <div className="h-1.5 w-28 bg-[#D8D7E3] rounded-sm" />
      </div>
    ),
  },
];

// Canonical Accent Color Swatches
const canonicalAccentColors: AccentColorOption[] = [
  { id: 'purple', color: '#7C65FF', label: 'KOVO Purple' },
  { id: 'pink', color: '#EC4899', label: 'Magenta Pink' },
  { id: 'indigo', color: '#6366F1', label: 'Indigo' },
  { id: 'emerald', color: '#10B981', label: 'Emerald Green' },
  { id: 'blue', color: '#3B82F6', label: 'Sky Blue' },
];

// Canonical Layout Density Options
const canonicalDensityOptions: RadioCardOption[] = [
  { id: 'comfortable', label: 'Comfortable (Default)' },
  { id: 'compact', label: 'Compact (High-density)' },
];

export default function SettingsPageRoute() {
  const [activeTab, setActiveTab] = useState('appearance');

  // Categorized UserPreferences Model
  const [preferences, setPreferences] = useState<UserPreferences>({
    appearance: {
      theme: 'dark',
      accentColor: 'purple',
      fontScale: 50,
      density: 'comfortable',
    },
  });

  const updateAppearance = (
    key: keyof typeof preferences.appearance,
    value: string | number
  ) => {
    setPreferences((prev) => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        [key]: value,
      },
    }));
  };

  return (
    <SettingsPage
      sidebar={
        <SettingsSidebar
          items={canonicalSettingsNav}
          value={activeTab}
          onValueChange={setActiveTab}
        />
      }
    >
      {activeTab === 'appearance' ? (
        <div className="space-y-8 w-full">
          {/* Section 1: Theme Preferences */}
          <SettingsSection
            title="Theme Preferences"
            description="Customize the look of the KOVO platform for your screen."
          >
            <ThemeSelector
              value={preferences.appearance.theme}
              onValueChange={(themeId) => updateAppearance('theme', themeId)}
              options={canonicalThemeOptions}
            />
          </SettingsSection>

          {/* Section 2: Accent Colors */}
          <SettingsSection
            title="Accent Colors"
            description="Set active brand colors for buttons, highlights, and icons."
          >
            <AccentColorPicker
              colors={canonicalAccentColors}
              value={preferences.appearance.accentColor}
              onValueChange={(colorId) => updateAppearance('accentColor', colorId)}
            />
          </SettingsSection>

          {/* Section 3: Font Scaling */}
          <SettingsSection
            title="Font Scaling"
            description="Adjust the default size for system typography across the viewport."
          >
            <PreferenceField label="" className="!space-y-0">
              <PreferenceSlider
                value={preferences.appearance.fontScale}
                onValueChange={(val) => updateAppearance('fontScale', val)}
                min={0}
                max={100}
                step={5}
                leftLabel={<span className="text-xs text-[#8898AA] font-normal">Aa</span>}
                rightLabel={<span className="text-base text-white font-bold">Aa</span>}
                formatValue={(val) => `${val}%`}
                ariaLabel="Font scaling slider"
              />
            </PreferenceField>
          </SettingsSection>

          {/* Section 4: Layout Density */}
          <SettingsSection
            title="Layout Density"
            description="Change spacing across sidebar navigation and list items."
          >
            <PreferenceField label="" className="!space-y-0">
              <RadioCardGroup
                options={canonicalDensityOptions}
                value={preferences.appearance.density}
                onValueChange={(densityId) => updateAppearance('density', densityId)}
                ariaLabel="Layout density options"
              />
            </PreferenceField>
          </SettingsSection>
        </div>
      ) : (
        /* Placeholder view for non-appearance sections */
        <div className="w-full bg-[#13121D] border border-[#1E1D2A] rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#1E1D2A] border border-[#282736] flex items-center justify-center text-[#7C65FF]">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h4 className="text-sm font-semibold text-white tracking-tight capitalize">
            {activeTab} Settings
          </h4>
          <p className="text-xs text-[#8898AA] max-w-sm">
            Configuration controls for {activeTab} will use the same reusable preferences framework in upcoming sprints.
          </p>
          <button
            type="button"
            onClick={() => setActiveTab('appearance')}
            className="mt-2 text-xs font-semibold text-[#7C65FF] hover:underline"
          >
            ← Back to Appearance
          </button>
        </div>
      )}
    </SettingsPage>
  );
}
