

"use client";

import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { notFound, useRouter } from 'next/navigation';
import { VideoCard } from '@/components/video-card';
import { PageHeader } from '@/components/page-header';
import Link from 'next/link';
import { ChevronLeft, LogOut, Link as LinkIcon } from 'lucide-react';
import { useVideoStore } from '@/hooks/use-video-store';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/context/language-context';

export default function UserProfilePage({ params }: { params: { id: string } }) {
  const { videos, isFollowing, toggleFollow, users, repostedVideos, currentUser } = useVideoStore();
  const { t } = useTranslation();
  const router = useRouter();
  const user = users.find((u) => u.id === params.id);

  if (!user) {
    notFound();
  }
  
  const isCurrentUser = currentUser ? user.id === currentUser.id : false;

  if (isCurrentUser) {
    router.replace('/profile');
    return null;
  }

  const userVideos = videos.filter((v) => v.user.id === user.id);

  const userRepostIds = repostedVideos.get(user.id) || new Set();
  const userRepostedVideos = videos
    .filter(video => userRepostIds.has(video.id))
    .map(video => ({ ...video, repostedBy: user }));


  const formatCount = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count;
  };
  
  const following = currentUser ? isFollowing(user.id) : false;

  const handleFollowClick = () => {
    if (!currentUser) {
      router.push('/login');
      return;
    }
    toggleFollow(user.id);
  };

  return (
    <>
    <PageHeader title={user.username || user.name}>
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
                <ChevronLeft className="h-5 w-5" />
            </Button>
        </div>
    </PageHeader>
    <div className="container max-w-4xl mx-auto">
      <header className="py-8">
        <div className="flex items-center gap-4 md:gap-8">
          <Avatar className="w-20 h-20 md:w-24 md:h-24 border-4 border-card">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-6 text-center">
              <div>
                <p className="font-bold text-lg">{userVideos.length}</p>
                <p className="text-sm text-muted-foreground">{t('videos')}</p>
              </div>
              <div>
                <p className="font-bold text-lg">{formatCount(user.followers || 0)}</p>
                <p className="text-sm text-muted-foreground">{t('followers')}</p>
              </div>
              <div>
                <p className="font-bold text-lg">{formatCount(user.following || 0)}</p>
                <p className="text-sm text-muted-foreground">{t('following_count')}</p>
              </div>
            </div>
          </div>
        </div>
         <div className="mt-4">
            <h1 className="text-lg font-bold font-headline">{user.name}</h1>
            {user.bio && <p className="mt-1 text-muted-foreground whitespace-pre-line">{user.bio}</p>}
            {user.website && (
                <a href={user.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 mt-1 text-sm text-primary hover:underline">
                    <LinkIcon className="h-4 w-4" />
                    <span>{user.website.replace(/^(https?:\/\/)?(www\.)?/, '')}</span>
                </a>
            )}
        </div>
        <div className="mt-4">
           {currentUser && (
            <Button 
                className={cn("w-full", following ? "bg-secondary text-secondary-foreground hover:bg-secondary/80" : "bg-primary text-primary-foreground hover:bg-primary/90")}
                onClick={handleFollowClick}
            >
                {following ? t('following') : t('follow')}
            </Button>
           )}
        </div>
      </header>

      <Tabs defaultValue="videos" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="videos">{t('videos')}</TabsTrigger>
          <TabsTrigger value="reposts">{t('reposts')}</TabsTrigger>
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
        <TabsContent value="reposts">
             {userRepostedVideos.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
                    {userRepostedVideos.map((video) => (
                    <VideoCard key={`repost-${video.id}`} video={video} />
                    ))}
                </div>
             ) : (
                <div className="text-center py-16">
                    <p className="text-muted-foreground">{t('user_no_reposts_yet')}</p>
                </div>
            )}
        </TabsContent>
      </Tabs>
    </div>
    </>
  );
}

    
