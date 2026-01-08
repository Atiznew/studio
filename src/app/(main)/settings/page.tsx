
'use client';

import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useTranslation } from '@/context/language-context';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '@/context/theme-context';
import { Separator } from '@/components/ui/separator';

export default function SettingsPage() {
  const { language, setLanguage, t } = useTranslation();
  const { theme, setTheme } = useTheme();

  return (
    <>
      <PageHeader title={t('settings_title')}>
        <Button variant="ghost" size="icon" asChild>
          <Link href="/profile">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
      </PageHeader>
      <main className="container max-w-2xl py-8">
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-lg font-medium">{t('language')}</h2>
            <p className="text-sm text-muted-foreground">
              {t('language_description')}
            </p>
            <RadioGroup
              value={language}
              onValueChange={(value) => setLanguage(value as 'en' | 'hi')}
              className="pt-2 space-y-2"
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

          <Separator />

          <div className="space-y-2">
            <h2 className="text-lg font-medium">{t('theme')}</h2>
            <p className="text-sm text-muted-foreground">
              {t('theme_description')}
            </p>
            <RadioGroup
              value={theme}
              onValueChange={(value) => setTheme(value as 'light' | 'dark' | 'system')}
              className="pt-2 space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="light" id="light" />
                <Label htmlFor="light">{t('light')}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dark" id="dark" />
                <Label htmlFor="dark">{t('dark')}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="system" id="system" />
                <Label htmlFor="system">{t('system')}</Label>
              </div>
            </RadioGroup>
          </div>
           <Separator />
            <div>
                <h2 className="text-lg font-medium mb-2">{t('support_us')}</h2>
                 <div className="rounded-md border bg-card">
                    <Button variant="ghost" asChild className="w-full justify-between">
                        <Link href="/settings/donate">
                            <span>{t('donate_title')}</span>
                            <ChevronRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
           <Separator />
            <div>
                <h2 className="text-lg font-medium mb-2">{t('more_information_title')}</h2>
                <div className="rounded-md border bg-card">
                    <Button variant="ghost" asChild className="w-full justify-between">
                        <Link href="/settings/about">
                            <span>{t('about_us_title')}</span>
                            <ChevronRight className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Separator />
                    <Button variant="ghost" asChild className="w-full justify-between">
                        <Link href="/settings/contact">
                            <span>{t('contact_us_title')}</span>
                            <ChevronRight className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Separator />
                    <Button variant="ghost" asChild className="w-full justify-between">
                        <Link href="/settings/privacy">
                            <span>{t('privacy_policy_title')}</span>
                            <ChevronRight className="h-4 w-4" />
                        </Link>
                    </Button>
                     <Separator />
                    <Button variant="ghost" asChild className="w-full justify-between">
                        <Link href="/settings/disclaimer">
                            <span>{t('disclaimer_title')}</span>
                            <ChevronRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
      </main>
    </>
  );
}
