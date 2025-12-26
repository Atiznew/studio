'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Video, PlusSquare, Map, User, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/home', icon: Home, label: 'Home' },
  { href: '/reels', icon: Video, label: 'Reels' },
  { href: '/upload', icon: PlusSquare, label: 'Share' },
  { href: '/destinations', icon: Map, label: 'Destinations' },
  { href: '/profile', icon: User, label: 'Profile' },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full h-16 border-t bg-background">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href) && (item.href !== '/home' || pathname === '/home');
          // Special case for root profile page to be active
           const isProfileActive = item.href === '/profile' && (pathname === '/profile' || pathname.startsWith('/profile/'));
           const finalIsActive = item.href === '/profile' ? isProfileActive : isActive;

          return (
            <Link
              key={item.label}
              href={item.href}
              className="inline-flex flex-col items-center justify-center px-5 hover:bg-accent/50 group"
            >
              <item.icon
                className={cn(
                  'w-6 h-6 mb-1 transition-colors',
                   finalIsActive ? 'text-primary' : 'text-muted-foreground',
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
