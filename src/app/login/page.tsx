import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/logo';
import { TranslationWrapper } from '@/components/translation-wrapper';

const GoogleIcon = () => (
    <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.802 8.92C34.522 5.162 29.626 3 24 3 12.955 3 4 11.955 4 23s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
      <path fill="#FF3D00" d="M6.306 14.691c-1.56 3.109-2.306 6.643-2.306 10.309s.746 7.2 2.306 10.309l7.373-5.744c-.456-1.332-.71-2.764-.71-4.256s.254-2.924.71-4.256l-7.373-5.744z"/>
      <path fill="#4CAF50" d="M24 43c5.166 0 9.86-1.977 13.412-5.181l-7.14-5.556c-1.833 1.2-4.045 1.881-6.272 1.881-5.225 0-9.663-3.486-11.215-8.259l-7.373 5.744C8.941 39.019 15.934 43 24 43z"/>
      <path fill="#1976D2" d="M43.611 20.083L43.59 20H24v8h11.303c-.792 2.237-2.231 4.16-4.087 5.571l7.14 5.556C41.522 35.798 44 30.035 44 23c0-1.341-.138-2.65-.389-3.917z"/>
    </svg>
);


const LoginPageContent = () => {
    return (
        <TranslationWrapper>
            {t => (
                 <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
                    <div className="flex items-center justify-center py-12">
                        <div className="mx-auto grid w-[350px] gap-6">
                        <div className="grid gap-2 text-center">
                            <div className="mb-4 flex justify-center">
                                <Logo />
                            </div>
                            <h1 className="text-3xl font-bold">{t('login_title')}</h1>
                            <p className="text-balance text-muted-foreground">
                            {t('login_subtitle')}
                            </p>
                        </div>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                            <Label htmlFor="email">{t('email_label')}</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                            />
                            </div>
                            <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">{t('password_label')}</Label>
                            </div>
                            <Input id="password" type="password" required />
                            </div>
                            <Button type="submit" className="w-full bg-accent hover:bg-accent/90" asChild>
                            <Link href="/home">{t('login_title')}</Link>
                            </Button>
                            <Button variant="outline" className="w-full" asChild>
                                <Link href="/home">
                                    <GoogleIcon /> {t('login_with_google')}
                                </Link>
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            {t('signup_prompt')}{" "}
                            <Link href="/login" className="underline">
                            {t('signup_link')}
                            </Link>
                        </div>
                        </div>
                    </div>
                    <div className="hidden bg-muted lg:block">
                        <Image
                        src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHx0cmF2ZWx8ZW58MHx8fHwxNzY2NzgzMTI2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Image"
                        width="1920"
                        height="1080"
                        className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                    </div>
                    </div>
            )}
        </TranslationWrapper>
    )
}

export default function LoginPage() {
    return (
        <LoginPageContent />
    )
}
