'use client';
/* eslint-disable @next/next/no-img-element */

import React, { useState, useMemo } from 'react';
import {
  NotificationsPage,
  NotificationToolbar,
  NotificationFilterTabs,
  NotificationList,
  EmptyNotifications,
  NotificationData,
  NotificationGroup,
} from '@kovo/ui';

function NotificationAvatar({
  name,
  imageUrl,
}: {
  name: string;
  imageUrl?: string;
}) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

  return (
    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-white/10 bg-[#282736] select-none">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-[#7C65FF]/40 to-[#6344E7]/40 text-white font-semibold text-xs">
          {initials}
        </div>
      )}
    </div>
  );
}

const canonicalNotifications: NotificationData[] = [
  {
    id: 'notif-1',
    category: 'mention',
    unread: true,
    actor: {
      name: 'Daniella Vance',
      avatarUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    },
    title: (
      <span>
        <span className="font-semibold text-white">Daniella Vance</span>{' '}
        <span className="text-[#C5C4D4]">mentioned you in</span>{' '}
        <span className="font-semibold text-[#A594FD]">#design</span>
      </span>
    ),
    description: '"Micro-interactions look slick, let\'s ship this to Prod!"',
    timestamp: '10m ago',
    startAdornment: (
      <NotificationAvatar
        name="Daniella Vance"
        imageUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80"
      />
    ),
  },
  {
    id: 'notif-2',
    category: 'thread',
    unread: true,
    actor: {
      name: 'Marcus Aurelius',
      avatarUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    },
    title: (
      <span>
        <span className="font-semibold text-white">Marcus Aurelius</span>{' '}
        <span className="text-[#C5C4D4]">shared a telemetry report in</span>{' '}
        <span className="font-semibold text-[#A594FD]">#engineering</span>
      </span>
    ),
    description: 'Successfully deployed telemetry webhooks pipeline.',
    timestamp: '24m ago',
    startAdornment: (
      <NotificationAvatar
        name="Marcus Aurelius"
        imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
      />
    ),
  },
  {
    id: 'notif-3',
    category: 'thread',
    unread: false,
    actor: {
      name: 'Clara Croft',
      avatarUrl:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    },
    title: (
      <span>
        <span className="font-semibold text-white">Clara Croft</span>{' '}
        <span className="text-[#C5C4D4]">scheduled a quarterly review in</span>{' '}
        <span className="font-semibold text-[#A594FD]">#general</span>
      </span>
    ),
    description: 'Join us tomorrow at 10 AM EST. Slides are attached.',
    timestamp: '1h ago',
    startAdornment: (
      <NotificationAvatar
        name="Clara Croft"
        imageUrl="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
      />
    ),
  },
  {
    id: 'notif-4',
    category: 'workspace',
    unread: false,
    actor: {
      name: 'Alex Mercer',
      avatarUrl:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    },
    title: (
      <span>
        <span className="font-semibold text-white">Alex Mercer</span>{' '}
        <span className="text-[#C5C4D4]">added you to</span>{' '}
        <span className="font-semibold text-white">Acme Workspace</span>
      </span>
    ),
    description: 'Welcome to KOVO collaboration server.',
    timestamp: '1d ago',
    startAdornment: (
      <NotificationAvatar
        name="Alex Mercer"
        imageUrl="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80"
      />
    ),
  },
];

export default function NotificationsPageRoute() {
  const [activeTab, setActiveTab] = useState('all');
  const [items, setItems] = useState<NotificationData[]>(canonicalNotifications);

  const handleMarkAllRead = () => {
    setItems((prev) => prev.map((item) => ({ ...item, unread: false })));
  };

  const handleNotificationClick = (id: string) => {
    // Toggle unread state when row is activated
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, unread: !item.unread } : item
      )
    );
  };

  // Filter items according to active tab
  const filteredItems = useMemo(() => {
    if (activeTab === 'all') return items;
    return items.filter((item) => item.category === activeTab);
  }, [activeTab, items]);

  // Group into "TODAY" and "YESTERDAY & EARLIER"
  const groups: NotificationGroup[] = useMemo(() => {
    const todayItems = filteredItems.filter(
      (item) => item.id === 'notif-1' || item.id === 'notif-2'
    );
    const earlierItems = filteredItems.filter(
      (item) => item.id === 'notif-3' || item.id === 'notif-4'
    );

    const result: NotificationGroup[] = [];
    if (todayItems.length > 0) {
      result.push({
        id: 'group-today',
        title: 'TODAY',
        notifications: todayItems,
      });
    }
    if (earlierItems.length > 0) {
      result.push({
        id: 'group-yesterday',
        title: 'YESTERDAY & EARLIER',
        notifications: earlierItems,
      });
    }
    return result;
  }, [filteredItems]);

  const emptyTitle =
    activeTab === 'mentions'
      ? 'No Mentions'
      : activeTab === 'threads'
      ? 'No Threads'
      : activeTab === 'reactions'
      ? 'No Reactions'
      : 'No notifications';

  const emptyDescription =
    activeTab === 'mentions'
      ? 'You have not been mentioned in any conversation yet.'
      : activeTab === 'threads'
      ? 'No active thread replies at this moment.'
      : activeTab === 'reactions'
      ? 'No reactions to your messages yet.'
      : "You're all caught up! Check back later for updates.";

  return (
    <NotificationsPage
      toolbar={
        <NotificationToolbar
          leftSlot={
            <NotificationFilterTabs
              value={activeTab}
              onValueChange={setActiveTab}
            />
          }
          rightSlot={
            <button
              type="button"
              onClick={handleMarkAllRead}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#1E1D2A] hover:bg-[#282736] border border-[#282736] rounded-lg transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C65FF]"
            >
              Mark all read
            </button>
          }
        />
      }
    >
      <NotificationList
        groups={groups}
        onNotificationClick={handleNotificationClick}
        emptyState={
          <EmptyNotifications
            title={emptyTitle}
            description={emptyDescription}
            actionLabel={activeTab !== 'all' ? 'View All Notifications' : undefined}
            onAction={() => setActiveTab('all')}
          />
        }
      />
    </NotificationsPage>
  );
}
