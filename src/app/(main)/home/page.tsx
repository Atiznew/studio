"use client";

import Link from 'next/link';
import { Search, Sailboat, Mountain, Building2, Landmark, MoreHorizontal, Utensils, FerrisWheel, Trees, Palmtree, Tent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VideoCard } from '@/components/video-card';
import { Logo } from '@/components/logo';
import { Card } from '@/components/ui/card';
import { ReactNode } from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useVideoStore } from '@/hooks/use-video-store';
import { StoryReel } from '@/components/story-reel';
import { DestinationCard } from '@/components/destination-card';
import { destinations } from '@/lib/data';

type ExtendedVideoCategory = "Beach" | "Mountain" | "City" | "Religious" | "Other" | "Food" | "Amusement Park" | "Forest" | "Tropical" | "Camping";


const categoryIcons: Record<ExtendedVideoCategory, ReactNode> = {
    Beach: <Sailboat />,
    Mountain: <Mountain />,
    City: <Building2 />,
    Religious: <Landmark />,
    Food: <Utensils />,
    "Amusement Park": <FerrisWheel />,
    Forest: <Trees />,
    Tropical: <Palmtree />,
    Camping: <Tent />,
    Other: <MoreHorizontal />,
};

const categories: ExtendedVideoCategory[] = ["Beach", "Mountain", "City", "Religious", "Food", "Amusement Park", "Forest", "Tropical", "Camping", "Other"];

export default function HomePage() {
  const { videos } = useVideoStore();
  const trendingDestinations = destinations.slice(0, 5);
  const exploreVideos = videos.slice(0, 6);

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
            <StoryReel />
        </section>

        <section className="py-8">
          <h2 className="text-2xl font-bold mb-4 font-headline">Trending Destinations</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {trendingDestinations.map((dest) => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>
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
