export interface User {
  id: string;
  name: string;
  avatarUrl: string;
}

export type VideoCategory = "Beach" | "Mountain" | "City" | "Religious" | "Food" | "Amusement Park" | "Forest" | "Tropical" | "Camping" | "Other";

export interface Video {
  id: string;
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  source: 'youtube' | 'direct';
  user: User;
  views: number;
  likes: number;
  destination: Destination;
  category: VideoCategory;
  description: string;
}

export interface Destination {
  id: string;
  name: string;
  imageUrl: string;
  slug: string;
  country: string;
}
