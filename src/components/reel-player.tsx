"use client";

import { useEffect, useRef, useState } from "react";
import type { Video } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, Eye, Music, Play, Pause, Volume2, VolumeX, Share2, MessageCircle } from "lucide-react";
import { useVideoStore } from "@/hooks/use-video-store";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";


interface ReelPlayerProps {
  video: Video;
  isIntersecting: boolean;
}

export function ReelPlayer({ video, isIntersecting }: ReelPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  
  const { likedVideos, toggleLike, openCommentSheet } = useVideoStore();
  const { toast } = useToast();
  const isLiked = likedVideos.has(video.id);
  const commentCount = video.comments?.length || 0;

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
      title: "Link Copied!",
      description: "The video link has been copied to your clipboard.",
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
            </div>
            <p className="text-sm line-clamp-2">{video.title} - #{video.destination.name}</p>
            <div className="flex items-center gap-2 mt-2 text-sm">
                <Music className="h-4 w-4" />
                <span>Original Audio</span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <Button onClick={handleLike} variant="ghost" size="icon" className="text-white h-12 w-12 flex-col gap-1">
              <Heart className={cn("h-8 w-8", isLiked && "fill-red-500 text-red-500")} />
              <span className="text-xs font-bold">{formatCount(video.likes)}</span>
            </Button>
            <Button onClick={() => openCommentSheet(video.id)} variant="ghost" size="icon" className="text-white h-12 w-12 flex-col gap-1">
              <MessageCircle className="h-8 w-8" />
              <span className="text-xs font-bold">{formatCount(commentCount)}</span>
            </Button>
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
