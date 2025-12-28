
'use client';

import { BottomNav } from '@/components/bottom-nav';
import { CommentSheet } from '@/components/comment-sheet';

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
