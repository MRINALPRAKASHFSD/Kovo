'use client';

import React, { useState } from 'react';
import {
  UserProfilePage,
  UserProfileCard,
  ConnectedAccountsGrid,
  ContributionsCard,
  UserProfile,
  ConnectedAccount,
  UserActivity,
} from '@kovo/ui';

// Canonical Alex Chen user profile data
const canonicalUserProfile: UserProfile = {
  id: 'user-alex-chen',
  name: 'Alex Chen',
  title: 'Engineering Lead',
  avatarUrl:
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=240&auto=format&fit=crop&q=80',
  status: 'active',
  statusLabel: 'Active Now',
  email: 'alex.chen@kovo.io',
  timezone: 'UTC-8 (Pacific Time)',
  location: 'San Francisco, CA',
  bio: 'Lead architect focusing on scalable distributed collaboration platforms, developer tooling, and micro-interactions across the KOVO ecosystem.',
  metadata: [
    {
      id: 'meta-dept',
      label: 'DEPARTMENT',
      value: 'Core Platform & Architecture',
    },
    {
      id: 'meta-website',
      label: 'WEBSITE',
      value: (
        <a
          href="https://github.com/alexchen"
          target="_blank"
          rel="noreferrer"
          className="text-[#7C65FF] hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7C65FF] rounded"
        >
          github.com/alexchen
        </a>
      ),
    },
    {
      id: 'meta-pronouns',
      label: 'PRONOUNS',
      value: 'they/them',
    },
  ],
};

// Canonical Connected Accounts (GitHub, Google Workspace, Slack)
const canonicalConnectedAccounts: ConnectedAccount[] = [
  {
    id: 'acc-github',
    displayName: 'GitHub',
    username: '@alexchen',
    status: 'connected',
    icon: (
      <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        />
      </svg>
    ),
  },
  {
    id: 'acc-google',
    displayName: 'Google Workspace',
    email: 'alex.chen@kovo.io',
    status: 'connected',
    icon: (
      <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
      </svg>
    ),
  },
  {
    id: 'acc-slack',
    displayName: 'Slack Enterprise',
    username: '@alexchen',
    status: 'inactive',
    icon: (
      <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
        <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
      </svg>
    ),
  },
];

// Canonical Recent Contributions & Activities
const canonicalContributions: UserActivity[] = [
  {
    id: 'contrib-pr-412',
    title: (
      <span>
        Merged pull request{' '}
        <span className="text-[#A594FD] font-semibold">#412</span> in{' '}
        <span className="font-semibold text-white">#engineering</span>
      </span>
    ),
    description: 'feat(presence): add real-time active user pulse and telemetry indicators',
    timestamp: '2h ago',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    ),
  },
  {
    id: 'contrib-rfc-gateway',
    title: (
      <span>
        Published technical spec in{' '}
        <span className="font-semibold text-white">#general</span>
      </span>
    ),
    description: 'Architecture RFC: Distributed WebSocket Gateway v2 for Edge Node Ingress',
    timestamp: 'Yesterday at 4:32 PM',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: 'contrib-issue-389',
    title: (
      <span>
        Closed issue{' '}
        <span className="text-[#A594FD] font-semibold">#389</span> in{' '}
        <span className="font-semibold text-white">#core</span>
      </span>
    ),
    description: 'fix(perf): reduce command palette indexing latency by 45% on large workspaces',
    timestamp: '3d ago',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function ProfilePageRoute() {
  const [user] = useState<UserProfile>(canonicalUserProfile);
  const [accounts, setAccounts] = useState<ConnectedAccount[]>(canonicalConnectedAccounts);
  const [feedbackNotice, setFeedbackNotice] = useState<string | null>(null);

  const handleEditClick = () => {
    setFeedbackNotice('Profile edit modal is ready for integration in Settings sprint.');
    setTimeout(() => setFeedbackNotice(null), 4000);
  };

  const handleAccountClick = (id: string) => {
    const acc = accounts.find((a) => a.id === id);
    if (!acc) return;
    setAccounts((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === 'connected' ? 'inactive' : 'connected',
            }
          : item
      )
    );
    setFeedbackNotice(
      `Toggled status for ${acc.displayName} to ${acc.status === 'connected' ? 'Inactive' : 'Connected'}.`
    );
    setTimeout(() => setFeedbackNotice(null), 4000);
  };

  const handleContributionClick = (id: string) => {
    const item = canonicalContributions.find((c) => c.id === id);
    if (item) {
      setFeedbackNotice(`Selected contribution: ${item.id}`);
      setTimeout(() => setFeedbackNotice(null), 3000);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Toast feedback notice */}
      {feedbackNotice && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-20 right-6 z-50 px-4 py-2.5 rounded-xl bg-[#1E1D2A] border border-[#7C65FF]/40 text-white text-xs shadow-xl shadow-black/50 flex items-center gap-2 animate-fade-in"
        >
          <div className="w-2 h-2 rounded-full bg-[#7C65FF] animate-pulse" />
          <span>{feedbackNotice}</span>
        </div>
      )}

      <UserProfilePage
        profile={
          <UserProfileCard
            user={user}
            onEditClick={handleEditClick}
          />
        }
      >
        <ConnectedAccountsGrid
          accounts={accounts}
          onAccountClick={handleAccountClick}
        />

        <ContributionsCard
          title="Recent Activity"
          contributions={canonicalContributions}
          onContributionClick={handleContributionClick}
        />
      </UserProfilePage>
    </div>
  );
}
