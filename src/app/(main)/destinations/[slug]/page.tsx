
"use client";

import { notFound, useParams } from 'next/navigation';
import { PageHeader } from '@/components/page-header';
import { destinations } from '@/lib/data';
import { VideoCard } from '@/components/video-card';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useVideoStore } from '@/hooks/use-video-store';
import { useTranslation } from '@/context/language-context';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import Autoplay from "embla-carousel-autoplay";
import { useRef } from 'react';

export default function DestinationDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { videos } = useVideoStore();
  const { t } = useTranslation();
  const destination = destinations.find((d) => d.slug === slug);
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
  
  if (!destination) {
    notFound();
  }

  const destinationVideos = videos.filter((v) => v.destination.id === destination.id);

  return (
    <>
      <PageHeader title={destination.name}>
        <Button variant="ghost" size="icon" asChild>
          <Link href="/destinations">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
      </PageHeader>
      <main className="container max-w-4xl mx-auto py-8">
        <section className="mb-8">
          <Carousel 
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            opts={{ loop: true }}
          >
            <CarouselContent>
              {destination.imageUrls.map((url, index) => (
                <CarouselItem key={index}>
                  <Card>
                    <CardContent className="relative aspect-video flex items-center justify-center p-0 overflow-hidden rounded-lg">
                      <Image
                        src={url}
                        alt={`${destination.name} image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden sm:flex" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden sm:flex" />
          </Carousel>
        </section>

        <div className="grid gap-6 md:grid-cols-2">
          {destinationVideos.length > 0 ? (
            destinationVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))
          ) : (
            <p className="text-muted-foreground md:col-span-2 text-center">{t('no_videos_at_destination')}</p>
          )}
        </div>
      </main>
    </>
  );
}
