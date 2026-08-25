import type { Metadata } from 'next';
import { CreateAccountScreen } from '@kovo/ui';

export const metadata: Metadata = {
  title: 'Create Account — KOVO',
  description: 'Create your KOVO Enterprise Collaboration account.',
};

export default function RegisterPage() {
  return <CreateAccountScreen />;
}
