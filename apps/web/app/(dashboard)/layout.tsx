import type { Metadata } from 'next';
import { DashboardShellClient } from './DashboardShellClient';

export const metadata: Metadata = {
  title: 'KOVO — Enterprise Collaboration Platform',
  description: 'Enterprise messaging, huddles, and workspace management.',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShellClient>{children}</DashboardShellClient>;
}
