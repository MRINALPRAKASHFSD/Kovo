import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'KOVO — Enterprise Collaboration',
  description: 'Secure, high-performance enterprise collaboration platform.',
  icons: {
    icon: '/branding/logos/icon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#09080E',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${inter.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-[#09080E] font-sans antialiased text-[#F0F4F8]">
        {children}
      </body>
    </html>
  );
}
