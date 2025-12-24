import Link from 'next/link';
import { Search, Sailboat, Mountain, Building2, Landmark, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { videos } from '@/lib/data';
import { VideoCard } from '@/components/video-card';
import { Logo } from '@/components/logo';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { VideoCategory } from '@/lib/types';
import { ReactNode } from 'react';

const categoryIcons: Record<VideoCategory, ReactNode> = {
    Beach: <Sailboat />,
    Mountain: <Mountain />,
    City: <Building2 />,
    Religious: <Landmark />,
    Other: <MoreHorizontal />,
};

const categories: VideoCategory[] = ["Beach", "Mountain", "City", "Religious", "Other"];

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
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 text-center">
            {categories.map((category) => (
              <Link key={category} href={`/category/${category.toLowerCase()}`} className="group">
                <Card className="p-4 flex flex-col items-center justify-center gap-2 aspect-square group-hover:bg-accent/50 transition-colors">
                  <div className="text-primary">{categoryIcons[category]}</div>
                  <p className="text-sm font-semibold text-muted-foreground group-hover:text-primary-foreground">{category}</p>
                </Card>
              </Link>
            ))}
          </div>
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
