
"use client";

import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/context/language-context';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function DisclaimerPage() {
  const { t } = useTranslation();

  return (
    <>
      <PageHeader title={t('disclaimer_title')}>
        <Button variant="ghost" size="icon" asChild>
          <Link href="/settings">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
      </PageHeader>
      <main className="container max-w-4xl py-8">
        <div className="prose dark:prose-invert max-w-none">
          <p><strong>{t('last_updated_label')}:</strong> August 1, 2024</p>

          <h3>{t('general_information_title')}</h3>
          <p>{t('disclaimer_p1')}</p>

          <h3>{t('external_links_disclaimer_title')}</h3>
          <p>{t('disclaimer_p2')}</p>
          
          <h3>{t('views_expressed_disclaimer_title')}</h3>
          <p>{t('disclaimer_p3')}</p>

          <h3>{t('no_responsibility_disclaimer_title')}</h3>
          <p>{t('disclaimer_p4')}</p>
        </div>
      </main>
    </>
  );
}
