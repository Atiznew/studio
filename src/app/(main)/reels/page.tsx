"use client";

import { useEffect, useRef, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ReelPlayer } from '@/components/reel-player';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useVideoStore } from '@/hooks/use-video-store';

function ReelsContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleReel, setVisibleReel] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const videoId = searchParams.get('v');
  const { videos } = useVideoStore();

  useEffect(() => {
    let initialReelId = videos[0]?.id || null;

    if (videoId) {
      const targetVideo = videos.find(v => v.id === videoId);
      if (targetVideo) {
        initialReelId = videoId;
      }
    }
    
    if (initialReelId && containerRef.current) {
        const targetReel = containerRef.current.querySelector(`[data-video-id="${initialReelId}"]`);
        if (targetReel) {
            targetReel.scrollIntoView({ behavior: 'instant' });
            setVisibleReel(initialReelId);
        }
    }

  }, [videoId, videos]);


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleReel(entry.target.getAttribute('data-video-id'));
          }
        });
      },
      { threshold: 0.5 }
    );

    const reels = containerRef.current?.querySelectorAll('[data-video-id]');
    if (reels) {
        reels.forEach((reel) => observer.observe(reel));
    }

    return () => {
        if(reels) {
            reels.forEach((reel) => observer.unobserve(reel));
        }
    };
  }, [videos]);
  
  if (!videos || videos.length === 0) {
    return (
      <div className="h-screen w-screen bg-black flex items-center justify-center text-white">
        No videos available.
         <div className="fixed top-4 left-4 z-50">
            <Button variant="ghost" size="icon" asChild className="text-white bg-black/30 hover:bg-black/50">
            <Link href="/home">
                <ChevronLeft className="h-6 w-6" />
            </Link>
            </Button>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="h-screen w-screen overflow-y-auto snap-y snap-mandatory no-scrollbar bg-black">
      <div className="fixed top-4 left-4 z-50">
        <Button variant="ghost" size="icon" asChild className="text-white bg-black/30 hover:bg-black/50">
          <Link href="/home">
            <ChevronLeft className="h-6 w-6" />
          </Link>
        </Button>
      </div>
      {videos.map((video) => (
        <div key={video.id} id={`reel-${video.id}`} data-video-id={video.id} className="h-screen w-screen snap-start flex items-center justify-center">
          <ReelPlayer video={video} isIntersecting={visibleReel === video.id} />
        </div>
      ))}
    </div>
  );
}

export default function ReelsPage() {
    return (
        <Suspense fallback={<div className="h-screen w-screen bg-black flex items-center justify-center text-white">Loading...</div>}>
            <ReelsContent />
        </Suspense>
    )
}
