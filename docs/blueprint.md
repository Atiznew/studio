# **App Name**: Travel Tales

## Core Features:

- Video Feed: Display a feed of the latest and trending travel videos, with auto-play (muted).
- Reels: Mobile-style full-screen vertical video feed with swipe-up navigation.
- Video Upload: Allow users to upload videos via YouTube link or direct upload (Firebase Storage).
- Destination Pages: Display destination cards with images and place names, linking to videos for each destination.
- User Profiles: Display user profiles with photo, name, video stats, and uploaded video grid.
- Login/Signup: Authentication via Email/Password and Google Login.
- Data storage: Use Firebase Storage to save videos directly, and save Youtube URL to Firestore. All of that will be handled via an upload queue function tool that will decide when to schedule upload processes to the storage and to update information inside of the database.

## Style Guidelines:

- Primary color: A vibrant blue (#29ABE2) to evoke a sense of adventure and travel.
- Background color: A light, desaturated blue (#E5F5F9) to keep the focus on content.
- Accent color: An analogous, bright purple (#7B68EE), for interactive elements such as buttons.
- Body and headline font: 'PT Sans', a humanist sans-serif, which will be used both for headlines and body.
- Simple, clear icons for navigation and actions.
- Clean and intuitive layout with a focus on visual content. Use of cards for destinations.
- Subtle animations for transitions and loading states.