
"use client";

import { useState, useRef, ChangeEvent } from 'react';
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
import { CheckCircle, UploadCloud, Link2 } from 'lucide-react';
import { VideoCategory } from '@/lib/types';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { useVideoStore } from '@/hooks/use-video-store';
import { useTranslation } from '@/context/language-context';


const categories: VideoCategory[] = ["Beach", "Mountain", "City", "Religious", "Food", "Amusement Park", "Forest", "Tropical", "Camping", "Other"];

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  country: z.string().min(2, "Country is required."),
  state: z.string().min(2, "State is required."),
  place: z.string().min(2, "Place is required."),
  category: z.enum(["Beach", "Mountain", "City", "Religious", "Food", "Amusement Park", "Forest", "Tropical", "Camping", "Other"]),
  description: z.string().min(10, "Description must be at least 10 characters.").max(500),
  videoUrl: z.string().url("Please enter a valid URL.").optional().or(z.literal('')),
  videoFile: z.any().optional(),
});

type UploadFormValues = z.infer<typeof formSchema>;



export default function UploadPage() {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [uploadType, setUploadType] = useState("direct");
  const [fileName, setFileName] = useState('');
  const videoFileRef = useRef<File | null>(null);

  const { addVideo } = useVideoStore();

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
  
  const uploadOptions = [
    { value: 'direct', label: t('direct_upload_label'), icon: <UploadCloud className="h-5 w-5" /> },
    { value: 'url', label: t('from_url_label'), icon: <Link2 className="h-5 w-5" /> },
  ]

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue('videoFile', file);
      setFileName(file.name);
      videoFileRef.current = file;
    }
  };

  const onSubmit = (data: UploadFormValues) => {
    let sourceUrl = '';
    let sourceType: 'direct' | 'youtube' | 'instagram' | 'telegram' | 'url' = 'direct';

    if (uploadType === 'direct') {
        if (!data.videoFile) {
            form.setError('videoFile', { message: 'Please select a video file to upload.' });
            return;
        }
        sourceUrl = URL.createObjectURL(data.videoFile);
        sourceType = 'direct';
    } else { // 'url'
        if (!data.videoUrl) {
            form.setError('videoUrl', { message: 'Please paste a video URL.' });
            return;
        }
        sourceUrl = data.videoUrl;
        if (sourceUrl.includes('youtube.com') || sourceUrl.includes('youtu.be')) {
            sourceType = 'youtube';
        } else if (sourceUrl.includes('instagram.com')) {
            sourceType = 'instagram';
        } else if (sourceUrl.includes('t.me')) {
            sourceType = 'telegram';
        } else {
            sourceType = 'url';
        }
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
        setUploadType('direct');
        setFileName('');
        videoFileRef.current = null;
      }, 500);
    }, 3500);
  };

  return (
    <>
      <PageHeader title={t('share_experience_page_title')} />
      <div className="container max-w-2xl py-8">
        <Tabs value={uploadType} onValueChange={setUploadType} className="w-full">
          <div className="pb-4">
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex w-max space-x-2 pb-2">
                {uploadOptions.map((option) => (
                   <button
                    key={option.value}
                    onClick={() => setUploadType(option.value)}
                    className={cn(
                      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2",
                      uploadType === option.value
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-card text-card-foreground border hover:bg-accent/50"
                    )}
                  >
                    {option.icon}
                    {option.label}
                  </button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-6">
              <TabsContent value="direct" className="m-0">
                <FormField
                  control={form.control}
                  name="videoFile"
                  render={() => (
                    <FormItem>
                      <FormLabel>{t('video_file_label')}</FormLabel>
                      <FormControl>
                        <div className="flex items-center justify-center w-full">
                          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-accent/50">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                              {fileName ? (
                                <p className="font-semibold text-primary">{fileName}</p>
                              ) : (
                                <>
                                <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">{t('upload_click_drag_drop')}</span></p>
                                <p className="text-xs text-muted-foreground">{t('upload_video_formats')}</p>
                                </>
                              )}
                            </div>
                            <Input id="dropzone-file" type="file" className="hidden" accept="video/*" onChange={handleFileChange} />
                          </label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              <TabsContent value="url" className="m-0">
                <FormField
                  control={form.control}
                  name="videoUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('video_url_label')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('video_url_placeholder')} {...field} />
                      </FormControl>
                       <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

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
        </Tabs>
      </div>
    </>
  );

    


