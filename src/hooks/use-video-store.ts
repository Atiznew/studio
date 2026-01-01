
"use client";

import create from 'zustand';
import { initialVideos, initialUsers as allUsers } from '@/lib/data';
import type { Video, Comment, User } from '@/lib/types';

interface VideoState {
  videos: Video[];
  users: User[];
  currentUser: User | null; // Can be null now
  likedVideos: Set<string>;
  savedVideos: Set<string>;
  repostedVideos: Map<string, Set<string>>; // Map<userId, Set<videoId>>
  followedUsers: Set<string>;
  isCommentSheetOpen: boolean;
  activeVideoId: string | null;
  addVideo: (videoData: any) => void;
  deleteVideo: (videoId: string) => void;
  toggleLike: (videoId: string) => void;
  toggleFollow: (userId: string) => boolean;
  isFollowing: (userId: string) => boolean;
  openCommentSheet: (videoId: string) => void;
  closeCommentSheet: () => void;
  addComment: (videoId: string, text: string) => void;
  updateCurrentUser: (data: Partial<User>) => void;
  toggleRepost: (videoId: string) => void;
  isReposted: (videoId: string) => boolean;
  toggleSaveVideo: (videoId: string) => void;
}

// In a real app, you'd get this from an auth context
const getInitialUser = (): User | null => {
    // For now, we'll simulate the user being logged in.
    // To test the login wall, change this to return null.
    return allUsers.find(u => u.id === 'u1') || null;
};

export const useVideoStore = create<VideoState>((set, get) => ({
  videos: initialVideos,
  users: allUsers,
  currentUser: getInitialUser(),
  likedVideos: new Set(),
  savedVideos: new Set(),
  repostedVideos: new Map(),
  followedUsers: new Set(['u2']), // Initially follow Jane Smith
  isCommentSheetOpen: false,
  activeVideoId: null,
  
  addVideo: (videoData) => {
    const { videos, currentUser } = get();
    if (!currentUser) return; // Guard against adding video if not logged in

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

  toggleSaveVideo: (videoId: string) => {
    set((state) => {
      const newSavedVideos = new Set(state.savedVideos);
      if (newSavedVideos.has(videoId)) {
        newSavedVideos.delete(videoId);
      } else {
        newSavedVideos.add(videoId);
      }
      return { savedVideos: newSavedVideos };
    });
  },

  toggleRepost: (videoId: string) => {
    set((state) => {
      const { currentUser } = state;
      if (!currentUser) return {};
      const newRepostedVideos = new Map(state.repostedVideos);
      const userReposts = new Set(newRepostedVideos.get(currentUser.id) || []);

      if (userReposts.has(videoId)) {
        userReposts.delete(videoId);
      } else {
        userReposts.add(videoId);
      }

      newRepostedVideos.set(currentUser.id, userReposts);
      return { repostedVideos: newRepostedVideos };
    });
  },

  isReposted: (videoId: string) => {
    const { currentUser, repostedVideos } = get();
    if (!currentUser) return false;
    return repostedVideos.get(currentUser.id)?.has(videoId) || false;
  },

  toggleFollow: (userId: string) => {
    let isNowFollowing = false;
    set((state) => {
      if (!state.currentUser) return {};
      const newFollowedUsers = new Set(state.followedUsers);
      const user = state.users.find(u => u.id === userId);
      
      const currentUserIndex = state.users.findIndex(u => u.id === state.currentUser!.id);
      if (!user || currentUserIndex === -1) return {};

      const newUsers = [...state.users];
      const currentUser = { ...newUsers[currentUserIndex] };
      
      if (newFollowedUsers.has(userId)) {
        newFollowedUsers.delete(userId);
        user.followers = Math.max(0, (user.followers || 0) - 1);
        currentUser.following = Math.max(0, (currentUser.following || 0) - 1);
        isNowFollowing = false;
      } else {
        newFollowedUsers.add(userId);
        user.followers = (user.followers || 0) + 1;
        currentUser.following = (currentUser.following || 0) + 1;
        isNowFollowing = true;
      }

      const userIndex = newUsers.findIndex(u => u.id === userId);
      if(userIndex > -1) newUsers[userIndex] = user;
      
      newUsers[currentUserIndex] = currentUser;

      return { followedUsers: newFollowedUsers, users: newUsers, currentUser };
    });
    return isNowFollowing;
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
        const { currentUser } = state;
        if (!currentUser) return state;

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
  },
  updateCurrentUser: (data: Partial<User>) => {
    set((state) => {
        if (!state.currentUser) return {};
      const newUsers = [...state.users];
      const currentUserIndex = newUsers.findIndex(u => u.id === state.currentUser!.id);
      if (currentUserIndex !== -1) {
        newUsers[currentUserIndex] = { ...newUsers[currentUserIndex], ...data };
      }
      
      const updatedVideos = state.videos.map(video => {
        let newVideo = {...video};
        if (video.user.id === state.currentUser!.id) {
          newVideo.user = newUsers[currentUserIndex];
        }
        const updatedComments = video.comments.map(comment => {
            if (comment.user.id === state.currentUser!.id) {
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

    