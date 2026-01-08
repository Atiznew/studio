
'use client';

import { BottomNav } from '@/components/bottom-nav';
import { CommentSheet } from '@/components/comment-sheet';
import type { Metadata } from 'next';

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
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 pb-16">{children}</main>
        <BottomNav />
        <CommentSheet />
      </div>
  );
}
