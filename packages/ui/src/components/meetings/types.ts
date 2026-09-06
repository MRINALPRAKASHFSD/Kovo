import React from 'react';

export type MeetingLayout = 'speaker' | 'grid' | 'sidebar' | 'presentation';

export type MediaSurfaceVariant =
  | 'video'
  | 'image'
  | 'screen'
  | 'avatar'
  | 'placeholder'
  | 'loading';

export type MeetingControlButtonVariant = 'default' | 'active' | 'danger';

export interface ParticipantMedia {
  camera: boolean;
  microphone: boolean;
  screenShare?: boolean;
}

export interface ParticipantState {
  speaking: boolean;
  handRaised?: boolean;
  connection?: 'excellent' | 'good' | 'poor';
  pinned?: boolean;
}

export interface MeetingParticipant {
  id: string;
  name: string;
  avatarUrl?: string;
  mediaUrl?: string;
  isCurrentUser?: boolean;
  role?: string;
  media: ParticipantMedia;
  state: ParticipantState;
}

export interface MeetingSession {
  id: string;
  title: string;
  duration: string;
  recording: boolean;
  encrypted?: boolean;
  securityLabel?: string;
  participantCount: number;
  layout: MeetingLayout;
}
