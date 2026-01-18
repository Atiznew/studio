
import type { User, Destination, Video, Story, ShopItem } from './types';
import data from './placeholder-images.json';

export const placeholderImages = data.placeholderImages;

export const initialUsers: User[] = [
  { id: 'u1', name: 'Alex Doe', username: 'alexdoe', avatarUrl: placeholderImages.find(p => p.id === 'avatar-1')?.imageUrl || '', bio: 'Travel enthusiast & storyteller.\nExploring the world one city at a time.', website: 'https://alexdoe.com', followers: 0, following: 0 },
];


export const currentUser = initialUsers.find(u => u.id === 'u1')!;

export const destinations: Destination[] = [];

export const initialVideos: Video[] = [];

export const stories: Story[] = [];

export const shopItems: ShopItem[] = [];
