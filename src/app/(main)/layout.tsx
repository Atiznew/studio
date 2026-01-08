
import type { Metadata } from 'next';
import MainLayoutClient from './main-layout-client';

export const metadata: Metadata = {
  title: 'Bharatyatra - Discover Real Travel Stories from India',
  description: 'Explore incredible travel videos from across India. Share your journey, discover new destinations, and connect with fellow travelers. Your adventure starts here.',
  keywords: ['India travel', 'Bharat yatra', 'travel videos', 'Incredible India', 'tourism', 'destinations in India'],
};


export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <MainLayoutClient>{children}</MainLayoutClient>
  );
}
