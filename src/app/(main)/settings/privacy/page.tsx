
"use client";

import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/context/language-context';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  const { t } = useTranslation();

  return (
    <>
      <PageHeader title={t('privacy_policy_title')}>
        <Button variant="ghost" size="icon" asChild>
          <Link href="/settings">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
      </PageHeader>
      <div className="container max-w-4xl py-8">
        <div className="prose dark:prose-invert max-w-none">
          <p><strong>{t('last_updated_label')}:</strong> August 1, 2024</p>
          <p>{t('privacy_p1')}</p>

          <h3>{t('information_we_collect_title')}</h3>
          <p>{t('privacy_p2')}</p>
          <ul>
            <li>{t('privacy_l1')}</li>
            <li>{t('privacy_l2')}</li>
            <li>{t('privacy_l3')}</li>
          </ul>

          <h3>{t('how_we_use_information_title')}</h3>
          <p>{t('privacy_p3')}</p>

          <h3>{t('data_sharing_title')}</h3>
          <p>{t('privacy_p4')}</p>
          
          <h3>{t('your_choices_title')}</h3>
          <p>{t('privacy_p5')}</p>

          <h3>{t('contact_us_title')}</h3>
          <p>{t('privacy_p6')}</p>
        </div>
      </div>
    </>
  );
}
