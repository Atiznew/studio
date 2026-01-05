
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/context/language-context';
import { ChevronLeft } from 'lucide-react';
import { useVideoStore } from '@/hooks/use-video-store';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ShopItem } from '@/lib/types';

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  productUrl: z.string().url("Please enter a valid URL."),
  imageUrl: z.string().url("Please enter a valid image URL."),
  price: z.string().min(1, "Price is required."),
  category: z.enum(["Digital", "Physical"], {
    required_error: "You need to select a category.",
  }),
});

type AddProductFormValues = z.infer<typeof formSchema>;

export default function AddShopItemPage() {
  const { toast } = useToast();
  const { t } = useTranslation();
  const router = useRouter();
  const { addShopItem } = useVideoStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AddProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      productUrl: "",
      imageUrl: "",
      price: "",
      category: "Physical",
    },
  });

  const onSubmit = (data: AddProductFormValues) => {
    setIsSubmitting(true);
    
    // In a real app, this would be an API call.
    // Here we're adding it to the client-side state.
    addShopItem(data as Omit<ShopItem, 'id'>);

    toast({
      title: "Product Added",
      description: `${data.name} has been added to the shop.`,
    });
    
    router.push('/shop');
    setIsSubmitting(false);
  };

  return (
    <>
      <PageHeader title="Add New Product">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/shop">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
      </PageHeader>
      <div className="container max-w-2xl py-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Travel Backpack" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://images.unsplash.com/..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="productUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Link</FormLabel>
                  <FormControl>
                    <Input placeholder="https://amazon.in/..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., ₹2,499" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="Physical" />
                        </FormControl>
                        <FormLabel className="font-normal">Physical</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="Digital" />
                        </FormControl>
                        <FormLabel className="font-normal">Digital</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Adding Product..." : "Add Product"}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
