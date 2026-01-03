
"use client";

import { PageHeader } from '@/components/page-header';
import { ShopItemCard } from '@/components/shop-item-card';
import { shopItems } from '@/lib/data';
import { useTranslation } from '@/context/language-context';

export default function ShopPage() {
  const { t } = useTranslation();

  return (
    <>
      <PageHeader title={t('shop_page_title')} />
      <div className="container max-w-4xl mx-auto py-8">
        <p className="text-center text-muted-foreground mb-8">{t('shop_page_description')}</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {shopItems.map((item) => (
            <ShopItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}
