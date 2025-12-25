"use client";

import Image from 'next/image';
import { users } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { notFound } from 'next/navigation';
import { VideoCard } from '@/components/video-card';
import { PageHeader } from '@/components/page-header';
import Link from 'next/link';
import { ChevronLeft, LogOut } from 'lucide-react';
import { currentUser } from '@/lib/data';
import { useVideoStore } from '@/hooks/use-video-store';
import { cn } from '@/lib/utils';

export default function UserProfilePage({ params }: { params: { id: string } }) {
  const { videos, isFollowing, toggleFollow } = useVideoStore();
  const user = users.find((u) => u.id === params.id);

  if (!user) {
    notFound();
  }

  const isCurrentUser = user.id === currentUser.id;

  const userVideos = videos.filter((v) => v.user.id === user.id);

  const totalLikes = userVideos.reduce((acc, video) => acc + video.likes, 0);
  const totalViews = userVideos.reduce((acc, video) => acc + video.views, 0);

  const formatCount = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count;
  };
  
  const following = isFollowing(user.id);

  return (
    <>
    <PageHeader title={user.name}>
        <div className="flex items-center gap-2">
            {isCurrentUser ? (
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/login">
                        <LogOut className="h-5 w-5" />
                    </Link>
                </Button>
            ) : (
                 <Button variant="ghost" size="icon" asChild>
                    <Link href="/home">
                        <ChevronLeft className="h-5 w-5" />
                    </Link>
                </Button>
            )}
        </div>
    </PageHeader>
    <div className="container max-w-4xl mx-auto">
      <header className="py-8">
        <div className="flex items-center gap-4 md:gap-8">
          <Avatar className="w-20 h-20 md:w-32 md:h-32 border-4 border-card">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-4">
                <h1 className="text-2xl md:text-3xl font-bold font-headline">{user.name}</h1>
            </div>
            <div className="flex items-center gap-6 mt-4 text-center">
              <div>
                <p className="font-bold text-lg">{userVideos.length}</p>
                <p className="text-sm text-muted-foreground">Videos</p>
              </div>
              <div>
                <p className="font-bold text-lg">{formatCount(totalLikes)}</p>
                <p className="text-sm text-muted-foreground">Likes</p>
              </div>
              <div>
                <p className="font-bold text-lg">{formatCount(totalViews)}</p>
                <p className="text-sm text-muted-foreground">Views</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
            {isCurrentUser ? (
                <Button className="w-full bg-accent hover:bg-accent/90" asChild>
                    <Link href="#">Edit Profile</Link>
                </Button>
            ) : (
                <Button 
                    className={cn("w-full", following ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : "bg-primary text-primary-foreground hover:bg-primary/90")}
                    onClick={() => toggleFollow(user.id)}
                >
                    {following ? 'Following' : 'Follow'}
                </Button>
            )}
        </div>
      </header>

      <Tabs defaultValue="videos" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="liked">Liked</TabsTrigger>
        </TabsList>
        <TabsContent value="videos">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
            {userVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="liked">
            <div className="text-center py-16">
                <p className="text-muted-foreground">This user hasn't liked any videos yet.</p>
            </div>
        </TabsContent>
      </Tabs>
    </div>
    </>
  );
}
