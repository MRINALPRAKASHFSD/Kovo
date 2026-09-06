'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  VideoCallPage,
  MeetingHeader,
  ParticipantGrid,
  ParticipantTile,
  ParticipantOverlay,
  ActiveSpeakerBadge,
  MediaSurface,
  MeetingToolbar,
  MeetingControlsGroup,
  MeetingControlButton,
  MeetingFooter,
  MeetingParticipant,
  MeetingSession,
} from '@kovo/ui';

// Canonical meeting session metadata
const canonicalSession: MeetingSession = {
  id: 'huddle-eng-standup',
  title: 'Engineering Standup',
  duration: '45:12',
  recording: true,
  encrypted: true,
  securityLabel: 'Secure Huddle',
  participantCount: 5,
  layout: 'speaker',
};

// Canonical participants matching kovo-video-call design reference
const initialParticipants: (MeetingParticipant & { avatarUrl: string; isCurrentUser?: boolean })[] = [
  {
    id: 'p1',
    name: 'Daniella Vance',
    role: 'Product Lead',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80',
    media: {
      camera: true,
      microphone: false,
      screenShare: false,
    },
    state: {
      speaking: false,
      handRaised: false,
      connection: 'excellent',
    },
  },
  {
    id: 'p2',
    name: 'Marcus Aurelius',
    role: 'Lead Tech',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80',
    media: {
      camera: true,
      microphone: true,
      screenShare: false,
    },
    state: {
      speaking: false,
      handRaised: false,
      connection: 'excellent',
    },
  },
  {
    id: 'p3',
    name: 'Clara Croft',
    role: 'Design Systems',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop&q=80',
    media: {
      camera: true,
      microphone: true,
      screenShare: false,
    },
    state: {
      speaking: false,
      handRaised: false,
      connection: 'excellent',
    },
  },
  {
    id: 'p4',
    name: 'Sarah Connor',
    role: 'Security Engineer',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
    media: {
      camera: true,
      microphone: false,
      screenShare: false,
    },
    state: {
      speaking: false,
      handRaised: false,
      connection: 'good',
    },
  },
  {
    id: 'p5',
    name: 'Alex Mercer',
    role: 'Engineering Lead',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=80',
    isCurrentUser: true,
    media: {
      camera: true,
      microphone: true,
      screenShare: false,
    },
    state: {
      speaking: true,
      handRaised: false,
      connection: 'excellent',
      pinned: true,
    },
  },
];

// SVG Icons for toolbar buttons
const MicOnIcon = (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
    />
  </svg>
);

const MicOffIcon = (
  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.25 9.75v1.5a5.25 5.25 0 01-9.52 3.09M12 18.75v3m-3.75-3h7.5m-3.75-9a3 3 0 00-3-3m0 0l12 12M6 6l12 12"
    />
  </svg>
);

const VideoOnIcon = (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
    />
  </svg>
);

const VideoOffIcon = (
  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M3 3l18 18M9.88 9.88A3 3 0 1014.12 14.12M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
    />
  </svg>
);

const ScreenShareIcon = (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const ChatIcon = (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
);

const ReactionIcon = (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const PhoneHangupIcon = (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

export default function CallsPage() {
  const router = useRouter();

  // Local meeting state
  const [participants] = useState(initialParticipants);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [floatingReaction, setFloatingReaction] = useState<string | null>(null);

  // Group participants into grid (left 4) and featured speaker (right 1)
  const gridParticipants = participants.filter((p) => !p.isCurrentUser);
  const featuredParticipant = participants.find((p) => p.isCurrentUser) || participants[participants.length - 1];

  const handleReaction = () => {
    setFloatingReaction('🔥');
    setTimeout(() => {
      setFloatingReaction(null);
    }, 2000);
  };

  const handleLeaveCall = () => {
    router.push('/dashboard');
  };

  return (
    <VideoCallPage
      header={
        <MeetingHeader
          session={canonicalSession}
        />
      }
      toolbar={
        <MeetingToolbar
          start={
            <MeetingFooter count={canonicalSession.participantCount || 5} />
          }
          center={
            <MeetingControlsGroup>
              {/* Microphone Toggle */}
              <MeetingControlButton
                icon={isMicMuted ? MicOffIcon : MicOnIcon}
                variant={isMicMuted ? 'danger' : 'default'}
                ariaLabel={isMicMuted ? 'Unmute microphone' : 'Mute microphone'}
                onClick={() => setIsMicMuted((prev) => !prev)}
              />

              {/* Camera Toggle */}
              <MeetingControlButton
                icon={isCameraOff ? VideoOffIcon : VideoOnIcon}
                variant={isCameraOff ? 'danger' : 'default'}
                ariaLabel={isCameraOff ? 'Turn on camera' : 'Turn off camera'}
                onClick={() => setIsCameraOff((prev) => !prev)}
              />

              {/* Screen Share Toggle */}
              <MeetingControlButton
                icon={ScreenShareIcon}
                variant={isScreenSharing ? 'active' : 'default'}
                ariaLabel={isScreenSharing ? 'Stop screen share' : 'Share screen'}
                onClick={() => setIsScreenSharing((prev) => !prev)}
              />

              {/* Chat Toggle */}
              <MeetingControlButton
                icon={ChatIcon}
                variant={isChatOpen ? 'active' : 'default'}
                ariaLabel={isChatOpen ? 'Close chat' : 'Open in-meeting chat'}
                onClick={() => setIsChatOpen((prev) => !prev)}
              />

              {/* Reaction Emojis */}
              <MeetingControlButton
                icon={ReactionIcon}
                variant="default"
                ariaLabel="Send emoji reaction"
                onClick={handleReaction}
              />
            </MeetingControlsGroup>
          }
          end={
            <MeetingControlButton
              label="Leave Call"
              icon={PhoneHangupIcon}
              variant="danger"
              ariaLabel="Leave call"
              className="px-2.5 sm:px-4 [&>span:nth-child(2)]:hidden sm:[&>span:nth-child(2)]:inline"
              onClick={handleLeaveCall}
            />
          }
        />
      }
    >
      {/* Floating Reaction Overlay Animation */}
      {floatingReaction && (
        <div className="fixed bottom-24 right-1/2 translate-x-1/2 z-50 pointer-events-none animate-bounce text-4xl">
          {floatingReaction}
        </div>
      )}

      {/* Main Responsive Video Layout */}
      <ParticipantGrid
        layout="speaker"
        gridSlot={
          <>
            {gridParticipants.map((p) => (
              <ParticipantTile
                key={p.id}
                participant={p}
                media={
                  <MediaSurface
                    variant="image"
                    src={p.avatarUrl}
                    alt={`${p.name}'s video stream`}
                    avatarName={p.name}
                  />
                }
                overlay={
                  <ParticipantOverlay
                    name={p.name}
                    isMuted={!p.media.microphone}
                  />
                }
              />
            ))}
          </>
        }
        speakerSlot={
          featuredParticipant && (
            <ParticipantTile
              participant={featuredParticipant}
              isActiveSpeaker={true}
              media={
                <MediaSurface
                  variant={isCameraOff ? 'avatar' : isScreenSharing ? 'screen' : 'image'}
                  src={featuredParticipant.avatarUrl}
                  alt={`${featuredParticipant.name}'s featured video`}
                  avatarName={featuredParticipant.name}
                />
              }
              overlay={
                <ParticipantOverlay
                  topLeft={<ActiveSpeakerBadge label="ACTIVE SPEAKER" />}
                  name={featuredParticipant.name}
                  isCurrentUser={true}
                  isMuted={isMicMuted}
                />
              }
            />
          )
        }
      />
    </VideoCallPage>
  );
}
