'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Video, PlusSquare, Map, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/home', icon: Home, label: 'Home' },
  { href: '/reels', icon: Video, label: 'Reels' },
  { href: '/upload', icon: PlusSquare, label: 'Upload' },
  { href: '/destinations', icon: Map, label: 'Destinations' },
  { href: '/profile', icon: User, label: 'Profile' },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full h-16 border-t" style={{ backgroundColor: 'hsl(var(--nav-background))' }}>
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className="inline-flex flex-col items-center justify-center px-5 hover:bg-black/10 group"
            >
              <item.icon
                className={cn(
                  'w-6 h-6 mb-1 transition-colors',
                   isActive ? 'text-yellow-400' : 'text-yellow-200/80',
                   'group-hover:text-yellow-300'
                )}
                style={{ color: isActive ? 'hsl(var(--nav-icon))' : 'hsla(var(--nav-icon), 0.8)' }}
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
