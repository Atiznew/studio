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
  const featuredVideos = videos.slice(0, 4);
  const moreVideos = videos.slice(4);

  return (
    <div className="container max-w-4xl mx-auto">
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

        <section className="py-4">
          <h2 className="text-2xl font-bold mb-4 font-headline">Categories</h2>
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex w-max space-x-4 pb-4">
              {categories.map((category) => (
                <Link key={category} href={`/category/${category.toLowerCase().replace(' ', '-')}`} className="group">
                  <Card className="p-4 flex flex-col items-center justify-center gap-2 h-28 w-28 group-hover:bg-accent/50 transition-colors rounded-full">
                    <div className="text-primary">{categoryIcons[category]}</div>
                    <p className="text-sm font-semibold text-muted-foreground group-hover:text-primary-foreground text-center">{category}</p>
                  </Card>
                </Link>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>
        
        <section className="py-4">
            <h2 className="text-2xl font-bold mb-4 font-headline">Featured Videos</h2>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {featuredVideos.map((video) => (
                  <CarouselItem key={video.id} className="md:basis-1/2">
                    <div className="p-1">
                      <VideoCard video={video} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
        </section>

        <section className="py-4">
            <h2 className="text-2xl font-bold mb-4 font-headline">More Videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {moreVideos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                ))}
            </div>
        </section>
    </div>
  );
}
