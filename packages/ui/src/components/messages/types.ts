import React from 'react';

export type MessageBlockType = 'text' | 'code' | 'image' | 'divider';

export interface TextBlock {
  type: 'text';
  content: string;
}

export interface CodeBlockData {
  type: 'code';
  code: string;
  language?: string;
}

export type MessageBlock = TextBlock | CodeBlockData;

export interface MessageAuthor {
  id: string;
  name: string;
  avatarUrl?: string;
  status?: string;
}

export interface MessageReaction {
  emoji: string;
  count: number;
  reacted?: boolean;
}

export interface Message {
  id: string;
  author: MessageAuthor;
  createdAt: string;
  blocks: MessageBlock[];
  reactions?: MessageReaction[];
  replyCount?: number;
}

export interface Conversation {
  id: string;
  title: string;
  subtitle?: string;
  type: 'dm' | 'channel' | string;
  avatarUrl?: string;
  presence?: 'online' | 'offline' | 'busy' | 'away';
  unreadCount?: number;
  active?: boolean;
}
