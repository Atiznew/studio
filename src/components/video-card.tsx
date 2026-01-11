
import Image from 'next/image';
import Link from 'next/link';
import type { Video } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Eye, Heart, MoreVertical, Trash2, Repeat, MapPin } from 'lucide-react';
import { useVideoStore } from '@/hooks/use-video-store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from './ui/button';
import { useTranslation } from '@/context/language-context';
import React from 'react';


interface VideoCardProps {
  video: Video;
  className?: string;
}

export const VideoCard = React.memo(({ video, className }: VideoCardProps) => {
  const { deleteVideo, currentUser } = useVideoStore();
  const { t } = useTranslation();
  const isCurrentUserVideo = currentUser ? video.user.id === currentUser.id : false;

  const formatCount = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count;
  };
  
  const handleDelete = () => {
    if (window.confirm(t('delete_video_confirmation'))) {
        deleteVideo(video.id);
    }
  }

  return (
    <Card className={`w-full overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ${className}`}>
      {video.repostedBy && (
        <div className="px-4 pt-3 flex items-center gap-2 text-sm text-muted-foreground">
          <Repeat className="w-4 h-4" />
          <span>{t('reposted_by').replace('{name}', video.repostedBy.name)}</span>
        </div>
      )}
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
          <div className="flex justify-between items-start">
             <Link href={`/reels?v=${video.id}`} className="flex-1">
                <h3 className="font-bold leading-tight truncate font-headline">{video.title}</h3>
             </Link>
             <div className="flex items-center">
                {video.destination.mapLink && (
                    <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0" asChild>
                        <a href={video.destination.mapLink} target="_blank" rel="noopener noreferrer" aria-label={`Map link for ${video.destination.name}`}>
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                        </a>
                    </Button>
                )}
                {isCurrentUserVideo && (
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                            <MoreVertical className="w-4 h-4"/>
                            <span className="sr-only">Video options</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>{t('delete')}</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                )}
             </div>
          </div>
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
});

VideoCard.displayName = 'VideoCard';
