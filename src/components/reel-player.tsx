
"use client";

import { useEffect, useRef, useState } from "react";
import type { Video, VideoSource } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, Eye, Music, Play, Pause, Volume2, VolumeX, Share2, MessageCircle, Repeat, Bookmark } from "lucide-react";
import { useVideoStore } from "@/hooks/use-video-store";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/context/language-context";
import dynamic from 'next/dynamic';
import { useRouter } from "next/navigation";
import { Slider } from "./ui/slider";

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

interface ReelPlayerProps {
  video: Video;
  isIntersecting: boolean;
}

export function ReelPlayer({ video, isIntersecting }: ReelPlayerProps) {
  const playerRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState({ played: 0, playedSeconds: 0, loaded: 0, loadedSeconds: 0 });
  const [duration, setDuration] = useState(0);
  
  const { likedVideos, toggleLike, openCommentSheet, currentUser, isFollowing, toggleFollow, toggleRepost, isReposted, savedVideos, toggleSaveVideo } = useVideoStore();
  const { toast } = useToast();
  const router = useRouter();
  const { t } = useTranslation();
  const isLiked = likedVideos.has(video.id);
  const isSaved = savedVideos.has(video.id);
  const reposted = currentUser ? isReposted(video.id) : false;
  const commentCount = video.comments?.length || 0;
  const following = currentUser ? isFollowing(video.user.id) : false;
  const isCurrentUserVideo = currentUser && video.user.id === currentUser.id;

  useEffect(() => {
    setIsPlaying(isIntersecting);
    if (!isIntersecting && playerRef.current) {
        playerRef.current.seekTo(0);
    }
  }, [isIntersecting]);

  const handleAction = (action: () => void) => {
    if (!currentUser) {
      router.push('/login');
      return;
    }
    action();
  };

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  }
  
  const handleLike = () => handleAction(() => toggleLike(video.id));

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/reels?v=${video.id}`);
    toast({
      title: t('link_copied_title'),
      description: t('link_copied_description'),
    });
  };

  const handleRepost = () => handleAction(() => {
    toggleRepost(video.id);
    if (!reposted) {
        toast({
            title: t('repost_successful_title'),
            description: t('repost_successful_description'),
        });
    } else {
        toast({
            title: t('repost_undo_title'),
            description: t('repost_undo_description'),
        });
    }
  });

  const handleSave = () => handleAction(() => {
    toggleSaveVideo(video.id);
    toast({
      title: isSaved ? t('video_unsaved_title') : t('video_saved_title'),
      description: isSaved ? t('video_unsaved_description') : t('video_saved_description'),
    });
  });
  
  const handleFollow = () => handleAction(() => toggleFollow(video.user.id));
  const handleComment = () => handleAction(() => openCommentSheet(video.id));
  
  const handleProgress = (state: { played: number; playedSeconds: number; loaded: number; loadedSeconds: number; }) => {
    setProgress(state);
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const handleSeek = (value: number[]) => {
    const newPlayed = value[0] / 100;
    playerRef.current?.seekTo(newPlayed);
    setProgress(prev => ({ ...prev, played: newPlayed }));
  };
  
  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds === Infinity) return '00:00';
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, '0');
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
    }
    return `${mm}:${ss}`;
  };

  const formatCount = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count;
  };
  
  const renderPlayer = () => {
    return (
       <ReactPlayer
            ref={playerRef}
            url={video.videoUrl}
            playing={isPlaying}
            muted={isMuted}
            loop
            width="100%"
            height="100%"
            playsinline
            onProgress={handleProgress}
            onDuration={handleDuration}
            className="react-player"
            config={{
                youtube: {
                    playerVars: { 
                        showinfo: 0, 
                        controls: 0, 
                        modestbranding: 1, 
                        rel: 0,
                        iv_load_policy: 3
                    }
                },
                vimeo: {
                    playerOptions: {
                        byline: false,
                        title: false,
                        portrait: false
                    }
                }
            }}
        />
    )
  }

  return (
    <div className="relative h-full w-full bg-black" onClick={togglePlay}>
      {renderPlayer()}
      
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
          <Play className="h-20 w-20 text-white/50" />
        </div>
      )}

      {/* Overlay for controls and info */}
      <div className="absolute inset-0 p-4 flex items-end text-white bg-gradient-to-t from-black/60 via-black/20 to-transparent">
        <div className="flex-1 flex flex-col gap-4">
           {/* Video Info */}
           <div>
            <div className="flex items-center gap-2 mb-2 pointer-events-auto">
              <Link href={`/profile/${video.user.id}`}>
                <Avatar>
                  <AvatarImage src={video.user.avatarUrl} alt={video.user.name} />
                  <AvatarFallback>{video.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </Link>
              <Link href={`/profile/${video.user.id}`}>
                <h3 className="font-bold text-lg">{video.user.name}</h3>
              </Link>
               {!isCurrentUserVideo && (
                <Button 
                    size="sm"
                    variant={following ? 'secondary' : 'default'}
                    onClick={(e) => { e.stopPropagation(); handleFollow(); }}
                    className={cn("h-7 px-3 rounded-full text-xs", following ? "bg-white/20 text-white" : "bg-primary text-primary-foreground")}
                >
                    {following ? t('following') : t('follow')}
                </Button>
              )}
            </div>
            <p className="text-sm line-clamp-2 pointer-events-auto">{video.title} - #{video.destination.name}</p>
            <div className="flex items-center gap-2 mt-2 text-sm pointer-events-auto">
                <Music className="h-4 w-4" />
                <span>{t('original_audio')}</span>
            </div>
          </div>

          {/* Progress bar */}
          {duration > 0 && (
              <div className="pointer-events-auto">
                <div className="flex items-center gap-2">
                  <span className="text-xs">{formatTime(progress.playedSeconds)}</span>
                  <Slider
                    value={[progress.played * 100]}
                    onValueChange={handleSeek}
                    className="w-full"
                  />
                  <span className="text-xs">{formatTime(duration)}</span>
                </div>
              </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center justify-end gap-2 ml-4 pointer-events-auto">
          <Button onClick={(e) => { e.stopPropagation(); handleLike(); }} variant="ghost" size="icon" className="text-white h-12 w-12 flex-col gap-1">
            <Heart className={cn("h-7 w-7", isLiked && "fill-primary text-primary")} />
            <span className="text-xs font-bold">{formatCount(video.likes)}</span>
          </Button>
          <Button onClick={(e) => { e.stopPropagation(); handleComment(); }} variant="ghost" size="icon" className="text-white h-12 w-12 flex-col gap-1">
            <MessageCircle className="h-7 w-7" />
            <span className="text-xs font-bold">{formatCount(commentCount)}</span>
          </Button>
           <Button onClick={(e) => { e.stopPropagation(); handleSave(); }} variant="ghost" size="icon" className="text-white h-12 w-12 flex-col gap-1">
            <Bookmark className={cn("h-7 w-7", isSaved && "fill-primary text-primary")} />
            <span className="text-xs font-bold">{t('saved_tab')}</span>
          </Button>
          {!isCurrentUserVideo && (
             <Button onClick={(e) => { e.stopPropagation(); handleRepost(); }} variant="ghost" size="icon" className="text-white h-12 w-12 flex-col gap-1">
                  <Repeat className={cn("h-7 w-7", reposted && "text-primary")} />
                  <span className="text-xs font-bold">{t('reposts')}</span>
              </Button>
          )}
          <Button onClick={(e) => { e.stopPropagation(); handleShare(); }} variant="ghost" size="icon" className="text-white h-12 w-12">
            <Share2 className="h-7 w-7" />
          </Button>
        </div>
      </div>

       <div className="absolute top-4 right-4 pointer-events-auto">
        <Button onClick={(e) => { e.stopPropagation(); toggleMute(); }} variant="ghost" size="icon" className="text-white bg-black/30 hover:bg-black/50">
          {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
        </Button>
      </div>
      <style jsx global>{`
        .react-player {
            position: absolute;
            top: 0;
            left: 0;
        }
        .react-player > div {
           width: 100% !important;
           height: 100% !important;
        }
        .react-player video,
        .react-player iframe {
            object-fit: cover;
        }
      `}</style>
    </div>
  );
}
