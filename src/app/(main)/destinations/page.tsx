"use client";
import { PageHeader } from '@/components/page-header';
import { destinations } from '@/lib/data';
import { DestinationCard } from '@/components/destination-card';
import { Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DestinationsPage() {
  return (
    <>
      <PageHeader title="Destinations">
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
      <div className="container py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {destinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      </div>
    </>
  );
}
