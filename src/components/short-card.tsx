
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import type { Video } from '@/lib/types';
import { Eye } from 'lucide-react';
import { useTranslation } from '@/context/language-context';

interface ShortCardProps {
  video: Video;
}

export function ShortCard({ video }: ShortCardProps) {
    const { t } = useTranslation();
    const formatCount = (count: number) => {
        if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
        if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
        return count;
    };
  return (
    <Link href={`/reels?v=${video.id}`}>
      <Card className="relative aspect-[9/16] w-full overflow-hidden group">
        <Image
          src={video.thumbnailUrl}
          alt={video.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 200px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 p-3 text-white">
          <h3 className="text-sm font-bold leading-tight line-clamp-2">{video.title}</h3>
          <div className="flex items-center gap-1 text-xs opacity-90 mt-1">
            <Eye className="w-3 h-3"/>
            <span>{formatCount(video.views)} {t('views_count')}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
