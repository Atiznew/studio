
'use client';

import { useState } from 'react';
import { useVideoStore } from '@/hooks/use-video-store';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useTranslation } from '@/context/language-context';
import { useHydrated } from '@/hooks/use-hydrated';
import Link from 'next/link';

export function CommentSheet() {
  const { isCommentSheetOpen, closeCommentSheet, activeVideoId, videos, addComment, currentUser } = useVideoStore();
  const { t } = useTranslation();
  const [newComment, setNewComment] = useState('');
  const isHydrated = useHydrated();

  const activeVideo = videos.find(v => v.id === activeVideoId);

  const handleAddComment = () => {
    if (newComment.trim() && activeVideoId && currentUser) {
      addComment(activeVideoId, newComment.trim());
      setNewComment('');
    }
  };

  const onOpenChange = (open: boolean) => {
    if (!open) {
      closeCommentSheet();
    }
  };

  return (
    <Sheet open={isCommentSheetOpen} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[80vh] flex flex-col rounded-t-lg">
        <SheetHeader>
          <SheetTitle className="text-center">
            {activeVideo?.comments?.length || 0} {t('comments')}
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex-1 my-4">
          <div className="px-4 space-y-4">
            {activeVideo?.comments && activeVideo.comments.length > 0 ? (
              activeVideo.comments.map((comment) => (
                <div key={comment.id} className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.user.avatarUrl} alt={comment.user.name} />
                    <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{comment.user.name}</p>
                    <p className="text-sm">{comment.text}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-8">{t('no_comments_yet')}</p>
            )}
          </div>
        </ScrollArea>
        <div className="p-4 border-t">
          {currentUser ? (
            <div className="flex items-center gap-2">
              <Avatar className="h-9 w-9">
                <AvatarImage src={currentUser.avatarUrl} />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <Input
                placeholder={isHydrated ? t('add_a_comment') : ''}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                className="rounded-full"
              />
              <Button onClick={handleAddComment} size="icon" disabled={!newComment.trim()} className="rounded-full">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          ) : (
             <p className="text-center text-sm text-muted-foreground">
               <Link href="/login" className="text-primary underline">Login</Link> to add a comment.
            </p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
