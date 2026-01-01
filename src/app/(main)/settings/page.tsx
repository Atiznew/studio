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
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useVideoStore } from '@/hooks/use-video-store';

export default function SettingsPage() {
  const { language, setLanguage, t } = useTranslation();
  const { theme, setTheme } = useTheme();
  const { currentUser } = useVideoStore();
  const directUploadAuthorizedUsers = ['u1']; 
  const hasDirectUploadAccess = currentUser ? directUploadAuthorizedUsers.includes(currentUser.id) : false;


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
        <div className="space-y-8">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">{t('language')}</h3>
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
            <h3 className="text-lg font-medium">{t('theme')}</h3>
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
             <h3 className="text-lg font-medium">{t('direct_upload_access_title')}</h3>
             <p className="text-sm text-muted-foreground mb-4">
              {t('direct_upload_access_description')}
            </p>
            {hasDirectUploadAccess ? (
              <Card className="bg-green-100/50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                <CardHeader>
                  <CardTitle className="text-green-800 dark:text-green-300">{t('access_granted_title')}</CardTitle>
                  <CardDescription className="text-green-700 dark:text-green-400">
                    {t('access_granted_description')}
                  </CardDescription>
                </CardHeader>
              </Card>
            ) : (
              <Link href="/settings/apply-direct-upload" className="block">
                <Card className="hover:bg-accent/50 transition-colors">
                    <div className="p-4 flex items-center justify-between">
                        <div>
                            <p className="font-semibold">{t('apply_for_access_button')}</p>
                            <p className="text-sm text-muted-foreground">{t('apply_for_access_description')}</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                </Card>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
