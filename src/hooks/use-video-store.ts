"use client";

import create from 'zustand';
import { initialVideos, initialUsers as allUsers } from '@/lib/data';
import type { Video, Comment, User } from '@/lib/types';

interface VideoState {
  videos: Video[];
  users: User[];
  currentUser: User;
  likedVideos: Set<string>;
  followedUsers: Set<string>;
  isCommentSheetOpen: boolean;
  activeVideoId: string | null;
  addVideo: (videoData: any) => void;
  deleteVideo: (videoId: string) => void;
  toggleLike: (videoId: string) => void;
  toggleFollow: (userId: string) => void;
  isFollowing: (userId: string) => boolean;
  openCommentSheet: (videoId: string) => void;
  closeCommentSheet: () => void;
  addComment: (videoId: string, text: string) => void;
  updateCurrentUser: (data: Partial<User>) => void;
}

const currentUser = allUsers.find(u => u.id === 'u1')!;

export const useVideoStore = create<VideoState>((set, get) => ({
  videos: initialVideos,
  users: allUsers,
  currentUser: currentUser,
  likedVideos: new Set(),
  followedUsers: new Set(['u2']), // Initially follow Jane Smith
  isCommentSheetOpen: false,
  activeVideoId: null,
  
  addVideo: (videoData) => {
    const { videos, users } = get();
    const currentUser = users.find(u => u.id === 'u1')!;
    const newVideo: Video = {
      id: `v${videos.length + 1}`,
      title: videoData.title,
      videoUrl: videoData.videoUrl,
      thumbnailUrl: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxhbmltYWwlMjB0cmF2ZWx8ZW58MHx8fHwxNzY2Nzk3NDU3fDA&ixlib=rb-4.1.0&q=80&w=1080', // Replace with a real thumbnail
      source: videoData.source,
      user: currentUser,
      views: 0,
      likes: 0,
      comments: [],
      destination: { // This part needs real logic to find or create destination
        id: `d${Math.random()}`,
        name: videoData.place,
        country: videoData.country,
        slug: videoData.place.toLowerCase().replace(/\s+/g, '-'),
        imageUrl: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxhbmltYWwlMjB0cmF2ZWx8ZW58MHx8fHwxNzY2Nzk3NDU3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      },
      category: videoData.category,
      description: videoData.description,
    };
    set((state) => ({ videos: [newVideo, ...state.videos] }));
  },
  
  deleteVideo: (videoId: string) => {
    set((state) => ({
        videos: state.videos.filter(v => v.id !== videoId)
    }));
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
      const user = state.users.find(u => u.id === userId);
      const currentUser = state.users.find(u => u.id === state.currentUser.id);
      if (!user || !currentUser) return {};

      const newUsers = [...state.users];
      
      if (newFollowedUsers.has(userId)) {
        newFollowedUsers.delete(userId);
        user.followers = Math.max(0, (user.followers || 0) - 1);
        currentUser.following = Math.max(0, (currentUser.following || 0) - 1);
      } else {
        newFollowedUsers.add(userId);
        user.followers = (user.followers || 0) + 1;
        currentUser.following = (currentUser.following || 0) + 1;
      }

      const userIndex = newUsers.findIndex(u => u.id === userId);
      if(userIndex > -1) newUsers[userIndex] = user;
      
      const currentUserIndex = newUsers.findIndex(u => u.id === currentUser.id);
      if(currentUserIndex > -1) newUsers[currentUserIndex] = currentUser;


      return { followedUsers: newFollowedUsers, users: newUsers };
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
            user: state.currentUser,
            text: text,
            createdAt: new Date().toISOString(),
        };

        const existingComments = video.comments || [];
        video.comments = [newComment, ...existingComments];
        newVideos[videoIndex] = video;

        return { videos: newVideos };
    });
  },
  updateCurrentUser: (data: Partial<User>) => {
    set((state) => {
      const newUsers = [...state.users];
      const currentUserIndex = newUsers.findIndex(u => u.id === state.currentUser.id);
      if (currentUserIndex !== -1) {
        newUsers[currentUserIndex] = { ...newUsers[currentUserIndex], ...data };
      }
      
      // Also update user data in videos and comments
      const updatedVideos = state.videos.map(video => {
        let newVideo = {...video};
        if (video.user.id === state.currentUser.id) {
          newVideo.user = newUsers[currentUserIndex];
        }
        const updatedComments = video.comments.map(comment => {
            if (comment.user.id === state.currentUser.id) {
                return { ...comment, user: newUsers[currentUserIndex] };
            }
            return comment;
        });
        newVideo.comments = updatedComments;
        return newVideo;
      });
      
      return { users: newUsers, videos: updatedVideos, currentUser: newUsers[currentUserIndex] };
    });
  }
}));
