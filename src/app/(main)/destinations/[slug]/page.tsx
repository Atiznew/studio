
"use client";

import { notFound, useParams } from 'next/navigation';
import { PageHeader } from '@/components/page-header';
import { destinations } from '@/lib/data';
import { VideoCard } from '@/components/video-card';
import { ChevronLeft, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useVideoStore } from '@/hooks/use-video-store';
import { useTranslation } from '@/context/language-context';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import Autoplay from "embla-carousel-autoplay";
import { useState, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";


export default function DestinationDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { videos } = useVideoStore();
  const { t } = useTranslation();
  const destination = destinations.find((d) => d.slug === slug);
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
                <CarouselItem key={index} onClick={() => setSelectedImage(url)}>
                  <Card className="cursor-pointer group">
                    <CardContent className="relative aspect-video flex items-center justify-center p-0 overflow-hidden rounded-lg">
                      <Image
                        src={url}
                        alt={`${destination.name} image ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                       <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-white font-bold">View Details</p>
                      </div>
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

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{destination.name}</DialogTitle>
            <DialogDescription>
              {destination.country}
            </DialogDescription>
          </DialogHeader>
          <div className="relative aspect-video mt-2">
            {selectedImage && (
              <Image
                src={selectedImage}
                alt={destination.name}
                fill
                className="object-contain rounded-md"
              />
            )}
          </div>
          <DialogFooter className="sm:justify-start gap-2 pt-4">
              <Button asChild>
                <Link href={`/map?slug=${destination.slug}`}>
                    <MapPin className="mr-2 h-4 w-4" /> View on App Map
                </Link>
              </Button>
              {destination.mapLink && (
                <Button asChild variant="outline">
                  <a href={destination.mapLink} target="_blank" rel="noopener noreferrer">
                    View on Google Maps
                  </a>
                </Button>
              )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
