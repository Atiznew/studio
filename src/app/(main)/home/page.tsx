import Link from 'next/link';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { videos } from '@/lib/data';
import { VideoCard } from '@/components/video-card';
import { Logo } from '@/components/logo';

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
