import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import EmailPopup from '@/components/home/EmailPopup';

export const metadata: Metadata = {
  title: {
    default: 'WellnessHub — Premium Wellness Gadgets',
    template: '%s | WellnessHub',
  },
  description:
    'Shop premium wellness gadgets: infrared sauna blankets, massage guns, red light therapy devices, and more. Free shipping available.',
  keywords: ['wellness', 'sauna blanket', 'massage gun', 'red light therapy', 'health gadgets'],
  openGraph: {
    type: 'website',
    siteName: 'WellnessHub',
    title: 'WellnessHub — Premium Wellness Gadgets',
    description: 'Elevate your wellness routine with premium at-home therapy devices.',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WellnessHub — Premium Wellness Gadgets',
    description: 'Elevate your wellness routine with premium at-home therapy devices.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
        <EmailPopup />
      </body>
    </html>
  );
}
