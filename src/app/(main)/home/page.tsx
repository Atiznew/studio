
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
import { VideoCategory } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Mountain, Palmtree, Utensils, Tent, Building, FerrisWheel, Trees, Leaf } from 'lucide-react';
import { ReactNode } from 'react';


const categories: { name: VideoCategory, icon: ReactNode, slug: string }[] = [
    { name: "Beach", icon: <Palmtree className="h-6 w-6" />, slug: "beach" },
    { name: "Mountain", icon: <Mountain className="h-6 w-6" />, slug: "mountain" },
    { name: "City", icon: <Building className="h-6 w-6" />, slug: "city" },
    { name: "Religious", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-gopuram"><path d="M7.3 15.3V9a.7.7 0 0 1 .7-.7h8a.7.7 0 0 1 .7.7v6.3"/><path d="M4 15.3h16"/><path d="M2 21h20"/><path d="M5 21V10.7a.7.7 0 0 1 .7-.7h12.6a.7.7 0 0 1 .7.7V21"/><path dM="M12 15.3v-4.2a.7.7 0 0 1 .7-.7h0a.7.7 0 0 1 .7.7v4.2"/><path d="m19.3 10.6-4.3-4.3-4.3 4.3"/><path d="M12 2v4.3"/></svg> },
    { name: "Food", icon: <Utensils className="h-6 w-6" />, slug: "food" },
    { name: "Amusement Park", icon: <FerrisWheel className="h-6 w-6" />, slug: "amusement-park" },
    { name: "Forest", icon: <Trees className="h-6 w-6" />, slug: "forest" },
    { name: "Tropical", icon: <Leaf className="h-6 w-6" />, slug: "tropical" },
    { name: "Camping", icon: <Tent className="h-6 w-6" />, slug: "camping" },
];


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
            <h2 className="text-2xl font-bold mb-4 font-headline">Categories</h2>
            <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex w-max space-x-4 pb-4">
                    {categories.map((category) => (
                        <Link href={`/category/${category.slug}`} key={category.name} className="flex flex-col items-center justify-center gap-2 w-24">
                            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted/50 text-muted-foreground group-hover:bg-accent">
                                {category.icon}
                            </div>
                            <p className="text-sm font-medium">{category.name}</p>
                        </Link>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
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

    