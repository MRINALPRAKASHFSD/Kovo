'use client';

import React, { useState, useMemo } from 'react';
import {
  ThreadsWorkspace,
  ThreadSidebar,
  ThreadView,
  ThreadHeader,
  ThreadTimeline,
  MessageComposer,
  EmptyThreads,
  ThreadData,
} from '@kovo/ui';

// Canonical threads dataset matching the canonical KOVO design reference
const initialThreads: ThreadData[] = [
  {
    id: 'th-1',
    author: {
      name: 'Daniella Vance',
      initials: 'DV',
    },
    title: 'Notification Center Redesign',
    channel: 'design',
    preview: 'I finished the latest redesign of the notification center.',
    replyCount: 3,
    lastActivity: '10m ago',
    messages: [
      {
        id: 'msg-1',
        author: {
          name: 'Daniella Vance',
          initials: 'DV',
        },
        timestamp: '10:24 AM',
        content:
          'I finished the latest redesign of the notification center. Let me know what you guys think about the micro-interactions on the badge counter.',
      },
      {
        id: 'msg-2',
        author: {
          name: 'Marcus Aurelius',
          initials: 'MA',
        },
        timestamp: '10:30 AM',
        content:
          "I really like the spring stiffness on the bounce. It makes it feel very organic compared to the older state transitions. Let's run a test on production today!",
      },
    ],
  },
  {
    id: 'th-2',
    author: {
      name: 'Marcus Aurelius',
      initials: 'MA',
    },
    title: 'Webhook Infrastructure Pipeline',
    channel: 'engineering',
    preview: 'The webhooks pipeline is now fully integrated with our...',
    replyCount: 1,
    lastActivity: '24m ago',
    messages: [
      {
        id: 'msg-3',
        author: {
          name: 'Marcus Aurelius',
          initials: 'MA',
        },
        timestamp: '9:45 AM',
        content:
          'The webhooks pipeline is now fully integrated with our event dispatching workers. Throughput is up 4x.',
      },
      {
        id: 'msg-4',
        author: {
          name: 'Alex Mercer',
          initials: 'AM',
        },
        timestamp: '9:58 AM',
        content: 'Benchmark looks outstanding Marcus. Zero dropped packets under peak load test.',
      },
    ],
  },
  {
    id: 'th-3',
    author: {
      name: 'Clara Croft',
      initials: 'CC',
    },
    title: 'Quarterly Strategic Alignment',
    channel: 'marketing',
    preview: "Don't forget we have our quarterly review tomorrow...",
    replyCount: 7,
    lastActivity: '1h ago',
    messages: [
      {
        id: 'msg-5',
        author: {
          name: 'Clara Croft',
          initials: 'CC',
        },
        timestamp: '8:30 AM',
        content:
          "Don't forget we have our quarterly review tomorrow morning. Please add your department highlights to the collaborative deck.",
      },
    ],
  },
];

export default function ThreadsPage() {
  const [threads, setThreads] = useState<ThreadData[]>(initialThreads);
  const [selectedId, setSelectedId] = useState<string>('th-1');
  const [composerValue, setComposerValue] = useState<string>('');
  const [favoriteThreads, setFavoriteThreads] = useState<Record<string, boolean>>({});
  const [showMobileDetail, setShowMobileDetail] = useState<boolean>(false);

  const activeThread = useMemo(
    () => threads.find((t) => t.id === selectedId) || threads[0],
    [threads, selectedId]
  );

  const isCurrentFavorite = activeThread ? Boolean(favoriteThreads[activeThread.id]) : false;

  const handleToggleFavorite = () => {
    if (!activeThread) return;
    setFavoriteThreads((prev) => ({
      ...prev,
      [activeThread.id]: !prev[activeThread.id],
    }));
  };

  const handleSendReply = (content: string) => {
    if (!content.trim() || !activeThread) return;

    const newReply = {
      id: `msg-${Date.now()}`,
      author: {
        name: 'Alex Mercer',
        initials: 'AM',
      },
      timestamp: 'Just now',
      content: content.trim(),
    };

    setThreads((prev) =>
      prev.map((thread) => {
        if (thread.id === activeThread.id) {
          return {
            ...thread,
            replyCount: thread.replyCount + 1,
            lastActivity: 'Just now',
            messages: [...(thread.messages || []), newReply],
          };
        }
        return thread;
      })
    );

    setComposerValue('');
  };

  return (
    <ThreadsWorkspace
      sidebar={
        <ThreadSidebar
          title="Active Threads"
          threads={threads}
          selectedId={selectedId}
          onSelectThread={(id) => {
            setSelectedId(id);
            setShowMobileDetail(true);
          }}
        />
      }
      showMobileDetail={showMobileDetail}
    >
      {activeThread ? (
        <ThreadView
          header={
            <ThreadHeader
              leading={
                <div className="w-9 h-9 rounded-full bg-[#282736] border border-white/10 flex items-center justify-center text-xs font-semibold text-white select-none">
                  {activeThread.author.initials ||
                    activeThread.author.name.trim().charAt(0).toUpperCase()}
                </div>
              }
              title={activeThread.author.name}
              subtitle={activeThread.title}
              isFavorite={isCurrentFavorite}
              onFavoriteClick={handleToggleFavorite}
              showBackButton={showMobileDetail}
              onBackClick={() => setShowMobileDetail(false)}
            />
          }
          timeline={<ThreadTimeline messages={activeThread.messages} />}
          composer={
            <MessageComposer
              layout="thread"
              value={composerValue}
              onChange={setComposerValue}
              onSend={handleSendReply}
              placeholder="Reply to this thread..."
              avatar={
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#282736] border border-white/10 flex items-center justify-center text-xs font-semibold text-white select-none">
                  AM
                </div>
              }
            />
          }
        />
      ) : (
        <EmptyThreads />
      )}
    </ThreadsWorkspace>
  );
}
