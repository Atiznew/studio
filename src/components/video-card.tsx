import Image from 'next/image';
import Link from 'next/link';
import type { Video } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Eye, Heart } from 'lucide-react';

interface VideoCardProps {
  video: Video;
  className?: string;
}

export function VideoCard({ video, className }: VideoCardProps) {
  const formatCount = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count;
  };

  return (
    <Card className={`w-full overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ${className}`}>
      <CardContent className="p-0">
        <Link href={`/reels?v=${video.id}`} className="block">
          <div className="aspect-video relative">
            <Image
              src={video.thumbnailUrl}
              alt={video.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </Link>
        <div className="p-4">
          <Link href={`/reels?v=${video.id}`}>
            <h3 className="font-bold leading-tight truncate font-headline">{video.title}</h3>
          </Link>
          <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
            <Link href={`/profile/${video.user.id}`} className="flex items-center gap-2 hover:text-primary">
              <Avatar className="w-6 h-6">
                <AvatarImage src={video.user.avatarUrl} alt={video.user.name} />
                <AvatarFallback>{video.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span>{video.user.name}</span>
            </Link>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4"/>
                    <span>{formatCount(video.likes)}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4"/>
                    <span>{formatCount(video.views)}</span>
                </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
