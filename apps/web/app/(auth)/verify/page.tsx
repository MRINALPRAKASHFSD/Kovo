import type { Metadata } from 'next';
import { VerificationScreen } from '@kovo/ui';

export const metadata: Metadata = {
  title: 'Verify Email — KOVO',
  description: 'Verify your email address with your secure 6-digit confirmation code to access KOVO.',
};

export default function VerifyPage() {
  return <VerificationScreen email="alex@kovo.io" />;
}
