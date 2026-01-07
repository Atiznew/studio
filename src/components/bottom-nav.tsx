
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Video, PlusSquare, Map, User, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/context/language-context';
import React from 'react';

const NavItem = React.memo(({ item, isActive }: { item: { href: string, icon: React.ElementType, label: string }, isActive: boolean }) => {
  return (
    <Link
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
});
NavItem.displayName = 'NavItem';

export function BottomNav() {
  const pathname = usePathname();
  const { t } = useTranslation();

  const navItems = [
    { href: '/home', icon: Home, label: t('nav_home') },
    { href: '/reels', icon: Video, label: t('nav_reels') },
    { href: '/upload', icon: PlusSquare, label: t('nav_share') },
    { href: '/destinations', icon: Map, label: t('nav_destinations') },
    { href: '/shop', icon: ShoppingCart, label: t('nav_shop') },
    { href: '/profile', icon: User, label: t('nav_profile') },
  ];

  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full h-16 border-t bg-background/95 backdrop-blur-sm">
      <div className="grid h-full max-w-lg grid-cols-6 mx-auto">
        {navItems.map((item) => {
          const isActive = (
            item.href === '/home' 
              ? pathname === item.href 
              : (item.href === '/profile' ? (pathname.startsWith('/profile') || pathname.startsWith('/login')) : pathname.startsWith(item.href))
          );

          return (
            <NavItem key={item.href} item={item} isActive={isActive} />
          );
        })}
      </div>
    </nav>
  );
}
