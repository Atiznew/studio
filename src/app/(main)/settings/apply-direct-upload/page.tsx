
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';

import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/context/language-context';
import { ChevronLeft } from 'lucide-react';
import { useVideoStore } from '@/hooks/use-video-store';
import { useRouter } from 'next/navigation';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const formSchema = z.object({
  name: z.string().min(2, "Name is required."),
  email: z.string().email("Please enter a valid email."),
  isTraveller: z.enum(["yes", "no"], {
    required_error: "You need to select an option.",
  }),
  link1: z.string().url("Please enter a valid URL.").optional().or(z.literal('')),
  link2: z.string().url("Please enter a valid URL.").optional().or(z.literal('')),
  link3: z.string().url("Please enter a valid URL.").optional().or(z.literal('')),
  reason: z.string().min(20, "Please provide a reason (at least 20 characters)."),
});

type ApplicationFormValues = z.infer<typeof formSchema>;

export default function ApplyDirectUploadPage() {
  const { toast } = useToast();
  const { t } = useTranslation();
  const router = useRouter();
  const { currentUser } = useVideoStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: currentUser?.name || "",
      email: "",
      reason: "",
      link1: "",
      link2: "",
      link3: "",
    },
  });

  const onSubmit = (data: ApplicationFormValues) => {
    setIsSubmitting(true);
    
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

  return (
    <>
      <PageHeader title={t('apply_for_direct_upload_title')}>
        <Button variant="ghost" size="icon" asChild>
          <Link href="/upload">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
      </PageHeader>
      <div className="container max-w-2xl py-8">
        <p className="mb-6 text-muted-foreground">
          {t('apply_for_direct_upload_description')}
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('your_name_label')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('your_name_placeholder')} {...field} />
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
                  <FormLabel>{t('your_email_label')}</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder={t('your_email_placeholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="isTraveller"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>{t('are_you_a_traveller_label')}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="yes" />
                        </FormControl>
                        <FormLabel className="font-normal">{t('yes')}</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="font-normal">{t('no')}</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="link1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('page_link_label')} 1</FormLabel>
                  <FormControl>
                    <Input placeholder={t('page_link_placeholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="link2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('page_link_label')} 2</FormLabel>
                  <FormControl>
                    <Input placeholder={t('page_link_placeholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="link3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('page_link_label')} 3</FormLabel>
                  <FormControl>
                    <Input placeholder={t('page_link_placeholder')} {...field} />
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
                  <FormLabel>{t('why_direct_upload_label')}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t('why_direct_upload_placeholder')}
                      className="resize-none"
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? t('submitting_application_button') : t('submit_application_button')}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
