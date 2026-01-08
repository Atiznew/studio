

import type { User, Destination, Video, Story, ShopItem } from './types';
import data from './placeholder-images.json';

export const placeholderImages = data.placeholderImages;

export const initialUsers: User[] = [
  { id: 'u1', name: 'Alex Doe', username: 'alexdoe', avatarUrl: placeholderImages.find(p => p.id === 'avatar-1')?.imageUrl || '', bio: 'Travel enthusiast & storyteller.\nExploring the world one city at a time.', website: 'https://alexdoe.com', followers: 1258, following: 342 },
  { id: 'u2', name: 'Jane Smith', username: 'janesmith', avatarUrl: placeholderImages.find(p => p.id === 'avatar-2')?.imageUrl || '', bio: 'Mountain lover and avid hiker.\nAlways looking for the next peak to conquer.', website: 'https://janesmith.io', followers: 2345, following: 189 },
  { id: 'u3', name: 'Chris Lee', username: 'chrislee', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxtYW4lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjgyNDIxNjB8MA&ixlib=rb-4.1.0&q=80&w=1080', bio: 'Foodie on a quest to taste the world. 🍜🌮🍕', website: 'https://chrisleeeats.com', followers: 5600, following: 89 },
  { id: 'u4', name: 'Sarah Kim', username: 'sarahkim', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHx3b21hbiUyMHBvcnRyYWl0fGVufDB8fHx8MTc2NjUyNTk0MHww&ixlib=rb-4.1.0&q=80&w=1080', bio: 'Digital nomad and photographer. Capturing moments from around the globe.', website: 'https://sarahkim.photo', followers: 12300, following: 120 },
  { id: 'u5', name: 'Mike Johnson', username: 'mikej', avatarUrl: 'https://images.unsplash.com/photo-1557862921-37829c790f19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxtYW58ZW58MHx8fHwxNzY4NTg1MDI3fDA&ixlib=rb-4.1.0&q=80&w=1080', bio: 'Adrenaline junkie. Surfing, skydiving, and everything in between.', website: '', followers: 875, following: 55 },
];


export const currentUser = initialUsers.find(u => u.id === 'u1')!;

export const destinations: Destination[] = [
  { id: 'd1', name: 'Goa', country: 'India', slug: 'goa', imageUrls: [placeholderImages.find(p => p.id === 'dest-goa')?.imageUrl || '', 'https://picsum.photos/seed/101/800/600', 'https://picsum.photos/seed/102/800/600'], lat: 15.2993, lng: 74.1240 },
  { id: 'd2', name: 'Manali', country: 'India', slug: 'manali', imageUrls: [placeholderImages.find(p => p.id === 'dest-manali')?.imageUrl || '', 'https://picsum.photos/seed/103/800/600', 'https://picsum.photos/seed/104/800/600'], lat: 32.2432, lng: 77.1892 },
  { id: 'd3', name: 'Paris', country: 'France', slug: 'paris', imageUrls: [placeholderImages.find(p => p.id === 'dest-paris')?.imageUrl || '', 'https://picsum.photos/seed/105/800/600', 'https://picsum.photos/seed/106/800/600'], lat: 48.8566, lng: 2.3522 },
  { id: 'd4', name: 'Kyoto', country: 'Japan', slug: 'kyoto', imageUrls: [placeholderImages.find(p => p.id === 'dest-kyoto')?.imageUrl || '', 'https://picsum.photos/seed/107/800/600', 'https://picsum.photos/seed/108/800/600'], lat: 35.0116, lng: 135.7681 },
  { id: 'd5', name: 'Bali', country: 'Indonesia', slug: 'bali', imageUrls: [placeholderImages.find(p => p.id === 'dest-bali')?.imageUrl || '', 'https://picsum.photos/seed/109/800/600', 'https://picsum.photos/seed/110/800/600'], lat: -8.3405, lng: 115.0920 },
  { id: 'd6', name: 'Rome', country: 'Italy', slug: 'rome', imageUrls: [placeholderImages.find(p => p.id === 'dest-rome')?.imageUrl || '', 'https://picsum.photos/seed/111/800/600', 'https://picsum.photos/seed/112/800/600'], lat: 41.9028, lng: 12.4964 },
  { id: 'd7', name: 'Agra', country: 'India', slug: 'agra', imageUrls: [placeholderImages.find(p => p.id === 'dest-agra')?.imageUrl || '', 'https://picsum.photos/seed/113/800/600', 'https://picsum.photos/seed/114/800/600'], lat: 27.1767, lng: 78.0081 },
  { id: 'd8', name: 'New York', country: 'USA', slug: 'new-york', imageUrls: [placeholderImages.find(p => p.id === 'dest-new-york')?.imageUrl || '', 'https://picsum.photos/seed/115/800/600', 'https://picsum.photos/seed/116/800/600'], lat: 40.7128, lng: -74.0060 },
  { id: 'd9', name: 'London', country: 'UK', slug: 'london', imageUrls: [placeholderImages.find(p => p.id === 'dest-london')?.imageUrl || '', 'https://picsum.photos/seed/117/800/600', 'https://picsum.photos/seed/118/800/600'], lat: 51.5072, lng: -0.1276 },
  { id: 'd10', name: 'Tokyo', country: 'Japan', slug: 'tokyo', imageUrls: [placeholderImages.find(p => p.id === 'dest-tokyo')?.imageUrl || '', 'https://picsum.photos/seed/119/800/600', 'https://picsum.photos/seed/120/800/600'], lat: 35.6762, lng: 139.6503 },
  { id: 'd11', name: 'Sydney', country: 'Australia', slug: 'sydney', imageUrls: [placeholderImages.find(p => p.id === 'dest-sydney')?.imageUrl || '', 'https://picsum.photos/seed/121/800/600', 'https://picsum.photos/seed/122/800/600'], lat: -33.8688, lng: 151.2093 },
  { id: 'd12', name: 'Cairo', country: 'Egypt', slug: 'cairo', imageUrls: [placeholderImages.find(p => p.id === 'dest-cairo')?.imageUrl || '', 'https://picsum.photos/seed/123/800/600', 'https://picsum.photos/seed/124/800/600'], lat: 30.0444, lng: 31.2357 },
  { id: 'd13', name: 'Rio de Janeiro', country: 'Brazil', slug: 'rio-de-janeiro', imageUrls: [placeholderImages.find(p => p.id === 'dest-rio')?.imageUrl || '', 'https://picsum.photos/seed/125/800/600', 'https://picsum.photos/seed/126/800/600'], lat: -22.9068, lng: -43.1729 },
  { id: 'd14', name: 'Dubai', country: 'UAE', slug: 'dubai', imageUrls: [placeholderImages.find(p => p.id === 'dest-dubai')?.imageUrl || '', 'https://picsum.photos/seed/127/800/600', 'https://picsum.photos/seed/128/800/600'], lat: 25.276987, lng: 55.296249 },
  { id: 'd15', name: 'Santorini', country: 'Greece', slug: 'santorini', imageUrls: [placeholderImages.find(p => p.id === 'dest-santorini')?.imageUrl || '', 'https://picsum.photos/seed/129/800/600', 'https://picsum.photos/seed/130/800/600'], lat: 36.3932, lng: 25.4615 },
  { id: 'd16', name: 'Machu Picchu', country: 'Peru', slug: 'machu-picchu', imageUrls: [placeholderImages.find(p => p.id === 'dest-machu-picchu')?.imageUrl || '', 'https://picsum.photos/seed/131/800/600', 'https://picsum.photos/seed/132/800/600'], lat: -13.1631, lng: -72.5450 },
  { id: 'd17', name: 'Bora Bora', country: 'French Polynesia', slug: 'bora-bora', imageUrls: [placeholderImages.find(p => p.id === 'dest-bora-bora')?.imageUrl || '', 'https://picsum.photos/seed/133/800/600', 'https://picsum.photos/seed/134/800/600'], lat: -16.5004, lng: -151.7415 },
  { id: 'd18', name: 'Venice', country: 'Italy', slug: 'venice', imageUrls: [placeholderImages.find(p => p.id === 'dest-venice')?.imageUrl || '', 'https://picsum.photos/seed/135/800/600', 'https://picsum.photos/seed/136/800/600'], lat: 45.4408, lng: 12.3155 },
  { id: 'd19', name: 'Serengeti', country: 'Tanzania', slug: 'serengeti', imageUrls: [placeholderImages.find(p => p.id === 'dest-serengeti')?.imageUrl || '', 'https://picsum.photos/seed/137/800/600', 'https://picsum.photos/seed/138/800/600'], lat: -2.3333, lng: 34.8333 },
  { id: 'd20', name: 'Jaipur', country: 'India', slug: 'jaipur', imageUrls: [placeholderImages.find(p => p.id === 'dest-jaipur')?.imageUrl || '', 'https://picsum.photos/seed/139/800/600', 'https://picsum.photos/seed/140/800/600'], lat: 26.9124, lng: 75.7873 },
  { id: 'd21', name: 'Amritsar', country: 'India', slug: 'amritsar', imageUrls: [placeholderImages.find(p => p.id === 'dest-amritsar')?.imageUrl || '', 'https://picsum.photos/seed/141/800/600', 'https://picsum.photos/seed/142/800/600'], lat: 31.6340, lng: 74.8723 },
  { id: 'd22', name: 'Varanasi', country: 'India', slug: 'varanasi', imageUrls: [placeholderImages.find(p => p.id === 'dest-varanasi')?.imageUrl || '', 'https://picsum.photos/seed/143/800/600', 'https://picsum.photos/seed/144/800/600'], lat: 25.3176, lng: 82.9739 },
  { id: 'd23', name: 'Seoul', country: 'South Korea', slug: 'seoul', imageUrls: [placeholderImages.find(p => p.id === 'dest-seoul')?.imageUrl || '', 'https://picsum.photos/seed/145/800/600', 'https://picsum.photos/seed/146/800/600'], lat: 37.5665, lng: 126.9780 },
  { id: 'd24', name: 'Bangkok', country: 'Thailand', slug: 'bangkok', imageUrls: [placeholderImages.find(p => p.id === 'dest-bangkok')?.imageUrl || '', 'https://picsum.photos/seed/147/800/600', 'https://picsum.photos/seed/148/800/600'], lat: 13.7563, lng: 100.5018 },
  { id: 'd25', name: 'Istanbul', country: 'Turkey', slug: 'istanbul', imageUrls: [placeholderImages.find(p => p.id === 'dest-istanbul')?.imageUrl || '', 'https://picsum.photos/seed/149/800/600', 'https://picsum.photos/seed/150/800/600'], lat: 41.0082, lng: 28.9784 },
  { id: 'd26', name: 'Prague', country: 'Czech Republic', slug: 'prague', imageUrls: [placeholderImages.find(p => p.id === 'dest-prague')?.imageUrl || '', 'https://picsum.photos/seed/151/800/600', 'https://picsum.photos/seed/152/800/600'], lat: 50.0755, lng: 14.4378 },
];

export const initialVideos: Video[] = [
  {
    id: 'v1',
    title: 'A Day at the Beach in Goa',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnailUrl: placeholderImages.find(p => p.id === 'video-thumb-1')?.imageUrl || '',
    source: 'direct',
    user: initialUsers[0],
    views: 15000,
    likes: 1200,
    comments: [
        { id: 'c1', user: initialUsers[1], text: 'Looks amazing!', createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
        { id: 'c2', user: initialUsers[0], text: 'It was the best trip!', createdAt: new Date(Date.now() - 1000 * 60 * 2).toISOString() },
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
    user: initialUsers[1],
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
    user: initialUsers[0],
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
    user: initialUsers[1],
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
    user: initialUsers[0],
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
    user: initialUsers[1],
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
    user: initialUsers[0],
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
    user: initialUsers[1],
    views: 12500,
    likes: 1100,
    comments: [],
    destination: destinations[2],
    category: 'Food',
    description: 'Tasting the delicious crepes and other street food delights in Paris.',
  }
];

export const stories: Story[] = [
    { id: 's1', user: initialUsers[1], imageUrl: 'https://images.unsplash.com/photo-1533106418989-87423dec6928?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHx0cmF2ZWwlJTIwc3Rvcnl8ZW58MHx8fHwxNzY4MTYyMjIyfDA&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: 's2', user: initialUsers[0], imageUrl: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHx0cmF2ZWwlJTIwYmVhY2h8ZW58MHx8fHwxNzY4MTYyMjM4fDA&ixlib=rb-4.1.0&q=80&w=1080', viewed: true },
    { id: 's3', user: initialUsers[2], imageUrl: 'https://images.unsplash.com/photo-1473625247510-8ceb1760943f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHx0cmF2ZWwlJTIwZm9yZXN0fGVufDB8fHx8MTc2ODE2MjI2MHww&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: 's4', user: initialUsers[3], imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHRyYXZlbHxlbnwwfHx8fDE3NjgyNDIxODB8MA&ixlib=rb-4.1.0&q=80&w=1080' },
];

export const shopItems: ShopItem[] = [
    {
        id: 'shop1',
        name: 'Travel Backpack',
        imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb68c6a62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNTkyMzN8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBiYWNrcGFja3xlbnwwfHx8fDE2OTE1MDY4ODd8MA&ixlib=rb-4.0.3&q=80&w=1080',
        productUrl: 'https://www.amazon.in/s?k=travel+backpack',
        price: '₹2,499',
        category: 'Physical'
    },
    {
        id: 'shop2',
        name: 'Hiking Boots',
        imageUrl: 'https://images.unsplash.com/photo-1599739482868-809c95d98c1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNTkyMzN8MHwxfHNlYXJjaHwxfHzoaWtpbmslMjBib290c3xlbnwwfHx8fDE2OTE1MDY5MTB8MA&ixlib=rb-4.0.3&q=80&w=1080',
        productUrl: 'https://www.amazon.in/s?k=hiking+boots',
        price: '₹4,999',
        category: 'Physical'
    },
    {
        id: 'shop3',
        name: 'Portable Tent',
        imageUrl: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNTkyMzN8MHwxfHNlYXJjaHwxfHxwb3J0YWJsZSUyMHRlbnR8ZW58MHx8fHwxNjkxNTA2OTMwfDA&ixlib=rb-4.0.3&q=80&w=1080',
        productUrl: 'https://www.amazon.in/s?k=portable+tent',
        price: '₹3,299',
        category: 'Physical'
    },
    {
        id: 'shop4',
        name: 'Travel Camera',
        imageUrl: 'https://images.unsplash.com/photo-1510127034890-ba27e982f636?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNTkyMzN8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBjYW1yYXxlbnwwfHx8fDE2OTE1MDY5NTF8MA&ixlib=rb-4.0.3&q=80&w=1080',
        productUrl: 'https://www.amazon.in/s?k=travel+camera',
        price: '₹45,990',
        category: 'Physical'
    },
    {
        id: 'shop5',
        name: 'Travel Pillow',
        imageUrl: 'https://images.unsplash.com/photo-1574763523473-51a8f9b9a5e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNTkyMzN8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBwaWxsb3d8ZW58MHx8fHwxNjkxNTA3MDA3fDA&ixlib=rb-4.0.3&q=80&w=1080',
        productUrl: 'https://www.amazon.in/s?k=travel+pillow',
        price: '₹799',
        category: 'Physical'
    },
    {
        id: 'shop6',
        name: 'Sunglasses',
        imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNTkyMzN8MHwxfHNlYXJjaHwxfHxzdW5nbGFzc2VzfGVufDB8fHx8MTY5MTUwNzAzMnww&ixlib=rb-4.0.3&q=80&w=1080',
        productUrl: 'https://www.amazon.in/s?k=sunglasses',
        price: '₹1,499',
        category: 'Physical'
    },
];
