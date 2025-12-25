'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { VideoCard } from '@/components/video-card';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { useVideoStore } from '@/hooks/use-video-store';

export default function SearchPage() {
  const { videos } = useVideoStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(videos);

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setSearchResults(videos);
      return;
    }
    const results = videos.filter(video =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults(videos);
  };

  return (
    <>
      <PageHeader title="Search">
         <Button variant="ghost" size="icon" asChild>
            <Link href="/home">
                <ChevronLeft className="h-5 w-5" />
            </Link>
        </Button>
      </PageHeader>
      <div className="container max-w-4xl mx-auto py-8">
        <div className="flex w-full items-center space-x-2 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for videos, destinations, or users..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            {searchTerm && (
                <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" onClick={clearSearch}>
                    <X className="h-4 w-4" />
                </Button>
            )}
          </div>
          <Button onClick={handleSearch}>Search</Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
            {searchResults.length > 0 ? (
                searchResults.map(video => (
                    <VideoCard key={video.id} video={video} />
                ))
            ) : (
                <div className="text-center md:col-span-2 text-muted-foreground">
                    <p className="font-bold text-lg">No results found</p>
                    <p>Try searching for something else.</p>
                </div>
            )}
        </div>
      </div>
    </>
  );
}
