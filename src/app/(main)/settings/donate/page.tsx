
"use client";

import { useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/context/language-context';
import { ChevronLeft, Copy } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { placeholderImages } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';

export default function DonatePage() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const qrCodeImage = placeholderImages.find(p => p.id === 'donation-qr');
  const [donationLink, setDonationLink] = useState('https://your-donation-link.com'); // Admin-controlled link

  const handleCopyLink = () => {
    navigator.clipboard.writeText(donationLink);
    toast({
      title: t('link_copied_title'),
    });
  };

  return (
    <>
      <PageHeader title={t('donate_title')}>
        <Button variant="ghost" size="icon" asChild>
          <Link href="/settings">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
      </PageHeader>
      <div className="container max-w-2xl py-8">
        <div className="flex flex-col items-center text-center">
            <p className="text-muted-foreground mb-6">{t('donate_description')}</p>

            {qrCodeImage && (
                <div className="p-4 border rounded-lg bg-card mb-6">
                    <Image
                        src={qrCodeImage.imageUrl}
                        alt="Donation QR Code"
                        width={250}
                        height={250}
                        data-ai-hint={qrCodeImage.imageHint}
                    />
                </div>
            )}
            
            <div className="w-full max-w-sm space-y-2">
                <Label htmlFor="donation-link" className="text-sm text-muted-foreground">{t('or_use_link')}</Label>
                <div className="flex items-center space-x-2">
                    <Input id="donation-link" type="text" value={donationLink} readOnly />
                    <Button onClick={handleCopyLink} variant="outline" size="icon">
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
            </div>

        </div>
      </div>
    </>
  );
}
