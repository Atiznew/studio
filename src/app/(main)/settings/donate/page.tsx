
"use client";

import { useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/context/language-context';
import { ChevronLeft, Copy, Mail } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { placeholderImages } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const TelegramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
);

const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M16.75 13.96c.25.13.43.2.5.28.08.08.13.18.15.3.03.12.03.6-.08 1.17-.1.56-.6 1.08-1.13 1.28-.54.2-1.1.25-1.73.13-.63-.13-1.43-.5-2.63-1.45-1.45-1.15-2.5-2.5-2.73-2.95-.23-.45-.48-.95-.48-1.48 0-.53.23-.95.45-1.2.23-.23.5-.4.7-.5.2-.1.4-.13.58-.13.18 0 .35.03.5.1.15.08.35.3.5.55.15.25.23.5.3.7.08.2.05.4-.03.55-.08.15-.2.28-.3.35-.1.08-.2.13-.25.2-.05.05-.1.1-.1.15s0 .13.03.18c.02.05.08.15.15.25.2.25.43.5.78.8.45.4.8.7.93.83.13.13.2.2.28.23.08.05.15.03.2 0 .05-.03.25-.1.48-.23.23-.13.4-.2.5-.23.1-.03.18-.03.25 0 .08.03.13.2.18.35.05.15.08.3.08.45 0 .15-.03.3-.08.4-.05.1-.13.18-.23.25zM12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z"/></svg>
);

export default function DonatePage() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const upiId = "karanroy2025@upi";
  const internationalEmail = "bugnuroy@gmail.com";

  const handleCopy = (text: string, type: 'UPI' | 'email') => {
    navigator.clipboard.writeText(text);
    toast({
      title: type === 'UPI' ? t('upi_id_copied_title') : t('email_copied_title'),
      description: type === 'UPI' ? t('upi_id_copied_description') : t('email_copied_description'),
    });
  };


  return (
    <>
      <PageHeader title={t('support_us')}>
        <Button variant="ghost" size="icon" asChild>
          <Link href="/settings">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
      </PageHeader>
      <main className="container max-w-2xl py-8">
        <div className="flex flex-col items-center text-center gap-8">
            <p className="text-muted-foreground">{t('donate_description')}</p>

            <div className="w-full space-y-4">
                 <h3 className="font-bold text-lg">{t('join_us')}</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button asChild size="lg">
                        <Link href="https://t.me/gamesupportdonate" target="_blank" rel="noopener noreferrer">
                            <TelegramIcon />
                            <span>Telegram</span>
                        </Link>
                    </Button>
                    <Button asChild size="lg" variant="secondary">
                         <Link href="https://chat.whatsapp.com/Ejl8ykQgDjVGpXwdWyYkOh" target="_blank" rel="noopener noreferrer">
                            <WhatsAppIcon />
                            <span>WhatsApp</span>
                        </Link>
                    </Button>
                 </div>
            </div>

            <Separator />

            <div className="w-full space-y-4">
                <h3 className="font-bold text-lg">{t('upi_donate_title')}</h3>
                <div className="flex items-center space-x-2">
                    <Input value={upiId} readOnly className="text-center"/>
                    <Button variant="outline" size="icon" onClick={() => handleCopy(upiId, 'UPI')}>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <Separator />
            
            <div className="w-full space-y-4">
                <h3 className="font-bold text-lg">{t('for_international_users')}</h3>
                <p className="text-sm text-muted-foreground">{t('international_donation_description')}</p>
                <div className="flex items-center space-x-2">
                    <Input value={internationalEmail} readOnly className="text-center"/>
                    <Button variant="outline" size="icon" onClick={() => handleCopy(internationalEmail, 'email')}>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
            </div>

        </div>
      </main>
    </>
  );
}
