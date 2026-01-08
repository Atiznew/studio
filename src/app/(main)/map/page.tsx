
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

const MapComponent = dynamic(() => import('@/components/map-component'), {
  ssr: false,
});

function MapPageContent() {
    const searchParams = useSearchParams();
    const slug = searchParams.get('slug');
    const { t } = useTranslation();
    const destination = destinations.find((d) => d.slug === slug);

    if (!destination) {
        return (
             <div className="flex items-center justify-center h-full">
                <p>{t('destination_not_found')}</p>
            </div>
        )
    }

    return (
        <div className="h-full flex flex-col">
            <MapComponent destination={destination} />
        </div>
    )
}


export default function MapPage() {
    const { t } = useTranslation();
    const searchParams = useSearchParams();
    const slug = searchParams.get('slug');
    const destination = destinations.find((d) => d.slug === slug);


  return (
    <div className="h-screen flex flex-col">
        <PageHeader title={destination?.name || t('map')}>
            <Button variant="ghost" size="icon" asChild>
            <Link href={`/destinations/${slug}`}>
                <ChevronLeft className="h-5 w-5" />
            </Link>
            </Button>
      </PageHeader>
      <main className="flex-1">
        <Suspense fallback={<div className="flex items-center justify-center h-full">{t('loading')}</div>}>
            <MapPageContent />
        </Suspense>
      </main>
    </div>
  );
}
