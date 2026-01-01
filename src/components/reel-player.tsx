"use client";

import { useEffect, useRef, useState } from "react";
import type { Video } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, Eye, Music, Play, Pause, Volume2, VolumeX, Share2, MessageCircle, Repeat, Bookmark } from "lucide-react";
import { useVideoStore } from "@/hooks/use-video-store";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/context/language-context";


interface ReelPlayerProps {
  video: Video;
  isIntersecting: boolean;
}

export function ReelPlayer({ video, isIntersecting }: ReelPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  
  const { likedVideos, toggleLike, openCommentSheet, currentUser, isFollowing, toggleFollow, toggleRepost, isReposted, savedVideos, toggleSaveVideo } = useVideoStore();
  const { toast } = useToast();
  const { t } = useTranslation();
  const isLiked = likedVideos.has(video.id);
  const isSaved = savedVideos.has(video.id);
  const reposted = isReposted(video.id);
  const commentCount = video.comments?.length || 0;
  const following = isFollowing(video.user.id);
  const isCurrentUserVideo = video.user.id === currentUser.id;


  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (isIntersecting) {
      videoElement.play().catch(error => console.error("Video autoplay failed:", error));
      setIsPlaying(true);
    } else {
      videoElement.pause();
      setIsPlaying(false);
      videoElement.currentTime = 0; // Optional: Reset video on scroll away
    }
  }, [isIntersecting]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(videoRef.current.muted);
    }
  }
  
  const handleLike = () => {
    toggleLike(video.id);
  }

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/reels?v=${video.id}`);
    toast({
      title: t('link_copied_title'),
      description: t('link_copied_description'),
    });
  };

  const handleRepost = () => {
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
  };

  const handleSave = () => {
    toggleSaveVideo(video.id);
    toast({
      title: isSaved ? t('video_unsaved_title') : t('video_saved_title'),
      description: isSaved ? t('video_unsaved_description') : t('video_saved_description'),
    });
  };


  const formatCount = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count;
  };

  return (
    <div className="relative h-full w-full bg-black">
      <video
        ref={videoRef}
        src={video.videoUrl}
        className="h-full w-full object-contain"
        loop
        muted
        playsInline
        onClick={togglePlay}
      />
      
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
          <Play className="h-20 w-20 text-white/50" />
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black/60 to-transparent">
        <div className="flex items-end">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
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
                    onClick={() => toggleFollow(video.user.id)}
                    className={cn("h-7 px-3 rounded-full text-xs", following ? "bg-white/20 text-white" : "bg-primary text-primary-foreground")}
                >
                    {following ? t('following') : t('follow')}
                </Button>
              )}
            </div>
            <p className="text-sm line-clamp-2">{video.title} - #{video.destination.name}</p>
            <div className="flex items-center gap-2 mt-2 text-sm">
                <Music className="h-4 w-4" />
                <span>{t('original_audio')}</span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <Button onClick={handleLike} variant="ghost" size="icon" className="text-white h-12 w-12 flex-col gap-1">
              <Heart className={cn("h-8 w-8", isLiked && "fill-primary text-primary")} />
              <span className="text-xs font-bold">{formatCount(video.likes)}</span>
            </Button>
            <Button onClick={() => openCommentSheet(video.id)} variant="ghost" size="icon" className="text-white h-12 w-12 flex-col gap-1">
              <MessageCircle className="h-8 w-8" />
              <span className="text-xs font-bold">{formatCount(commentCount)}</span>
            </Button>
             <Button onClick={handleSave} variant="ghost" size="icon" className="text-white h-12 w-12 flex-col gap-1">
              <Bookmark className={cn("h-8 w-8", isSaved && "fill-primary text-primary")} />
            </Button>
            {!isCurrentUserVideo && (
               <Button onClick={handleRepost} variant="ghost" size="icon" className="text-white h-12 w-12 flex-col gap-1">
                    <Repeat className={cn("h-8 w-8", reposted && "text-primary")} />
                </Button>
            )}
            <Button variant="ghost" size="icon" className="text-white h-12 w-12 flex-col gap-1">
              <Eye className="h-8 w-8" />
              <span className="text-xs font-bold">{formatCount(video.views)}</span>
            </Button>
            <Button onClick={handleShare} variant="ghost" size="icon" className="text-white h-12 w-12">
              <Share2 className="h-8 w-8" />
            </Button>
          </div>
        </div>
      </div>

       <div className="absolute top-4 right-4">
        <Button onClick={toggleMute} variant="ghost" size="icon" className="text-white bg-black/30 hover:bg-black/50">
          {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
        </Button>
      </div>

    </div>
  );
}
