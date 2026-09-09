'use client';
/* eslint-disable @next/next/no-img-element */

import React from 'react';
import { UserProfile } from './types';
import { StatusBadge } from './StatusBadge';
import { ProfileField } from './ProfileField';

export interface UserProfileCardProps {
  /**
   * User profile data model.
   */
  user: UserProfile;
  /**
   * Primary action button slot (e.g. Edit Profile, Follow, Send Message).
   * If omitted, renders a default gradient "Edit Profile" button.
   */
  primaryAction?: React.ReactNode;
  /**
   * Callback fired when clicking the default "Edit Profile" button.
   */
  onEditClick?: () => void;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Detailed user profile summary card.
 * Displays large avatar with glowing purple gradient halo, name, role,
 * status badge, structured profile fields, and primary action button.
 */
export function UserProfileCard({
  user,
  primaryAction,
  onEditClick,
  className = '',
}: UserProfileCardProps) {
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

  const defaultAction = (
    <button
      type="button"
      onClick={onEditClick}
      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#7C65FF] to-[#6344E7] hover:from-[#8D78FF] hover:to-[#7455F8] text-white text-sm font-semibold shadow-lg shadow-[#7C65FF]/25 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C65FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#13121D]"
    >
      Edit Profile
    </button>
  );

  return (
    <section
      aria-label={`${user.name}'s Profile`}
      className={`w-full bg-[#13121D] border border-[#1E1D2A] rounded-2xl p-6 flex flex-col items-center select-none shadow-sm ${className}`}
    >
      {/* Avatar with Glowing Gradient Ring */}
      <div className="relative p-1 rounded-full bg-gradient-to-tr from-[#7C65FF] to-[#6344E7] shadow-[0_0_28px_rgba(124,101,255,0.35)] flex items-center justify-center flex-shrink-0">
        <div className="w-28 h-28 rounded-full overflow-hidden bg-[#282736] flex items-center justify-center">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-white font-bold text-2xl tracking-tight">
              {initials}
            </span>
          )}
        </div>
      </div>

      {/* User Name & Role */}
      <h2 className="text-xl font-bold text-white mt-4 tracking-tight text-center">
        {user.name}
      </h2>
      <p className="text-sm text-[#8898AA] mt-0.5 text-center">
        {user.title}
      </p>

      {/* Status Badge */}
      <div className="mt-3">
        <StatusBadge status={user.status} label={user.statusLabel} />
      </div>

      {/* Horizontal Divider */}
      <div className="w-full h-px bg-[#1E1D2A] my-6" aria-hidden="true" />

      {/* Profile Fields */}
      <div className="w-full space-y-4">
        {user.email && (
          <ProfileField label="EMAIL ADDRESS" value={user.email} />
        )}
        {user.timezone && (
          <ProfileField label="TIMEZONE" value={user.timezone} />
        )}
        {user.location && (
          <ProfileField label="LOCATION" value={user.location} />
        )}
        {user.bio && (
          <ProfileField label="BIO" value={user.bio} />
        )}

        {/* Extensible metadata fields */}
        {user.metadata?.map((meta) => (
          <ProfileField key={meta.id} label={meta.label} value={meta.value} />
        ))}
      </div>

      {/* Primary Action Button Slot */}
      <div className="w-full mt-6">
        {primaryAction !== undefined ? primaryAction : defaultAction}
      </div>
    </section>
  );
}
