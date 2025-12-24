"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, UploadCloud } from 'lucide-react';
import { VideoCategory } from '@/lib/types';

const categories: VideoCategory[] = ["Beach", "Mountain", "City", "Religious", "Food", "Amusement Park", "Forest", "Tropical", "Camping", "Other"];

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  country: z.string().min(2, "Country is required."),
  state: z.string().min(2, "State is required."),
  place: z.string().min(2, "Place is required."),
  category: z.enum(["Beach", "Mountain", "City", "Religious", "Food", "Amusement Park", "Forest", "Tropical", "Camping", "Other"]),
  description: z.string().min(10, "Description must be at least 10 characters.").max(500),
  youtubeUrl: z.string().url("Please enter a valid YouTube URL.").optional().or(z.literal('')),
  instagramUrl: z.string().url("Please enter a valid Instagram URL.").optional().or(z.literal('')),
  telegramUrl: z.string().url("Please enter a valid Telegram URL.").optional().or(z.literal('')),
  videoFile: z.any().optional(),
});

type UploadFormValues = z.infer<typeof formSchema>;

export default function UploadPage() {
  const { toast } = useToast();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [uploadType, setUploadType] = useState("direct");

  const form = useForm<UploadFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      country: "",
      state: "",
      place: "",
      category: "Other",
      description: "",
      youtubeUrl: "",
      instagramUrl: "",
      telegramUrl: "",
    },
  });

  const onSubmit = (data: UploadFormValues) => {
    if (uploadType === 'direct' && !data.videoFile) {
        form.setError('videoFile', { message: 'Please select a video file to upload.' });
        return;
    }
    if (uploadType === 'youtube' && !data.youtubeUrl) {
        form.setError('youtubeUrl', { message: 'Please paste a YouTube URL.' });
        return;
    }
    if (uploadType === 'instagram' && !data.instagramUrl) {
        form.setError('instagramUrl', { message: 'Please paste an Instagram URL.' });
        return;
    }
    if (uploadType === 'telegram' && !data.telegramUrl) {
        form.setError('telegramUrl', { message: 'Please paste a Telegram URL.' });
        return;
    }
    
    setIsUploading(true);
    setUploadComplete(false);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          return prev;
        }
        return prev + 10;
      });
    }, 300);

    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);
      setTimeout(() => {
        setIsUploading(false);
        setUploadComplete(true);
        toast({
          title: "Upload Successful!",
          description: "Your video has been submitted for processing.",
        });
        form.reset();
        setUploadType('direct');
      }, 500);
    }, 3500);
  };

  return (
    <>
      <PageHeader title="Upload Video" />
      <div className="container max-w-2xl py-8">
        <Tabs value={uploadType} onValueChange={setUploadType} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="direct">Direct Upload</TabsTrigger>
            <TabsTrigger value="youtube">YouTube</TabsTrigger>
            <TabsTrigger value="instagram">Instagram</TabsTrigger>
            <TabsTrigger value="telegram">Telegram</TabsTrigger>
          </TabsList>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-6">
              <TabsContent value="direct" className="m-0">
                <FormField
                  control={form.control}
                  name="videoFile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Video File</FormLabel>
                      <FormControl>
                        <div className="flex items-center justify-center w-full">
                          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-accent/50">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                              <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                              <p className="text-xs text-muted-foreground">MP4, MOV, AVI (MAX. 500MB)</p>
                            </div>
                            <Input id="dropzone-file" type="file" className="hidden" accept="video/*" onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)} />
                          </label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              <TabsContent value="youtube" className="m-0">
                <FormField
                  control={form.control}
                  name="youtubeUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>YouTube Video URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://www.youtube.com/watch?v=..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              <TabsContent value="instagram" className="m-0">
                <FormField
                  control={form.control}
                  name="instagramUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instagram Video URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://www.instagram.com/reel/..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              <TabsContent value="telegram" className="m-0">
                <FormField
                  control={form.control}
                  name="telegramUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telegram Video URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://t.me/channel/..." {...field} />
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
                    <FormLabel>Video Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., My amazing trip to the mountains" {...field} />
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
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., India" {...field} />
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
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Himachal Pradesh" {...field} />
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
                      <FormLabel>Place</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Manali" {...field} />
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
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
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
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Tell us more about your video..." className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {isUploading && (
                <div className="space-y-2">
                    <p className="text-sm font-medium">Uploading...</p>
                    <Progress value={uploadProgress} />
                </div>
              )}

              {uploadComplete && (
                <div className="flex items-center p-4 text-sm text-green-800 rounded-lg bg-green-100 dark:bg-gray-800 dark:text-green-400" role="alert">
                    <CheckCircle className="flex-shrink-0 inline w-4 h-4 mr-3"/>
                    <span className="font-medium">Upload complete!</span> Your video is now being processed.
                </div>
              )}

              <Button type="submit" className="w-full bg-accent hover:bg-accent/90" disabled={isUploading}>
                {isUploading ? "Uploading..." : "Upload Video"}
              </Button>
            </form>
          </Form>
        </Tabs>
      </div>
    </>
  );
}
