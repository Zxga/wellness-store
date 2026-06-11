import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import EmailPopup from '@/components/home/EmailPopup';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || 'https://raylune.com'),
  title: {
    default: 'RAYLUNE — Light. Recovery. Glow.',
    template: '%s | RAYLUNE',
  },
  description:
    'RAYLUNE — premium red light therapy & recovery rituals for home. Clinical-grade LED masks, cryo tools, and recovery devices. Glow starts with light.',
  keywords: ['red light therapy', 'led face mask', 'recovery', 'cryotherapy', 'sleep mask', 'wellness', 'RAYLUNE'],
  openGraph: {
    type: 'website',
    siteName: 'RAYLUNE',
    title: 'RAYLUNE — Light. Recovery. Glow.',
    description: 'Premium red light therapy & recovery rituals for home. Glow starts with light.',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RAYLUNE — Light. Recovery. Glow.',
    description: 'Premium red light therapy & recovery rituals for home.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-background text-text-primary">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
        <EmailPopup />
      </body>
    </html>
  );
}
