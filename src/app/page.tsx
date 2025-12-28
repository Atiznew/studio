"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Logo } from '@/components/logo';
import { placeholderImages } from '@/lib/data';
import { useTranslation } from '@/context/language-context';

export default function SplashScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/home');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  const splashImage = placeholderImages.find(p => p.id === 'splash');

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {splashImage && (
        <Image
          src={splashImage.imageUrl}
          alt={splashImage.description}
          data-ai-hint={splashImage.imageHint}
          fill
          className="object-cover z-0"
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/50 z-10" />
      <div className="z-20 flex flex-col items-center justify-center text-center text-white animate-fade-in-up">
        <Logo />
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl font-headline">
          {t('splash_title')}
        </h1>
      </div>
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
      `}</style>
    </main>
  );
}
