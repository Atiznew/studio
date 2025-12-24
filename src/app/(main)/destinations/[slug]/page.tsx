import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/page-header';
import { destinations, videos } from '@/lib/data';
import { VideoCard } from '@/components/video-card';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export async function generateStaticParams() {
  return destinations.map((destination) => ({
    slug: destination.slug,
  }));
}

export default function DestinationDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const destination = destinations.find((d) => d.slug === slug);
  
  if (!destination) {
    notFound();
  }

  const destinationVideos = videos.filter((v) => v.destination.id === destination.id);

  return (
    <>
      <PageHeader title={destination.name}>
        <Button variant="ghost" size="icon" asChild>
          <Link href="/destinations">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
      </PageHeader>
      <div className="container max-w-4xl mx-auto py-8">
        <div className="grid gap-6 md:grid-cols-2">
          {destinationVideos.length > 0 ? (
            destinationVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))
          ) : (
            <p className="text-muted-foreground md:col-span-2 text-center">No videos found for this destination yet.</p>
          )}
        </div>
      </div>
    </>
  );
}
