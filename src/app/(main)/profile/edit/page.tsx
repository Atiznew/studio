
"use client";

import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useVideoStore } from '@/hooks/use-video-store';
import { useTranslation } from '@/context/language-context';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useHydrated } from '@/hooks/use-hydrated';

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  username: z.string().min(3, "Username must be at least 3 characters.").regex(/^[a-z0-9_.]+$/, "Username can only contain lowercase letters, numbers, underscores, and periods."),
  website: z.string().url("Please enter a valid URL.").optional().or(z.literal('')),
  bio: z.string().max(160, "Bio cannot be longer than 160 characters.").optional(),
  avatarUrl: z.string().optional(),
});

type EditProfileFormValues = z.infer<typeof formSchema>;

export default function EditProfilePage() {
  const { toast } = useToast();
  const { t } = useTranslation();
  const router = useRouter();
  const { currentUser, updateCurrentUser } = useVideoStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isHydrated = useHydrated();

  useEffect(() => {
    if (isHydrated && !currentUser) {
      router.push('/login');
    }
    if (currentUser) {
      setAvatarPreview(currentUser.avatarUrl);
    }
  }, [currentUser, router, isHydrated]);

  const form = useForm<EditProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: currentUser ? {
      name: currentUser.name,
      username: currentUser.username,
      website: currentUser.website || "",
      bio: currentUser.bio || "",
      avatarUrl: currentUser.avatarUrl,
    } : {},
  });

   useEffect(() => {
    if (currentUser) {
      form.reset({
        name: currentUser.name,
        username: currentUser.username,
        website: currentUser.website || '',
        bio: currentUser.bio || '',
        avatarUrl: currentUser.avatarUrl,
      });
    }
  }, [currentUser, form]);

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setAvatarPreview(result);
        form.setValue('avatarUrl', result);
      };
      reader.readAsDataURL(file);
    }
  };


  const onSubmit = (data: EditProfileFormValues) => {
    setIsSubmitting(true);
    try {
      updateCurrentUser(data);
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
  
  if (!isHydrated || !currentUser) {
    return null; // Or a loading spinner
  }

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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={avatarPreview || ''} alt={currentUser.name} />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
               <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleAvatarChange} 
                className="hidden" 
                accept="image/png, image/jpeg"
              />
              <Button type="button" variant="link" onClick={() => fileInputRef.current?.click()}>
                Change Photo
              </Button>
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('name_label')}</FormLabel>
                  <FormControl>
                    <Input placeholder={isHydrated ? t('name_placeholder') : ''} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('username_label')}</FormLabel>
                  <FormControl>
                    <Input placeholder={isHydrated ? t('username_placeholder') : ''} {...field} />
                  </FormControl>
                  <FormDescription>
                    {t('username_description')}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

             <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('website_label')}</FormLabel>
                  <FormControl>
                    <Input placeholder={isHydrated ? t('website_placeholder') : ''} {...field} />
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
                    <Textarea placeholder={isHydrated ? t('bio_placeholder') : ''} className="resize-none" rows={4} {...field} />
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
