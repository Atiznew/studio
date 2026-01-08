
"use client";

import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft, Users } from 'lucide-react';
import { useVideoStore } from '@/hooks/use-video-store';
import { useTranslation } from '@/context/language-context';
import { UserCard } from '@/components/user-card';

export default function DiscoverPeoplePage() {
  const { t } = useTranslation();
  const { users, currentUser } = useVideoStore();

  // Exclude current user and users already being followed
  const suggestedUsers = users.filter(user => user.id !== currentUser?.id);

  return (
    <>
      <PageHeader title={t('discover_people_title')}>
        <Button variant="ghost" size="icon" asChild>
          <Link href="/profile">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
      </PageHeader>
      <main className="container max-w-4xl mx-auto py-8">
        {suggestedUsers.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {suggestedUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Users className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">{t('no_suggestions_title')}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{t('no_suggestions_description')}</p>
          </div>
        )}
      </main>
    </>
  );
}
