"use client";

import create from 'zustand';
import { initialVideos, currentUser, destinations, users } from '@/lib/data';
import type { Video, Comment } from '@/lib/types';

interface VideoState {
  videos: Video[];
  likedVideos: Set<string>;
  followedUsers: Set<string>;
  isCommentSheetOpen: boolean;
  activeVideoId: string | null;
  addVideo: (videoData: any) => void;
  toggleLike: (videoId: string) => void;
  toggleFollow: (userId: string) => void;
  isFollowing: (userId: string) => boolean;
  openCommentSheet: (videoId: string) => void;
  closeCommentSheet: () => void;
  addComment: (videoId: string, text: string) => void;
}

export const useVideoStore = create<VideoState>((set, get) => ({
  videos: initialVideos,
  likedVideos: new Set(),
  followedUsers: new Set(),
  isCommentSheetOpen: false,
  activeVideoId: null,
  
  addVideo: (videoData) => {
    const newVideo: Video = {
      id: `v${get().videos.length + 1}`,
      title: videoData.title,
      videoUrl: videoData.videoUrl,
      thumbnailUrl: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxhbmltYWwlMjB0cmF2ZWx8ZW58MHx8fHwxNzY2Nzk3NDU3fDA&ixlib=rb-4.1.0&q=80&w=1080', // Replace with a real thumbnail
      source: videoData.source,
      user: currentUser,
      views: 0,
      likes: 0,
      comments: [],
      destination: destinations.find(d => d.name.toLowerCase() === videoData.place.toLowerCase()) || {
        id: `d${destinations.length + 1}`,
        name: videoData.place,
        country: videoData.country,
        slug: videoData.place.toLowerCase().replace(' ', '-'),
        imageUrl: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxhbmltYWwlMjB0cmF2ZWx8ZW58MHx8fHwxNzY2Nzk3NDU3fDA&ixlib=rb-4.1.0&q=80&w=1080', // Replace
      },
      category: videoData.category,
      description: videoData.description,
    };
    set((state) => ({ videos: [newVideo, ...state.videos] }));
  },

  toggleLike: (videoId: string) => {
    set((state) => {
      const newLikedVideos = new Set(state.likedVideos);
      const videoIndex = state.videos.findIndex(v => v.id === videoId);
      if (videoIndex === -1) return state;

      const newVideos = [...state.videos];
      const video = { ...newVideos[videoIndex] };

      if (newLikedVideos.has(videoId)) {
        newLikedVideos.delete(videoId);
        video.likes = Math.max(0, video.likes - 1);
      } else {
        newLikedVideos.add(videoId);
        video.likes += 1;
      }
      
      newVideos[videoIndex] = video;

      return { likedVideos: newLikedVideos, videos: newVideos };
    });
  },

  toggleFollow: (userId: string) => {
    set((state) => {
      const newFollowedUsers = new Set(state.followedUsers);
      if (newFollowedUsers.has(userId)) {
        newFollowedUsers.delete(userId);
      } else {
        newFollowedUsers.add(userId);
      }
      return { followedUsers: newFollowedUsers };
    });
  },

  isFollowing: (userId: string) => {
    return get().followedUsers.has(userId);
  },

  openCommentSheet: (videoId: string) => {
    set({ isCommentSheetOpen: true, activeVideoId: videoId });
  },

  closeCommentSheet: () => {
    set({ isCommentSheetOpen: false, activeVideoId: null });
  },

  addComment: (videoId: string, text: string) => {
    set((state) => {
        const videoIndex = state.videos.findIndex(v => v.id === videoId);
        if (videoIndex === -1) return state;

        const newVideos = [...state.videos];
        const video = { ...newVideos[videoIndex] };

        const newComment: Comment = {
            id: `c${Date.now()}`,
            user: currentUser,
            text: text,
            createdAt: new Date().toISOString(),
        };

        const existingComments = video.comments || [];
        video.comments = [newComment, ...existingComments];
        newVideos[videoIndex] = video;

        return { videos: newVideos };
    });
  }
}));
