

"use client";

import { useState, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ChevronLeft, UploadCloud, X } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/context/language-context';
import { useHydrated } from '@/hooks/use-hydrated';
import Image from 'next/image';
import { useVideoStore } from '@/hooks/use-video-store';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

const MAX_FILES = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const formSchema = z.object({
  place: z.string().min(2, "Place name is required."),
  state: z.string().min(2, "State is required."),
  country: z.string().min(2, "Country is required."),
  reason: z.string().min(10, "Please provide a reason (at least 10 characters).").max(500),
  mapLink: z.string().url("Please enter a valid map URL.").optional().or(z.literal('')),
  imageFiles: z.array(z.instanceof(File))
    .max(MAX_FILES, `You can upload a maximum of ${MAX_FILES} images.`)
    .refine(files => files.every(file => file.size <= MAX_FILE_SIZE), `Each file size should be less than 5MB.`)
    .optional(),
});

type SuggestionFormValues = z.infer<typeof formSchema>;

export default function SuggestPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { t } = useTranslation();
  const { addSuggestion, currentUser } = useVideoStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const isHydrated = useHydrated();

  const form = useForm<SuggestionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      place: "",
      state: "",
      country: "",
      reason: "",
      mapLink: "",
      imageFiles: [],
    },
  });

  const fileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const currentFiles = form.getValues('imageFiles') || [];
      const newFiles = Array.from(files);
      if (currentFiles.length + newFiles.length > MAX_FILES) {
          toast({
              variant: 'destructive',
              title: `You can only upload up to ${MAX_FILES} images.`,
          });
          return;
      }

      const allFiles = [...currentFiles, ...newFiles];
      form.setValue('imageFiles', allFiles, { shouldValidate: true });

      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setImagePreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    const currentFiles = form.getValues('imageFiles') || [];
    const updatedFiles = currentFiles.filter((_, i) => i !== index);
    form.setValue('imageFiles', updatedFiles, { shouldValidate: true });

    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(updatedPreviews);
    // Revoke object URL to free memory
    URL.revokeObjectURL(imagePreviews[index]);
  };

  const onSubmit = async (data: SuggestionFormValues) => {
    if(!currentUser) {
        toast({
            variant: "destructive",
            title: "Authentication Required",
            description: "You must be logged in to suggest a place.",
        });
        router.push('/login');
        return;
    }
    setIsSubmitting(true);
    
    try {
        const imageUrls = data.imageFiles ? await Promise.all(data.imageFiles.map(fileToDataUrl)) : [];

        const suggestionData = {
            place: data.place,
            state: data.state,
            country: data.country,
            reason: data.reason,
            mapLink: data.mapLink,
            imageUrls: imageUrls,
        };
        
        addSuggestion(suggestionData);

        toast({
            title: t('suggestion_success_title'),
            description: t('suggestion_success_description'),
        });
        
        form.reset();
        setImagePreviews([]);
        router.push('/profile');

    } catch (error) {
        console.error("Failed to submit suggestion:", error);
        toast({
            variant: 'destructive',
            title: "Error",
            description: "Failed to submit suggestion. Please try again.",
        });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (!isHydrated) {
    return null; // Or a loading spinner
  }

  if (!currentUser) {
    return (
      <>
        <PageHeader title={t('suggest_page_title')}>
            <Button variant="ghost" size="icon" asChild>
                <Link href="/destinations">
                    <ChevronLeft className="h-5 w-5" />
                </Link>
            </Button>
        </PageHeader>
        <div className="container max-w-2xl py-8">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Authentication Required</AlertTitle>
              <AlertDescription>
                You must be logged in to suggest a place. Please log in to continue.
                <div className="mt-4">
                  <Button asChild>
                    <Link href="/login">Login</Link>
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
        </div>
      </>
    )
  }

  return (
    <>
      <PageHeader title={t('suggest_page_title')}>
        <Button variant="ghost" size="icon" asChild>
          <Link href="/destinations">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
      </PageHeader>
      <div className="container max-w-2xl py-8">
        <p className="mb-6 text-muted-foreground">
          {t('suggest_page_description')}
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="imageFiles"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('image_label')}</FormLabel>
                   <FormControl>
                    <div>
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-accent/50">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <UploadCloud className="w-8 h-8 mb-2 text-muted-foreground" />
                            <p className="mb-1 text-sm text-muted-foreground"><span className="font-semibold">{t('upload_click_drag_drop')}</span></p>
                            <p className="text-xs text-muted-foreground">{t('upload_image_formats')}</p>
                            </div>
                            <Input id="dropzone-file" type="file" className="hidden" accept="image/*" multiple onChange={handleFileChange} />
                        </label>
                        {imagePreviews.length > 0 && (
                            <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                                {imagePreviews.map((src, index) => (
                                <div key={index} className="relative aspect-square">
                                    <Image src={src} alt={`Preview ${index}`} fill className="object-cover rounded-md" />
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                                        onClick={() => removeImage(index)}
                                    >
                                    <X className="h-4 w-4" />
                                    </Button>
                                </div>
                                ))}
                            </div>
                        )}
                    </div>
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>
            
            <FormField
              control={form.control}
              name="mapLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('map_link_label')}</FormLabel>
                  <FormControl>
                    <Input placeholder={isHydrated ? t('map_link_placeholder') : ''} {...field} />
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
                  <FormLabel>{t('reason_label')}</FormLabel>
                  <FormControl>
                    <Textarea placeholder={isHydrated ? t('reason_placeholder') : ''} className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? t('submitting_button') : t('submit_suggestion_button')}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}

    

    
