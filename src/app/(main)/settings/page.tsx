'use client';

import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useTranslation } from '@/context/language-context';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function SettingsPage() {
  const { language, setLanguage, t } = useTranslation();

  return (
    <>
      <PageHeader title={t('settings_title')}>
        <Button variant="ghost" size="icon" asChild>
          <Link href="/profile">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
      </PageHeader>
      <div className="container max-w-2xl py-8">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">{t('language')}</h3>
            <p className="text-sm text-muted-foreground">
              {t('language_description')}
            </p>
          </div>
          <RadioGroup
            value={language}
            onValueChange={(value) => setLanguage(value as 'en' | 'hi')}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="en" id="en" />
              <Label htmlFor="en">English</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="hi" id="hi" />
              <Label htmlFor="hi">हिंदी (Hindi)</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </>
  );
}
