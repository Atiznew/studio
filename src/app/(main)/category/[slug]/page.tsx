"use client";

import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/page-header';
import { VideoCard } from '@/components/video-card';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { VideoCategory } from '@/lib/types';
import { useVideoStore } from '@/hooks/use-video-store';

const categories: VideoCategory[] = ["Beach", "Mountain", "City", "Religious", "Food", "Amusement Park", "Forest", "Tropical", "Camping", "Other"];

// export async function generateStaticParams() {
//   return categories.map((category) => ({
//     slug: category.toLowerCase().replace(' ', '-'),
//   }));
// }

export default function CategoryDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { videos } = useVideoStore();
  const category = categories.find((c) => c.toLowerCase().replace(' ', '-') === slug);
  
  if (!category) {
    notFound();
  }

  const categoryVideos = videos.filter((v) => v.category.toLowerCase().replace(' ', '-') === slug);

  return (
    <>
      <PageHeader title={category}>
        <Button variant="ghost" size="icon" asChild>
          <Link href="/home">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
      </PageHeader>
      <div className="container max-w-4xl mx-auto py-8">
        <div className="grid gap-6 md:grid-cols-2">
          {categoryVideos.length > 0 ? (
            categoryVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))
          ) : (
            <p className="text-muted-foreground md:col-span-2 text-center">No videos found for this category yet.</p>
          )}
        </div>
      </div>
    </>
  );
}
