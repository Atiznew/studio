
"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { destinations } from '@/lib/data';
import { useTranslation } from '@/context/language-context';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

// Dynamically import MapComponent to avoid SSR issues with Leaflet
const MapComponent = dynamic(() => import('@/components/map-component'), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full" />,
});

// This component contains all the logic that depends on searchParams
function MapWithData() {
    const searchParams = useSearchParams();
    const slug = searchParams.get('slug');
    const { t } = useTranslation();
    const destination = destinations.find((d) => d.slug === slug);

    return (
      <div className="h-screen flex flex-col">
        <PageHeader title={destination?.name || t('map')}>
            <Button variant="ghost" size="icon" asChild>
            <Link href={slug ? `/destinations/${slug}` : '/destinations'}>
                <ChevronLeft className="h-5 w-5" />
            </Link>
            </Button>
        </PageHeader>
        <main className="flex-1">
            {destination ? (
                <MapComponent destination={destination} />
            ) : (
                <div className="flex items-center justify-center h-full">
                    <p>{t('destination_not_found')}</p>
                </div>
            )}
        </main>
      </div>
    );
}

// The default export is the page, which now correctly uses Suspense
export default function MapPage() {
    const { t } = useTranslation();
  
    return (
        <Suspense fallback={
            <div className="h-screen flex flex-col">
                <PageHeader title={t('loading')}>
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/destinations">
                            <ChevronLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                </PageHeader>
                <main className="flex-1">
                    <Skeleton className="h-full w-full" />
                </main>
            </div>
        }>
            <MapWithData />
        </Suspense>
    );
}
