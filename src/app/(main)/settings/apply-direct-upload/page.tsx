
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';

import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useVideoStore } from '@/hooks/use-video-store';
import { useTranslation } from '@/context/language-context';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

const formSchema = z.object({
  name: z.string().min(2, "Name is required."),
  email: z.string().email("Please enter a valid email."),
  reason: z.string().min(50, "Please provide a detailed reason (at least 50 characters)."),
});

type ApplyFormValues = z.infer<typeof formSchema>;

export default function ApplyDirectUploadPage() {
  const { toast } = useToast();
  const { t } = useTranslation();
  const router = useRouter();
  const { currentUser } = useVideoStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ApplyFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: currentUser?.name || '',
      email: '', // Assuming user email is not in the store, if it is, use it.
      reason: '',
    },
  });

  const onSubmit = (data: ApplyFormValues) => {
    setIsSubmitting(true);
    console.log("Direct Upload Application:", data);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: t('application_submitted_title'),
        description: t('application_submitted_description'),
      });
      router.push('/settings');
    }, 1500);
  };
  
  if (!currentUser) {
    // Or a loading spinner, or redirect
    return (
      <div className="container max-w-2xl py-8 text-center">
          <p>{t('login_prompt')}</p>
          <Button asChild className="mt-4">
              <Link href="/login">{t('login_title')}</Link>
          </Button>
      </div>
    );
  }

  return (
    <>
      <PageHeader title={t('apply_direct_upload_title')}>
        <Button variant="ghost" size="icon" asChild>
          <Link href="/settings">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
      </PageHeader>
      <div className="container max-w-2xl py-8">
        <p className="mb-6 text-muted-foreground">
          {t('apply_direct_upload_description')}
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('name_label')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('name_placeholder')} {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('email_label')}</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('why_access_label')}</FormLabel>
                  <FormControl>
                    <Textarea placeholder={t('why_access_placeholder')} className="resize-none" rows={6} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? t('submitting_button') : t('submit_application_button')}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
