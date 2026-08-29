'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  AppShell,
  Sidebar,
  SidebarUserProfileCard,
  TopBar,
  MobileTopBar,
  CommandPalette,
  CommandItemData,
  MobileBottomNav,
  MobileNavItemData,
} from '@kovo/ui';

// Mobile Navigation Icons matching iPhone reference
const HomeNavIcon = (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const MessagesNavIcon = (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const ChannelsNavIcon = (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
  </svg>
);

const CallsNavIcon = (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const ProfileNavIcon = (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const canonicalMobileNavItems: MobileNavItemData[] = [
  { id: 'home', label: 'Home', icon: HomeNavIcon },
  { id: 'messages', label: 'Messages', icon: MessagesNavIcon },
  { id: 'channels', label: 'Channels', icon: ChannelsNavIcon },
  { id: 'calls', label: 'Calls', icon: CallsNavIcon },
  { id: 'profile', label: 'Profile', icon: ProfileNavIcon },
];

// Canonical items matching kovo-command-palette
const canonicalCommandItems: CommandItemData[] = [
  {
    id: 'nav-profile',
    title: 'View Profile (Alex Chen)',
    description: 'in People',
    groupId: 'rec',
    groupTitle: 'RECOMMENDED ACTIONS & RESULTS',
    shortcut: '⌘P',
    leading: (
      <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#7C65FF] to-[#6344E7] flex items-center justify-center text-[10px] font-bold text-white">
        AC
      </div>
    ),
  },
  {
    id: 'act-new-msg',
    title: 'New Message',
    description: 'in Actions',
    groupId: 'rec',
    groupTitle: 'RECOMMENDED ACTIONS & RESULTS',
    shortcut: '⌘N',
    leading: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    id: 'act-create-ch',
    title: 'Create Channel',
    description: 'in Actions',
    groupId: 'rec',
    groupTitle: 'RECOMMENDED ACTIONS & RESULTS',
    shortcut: '⌥C',
    leading: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    ),
  },
  {
    id: 'act-start-huddle',
    title: 'Start Huddle / Call',
    description: 'in Actions',
    groupId: 'rec',
    groupTitle: 'RECOMMENDED ACTIONS & RESULTS',
    shortcut: '⌘H',
    leading: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    id: 'ch-engineering',
    title: '#engineering',
    description: 'in Channels',
    groupId: 'rec',
    groupTitle: 'RECOMMENDED ACTIONS & RESULTS',
    leading: <span className="font-bold text-sm">#</span>,
  },
  {
    id: 'ch-design',
    title: '#design',
    description: 'in Channels',
    groupId: 'rec',
    groupTitle: 'RECOMMENDED ACTIONS & RESULTS',
    leading: <span className="font-bold text-sm">#</span>,
  },
  {
    id: 'user-daniella',
    title: 'Daniella Vance (Product)',
    description: 'in People',
    groupId: 'rec',
    groupTitle: 'RECOMMENDED ACTIONS & RESULTS',
    shortcut: '⌘1',
    leading: (
      <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#7C65FF]/40 to-[#6344E7]/40 flex items-center justify-center text-[10px] font-bold text-white">
        DV
      </div>
    ),
  },
  {
    id: 'user-marcus',
    title: 'Marcus Aurelius (Lead Tech)',
    description: 'in People',
    groupId: 'rec',
    groupTitle: 'RECOMMENDED ACTIONS & RESULTS',
    shortcut: '⌘2',
    leading: (
      <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#7C65FF]/40 to-[#6344E7]/40 flex items-center justify-center text-[10px] font-bold text-white">
        MA
      </div>
    ),
  },
  {
    id: 'nav-settings',
    title: 'Settings & Preferences',
    description: 'in System',
    groupId: 'rec',
    groupTitle: 'RECOMMENDED ACTIONS & RESULTS',
    shortcut: '⌘,',
    leading: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: 'file-notif-center',
    title: 'Notification_Center_v2.fig',
    description: 'in Files',
    groupId: 'rec',
    groupTitle: 'RECOMMENDED ACTIONS & RESULTS',
    shortcut: '⌥F',
    leading: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
];

export function DashboardShellClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isMessages = pathname?.startsWith('/messages');
  const isNotifications = pathname?.startsWith('/notifications');
  const isProfile = pathname?.startsWith('/profile');
  const isSettings = pathname?.startsWith('/settings');
  const isCalls = pathname?.startsWith('/calls');
  const isChannels = pathname?.startsWith('/channels');
  const isThreads = pathname?.startsWith('/threads');

  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Check URL query param to open on ?cmd=1 or ?command=true
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('cmd') === '1' || params.get('command') === 'true') {
        setIsCommandOpen(true);
      }
    }
  }, []);

  // Global ⌘K / Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter commands by query
  const filteredCommands = useMemo(() => {
    if (!commandQuery.trim()) return canonicalCommandItems;
    const q = commandQuery.toLowerCase();
    return canonicalCommandItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q))
    );
  }, [commandQuery]);

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [commandQuery]);

  const handleSelectCommand = (id: string) => {
    setIsCommandOpen(false);
    if (id === 'act-new-msg' || id === 'ch-engineering' || id === 'user-daniella') {
      router.push('/messages');
    } else if (id === 'act-create-ch' || id === 'ch-design' || id === 'ch-marketing') {
      router.push('/channels');
    } else if (id === 'nav-threads' || id === 'th-redesign') {
      router.push('/threads');
    } else if (id === 'nav-notifications') {
      router.push('/notifications');
    } else if (id === 'nav-profile') {
      router.push('/profile');
    } else if (id === 'nav-settings') {
      router.push('/settings');
    } else if (id === 'act-start-huddle') {
      router.push('/calls');
    }
  };

  const handleMobileNavChange = (id: string) => {
    if (id === 'home') {
      router.push('/dashboard');
    } else if (id === 'messages') {
      router.push('/messages');
    } else if (id === 'channels') {
      router.push('/channels');
    } else if (id === 'calls') {
      router.push('/calls');
    } else if (id === 'profile') {
      router.push('/profile');
    }
  };

  const activeNav = isThreads
    ? 'threads'
    : isChannels
    ? 'channels'
    : isMessages
    ? 'messages'
    : isNotifications
    ? 'notifications'
    : isCalls
    ? 'calls'
    : 'home';
  const mobileActiveNav = isChannels
    ? 'channels'
    : isMessages
    ? 'messages'
    : isCalls
    ? 'calls'
    : isProfile
    ? 'profile'
    : 'home';
  const pageTitle = isChannels
    ? 'Channels'
    : isSettings
    ? 'Settings'
    : isProfile
    ? 'User Profile'
    : isNotifications
    ? 'Notifications'
    : 'Dashboard';

  return (
    <>
      <AppShell
        sidebar={
          isCalls ? null : (
            <Sidebar
              activeItem={activeNav}
              footer={
                <SidebarUserProfileCard
                  name="Alex Chen"
                  role="Engineering Lead"
                  avatarUrl="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80"
                  onClick={() => router.push('/profile')}
                  onSettingsClick={() => router.push('/settings')}
                />
              }
            />
          )
        }
        header={
          isMessages || isCalls || isThreads ? null : isChannels ? (
            <>
              {/* Desktop Header */}
              <div className="hidden md:block">
                <TopBar
                  title="Channels"
                  onSearchClick={() => setIsCommandOpen(true)}
                  onNotificationClick={() => router.push('/notifications')}
                  onAvatarClick={() => router.push('/profile')}
                  userName="Alex Chen"
                  userAvatarUrl="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80"
                  hasNotifications={true}
                />
              </div>
              {/* Mobile Header */}
              <div className="block md:hidden">
                <MobileTopBar
                  leading={
                    <button
                      type="button"
                      onClick={() => router.back()}
                      aria-label="Go back"
                      className="w-10 h-10 -ml-2 rounded-xl flex items-center justify-center text-[#8898AA] hover:text-white transition-colors active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C65FF]"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                    </button>
                  }
                  title="Channels"
                  actions={
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setIsCommandOpen(true)}
                        aria-label="Search channels"
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-[#8898AA] hover:text-white transition-colors active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C65FF]"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsCommandOpen(true)}
                        aria-label="Create new channel"
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-[#8898AA] hover:text-white transition-colors active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C65FF]"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </button>
                    </div>
                  }
                />
              </div>
            </>
          ) : (
            <>
              {/* Desktop Header */}
              <div className="hidden md:block">
                <TopBar
                  title={pageTitle}
                  onSearchClick={() => setIsCommandOpen(true)}
                  onNotificationClick={() => router.push('/notifications')}
                  onAvatarClick={() => router.push('/profile')}
                  userName="Alex Chen"
                  userAvatarUrl="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80"
                  hasNotifications={true}
                />
              </div>
              {/* Mobile Header */}
              <div className="block md:hidden">
                <MobileTopBar
                  workspaceName="Kovo"
                  hasNotifications={true}
                  onNotificationClick={() => router.push('/notifications')}
                  onAvatarClick={() => router.push('/profile')}
                  userName="Alex Mercer"
                />
              </div>
            </>
          )
        }
        bottomSlot={
          isCalls ? null : (
            <MobileBottomNav
              items={canonicalMobileNavItems}
              value={mobileActiveNav}
              onValueChange={handleMobileNavChange}
            />
          )
        }
        fullBleed={isMessages || isCalls || isThreads}
      >
        {children}
      </AppShell>

      {/* Global Command Palette Overlay */}
      <CommandPalette
        open={isCommandOpen}
        query={commandQuery}
        items={filteredCommands}
        selectedIndex={selectedIndex}
        onQueryChange={setCommandQuery}
        onSelectIndex={setSelectedIndex}
        onSelect={handleSelectCommand}
        onClose={() => setIsCommandOpen(false)}
      />
    </>
  );
}
