
"use client";

import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/context/language-context';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function AboutUsPage() {
  const { t } = useTranslation();

  return (
    <>
      <PageHeader title={t('about_us_title')}>
        <Button variant="ghost" size="icon" asChild>
          <Link href="/settings">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
      </PageHeader>
      <div className="container max-w-4xl py-8">
        <div className="prose dark:prose-invert max-w-none">
          <h2>{t('about_us_subtitle')}</h2>
          <p>{t('about_us_p1')}</p>
          <p>{t('about_us_p2')}</p>

          <h3>{t('our_mission_title')}</h3>
          <p>{t('our_mission_p1')}</p>

          <h3>{t('our_vision_title')}</h3>
          <p>{t('our_vision_p1')}</p>
        </div>
      </div>
    </>
  );
}
