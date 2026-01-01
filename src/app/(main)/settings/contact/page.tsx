
"use client";

import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/context/language-context';
import { ChevronLeft, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function ContactUsPage() {
  const { t } = useTranslation();

  return (
    <>
      <PageHeader title={t('contact_us_title')}>
        <Button variant="ghost" size="icon" asChild>
          <Link href="/settings">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
      </PageHeader>
      <div className="container max-w-4xl py-8">
        <div className="prose dark:prose-invert max-w-none">
          <p>{t('contact_us_p1')}</p>
          
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-4">
                <Mail className="h-6 w-6 text-primary" />
                <div>
                    <h3 className="font-semibold">{t('email_label')}</h3>
                    <a href="mailto:support@bharatyatra.com" className="text-primary hover:underline">support@bharatyatra.com</a>
                </div>
            </div>
             <div className="flex items-center gap-4">
                <Phone className="h-6 w-6 text-primary" />
                <div>
                    <h3 className="font-semibold">{t('phone_label')}</h3>
                    <p>+91-123-456-7890</p>
                </div>
            </div>
             <div className="flex items-center gap-4">
                <MapPin className="h-6 w-6 text-primary" />
                <div>
                    <h3 className="font-semibold">{t('address_label')}</h3>
                    <p>123 Travel Lane, New Delhi, India</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
