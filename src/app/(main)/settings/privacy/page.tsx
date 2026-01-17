
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
      <main className="container max-w-4xl py-8">
        <div className="prose dark:prose-invert max-w-none">
          <p><strong>{t('last_updated_label')}:</strong> August 1, 2024</p>
          <p>{t('privacy.p1')}</p>

          <h3>{t('privacy.information_we_collect_title')}</h3>
          <p>{t('privacy.p2')}</p>
          <h4>{t('privacy.info_you_provide_title')}</h4>
          <ul>
            <li>{t('privacy.info_you_provide_l1')}</li>
            <li>{t('privacy.info_you_provide_l2')}</li>
            <li>{t('privacy.info_you_provide_l3')}</li>
          </ul>
          <h4>{t('privacy.info_we_collect_auto_title')}</h4>
           <ul>
            <li>{t('privacy.info_we_collect_auto_l1')}</li>
            <li>{t('privacy.info_we_collect_auto_l2')}</li>
          </ul>

          <h3>{t('privacy.how_we_use_information_title')}</h3>
          <p>{t('privacy.p3')}</p>
          <ul>
            <li>{t('privacy.how_we_use_information_l1')}</li>
            <li>{t('privacy.how_we_use_information_l2')}</li>
            <li>{t('privacy.how_we_use_information_l3')}</li>
          </ul>

          <h3>{t('privacy.data_sharing_title')}</h3>
          <p>{t('privacy.p4')}</p>
           <ul>
            <li>{t('privacy.data_sharing_l1')}</li>
            <li>{t('privacy.data_sharing_l2')}</li>
            <li>{t('privacy.data_sharing_l3')}</li>
          </ul>
          
          <h3>{t('privacy.your_choices_title')}</h3>
          <p>{t('privacy.p5')}</p>
          <ul>
              <li>{t('privacy.your_choices_l1')}</li>
              <li>{t('privacy.your_choices_l2')}</li>
          </ul>

          <h3>{t('privacy.data_security_title')}</h3>
          <p>{t('privacy.p6')}</p>

          <h3>{t('privacy.childrens_privacy_title')}</h3>
          <p>{t('privacy.p7')}</p>

          <h3>{t('privacy.changes_title')}</h3>
          <p>{t('privacy.p8')}</p>

          <h3>{t('contact_us_title')}</h3>
          <p>{t('privacy.p9')}</p>
        </div>
      </main>
    </>
  );
}
