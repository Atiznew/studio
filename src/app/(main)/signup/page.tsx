
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Logo } from '@/components/logo';
import { useTranslation } from '@/context/language-context';
import { CountryCombobox } from '@/components/country-combobox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { indianStates } from '@/lib/indian-states';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useVideoStore } from '@/hooks/use-video-store';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const signupSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters."),
  username: z.string().min(3, "Username must be at least 3 characters.").regex(/^[a-z0-9_.]+$/, "Username can only contain lowercase letters, numbers, underscores, and periods."),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  country: z.string().min(1, "Please select a country."),
  state: z.string().optional(),
  source: z.string().optional(),
});

type SignupFormValues = z.infer<typeof signupSchema>;


export default function SignupPage() {
    const { t } = useTranslation();
    const { signup } = useVideoStore();
    const router = useRouter();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            country: 'india',
            name: '',
            username: '',
            email: '',
            password: '',
        }
    });

    const selectedCountry = form.watch('country');

    useEffect(() => {
        if (selectedCountry?.toLowerCase() !== 'india') {
            form.resetField('state');
        }
    }, [selectedCountry, form]);
    
    const onSubmit = (data: SignupFormValues) => {
        setIsSubmitting(true);
        try {
            const signupData = {
                name: data.name,
                username: data.username,
                email: data.email,
                password: data.password
            };
            signup(signupData);
            toast({
                title: "Account Created!",
                description: "Welcome to Bharatyatra!",
            });
            router.push('/home');
        } catch(error: any) {
            toast({
                variant: 'destructive',
                title: "Signup Failed",
                description: error.message || "Could not create your account.",
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[400px] gap-6">
                    <div className="grid gap-2 text-center">
                        <div className="mb-4 flex justify-center">
                            <Logo />
                        </div>
                        <h1 className="text-3xl font-bold">{t('signup_title')}</h1>
                        <p className="text-balance text-muted-foreground">
                            {t('signup_subtitle')}
                        </p>
                    </div>
                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('fullname_label')}</FormLabel>
                                    <FormControl>
                                        <Input placeholder={t('fullname_placeholder')} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('username_label')}</FormLabel>
                                    <FormControl>
                                        <Input placeholder={t('username_placeholder')} {...field} />
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
                                    <FormLabel>{t('email_label')}</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="m@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('password_label')}</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                                            <Input id="state" placeholder={t('state_province_placeholder')} {...field} />
                                        </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        <FormField
                            control={form.control}
                            name="source"
                             render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>{t('how_heard_label')}</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder={t('how_heard_placeholder')} />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="google">Google</SelectItem>
                                            <SelectItem value="social_media">Social Media</SelectItem>
                                            <SelectItem value="friend">From a Friend</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                    </FormItem>
                                )}
                        />
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? 'Creating Account...' : t('create_account_button')}
                        </Button>
                    </form>
                    </Form>
                    <div className="mt-4 text-center text-sm">
                        {t('login_prompt')}{" "}
                        <Link href="/login" className="underline">
                            {t('login_link')}
                        </Link>
                    </div>
                </div>
            </div>
            <div className="hidden bg-muted lg:block">
                <Image
                    src="https://images.unsplash.com/photo-1527632911563-ee5b6d5344b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBnaXJsfGVufDB8fHx8MTc2OTE4MTc2OXww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Image"
                    width="1920"
                    height="1080"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}
