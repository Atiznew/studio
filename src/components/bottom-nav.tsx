'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Video, PlusSquare, Map, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/context/language-context';

export function BottomNav() {
  const pathname = usePathname();
  const { t } = useTranslation();

  const navItems = [
    { href: '/home', icon: Home, label: t('nav_home') },
    { href: '/reels', icon: Video, label: t('nav_reels') },
    { href: '/upload', icon: PlusSquare, label: t('nav_share') },
    { href: '/destinations', icon: Map, label: t('nav_destinations') },
    { href: '/profile', icon: User, label: t('nav_profile') },
  ];

  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full h-16 border-t bg-background/95 backdrop-blur-sm">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
        {navItems.map((item) => {
          let isActive = pathname === item.href;
          
          if (item.label === t('nav_home') && pathname !== '/home') {
            isActive = false;
          } else if (pathname.startsWith(item.href) && item.href !== '/') {
            isActive = true;
          }

          if (item.label === t('nav_profile') && (pathname.startsWith('/profile') || pathname.startsWith('/users'))) {
            isActive = true;
          }
          
          if (item.label === t('nav_share')) {
            isActive = pathname.startsWith('/upload');
          }

          if (item.label === t('nav_destinations')) {
             isActive = pathname.startsWith('/destinations') || pathname.startsWith('/category');
          }


          return (
            <Link
              key={item.label}
              href={item.href}
              className="inline-flex flex-col items-center justify-center px-5 hover:bg-accent/50 group"
            >
              <item.icon
                className={cn(
                  'w-6 h-6 mb-1 transition-colors',
                   isActive ? 'text-primary' : 'text-muted-foreground',
                   'group-hover:text-primary'
                )}
                aria-hidden="true"
              />
              <span className="sr-only">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
