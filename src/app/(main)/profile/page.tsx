

"use client";

import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Settings, Link as LinkIcon, Trash2, Pencil, MoreVertical } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { VideoCard } from '@/components/video-card';
import { useVideoStore } from '@/hooks/use-video-store';
import { useTranslation } from '@/context/language-context';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

function SuggestionCard({ suggestion, onDelete }: { suggestion: any, onDelete: (id: string) => void }) {
    const { t } = useTranslation();
    return (
        <Card>
            <CardHeader>
                <CardTitle>{suggestion.place}</CardTitle>
                <CardDescription>{suggestion.state}, {suggestion.country}</CardDescription>
            </CardHeader>
            <CardContent>
                {suggestion.imageUrls && suggestion.imageUrls.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mb-4">
                        {suggestion.imageUrls.slice(0, 3).map((url: string, index: number) => (
                            <div key={index} className="relative aspect-square">
                                <Image src={url} alt={`Suggestion image ${index + 1}`} fill className="rounded-md object-cover" />
                            </div>
                        ))}
                    </div>
                )}
                <p className="text-sm text-muted-foreground mb-2"><strong>{t('reason_label')}:</strong> {suggestion.reason}</p>
                {suggestion.mapLink && (
                    <a href={suggestion.mapLink} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1">
                        <LinkIcon className="h-4 w-4" />
                        <span>View Map Link</span>
                    </a>
                )}
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                 <p className="text-xs text-muted-foreground">
                    {t('suggested_on')} {formatDistanceToNow(new Date(suggestion.createdAt), { addSuffix: true })}
                </p>
                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                                 <Link href={`/profile/edit-suggestion/${suggestion.id}`}>
                                    <Pencil className="mr-2 h-4 w-4" />
                                    <span>{t('edit_profile')}</span>
                                 </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onDelete(suggestion.id)} className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>{t('delete')}</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardFooter>
        </Card>
    )
}


export default function ProfilePage() {
  const { videos, likedVideos, currentUser, repostedVideos, savedVideos, logout, suggestions, deleteSuggestion } = useVideoStore();
  const { t } = useTranslation();
  const router = useRouter();
  
  useEffect(() => {
    if (!currentUser) {
      router.replace('/login');
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return null; // Or a loading spinner
  }

  const userVideos = videos.filter((v) => v.user.id === currentUser.id);
  const userLikedVideos = videos.filter(v => likedVideos.has(v.id));
  const userSavedVideos = videos.filter(v => savedVideos.has(v.id));
  const userSuggestions = suggestions.filter(s => s.userId === currentUser.id);

  const userRepostIds = repostedVideos.get(currentUser.id) || new Set();
  const userRepostedVideos = videos
    .filter(video => userRepostIds.has(video.id))
    .map(video => ({ ...video, repostedBy: currentUser }));


  const totalLikes = userVideos.reduce((acc, video) => acc + video.likes, 0);

  const formatCount = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count;
  };
  
  const handleDeleteSuggestion = (id: string) => {
      if(window.confirm(t('delete_suggestion_confirmation'))){
          deleteSuggestion(id);
      }
  }

  return (
    <main className="container max-w-4xl mx-auto">
      <header className="py-8">
        <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">{currentUser.username}</h1>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/settings"><Settings className="h-5 w-5" /></Link>
                </Button>
            </div>
        </div>
        <div className="flex items-start gap-4 md:gap-8 mt-4">
          <Avatar className="w-20 h-20 md:w-24 md:h-24 border-4 border-card">
            <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
            <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
             <div className="flex items-center gap-6 text-center">
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
            <div className="mt-4">
                <h2 className="text-lg font-bold font-headline">{currentUser.name}</h2>
                {currentUser.bio && <p className="mt-1 text-muted-foreground whitespace-pre-line">{currentUser.bio}</p>}
                {currentUser.website && (
                    <a href={currentUser.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 mt-1 text-sm text-primary hover:underline">
                        <LinkIcon className="h-4 w-4" />
                        <span>{currentUser.website.replace(/^(https?:\/\/)?(www\.)?/, '')}</span>
                    </a>
                )}
            </div>
          </div>
        </div>
        <div className="mt-4">
            <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/80" asChild>
                <Link href="/profile/edit">{t('edit_profile')}</Link>
            </Button>
        </div>
      </header>

      <Tabs defaultValue="videos" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="videos">{t('my_videos')}</TabsTrigger>
          <TabsTrigger value="reposts">{t('reposts')}</TabsTrigger>
          <TabsTrigger value="liked">{t('liked')}</TabsTrigger>
          <TabsTrigger value="saved">{t('saved_tab')}</TabsTrigger>
          <TabsTrigger value="suggestions">{t('my_suggestions')}</TabsTrigger>
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
              <p className="text-muted-foreground">{t('no_reposts_yet')}</p>
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
         <TabsContent value="saved">
            {userSavedVideos.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
                    {userSavedVideos.map((video) => (
                    <VideoCard key={`saved-${video.id}`} video={video} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <p className="text-muted-foreground">{t('no_saved_videos')}</p>
                </div>
            )}
        </TabsContent>
        <TabsContent value="suggestions">
            {userSuggestions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    {userSuggestions.map((suggestion) => (
                        <SuggestionCard key={suggestion.id} suggestion={suggestion} onDelete={handleDeleteSuggestion} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <p className="text-muted-foreground">{t('no_suggestions_yet')}</p>
                     <Button asChild className="mt-4">
                        <Link href="/suggest">{t('suggest_a_place')}</Link>
                    </Button>
                </div>
            )}
        </TabsContent>
      </Tabs>
    </main>
  );
}

    
