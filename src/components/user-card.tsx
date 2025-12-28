
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import type { User } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { useVideoStore } from '@/hooks/use-video-store';
import { useTranslation } from '@/context/language-context';

interface UserCardProps {
  user: User;
  className?: string;
}

export function UserCard({ user, className }: UserCardProps) {
  const { isFollowing, toggleFollow } = useVideoStore();
  const { t } = useTranslation();
  const following = isFollowing(user.id);

  return (
    <Card className={cn("text-center p-4 flex flex-col items-center", className)}>
        <Link href={`/profile/${user.id}`} className="flex flex-col items-center">
            <Avatar className="w-20 h-20 mb-2">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h3 className="font-bold text-lg truncate w-full">{user.name}</h3>
            <p className="text-sm text-muted-foreground truncate w-full">@{user.username}</p>
        </Link>
         <Button 
            className={cn("w-full mt-4", following ? "bg-secondary text-secondary-foreground hover:bg-secondary/80" : "bg-primary text-primary-foreground hover:bg-primary/90")}
            onClick={() => toggleFollow(user.id)}
        >
            {following ? t('following') : t('follow')}
        </Button>
    </Card>
  );
}
