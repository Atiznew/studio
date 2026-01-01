
"use client";

import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Link2, Youtube, Instagram, AlertTriangle, ChevronRight } from 'lucide-react';
import { VideoCategory } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useVideoStore } from '@/hooks/use-video-store';
import { useTranslation } from '@/context/language-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


const categories: VideoCategory[] = ["Beach", "Mountain", "City", "Religious", "Food", "Amusement Park", "Forest", "Tropical", "Camping", "Other"];

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  country: z.string().min(2, "Country is required."),
  state: z.string().min(2, "State is required."),
  place: z.string().min(2, "Place is required."),
  category: z.enum(["Beach", "Mountain", "City", "Religious", "Food", "Amusement Park", "Forest", "Tropical", "Camping", "Other"]),
  description: z.string().min(10, "Description must be at least 10 characters.").max(500),
  videoUrl: z.string().url("Please enter a valid URL.").min(1, 'Please paste a video URL.'),
});

type UploadFormValues = z.infer<typeof formSchema>;

const TelegramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
);


export default function UploadPage() {
  const { toast } = useToast();
  const { t } = useTranslation();
  const router = useRouter();
  const { currentUser, addVideo } = useVideoStore();
  
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [urlSource, setUrlSource] = useState<'youtube' | 'instagram' | 'telegram' | 'url' | null>(null);


  const form = useForm<UploadFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      country: "",
      state: "",
      place: "",
      category: "Other",
      description: "",
      videoUrl: "",
    },
  });

  const videoUrlValue = form.watch('videoUrl');

  useEffect(() => {
    if (videoUrlValue) {
        if (videoUrlValue.includes('youtube.com') || videoUrlValue.includes('youtu.be')) {
            setUrlSource('youtube');
        } else if (videoUrlValue.includes('instagram.com')) {
            setUrlSource('instagram');
        } else if (videoUrlValue.includes('t.me')) {
            setUrlSource('telegram');
        } else {
            setUrlSource('url');
        }
    } else {
        setUrlSource(null);
    }
  }, [videoUrlValue]);
  
  const onSubmit = (data: UploadFormValues) => {
    let sourceType: 'youtube' | 'instagram' | 'telegram' | 'url' = 'url';
    const sourceUrl = data.videoUrl;

    if (sourceUrl.includes('youtube.com') || sourceUrl.includes('youtu.be')) {
        sourceType = 'youtube';
    } else if (sourceUrl.includes('instagram.com')) {
        sourceType = 'instagram';
    } else if (sourceUrl.includes('t.me')) {
        sourceType = 'telegram';
    }
    
    setIsUploading(true);
    setUploadComplete(false);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => (prev >= 95 ? prev : prev + 10));
    }, 300);

    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);
      setTimeout(() => {
        addVideo({
            ...data,
            source: sourceType,
            videoUrl: sourceUrl
        });

        setIsUploading(false);
        setUploadComplete(true);
        toast({
          title: t('upload_complete_message'),
          description: "Your video has been submitted for processing.",
        });
        form.reset();
      }, 500);
    }, 3500);
  };
  
   if (!currentUser) {
    return (
      <>
        <PageHeader title={t('share_experience_page_title')} />
        <div className="container max-w-2xl py-8 text-center">
            <div className="flex flex-col items-center gap-4 p-8 border rounded-lg bg-card">
                 <AlertTriangle className="h-12 w-12 text-destructive" />
                <h2 className="text-2xl font-bold">Authentication Required</h2>
                <p className="text-muted-foreground">You need to be logged in to share your experience.</p>
                <div className="flex gap-4 mt-4">
                    <Button asChild>
                        <Link href="/login">Login</Link>
                    </Button>
                    <Button variant="outline" asChild>
                         <Link href="/login">Sign Up</Link>
                    </Button>
                </div>
            </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader title={t('share_experience_page_title')} />
      <div className="container max-w-2xl py-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-6">
                <FormField
                  control={form.control}
                  name="videoUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('video_url_label')}</FormLabel>
                        <div className="relative">
                            <FormControl>
                                <Input 
                                    placeholder={t('video_url_placeholder')} 
                                    {...field} 
                                    className={cn(urlSource && 'pl-10')}
                                />
                            </FormControl>
                            {urlSource && (
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                    {urlSource === 'youtube' && <Youtube className="h-5 w-5 text-red-500" />}
                                    {urlSource === 'instagram' && <Instagram className="h-5 w-5 text-pink-500" />}
                                    {urlSource === 'telegram' && <TelegramIcon />}
                                    {urlSource === 'url' && <Link2 className="h-5 w-5" />}
                                </div>
                            )}
                        </div>
                       <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="border-t border-b border-border/50 py-4">
                    <Button variant="ghost" asChild className="w-full justify-between">
                      <Link href="/settings/apply-direct-upload">
                        {t('apply_for_direct_upload')}
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                </div>

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                        <FormLabel>{t('video_title_label')}</FormLabel>
                    </div>
                    <FormControl>
                      <Input placeholder={t('video_title_placeholder')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('country_label')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('country_placeholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('state_province_label')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('state_province_placeholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="place"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('place_city_label')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('place_city_placeholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('category_label')}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('select_category_placeholder')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map(category => (
                           <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                        <FormLabel>{t('description_label')}</FormLabel>
                    </div>
                    <FormControl>
                      <Textarea placeholder={t('description_placeholder')} className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {isUploading && (
                <div className="space-y-2">
                    <p className="text-sm font-medium">{t('uploading_progress')}</p>
                    <Progress value={uploadProgress} />
                </div>
              )}

              {uploadComplete && (
                <div className="flex items-center p-4 text-sm text-green-800 rounded-lg bg-green-100 dark:bg-gray-800 dark:text-green-400" role="alert">
                    <CheckCircle className="flex-shrink-0 inline w-4 h-4 mr-3"/>
                    <span className="font-medium">{t('upload_complete_message')}</span>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isUploading}>
                {isUploading ? t('uploading_progress') : t('share_experience_button')}
              </Button>
            </form>
          </Form>
      </div>
    </>
  );
}
