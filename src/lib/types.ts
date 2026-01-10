

export interface User {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  bio?: string;
  website?: string;
  followers?: number;
  following?: number;
}

export interface Story {
  id: string;
  user: User;
  imageUrl: string;
  viewed?: boolean;
}


export type VideoCategory = "Beach" | "Mountain" | "City" | "Religious" | "Food" | "Amusement Park" | "Forest" | "Tropical" | "Camping" | "Other";

export interface Comment {
  id: string;
  user: User;
  text: string;
  createdAt: string;
}

export type VideoSource = 'youtube' | 'telegram' | 'url' | 'direct';

export interface Video {
  id: string;
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  source: VideoSource;
  user: User;
  views: number;
  likes: number;
  comments: Comment[];
  destination: Destination;
  category: VideoCategory;
  description: string;
  repostedBy?: User;
}

export interface Destination {
  id: string;
  name: string;
  imageUrls: string[];
  slug: string;
  country: string;
  lat?: number;
  lng?: number;
  mapLink?: string;
}

export type ShopItemCategory = "All" | "Digital" | "Physical";

export interface ShopItem {
  id: string;
  name: string;
  imageUrl: string;
  productUrl: string;
  price: string;
  category: "Digital" | "Physical";
}

export interface Suggestion {
    id: string;
    userId: string;
    place: string;
    state: string;
    country: string;
    reason: string;
    mapLink?: string;
    imageUrls: string[];
    createdAt: string;
}

    
