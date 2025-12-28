"use client";

import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Settings, LogOut } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { VideoCard } from '@/components/video-card';
import { useVideoStore } from '@/hooks/use-video-store';
import { useTranslation } from '@/context/language-context';

export default function ProfilePage() {
  const { videos, likedVideos, users } = useVideoStore();
  const { t } = useTranslation();

  const currentUser = users[0];

  const userVideos = videos.filter((v) => v.user.id === currentUser.id);
  const userLikedVideos = videos.filter(v => likedVideos.has(v.id));

  const totalLikes = userVideos.reduce((acc, video) => acc + video.likes, 0);
  const totalViews = userVideos.reduce((acc, video) => acc + video.views, 0);

  const formatCount = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count;
  };

  return (
    <div className="container max-w-4xl mx-auto">
      <header className="py-8">
        <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold font-headline">{currentUser.name}</h1>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/settings"><Settings className="h-5 w-5" /></Link>
                </Button>
                 <Button variant="ghost" size="icon" asChild>
                    <Link href="/login">
                        <LogOut className="h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </div>
        <div className="flex items-center gap-4 md:gap-8 mt-4">
          <Avatar className="w-20 h-20 md:w-32 md:h-32 border-4 border-card">
            <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
            <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
             {currentUser.bio && <p className="mt-2 text-muted-foreground">{currentUser.bio}</p>}
            <div className="flex items-center gap-6 mt-4 text-center">
              <div>
                <p className="font-bold text-lg">{userVideos.length}</p>
                <p className="text-sm text-muted-foreground">{t('videos')}</p>
              </div>
              <div>
                <p className="font-bold text-lg">{formatCount(totalLikes)}</p>
                <p className="text-sm text-muted-foreground">{t('likes')}</p>
              </div>
              <div>
                <p className="font-bold text-lg">{formatCount(totalViews)}</p>
                <p className="text-sm text-muted-foreground">{t('views')}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
            <Button className="w-full bg-accent hover:bg-accent/90" asChild>
                <Link href="/profile/edit">{t('edit_profile')}</Link>
            </Button>
        </div>
      </header>

      <Tabs defaultValue="videos" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="videos">{t('my_videos')}</TabsTrigger>
          <TabsTrigger value="liked">{t('liked')}</TabsTrigger>
        </TabsList>
        <TabsContent value="videos">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
            {userVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="liked">
            {userLikedVideos.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
                    {userLikedVideos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <p className="text-muted-foreground">{t('no_liked_videos')}</p>
                </div>
            )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
