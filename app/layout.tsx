import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EX Experience OS',
  description: 'AI-native cinematic experience platform.',
  openGraph: {
    title: 'EX Experience OS',
    description: 'Sovereign cinematic operating system.',
    images: ['/og-cover.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
