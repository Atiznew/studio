import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/context/theme-context';
import { LanguageProvider } from '@/context/language-context';
import './globals.css';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Bharatyatra - Discover Real Travel Stories from India',
  description: 'Explore incredible travel videos from across India. Share your journey, discover new destinations, and connect with fellow travelers. Your adventure starts here.',
  keywords: ['India travel', 'Bharat yatra', 'travel videos', 'Incredible India', 'tourism', 'destinations in India'],
  authors: [{ name: 'Bharatyatra Team' }],
  creator: 'Bharatyatra',
  publisher: 'Bharatyatra',
  robots: 'index, follow',
  openGraph: {
    title: 'Bharatyatra - Discover Real Travel Stories from India',
    description: 'Explore incredible travel videos from across India. Share your journey, discover new destinations, and connect with fellow travelers.',
    url: 'https://bharatyatra.example.com', // Replace with your actual domain
    siteName: 'Bharatyatra',
    images: [
      {
        url: 'https://bharatyatra.example.com/og-image.jpg', // Replace with your actual OG image URL
        width: 1200,
        height: 630,
        alt: 'A collage of beautiful travel destinations in India.',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bharatyatra - Discover Real Travel Stories from India',
    description: 'Explore incredible travel videos from across India. Share your journey, discover new destinations, and connect with fellow travelers.',
    // siteId: '@yourtwitterhandle', // Replace with your Twitter handle
    // creatorId: '@yourtwitterhandle',
    images: ['https://bharatyatra.example.com/twitter-image.jpg'], // Replace with your actual Twitter image URL
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""/>
      </head>
      <body className="font-body antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>
            {children}
          </LanguageProvider>
          <Toaster />
        </ThemeProvider>
        <Script src="https://telegram.org/js/telegram-widget.js?22" strategy="lazyOnload" />
      </body>
    </html>
  );
}
