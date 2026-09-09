import type { Metadata } from 'next';
import { Space_Grotesk, Space_Mono, Source_Sans_3 } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
  display: 'swap',
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CardioSense AI — Clinical Heart Disease Diagnostic Cockpit',
  description:
    'Real-time clinical cardiovascular risk stratification powered by calibrated scikit-learn logistic regression inference telemetry.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${spaceMono.variable} ${sourceSans.variable} dark`}>
      <body className="bg-obsidian-900 text-slate-100 min-h-screen antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        <div className="fixed inset-0 bg-grid-pattern opacity-40 pointer-events-none -z-10" />
        <div className="fixed top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
        {children}
      </body>
    </html>
  );
}
