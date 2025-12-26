import { MountainSnow } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  textClassName?: string;
  iconClassName?: string;
}

export function Logo({ className, textClassName, iconClassName }: LogoProps) {
  return (
    <Link href="/home" className={cn('flex items-center gap-2', className)}>
      <MountainSnow className={cn('h-7 w-7 text-primary', iconClassName)} />
      <span
        className={cn(
          'text-xl font-bold text-primary font-headline',
          textClassName
        )}
      >
        Bharatyatra
      </span>
    </Link>
  );
}
