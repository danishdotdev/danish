import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const sans = Geist({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const viewport: Viewport = { themeColor: '#080908', width: 'device-width', initialScale: 1 };
export const metadata: Metadata = {
  title: 'Danish Khan | Product, Growth & Creative',
  description: 'Danish Khan builds AI products, growth systems, and sharp creative for ambitious teams.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${sans.variable} ${mono.variable}`}><body>{children}</body></html>;
}
