
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
  name: z.string().min(2, "Name must be at least 2 characters."),
  bio: z.string().max(160, "Bio cannot be longer than 160 characters.").optional(),
});

type EditProfileFormValues = z.infer<typeof formSchema>;

export default function EditProfilePage() {
  const { toast } = useToast();
  const { t } = useTranslation();
  const router = useRouter();
  const { users, updateCurrentUser } = useVideoStore();
  const currentUser = users[0];
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<EditProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: currentUser.name,
      bio: currentUser.bio || "",
    },
  });

  const onSubmit = (data: EditProfileFormValues) => {
    setIsSubmitting(true);
    try {
      updateCurrentUser(data.name, data.bio || "");
      toast({
        title: t('profile_update_success'),
      });
      router.push('/profile');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: t('profile_update_error'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageHeader title={t('edit_profile_title')}>
        <Button variant="ghost" size="icon" asChild>
          <Link href="/profile">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
      </PageHeader>
      <div className="container max-w-2xl py-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('name_label')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('name_placeholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('bio_label')}</FormLabel>
                  <FormControl>
                    <Textarea placeholder={t('bio_placeholder')} className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? t('saving_button') : t('save_changes_button')}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
