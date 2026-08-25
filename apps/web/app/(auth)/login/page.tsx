import type { Metadata } from 'next';
import { SignInScreen } from '@kovo/ui';

export const metadata: Metadata = {
  title: 'Sign In — KOVO',
  description: 'Sign in to your KOVO Enterprise Collaboration account.',
};

export default function LoginPage() {
  return <SignInScreen />;
}
