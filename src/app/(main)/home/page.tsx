
"use client";

import Link from 'next/link';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VideoCard } from '@/components/video-card';
import { Logo } from '@/components/logo';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useVideoStore } from '@/hooks/use-video-store';
import { DestinationCard } from '@/components/destination-card';
import { destinations } from '@/lib/data';
import Image from 'next/image';
import { StoryReel } from '@/components/story-reel';
import { ShortCard } from '@/components/short-card';

export default function HomePage() {
  const { videos } = useVideoStore();
  const trendingDestinations = destinations.slice(0, 5);
  const featuredDestinations = destinations.slice(0, 4);
  const exploreVideos = videos.slice(0, 6);
  const trendingShorts = videos.slice(0,5);

  return (
    <div className="container max-w-5xl mx-auto">
        <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur-sm">
            <div className="flex h-16 items-center justify-between">
                <Logo />
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/search">
                        <Search className="h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </header>
        
        <section className="py-4">
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent>
                    {featuredDestinations.map((destination) => (
                        <CarouselItem key={destination.id}>
                            <Link href={`/destinations/${destination.slug}`}>
                                <Card>
                                    <CardContent className="relative aspect-video flex items-center justify-center p-0 overflow-hidden rounded-lg">
                                         <Image
                                            src={destination.imageUrl}
                                            alt={destination.name}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/40" />
                                        <div className="relative z-10 text-center text-white p-4">
                                            <h2 className="text-3xl font-bold font-headline">{destination.name}</h2>
                                            <p>{destination.country}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden sm:flex" />
                <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden sm:flex" />
            </Carousel>
        </section>

        <section className="py-8">
            <StoryReel />
        </section>

        <section className="py-8">
          <h2 className="text-2xl font-bold mb-4 font-headline">Trending Shorts: 60 Second Escapes</h2>
           <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex w-max space-x-4 pb-4">
              {trendingShorts.map((video) => (
                <div key={video.id} className="w-40">
                  <ShortCard video={video} />
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>

        <section className="py-8">
          <h2 className="text-2xl font-bold mb-4 font-headline">Trending Destinations</h2>
           <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex w-max space-x-4 pb-4">
              {trendingDestinations.map((dest) => (
                <div key={dest.id} className="w-40">
                  <DestinationCard destination={dest} />
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>

        <section className="py-4">
            <h2 className="text-2xl font-bold mb-4 font-headline">Explore Videos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {exploreVideos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                ))}
            </div>
        </section>
    </div>
  );
}
