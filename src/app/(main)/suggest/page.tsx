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
import { useToast } from '@/hooks/use-toast';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

const formSchema = z.object({
  place: z.string().min(2, "Place name is required."),
  state: z.string().min(2, "State is required."),
  country: z.string().min(2, "Country is required."),
  reason: z.string().min(10, "Please provide a reason (at least 10 characters).").max(500),
});

type SuggestionFormValues = z.infer<typeof formSchema>;

export default function SuggestPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SuggestionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      place: "",
      state: "",
      country: "",
      reason: "",
    },
  });

  const onSubmit = (data: SuggestionFormValues) => {
    setIsSubmitting(true);
    console.log("Suggestion submitted:", data);

    // Simulate an API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Suggestion Submitted!",
        description: "Thanks for helping us grow. We'll review your suggestion.",
      });
      form.reset();
    }, 1500);
  };

  return (
    <>
      <PageHeader title="Suggest a Place">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/destinations">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
      </PageHeader>
      <div className="container max-w-2xl py-8">
        <p className="mb-6 text-muted-foreground">
          Know a great travel spot that's not in our app? Let us know! Your suggestions help us add new and exciting destinations for everyone to explore.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="place"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Place / City</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Manali" {...field} />
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
                    <FormLabel>State / Province</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Himachal Pradesh" {...field} />
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
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., India" {...field} />
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
                  <FormLabel>Why should we add this place?</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tell us what makes this place special..." className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Suggestion"}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
