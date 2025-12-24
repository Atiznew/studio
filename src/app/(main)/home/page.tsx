"use client";

import Link from 'next/link';
import { Search, Sailboat, Mountain, Building2, Landmark, MoreHorizontal, Utensils, FerrisWheel, Trees, Palmtree, Tent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { videos } from '@/lib/data';
import { VideoCard } from '@/components/video-card';
import { Logo } from '@/components/logo';
import { Card } from '@/components/ui/card';
import { ReactNode } from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

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
            <h2 className="text-2xl font-bold mb-4 font-headline">Latest Travel Videos</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {videos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
        </section>
    </div>
  );
}
