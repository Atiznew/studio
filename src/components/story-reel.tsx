
'use client';

import { stories, currentUser } from '@/lib/data';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useTranslation } from '@/context/language-context';

export function StoryReel() {
  const { t } = useTranslation();
  return (
    <div>
      <h2 className="text-xl font-bold mb-3 font-headline">{t('stories')}</h2>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex w-max space-x-4 pb-2">
          {/* Add Story */}
          <Link href="#" className="flex flex-col items-center gap-1 w-20">
             <div className="relative">
                <Avatar className="h-16 w-16 border-2 border-dashed border-muted-foreground">
                    <AvatarImage src={currentUser.avatarUrl} alt="Your Story" />
                    <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-0.5 text-primary-foreground">
                    <Plus className="h-4 w-4" />
                </div>
            </div>
            <p className="text-xs text-center truncate w-full">{t('your_story')}</p>
          </Link>
          {/* Friend Stories */}
          {stories.map((story) => (
            <Link href="#" key={story.id} className="flex flex-col items-center gap-1 w-20">
              <Avatar className={cn(
                "h-16 w-16 p-[2px] bg-gradient-to-tr",
                story.viewed ? "from-muted to-muted" : "from-yellow-400 to-pink-500"
              )}>
                <div className="bg-background rounded-full p-[2px]">
                    <AvatarImage src={story.user.avatarUrl} alt={story.user.name} />
                    <AvatarFallback>{story.user.name.charAt(0)}</AvatarFallback>
                </div>
              </Avatar>
              <p className="text-xs text-center truncate w-full">{story.user.name}</p>
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
