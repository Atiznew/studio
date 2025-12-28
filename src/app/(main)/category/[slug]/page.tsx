"use client";

import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/page-header';
import { VideoCard } from '@/components/video-card';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { VideoCategory } from '@/lib/types';
import { useVideoStore } from '@/hooks/use-video-store';
import { useTranslation } from '@/context/language-context';

const categories: VideoCategory[] = ["Beach", "Mountain", "City", "Religious", "Food", "Amusement Park", "Forest", "Tropical", "Camping", "Other"];

export default function CategoryDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { videos } = useVideoStore();
  const { t } = useTranslation();
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
            <p className="text-muted-foreground md:col-span-2 text-center">{t('no_videos_in_category')}</p>
          )}
        </div>
      </div>
    </>
  );
}
