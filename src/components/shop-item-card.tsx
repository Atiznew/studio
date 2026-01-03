
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { ShopItem } from '@/lib/types';
import { useTranslation } from '@/context/language-context';
import { cn } from '@/lib/utils';

interface ShopItemCardProps {
  item: ShopItem;
  className?: string;
}

export function ShopItemCard({ item, className }: ShopItemCardProps) {
  const { t } = useTranslation();

  return (
    <Card className={cn("overflow-hidden group", className)}>
      <CardContent className="p-0">
        <Link href={item.productUrl} target="_blank" rel="noopener noreferrer">
          <div className="aspect-square relative">
            <Image
              src={item.imageUrl}
              alt={item.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
        <div className="p-3 text-center">
          <h3 className="font-semibold text-sm truncate">{item.name}</h3>
          <p className="text-xs text-muted-foreground">{item.price}</p>
          <Button asChild size="sm" className="mt-2 w-full">
            <Link href={item.productUrl} target="_blank" rel="noopener noreferrer">
              {t('buy_now_button')}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
