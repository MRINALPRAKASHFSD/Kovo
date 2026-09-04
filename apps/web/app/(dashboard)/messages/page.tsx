'use client';
/* eslint-disable @next/next/no-img-element */

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Avatar,
  KovoLogo,
  MessagesWorkspace,
  ConversationSidebar,
  ConversationSection,
  ConversationItem,
  ConversationDrawer,
  MessageView,
  ChannelHeader,
  MessageList,
  MessageGroup,
  MessageBubble,
  CodeBlock,
  ReactionBar,
  ThreadIndicator,
  MessageComposer,
  ToolbarButton,
} from '@kovo/ui';

interface UserData {
  id: string;
  name: string;
  avatarUrl?: string;
  presence?: 'online' | 'offline' | 'busy' | 'away';
  unread?: number;
}

interface ChannelData {
  id: string;
  name: string;
  unread?: number;
}

interface MessageItem {
  id: string;
  author: {
    name: string;
    avatarUrl?: string;
    presence?: 'online' | 'offline' | 'busy' | 'away';
  };
  timestamp: string;
  text: string;
  appearance?: 'incoming' | 'outgoing' | 'system' | 'bot' | 'announcement';
  codeSnippet?: {
    code: string;
    language: string;
  };
  reactions?: { emoji: string; count: number; reacted?: boolean }[];
  replyCount?: number;
}

const initialDMs: UserData[] = [
  {
    id: 'dm-1',
    name: 'Daniella Vance',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    presence: 'online',
    unread: 2,
  },
  {
    id: 'dm-2',
    name: 'Marcus Aurelius',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    presence: 'online',
  },
  {
    id: 'dm-3',
    name: 'Clara Croft',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    presence: 'online',
  },
  {
    id: 'dm-4',
    name: 'Satoshi Nakamoto',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    presence: 'offline',
  },
];

const initialChannels: ChannelData[] = [
  { id: 'ch-1', name: 'general' },
  { id: 'ch-2', name: 'engineering', unread: 4 },
  { id: 'ch-3', name: 'design' },
  { id: 'ch-4', name: 'marketing', unread: 1 },
];

const initialMessages: MessageItem[] = [
  {
    id: 'msg-1',
    author: {
      name: 'Daniella Vance',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
      presence: 'online',
    },
    timestamp: '10:24 AM',
    text: 'Hey team, did we push the latest telemetry webhooks config to staging?',
    appearance: 'incoming',
    reactions: [
      { emoji: '👍', count: 3, reacted: true },
      { emoji: '🚀', count: 2 },
    ],
  },
  {
    id: 'msg-2',
    author: {
      name: 'Marcus Aurelius',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      presence: 'online',
    },
    timestamp: '10:26 AM',
    text: 'Yes, I wrapped up the prod integration in k8s. Live monitoring metrics look green on Grafana.',
    appearance: 'incoming',
  },
  {
    id: 'msg-3',
    author: {
      name: 'Alex Mercer',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      presence: 'online',
    },
    timestamp: '10:28 AM',
    text: 'Awesome work Marcus. I will run the quarterly checklist demo now.',
    appearance: 'outgoing',
  },
];

export default function MessagesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChannelId, setActiveChannelId] = useState('ch-2'); // engineering
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [messages, setMessages] = useState<MessageItem[]>(initialMessages);
  const [composerValue, setComposerValue] = useState('');

  // Filter conversations
  const filteredDMs = initialDMs.filter((dm) =>
    dm.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredChannels = initialChannels.filter((ch) =>
    ch.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (text: string) => {
    const newMessage: MessageItem = {
      id: `msg-${Date.now()}`,
      author: {
        name: 'Alex Mercer',
        presence: 'online',
      },
      timestamp: 'Just now',
      text,
      appearance: 'outgoing',
    };
    setMessages((prev) => [...prev, newMessage]);
    setComposerValue('');
  };

  const handleReact = (msgId: string, emoji: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id !== msgId) return msg;
        const existingReactions = msg.reactions || [];
        const found = existingReactions.find((r) => r.emoji === emoji);
        if (found) {
          return {
            ...msg,
            reactions: existingReactions.map((r) =>
              r.emoji === emoji
                ? { ...r, count: r.reacted ? r.count - 1 : r.count + 1, reacted: !r.reacted }
                : r
            ),
          };
        }
        return {
          ...msg,
          reactions: [...existingReactions, { emoji, count: 1, reacted: true }],
        };
      })
    );
  };

  const conversationListContent = (
    <>
      {/* Direct Messages Section */}
      <ConversationSection title="DIRECT MESSAGES" onAddClick={() => {}}>
        {filteredDMs.map((dm) => (
          <ConversationItem
            key={dm.id}
            leading={
              <Avatar
                name={dm.name}
                src={dm.avatarUrl}
                presence={dm.presence}
                size="sm"
              />
            }
            title={dm.name}
            trailing={
              dm.unread ? (
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full min-w-[20px] text-center bg-[#7C65FF] text-white">
                  {dm.unread}
                </span>
              ) : undefined
            }
            onClick={() => {
              setIsDrawerOpen(false);
            }}
          />
        ))}
      </ConversationSection>

      {/* Channels Section */}
      <ConversationSection title="CHANNELS" onAddClick={() => {}}>
        {filteredChannels.map((ch) => {
          const isActive = activeChannelId === ch.id;
          return (
            <ConversationItem
              key={ch.id}
              leading={
                <span
                  className={`w-4 h-4 flex items-center justify-center font-bold text-sm ${
                    isActive ? 'text-[#7C65FF]' : 'text-[#8898AA]'
                  }`}
                  aria-hidden="true"
                >
                  #
                </span>
              }
              title={ch.name}
              active={isActive}
              trailing={
                ch.unread ? (
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full min-w-[20px] text-center bg-[#7C65FF] text-white">
                    {ch.unread}
                  </span>
                ) : undefined
              }
              onClick={() => {
                setActiveChannelId(ch.id);
                setIsDrawerOpen(false);
              }}
            />
          );
        })}
      </ConversationSection>
    </>
  );

  return (
    <MessagesWorkspace
      sidebar={
        <ConversationSidebar
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Filter conversations..."
        >
          {conversationListContent}
        </ConversationSidebar>
      }
      drawer={
        <ConversationDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        >
          <ConversationSidebar
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Filter conversations..."
          >
            {conversationListContent}
          </ConversationSidebar>
        </ConversationDrawer>
      }
    >
      <MessageView
        header={
          <ChannelHeader
            leading={
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#7C65FF] to-[#6344E7] p-1 flex items-center justify-center shadow-md shadow-[#7C65FF]/20 flex-shrink-0">
                <KovoLogo variant="icon" className="w-5 h-5 object-contain" />
              </div>
            }
            title="#engineering"
            subtitle="14 active developers"
            onToggleDrawer={() => setIsDrawerOpen(true)}
            actions={
              <>
                {/* Audio/Video Call Button */}
                <ToolbarButton
                  icon={
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  }
                  aria-label="Start call"
                  title="Start call"
                  onClick={() => router.push('/calls')}
                />

                {/* Search Conversation / Palette Button */}
                <ToolbarButton
                  icon={
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
                    </svg>
                  }
                  aria-label="Search conversation"
                  title="Search conversation"
                  onClick={() => {
                    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
                  }}
                />

                {/* Desktop-only auxiliary actions */}
                <div className="hidden sm:flex items-center gap-1">
                  <ToolbarButton
                    icon={
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    }
                    aria-label="Pinned messages"
                    title="Pinned messages"
                    onClick={() => {}}
                  />
                  <ToolbarButton
                    icon={
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01" />
                      </svg>
                    }
                    aria-label="More channel options"
                    title="More channel options"
                    onClick={() => {}}
                  />
                </div>
              </>
            }
          />
        }
        footer={
          <>
            {/* Mobile Compact Composer */}
            <div className="block md:hidden">
              <MessageComposer
                variant="compact"
                value={composerValue}
                onChange={setComposerValue}
                onSend={handleSendMessage}
                placeholder="Message #engineering..."
              />
            </div>
            {/* Desktop Rich Composer */}
            <div className="hidden md:block">
              <MessageComposer
                variant="rich"
                value={composerValue}
                onChange={setComposerValue}
                onSend={handleSendMessage}
                placeholder="Message #engineering..."
              />
            </div>
          </>
        }
      >
        <MessageList bottomInset="84px">
          {messages.map((msg) => {
            if (msg.appearance === 'outgoing') {
              return (
                <div key={msg.id} className="py-1">
                  <MessageBubble
                    appearance="outgoing"
                    author={msg.author.name}
                    timestamp={msg.timestamp}
                  >
                    {msg.text}
                  </MessageBubble>
                </div>
              );
            }

            return (
              <MessageGroup
                key={msg.id}
                avatar={
                  <Avatar
                    name={msg.author.name}
                    src={msg.author.avatarUrl}
                    presence={msg.author.presence}
                    size="md"
                  />
                }
                author={msg.author.name}
                timestamp={msg.timestamp}
              >
                <MessageBubble appearance={msg.appearance || 'incoming'}>
                  {msg.text}
                </MessageBubble>

                {msg.codeSnippet && (
                  <CodeBlock
                    code={msg.codeSnippet.code}
                    language={msg.codeSnippet.language}
                  />
                )}

                {msg.reactions && (
                  <ReactionBar
                    reactions={msg.reactions}
                    onReact={(emoji) => handleReact(msg.id, emoji)}
                    onAddReaction={() => handleReact(msg.id, '❤️')}
                  />
                )}

                {msg.replyCount !== undefined && (
                  <ThreadIndicator
                    replyCount={msg.replyCount}
                    onClick={() => {}}
                  />
                )}
              </MessageGroup>
            );
          })}
        </MessageList>
      </MessageView>
    </MessagesWorkspace>
  );
}
