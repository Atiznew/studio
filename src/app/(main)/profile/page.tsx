import Image from 'next/image';
import { currentUser, videos } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ProfilePage() {
  const userVideos = videos.filter((v) => v.user.id === currentUser.id);

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
        <div className="flex items-center gap-4 md:gap-8">
          <Avatar className="w-20 h-20 md:w-32 md:h-32 border-4 border-card">
            <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
            <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-4">
                <h1 className="text-2xl md:text-3xl font-bold font-headline">{currentUser.name}</h1>
                <Button variant="ghost" size="icon">
                    <Settings className="h-5 w-5" />
                </Button>
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
            <Button className="w-full bg-accent hover:bg-accent/90">Edit Profile</Button>
        </div>
      </header>

      <Tabs defaultValue="videos" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="videos">My Videos</TabsTrigger>
          <TabsTrigger value="liked">Liked</TabsTrigger>
        </TabsList>
        <TabsContent value="videos">
          <div className="grid grid-cols-3 gap-1 pt-4">
            {userVideos.map((video) => (
              <div key={video.id} className="aspect-square relative group">
                <Image src={video.thumbnailUrl} alt={video.title} fill className="object-cover"/>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="liked">
            <div className="text-center py-16">
                <p className="text-muted-foreground">You haven't liked any videos yet.</p>
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
