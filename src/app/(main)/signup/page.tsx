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
import { useEffect } from 'react';

export default function SignupPage() {
    const { t } = useTranslation();
    const form = useForm();
    const selectedCountry = form.watch('country');

    useEffect(() => {
        if (selectedCountry?.toLowerCase() !== 'india') {
            form.resetField('state');
        }
    }, [selectedCountry, form]);

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
                    <form className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="fullname">{t('fullname_label')}</Label>
                            <Input id="fullname" placeholder={t('fullname_placeholder')} required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">{t('email_label')}</Label>
                            <Input id="email" type="email" placeholder="m@example.com" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">{t('password_label')}</Label>
                            <Input id="password" type="password" required />
                        </div>
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
                             <div className="grid gap-2">
                                <Label htmlFor="state">{t('state_province_label')}</Label>
                                <Input id="state" placeholder={t('state_province_placeholder')} />
                            </div>
                        )}

                        <div className="grid gap-2">
                            <Label htmlFor="source">{t('how_heard_label')}</Label>
                            <Select>
                                <SelectTrigger id="source">
                                    <SelectValue placeholder={t('how_heard_placeholder')} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="google">Google</SelectItem>
                                    <SelectItem value="social_media">Social Media</SelectItem>
                                    <SelectItem value="friend">From a Friend</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button type="submit" className="w-full" asChild>
                            <Link href="/home">{t('create_account_button')}</Link>
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
