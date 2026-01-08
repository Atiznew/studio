

"use client";

import Link from 'next/link';
import { Search, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VideoCard } from '@/components/video-card';
import { Logo } from '@/components/logo';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import { useVideoStore } from '@/hooks/use-video-store';
import { DestinationCard } from '@/components/destination-card';
import { destinations, placeholderImages } from '@/lib/data';
import Image from 'next/image';
import { StoryReel } from '@/components/story-reel';
import { ShortCard } from '@/components/short-card';
import { VideoCategory } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Mountain, Palmtree, Utensils, Tent, Building, FerrisWheel, Trees, Leaf } from 'lucide-react';
import { ReactNode, useRef } from 'react';
import { useTranslation } from '@/context/language-context';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


const categories: { name: VideoCategory, icon: ReactNode, slug: string }[] = [
    { name: "Beach", icon: <Palmtree className="h-6 w-6" />, slug: "beach" },
    { name: "Mountain", icon: <Mountain className="h-6 w-6" />, slug: "mountain" },
    { name: "City", icon: <Building className="h-6 w-6" />, slug: "city" },
    { name: "Religious", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-gopuram"><path d="M7.3 15.3V9a.7.7 0 0 1 .7-.7h8a.7.7 0 0 1 .7.7v6.3"/><path d="M4 15.3h16"/><path d="M2 21h20"/><path d="M5 21V10.7a.7.7 0 0 1 .7-.7h12.6a.7.7 0 0 1 .7.7V21"/><path d="M12 15.3v-4.2a.7.7 0 0 1 .7-.7h0a.7.7 0 0 1 .7.7v4.2"/><path d="m19.3 10.6-4.3-4.3-4.3 4.3"/><path d="M12 2v4.3"/></svg> },
    { name: "Food", icon: <Utensils className="h-6 w-6" />, slug: "food" },
    { name: "Amusement Park", icon: <FerrisWheel className="h-6 w-6" />, slug: "amusement-park" },
    { name: "Forest", icon: <Trees className="h-6 w-6" />, slug: "forest" },
    { name: "Tropical", icon: <Leaf className="h-6 w-6" />, slug: "tropical" },
    { name: "Camping", icon: <Tent className="h-6 w-6" />, slug: "camping" },
];


export default function HomePage() {
  const { videos, isFollowing, currentUser } = useVideoStore();
  const { t } = useTranslation();
  const trendingDestinations = destinations.slice(0, 5);
  const featuredDestinations = destinations.slice(0, 4);
  const exploreVideos = videos.slice(0, 6);
  const trendingShorts = videos.slice(0,5);
  const followingVideos = videos.filter(video => isFollowing(video.user.id));

  const goaVideos = videos.filter(v => v.destination.slug === 'goa');
  const mountainVideos = videos.filter(v => v.category === 'Mountain');
  const cityVideos = videos.filter(v => v.category === 'City');
  const foodVideos = videos.filter(v => v.category === 'Food');
  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );
  const donationBg = placeholderImages.find(p => p.id === 'donation-bg');

  const ForYouFeed = () => (
    <>
         <section className="py-4">
            <Carousel
                plugins={[plugin.current]}
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent>
                    {featuredDestinations.map((destination) => (
                        <CarouselItem key={destination.id}>
                            <Link href={`/destinations/${destination.slug}`}>
                                <Card>
                                    <CardContent className="relative aspect-video flex items-center justify-center p-0 overflow-hidden rounded-lg">
                                         <Image
                                            src={destination.imageUrls[0]}
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
             <Card className="relative overflow-hidden rounded-lg">
                {donationBg && (
                    <Image
                        src={donationBg.imageUrl}
                        alt={donationBg.description}
                        data-ai-hint={donationBg.imageHint}
                        fill
                        className="object-cover z-0"
                    />
                )}
                 <div className="absolute inset-0 bg-black/60 z-10" />
                <CardContent className="relative z-20 p-6 text-center text-white">
                    <Heart className="mx-auto h-8 w-8 text-red-400 mb-2" />
                    <h2 className="text-xl font-bold font-headline">{t('donation_cta_title')}</h2>
                    <p className="mt-1 mb-4">{t('donation_cta_description')}</p>
                    <Button asChild variant="secondary">
                        <Link href="/settings/donate">{t('support_us')}</Link>
                    </Button>
                </CardContent>
            </Card>
        </section>

        <section className="py-8">
            <h2 className="text-2xl font-bold mb-4 font-headline">{t('categories')}</h2>
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
          <h2 className="text-2xl font-bold mb-4 font-headline">{t('trending_shorts')}</h2>
           <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex w-max space-x-4 pb-4">
              {trendingShorts.map((video) => (
                <div key={video.id} className="w-48">
                  <ShortCard video={video} />
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>

        <section className="py-8">
          <h2 className="text-2xl font-bold mb-4 font-headline">{t('trending_destinations')}</h2>
           <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex w-max space-x-4 pb-4">
              {trendingDestinations.map((dest) => (
                <div key={dest.id} className="w-60">
                  <DestinationCard destination={dest} />
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>

        {goaVideos.length > 0 && (
          <section className="py-8">
            <h2 className="text-2xl font-bold mb-4 font-headline">{t('goa_getaways')}</h2>
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex w-max space-x-4 pb-4">
                {goaVideos.map((video) => (
                  <div key={video.id} className="w-80">
                    <VideoCard video={video} />
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </section>
        )}

        {mountainVideos.length > 0 && (
          <section className="py-8">
            <h2 className="text-2xl font-bold mb-4 font-headline">{t('mountain_escapes')}</h2>
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex w-max space-x-4 pb-4">
                {mountainVideos.map((video) => (
                  <div key={video.id} className="w-80">
                    <VideoCard video={video} />
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </section>
        )}

        {cityVideos.length > 0 && (
          <section className="py-8">
            <h2 className="text-2xl font-bold mb-4 font-headline">{t('city_adventures')}</h2>
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex w-max space-x-4 pb-4">
                {cityVideos.map((video) => (
                  <div key={video.id} className="w-80">
                    <VideoCard video={video} />
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </section>
        )}

        {foodVideos.length > 0 && (
          <section className="py-8">
            <h2 className="text-2xl font-bold mb-4 font-headline">{t('foodie_journeys')}</h2>
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex w-max space-x-4 pb-4">
                {foodVideos.map((video) => (
                  <div key={video.id} className="w-80">
                    <VideoCard video={video} />
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </section>
        )}

        <section className="py-4">
            <h2 className="text-2xl font-bold mb-4 font-headline">{t('explore_videos')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {exploreVideos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                ))}
            </div>
        </section>
    </>
  )

  const FollowingFeed = () => (
    <div className="py-8">
        {!currentUser ? (
             <div className="text-center py-16">
                <p className="text-lg font-semibold">{t('login_to_see_following_title')}</p>
                <p className="text-muted-foreground mt-2">{t('login_to_see_following_description')}</p>
                <Button asChild className="mt-4">
                    <Link href="/login">{t('login_title')}</Link>
                </Button>
            </div>
        ) : followingVideos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {followingVideos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                ))}
            </div>
        ) : (
            <div className="text-center py-16">
                <p className="text-lg font-semibold">{t('no_following_videos_title')}</p>
                <p className="text-muted-foreground mt-2">{t('no_following_videos_description')}</p>
                <Button asChild className="mt-4">
                    <Link href="/discover">{t('discover_people_title')}</Link>
                </Button>
            </div>
        )}
    </div>
  );

  return (
    <main className="container max-w-5xl mx-auto">
      <Tabs defaultValue="forYou">
        <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur-sm">
            <div className="flex h-16 items-center justify-between">
                <Logo />
                 <TabsList className="grid w-full grid-cols-2 max-w-[200px]">
                    <TabsTrigger value="forYou">{t('for_you_tab')}</TabsTrigger>
                    <TabsTrigger value="following">{t('following_tab')}</TabsTrigger>
                </TabsList>
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/search">
                        <Search className="h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </header>

        <TabsContent value="forYou">
            <ForYouFeed />
        </TabsContent>
        <TabsContent value="following">
            <FollowingFeed />
        </TabsContent>
       </Tabs>
    </main>
  );
}

    
