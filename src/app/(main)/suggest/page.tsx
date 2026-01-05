
"use client";

import { useState, ChangeEvent, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ChevronLeft, UploadCloud } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/context/language-context';
import { useHydrated } from '@/hooks/use-hydrated';

const formSchema = z.object({
  place: z.string().min(2, "Place name is required."),
  state: z.string().min(2, "State is required."),
  country: z.string().min(2, "Country is required."),
  reason: z.string().min(10, "Please provide a reason (at least 10 characters).").max(500),
  imageFile: z.any().optional(),
});

type SuggestionFormValues = z.infer<typeof formSchema>;

export default function SuggestPage() {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState('');
  const imageFileRef = useRef<File | null>(null);
  const isHydrated = useHydrated();

  const form = useForm<SuggestionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      place: "",
      state: "",
      country: "",
      reason: "",
    },
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue('imageFile', file);
      setFileName(file.name);
      imageFileRef.current = file;
    }
  };

  const onSubmit = (data: SuggestionFormValues) => {
    setIsSubmitting(true);
    console.log("Suggestion submitted:", data);

    // Simulate an API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: t('suggestion_success_title'),
        description: t('suggestion_success_description'),
      });
      form.reset();
      setFileName('');
      imageFileRef.current = null;
    }, 1500);
  };
  
  if (!isHydrated) {
    return null;
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
              name="imageFile"
              render={() => (
                <FormItem>
                  <FormLabel>{t('image_label')}</FormLabel>
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
                            <p className="text-xs text-muted-foreground">{t('upload_image_formats')}</p>
                            </>
                          )}
                        </div>
                        <Input id="dropzone-file" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                      </label>
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
                    <Input placeholder={t('place_city_placeholder')} {...field} />
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
                      <Input placeholder={t('state_province_placeholder')} {...field} />
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
                      <Input placeholder={t('country_placeholder')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('reason_label')}</FormLabel>
                  <FormControl>
                    <Textarea placeholder={t('reason_placeholder')} className="resize-none" {...field} />
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
