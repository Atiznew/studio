
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
import { CheckCircle, Link2, Youtube, Instagram, AlertTriangle, ChevronRight, Heart } from 'lucide-react';
import { VideoCategory, Video } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useVideoStore } from '@/hooks/use-video-store';
import { useTranslation } from '@/context/language-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { VideoCard } from '@/components/video-card';
import dynamic from 'next/dynamic';
import { useHydrated } from '@/hooks/use-hydrated';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

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

export default function UploadPage() {
  const { toast } = useToast();
  const { t } = useTranslation();
  const router = useRouter();
  const { currentUser, addVideo, videos } = useVideoStore((state) => ({ currentUser: state.currentUser, addVideo: state.addVideo, videos: state.videos }));
  
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [recentVideo, setRecentVideo] = useState<Video | null>(null);
  const [videoUrlPreview, setVideoUrlPreview] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const isHydrated = useHydrated();

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

  useEffect(() => {
    if (videoUrlPreview) {
        setShowPreview(true);
    } else {
        setShowPreview(false);
    }
  }, [videoUrlPreview]);
  
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
    setRecentVideo(null);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => (prev >= 95 ? prev : prev + 10));
    }, 300);

    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);
      setTimeout(() => {
        const newVideo = addVideo({
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
        
        setRecentVideo(newVideo);
        form.reset();
        setVideoUrlPreview('');
        setShowPreview(false);
      }, 500);
    }, 3500);
  };
  
   if (!isHydrated) {
    return null;
  }
  
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
                         <Link href="/signup">Sign Up</Link>
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
                                    placeholder={isHydrated ? t('video_url_placeholder') : ''}
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        setUploadComplete(false);
                                        setRecentVideo(null);
                                        setVideoUrlPreview(e.target.value);
                                    }}
                                />
                            </FormControl>
                        </div>
                       <FormMessage />
                    </FormItem>
                  )}
                />

                {showPreview && videoUrlPreview && (
                  <div className="aspect-video w-full rounded-lg overflow-hidden border bg-black">
                     <ReactPlayer
                        url={videoUrlPreview}
                        width="100%"
                        height="100%"
                        controls={true}
                        light={true}
                        onError={() => setShowPreview(false)}
                     />
                  </div>
                )}

                <div className="border-t border-b border-border/50 divide-y divide-border/50">
                    <Button variant="ghost" asChild className="w-full justify-between">
                      <Link href="/settings/apply-direct-upload">
                        {t('apply_for_direct_upload')}
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                     <Button variant="ghost" asChild className="w-full justify-between">
                      <Link href="/settings/donate">
                          <span className="flex items-center gap-2">{t('donate_title')} <Heart className="h-4 w-4 text-red-500"/></span>
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
                      <Input placeholder={isHydrated ? t('video_title_placeholder') : ''} {...field} />
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
                        <Input placeholder={isHydrated ? t('country_placeholder') : ''} {...field} />
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
                        <Input placeholder={isHydrated ? t('state_province_placeholder') : ''} {...field} />
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
                        <Input placeholder={isHydrated ? t('place_city_placeholder') : ''} {...field} />
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
                          <SelectValue placeholder={isHydrated ? t('select_category_placeholder') : ''} />
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
                      <Textarea placeholder={isHydrated ? t('description_placeholder') : ''} className="resize-none" {...field} />
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

              {uploadComplete && recentVideo && (
                <div className="mt-8">
                    <h2 className="text-lg font-bold mb-4">Recently Uploaded</h2>
                    <VideoCard video={recentVideo} />
                </div>
              )}
            </form>
          </Form>
      </div>
    </>
  );
}
