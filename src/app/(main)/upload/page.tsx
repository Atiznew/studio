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
import { CheckCircle, Link2, Youtube, AlertTriangle, ChevronRight, Heart, UploadCloud, X } from 'lucide-react';
import { VideoCategory, Video, VideoSource } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useVideoStore } from '@/hooks/use-video-store';
import { useTranslation } from '@/context/language-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { VideoCard } from '@/components/video-card';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import ReactPlayer from 'react-player/lazy';
import { CountryCombobox } from '@/components/country-combobox';
import { indianStates } from '@/lib/indian-states';

const Player = dynamic(() => import('react-player/lazy'), { ssr: false });

const categories: VideoCategory[] = ["Beach", "Mountain", "City", "Religious", "Food", "Amusement Park", "Forest", "Tropical", "Camping", "Other"];

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  country: z.string().min(2, "Country is required."),
  state: z.string().min(2, "State is required."),
  place: z.string().min(2, "Place is required."),
  category: z.enum(["Beach", "Mountain", "City", "Religious", "Food", "Amusement Park", "Forest", "Tropical", "Camping", "Other"]),
  description: z.string().min(10, "Description must be at least 10 characters.").max(500),
  videoUrl: z.string().url("Please enter a valid URL.").min(1, 'Please paste a video URL.'),
  mapLink: z.string().url("Please enter a valid map URL.").optional().or(z.literal('')),
  thumbnail: z.custom<File>().optional(),
});

type UploadFormValues = z.infer<typeof formSchema>;

export default function UploadPage() {
  const { toast } = useToast();
  const { t } = useTranslation();
  const router = useRouter();
  const { currentUser, addVideo } = useVideoStore((state) => ({ currentUser: state.currentUser, addVideo: state.addVideo }));
  
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [recentVideo, setRecentVideo] = useState<Video | null>(null);
  const [videoUrlPreview, setVideoUrlPreview] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

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
      mapLink: "",
    },
  });

  const selectedCountry = form.watch('country');

  useEffect(() => {
    if (selectedCountry?.toLowerCase() !== 'india') {
      form.resetField('state');
    }
  }, [selectedCountry, form]);

  useEffect(() => {
    const videoUrl = form.watch('videoUrl');
    if (ReactPlayer.canPlay(videoUrl)) {
      setVideoUrlPreview(videoUrl);
      setShowPreview(true);
    } else {
      setShowPreview(false);
    }
  }, [form, form.watch('videoUrl')]);

  const fileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

   const handleThumbnailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue('thumbnail', file, { shouldValidate: true });
      const previewUrl = URL.createObjectURL(file);
      setThumbnailPreview(previewUrl);
    }
  };

  const removeThumbnail = () => {
    form.setValue('thumbnail', undefined, { shouldValidate: true });
    if (thumbnailPreview) {
      URL.revokeObjectURL(thumbnailPreview);
    }
    setThumbnailPreview(null);
  };
  
  const onSubmit = async (data: UploadFormValues) => {
    
    if (!ReactPlayer.canPlay(data.videoUrl)) {
      toast({
        variant: "destructive",
        title: "Invalid Video URL",
        description: "Please enter a valid and playable video URL.",
      });
      return;
    }
    
    setIsUploading(true);
    setUploadComplete(false);
    setRecentVideo(null);
    setUploadProgress(0);

    let thumbnailUrl = '';
    if (data.thumbnail) {
        thumbnailUrl = await fileToDataUrl(data.thumbnail);
    } else {
        thumbnailUrl = 'https://images.unsplash.com/photo-1597043811659-d2b64fb9eb7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxiZWFjaCUyMHN1cmZpbmd8ZW58MHx8fHwxNzY2NTk4MDc2fDA&ixlib=rb-4.1.0&q=80&w=1080';
    }

    const interval = setInterval(() => {
      setUploadProgress((prev) => (prev >= 95 ? prev : prev + 10));
    }, 300);

    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);
      setTimeout(() => {
        const newVideo = addVideo({
            ...data,
            thumbnailUrl: thumbnailUrl
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
        if (thumbnailPreview) {
          URL.revokeObjectURL(thumbnailPreview);
        }
        setThumbnailPreview(null);
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
                                    placeholder={t('video_url_placeholder')}
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        setUploadComplete(false);
                                        setRecentVideo(null);
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
                     <Player
                        url={videoUrlPreview}
                        width="100%"
                        height="100%"
                        controls={true}
                        light={true}
                        onError={() => setShowPreview(false)}
                     />
                  </div>
                )}

                <FormField
                control={form.control}
                name="thumbnail"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Thumbnail (Optional)</FormLabel>
                    <FormControl>
                        <div>
                            <label htmlFor="thumbnail-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-accent/50">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <UploadCloud className="w-8 h-8 mb-2 text-muted-foreground" />
                                <p className="mb-1 text-sm text-muted-foreground"><span className="font-semibold">{t('upload_click_drag_drop')}</span></p>
                                <p className="text-xs text-muted-foreground">PNG, JPG, WEBP</p>
                                </div>
                                <Input id="thumbnail-file" type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleThumbnailChange} />
                            </label>
                            {thumbnailPreview && (
                                <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                                <div className="relative aspect-video">
                                    <Image src={thumbnailPreview} alt="Thumbnail Preview" fill className="object-cover rounded-md" />
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                                        onClick={removeThumbnail}
                                    >
                                    <X className="h-4 w-4" />
                                    </Button>
                                </div>
                                </div>
                            )}
                        </div>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />


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
                    <FormItem className="flex flex-col">
                      <FormLabel>{t('country_label')}</FormLabel>
                       <CountryCombobox 
                        value={field.value}
                        onChange={field.onChange}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {selectedCountry?.toLowerCase() === 'india' ? (
                   <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('state_province_label')}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={t('state_province_placeholder')} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {indianStates.map(state => (
                                <SelectItem key={state.value} value={state.value}>{state.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                ) : (
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
                )}
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
                name="mapLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('map_link_label')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('map_link_placeholder')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

              {uploadComplete && recentVideo && (
                 <div className="space-y-4">
                    <div className="flex items-center p-4 text-sm text-green-800 rounded-lg bg-green-100 dark:bg-gray-800 dark:text-green-400" role="alert">
                        <CheckCircle className="flex-shrink-0 inline w-4 h-4 mr-3"/>
                        <span className="font-medium">{t('upload_complete_message')}</span>
                    </div>
                    <h3 className="text-lg font-bold">Recently Uploaded</h3>
                    <VideoCard video={recentVideo} />
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
