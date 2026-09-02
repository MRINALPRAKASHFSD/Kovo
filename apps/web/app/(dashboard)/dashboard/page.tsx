import type { Metadata } from 'next';
import {
  GreetingSection,
  DashboardMetricGrid,
  DashboardMetricCardData,
  RecentActivitySection,
  ActivityFeedItem,
} from '@kovo/ui';

export const metadata: Metadata = {
  title: 'Dashboard — KOVO',
  description: 'KOVO enterprise collaboration dashboard.',
};

// Canonical icons matching KOVO design system
const ChatIcon = (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
);

const HashIcon = (
  <span className="font-bold text-sm text-[#7C65FF]" aria-hidden="true">
    #
  </span>
);

const ChannelsIcon = (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
  </svg>
);

const CallsIcon = (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

// Canonical mobile metrics matching the iPhone reference screenshot
const canonicalMobileMetrics: DashboardMetricCardData[] = [
  {
    id: 'metric-unread',
    label: 'UNREAD',
    value: '12',
    helperText: <span className="text-[#7C65FF] font-medium">+3 new replies</span>,
    icon: ChatIcon,
  },
  {
    id: 'metric-active',
    label: 'ACTIVE',
    value: '4',
    helperText: '2 threads open',
    icon: HashIcon,
  },
];

// Desktop metrics expanding to 4 cards
const canonicalDesktopMetrics: DashboardMetricCardData[] = [
  ...canonicalMobileMetrics,
  {
    id: 'metric-channels',
    label: 'CHANNELS',
    value: '8',
    helperText: '14 active developers',
    icon: ChannelsIcon,
  },
  {
    id: 'metric-huddles',
    label: 'HUDDLES',
    value: '2',
    helperText: 'Next starts in 15m',
    icon: CallsIcon,
  },
];

// Canonical activity items matching reference screenshot
const canonicalActivityItems: ActivityFeedItem[] = [
  {
    id: 'act-1',
    actor: {
      name: 'Daniella Vance',
      initials: 'DV',
    },
    title: 'Daniella Vance',
    subtitle: "#design • Let's review the mockups...",
    timestamp: '10m ago',
  },
  {
    id: 'act-2',
    actor: {
      name: 'Marcus Aurelius',
      initials: 'MA',
    },
    title: 'Marcus Aurelius',
    subtitle: '#engineering • Webhooks are deployed...',
    timestamp: '24m ago',
  },
  {
    id: 'act-3',
    actor: {
      name: 'Clara Croft',
      initials: 'CC',
    },
    title: 'Clara Croft',
    subtitle: '#marketing • Q3 roadmap alignment completed',
    timestamp: '1h ago',
  },
];

export default function DashboardPage() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero Greeting Section */}
      <GreetingSection
        title="Good morning, Alex"
        subtitle="Here's your huddle status for today."
      />

      {/* Metrics Grid: Mobile renders canonical 2 cards, Desktop renders 4 cards */}
      <div className="block lg:hidden">
        <DashboardMetricGrid items={canonicalMobileMetrics} />
      </div>
      <div className="hidden lg:block">
        <DashboardMetricGrid items={canonicalDesktopMetrics} />
      </div>

      {/* Recent Activity Section */}
      <RecentActivitySection
        title="Recent Activity"
        items={canonicalActivityItems}
      />
    </div>
  );
}
