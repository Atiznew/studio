import type { User, Destination, Video, Story } from './types';
import data from './placeholder-images.json';

export const placeholderImages = data.placeholderImages;

export const users: User[] = [
  { id: 'u1', name: 'Alex Doe', username: 'alexdoe', avatarUrl: placeholderImages.find(p => p.id === 'avatar-1')?.imageUrl || '', bio: 'Travel enthusiast & storyteller.\nExploring the world one city at a time.', website: 'https://alexdoe.com', followers: 1258, following: 342 },
  { id: 'u2', name: 'Jane Smith', username: 'janesmith', avatarUrl: placeholderImages.find(p => p.id === 'avatar-2')?.imageUrl || '', bio: 'Mountain lover and avid hiker.\nAlways looking for the next peak to conquer.', website: 'https://janesmith.io', followers: 2345, following: 189 },
];

export const currentUser = users[0];

export const destinations: Destination[] = [
  { id: 'd1', name: 'Goa', country: 'India', slug: 'goa', imageUrl: placeholderImages.find(p => p.id === 'dest-goa')?.imageUrl || '' },
  { id: 'd2', name: 'Manali', country: 'India', slug: 'manali', imageUrl: placeholderImages.find(p => p.id === 'dest-manali')?.imageUrl || '' },
  { id: 'd3', name: 'Paris', country: 'France', slug: 'paris', imageUrl: placeholderImages.find(p => p.id === 'dest-paris')?.imageUrl || '' },
  { id: 'd4', name: 'Kyoto', country: 'Japan', slug: 'kyoto', imageUrl: placeholderImages.find(p => p.id === 'dest-kyoto')?.imageUrl || '' },
  { id: 'd5', name: 'Bali', country: 'Indonesia', slug: 'bali', imageUrl: placeholderImages.find(p => p.id === 'dest-bali')?.imageUrl || '' },
  { id: 'd6', name: 'Rome', country: 'Italy', slug: 'rome', imageUrl: placeholderImages.find(p => p.id === 'dest-rome')?.imageUrl || '' },
];

export const initialVideos: Video[] = [
  {
    id: 'v1',
    title: 'A Day at the Beach in Goa',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnailUrl: placeholderImages.find(p => p.id === 'video-thumb-1')?.imageUrl || '',
    source: 'direct',
    user: users[0],
    views: 15000,
    likes: 1200,
    comments: [
        { id: 'c1', user: users[1], text: 'Looks amazing!', createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
        { id: 'c2', user: users[0], text: 'It was the best trip!', createdAt: new Date(Date.now() - 1000 * 60 * 2).toISOString() },
    ],
    destination: destinations[0],
    category: 'Beach',
    description: 'Enjoying the sun, sand, and waves in beautiful Goa. A perfect getaway!',
  },
  {
    id: 'v2',
    title: 'Hiking in the Himalayas',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    thumbnailUrl: placeholderImages.find(p => p.id === 'video-thumb-2')?.imageUrl || '',
    source: 'direct',
    user: users[1],
    views: 22000,
    likes: 2500,
    comments: [],
    destination: destinations[1],
    category: 'Mountain',
    description: 'An adventurous trek through the stunning landscapes of Manali.',
  },
  {
    id: 'v3',
    title: 'Eiffel Tower Magic',
    videoUrl: 'https://www.youtube.com/watch?v=z_jw3rB_Pto', // Example YouTube link
    thumbnailUrl: placeholderImages.find(p => p.id === 'video-thumb-3')?.imageUrl || '',
    source: 'youtube',
    user: users[0],
    views: 50000,
    likes: 4500,
    comments: [],
    destination: destinations[2],
    category: 'City',
    description: 'A magical evening exploring the iconic Eiffel Tower in Paris.',
  },
  {
    id: 'v4',
    title: 'Peaceful Kyoto Temples',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    thumbnailUrl: placeholderImages.find(p => p.id === 'video-thumb-4')?.imageUrl || '',
    source: 'direct',
    user: users[1],
    views: 18000,
    likes: 1900,
    comments: [],
    destination: destinations[3],
    category: 'Religious',
    description: 'Finding tranquility among the ancient temples of Kyoto, Japan.',
  },
  {
    id: 'v5',
    title: 'Bali\'s Green Paradise',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    thumbnailUrl: placeholderImages.find(p => p.id === 'video-thumb-5')?.imageUrl || '',
    source: 'direct',
    user: users[0],
    views: 32000,
    likes: 3100,
    comments: [],
    destination: destinations[4],
    category: 'Tropical',
    description: 'Exploring the lush green rice terraces of Bali. A true paradise on Earth.',
  },
  {
    id: 'v6',
    title: 'Ancient Rome Revealed',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnAnAdventure.mp4',
    thumbnailUrl: placeholderImages.find(p => p.id === 'video-thumb-6')?.imageUrl || '',
    source: 'direct',
    user: users[1],
    views: 41000,
    likes: 3800,
    comments: [],
    destination: destinations[5],
    category: 'City',
    description: 'Walking through history at the Colosseum and Roman Forum in Rome.',
  },
  {
    id: 'v7',
    title: 'Paragliding over Manali',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    thumbnailUrl: placeholderImages.find(p => p.id === 'video-thumb-7')?.imageUrl || '',
    source: 'direct',
    user: users[0],
    views: 9000,
    likes: 850,
    comments: [],
    destination: destinations[1],
    category: 'Mountain',
    description: 'Soaring through the skies and getting a bird\'s eye view of Manali\'s beauty.',
  },
  {
    id: 'v8',
    title: 'Parisian Street Food',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnailUrl: placeholderImages.find(p => p.id === 'video-thumb-8')?.imageUrl || '',
    source: 'direct',
    user: users[1],
    views: 12500,
    likes: 1100,
    comments: [],
    destination: destinations[2],
    category: 'Food',
    description: 'Tasting the delicious crepes and other street food delights in Paris.',
  }
];

export const stories: Story[] = [
    { id: 's1', user: users[1], imageUrl: 'https://images.unsplash.com/photo-1533106418989-87423dec6928?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHx0cmF2ZWwlJTIwc3Rvcnl8ZW58MHx8fHwxNzY4MTYyMjIyfDA&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: 's2', user: users[0], imageUrl: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHx0cmF2ZWwlJTIwYmVhY2h8ZW58MHx8fHwxNzY4MTYyMjM4fDA&ixlib=rb-4.1.0&q=80&w=1080', viewed: true },
    { id: 's3', user: {id: 'u3', name: 'Chris', username: 'chris', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxtYW4lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjgyNDIxNjB8MA&ixlib=rb-4.1.0&q=80&w=1080', bio: 'I love to travel', followers: 500, following: 100}, imageUrl: 'https://images.unsplash.com/photo-1473625247510-8ceb1760943f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHx0cmF2ZWwlJTIwZm9yZXN0fGVufDB8fHx8MTc2ODE2MjI2MHww&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: 's4', user: {id: 'u4', name: 'Sarah', username: 'sarah', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHx3b21hbiUyMHBvcnRyYWl0fGVufDB8fHx8MTc2NjUyNTk0MHww&ixlib=rb-4.1.0&q=80&w=1080', bio: 'Just a girl who loves to travel', followers: 800, following: 200}, imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHRyYXZlbHxlbnwwfHx8fDE3NjgyNDIxODB8MA&ixlib=rb-4.1.0&q=80&w=1080' },
];
