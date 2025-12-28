"use client";

import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Settings, LogOut, Link as LinkIcon, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { VideoCard } from '@/components/video-card';
import { useVideoStore } from '@/hooks/use-video-store';
import { useTranslation } from '@/context/language-context';

export default function ProfilePage() {
  const { videos, likedVideos, users } = useVideoStore();
  const { t } = useTranslation();

  const currentUser = users.find(u => u.id === 'u1'); // Assume current user is u1

  if (!currentUser) {
    return <div>Loading...</div>; // Or handle user not found
  }

  const userVideos = videos.filter((v) => v.user.id === currentUser.id);
  const userLikedVideos = videos.filter(v => likedVideos.has(v.id));

  const totalLikes = userVideos.reduce((acc, video) => acc + video.likes, 0);

  const formatCount = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count;
  };

  return (
    <div className="container max-w-4xl mx-auto">
      <header className="py-8">
        <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">{currentUser.username}</h2>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/discover"><Users className="h-5 w-5" /></Link>
                </Button>
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
          <Avatar className="w-20 h-20 md:w-24 md:h-24 border-4 border-card">
            <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
            <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
             <div className="flex items-center gap-6 mt-4 text-center">
              <div>
                <p className="font-bold text-lg">{userVideos.length}</p>
                <p className="text-sm text-muted-foreground">{t('videos')}</p>
              </div>
               <div>
                <p className="font-bold text-lg">{formatCount(currentUser.followers || 0)}</p>
                <p className="text-sm text-muted-foreground">{t('followers')}</p>
              </div>
              <div>
                <p className="font-bold text-lg">{formatCount(currentUser.following || 0)}</p>
                <p className="text-sm text-muted-foreground">{t('following_count')}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
            <h1 className="text-lg font-bold font-headline">{currentUser.name}</h1>
            {currentUser.bio && <p className="mt-1 text-muted-foreground whitespace-pre-line">{currentUser.bio}</p>}
            {currentUser.website && (
                <a href={currentUser.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 mt-1 text-sm text-primary hover:underline">
                    <LinkIcon className="h-4 w-4" />
                    <span>{currentUser.website.replace(/^(https?:\/\/)?(www\.)?/, '')}</span>
                </a>
            )}
        </div>
        <div className="mt-4">
            <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-500" asChild>
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
           {userVideos.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
                    {userVideos.map((video) => (
                        <VideoCard key={video.id} video={video} />
                    ))}
                </div>
             ) : (
                <div className="text-center py-16">
                    <p className="text-muted-foreground">{t('no_videos_yet')}</p>
                </div>
            )}
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
