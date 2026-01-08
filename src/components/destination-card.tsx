import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import type { Destination } from '@/lib/types';
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DestinationCardProps {
  destination: Destination;
  className?: string;
}

export function DestinationCard({ destination, className }: DestinationCardProps) {
  return (
    <Link href={`/destinations/${destination.slug}`}>
      <Card className={cn("relative w-full overflow-hidden group", className)}>
        <div className="aspect-[4/5] relative">
            <Image
              src={destination.imageUrls[0]}
              alt={destination.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <h3 className="text-xl font-bold font-headline">{destination.name}</h3>
          <p className="text-sm opacity-90 flex items-center gap-1">
            <MapPin className="w-3 h-3"/>
            {destination.country}
          </p>
        </div>
      </Card>
    </Link>
  );
}
