"use client";
import { PageHeader } from '@/components/page-header';
import { destinations } from '@/lib/data';
import { DestinationCard } from '@/components/destination-card';
import { Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useTranslation } from '@/context/language-context';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export default function DestinationsPage() {
  const { t } = useTranslation();
  const featuredDestinations = destinations.slice(0, 6);
  return (
    <>
      <PageHeader title={t('destinations_page_title')}>
         <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
                <Link href="/suggest">
                    <Plus className="h-5 w-5" />
                </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
                <Link href="/search">
                    <Search className="h-5 w-5" />
                </Link>
            </Button>
        </div>
      </PageHeader>
      <main className="container py-8">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 font-headline">Featured Destinations</h2>
            <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex w-max space-x-4 pb-4">
                {featuredDestinations.map((dest) => (
                    <div key={dest.id} className="w-40">
                        <DestinationCard destination={dest} />
                    </div>
                ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </section>

        <section>
             <h2 className="text-2xl font-bold mb-4 font-headline">All Destinations</h2>
            <div className="grid grid-cols-2 gap-4">
                {destinations.map((dest) => (
                    <DestinationCard key={dest.id} destination={dest} />
                ))}
            </div>
        </section>
      </main>
    </>
  );
}
