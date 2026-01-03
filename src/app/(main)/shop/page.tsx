
"use client";

import { useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { ShopItemCard } from '@/components/shop-item-card';
import { shopItems } from '@/lib/data';
import { useTranslation } from '@/context/language-context';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

export default function ShopPage() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(shopItems);

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setSearchResults(shopItems);
      return;
    }
    const results = shopItems.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults(shopItems);
  };

  return (
    <>
      <PageHeader title={t('shop_page_title')} />
      <div className="container max-w-4xl mx-auto py-8">
        <p className="text-center text-muted-foreground mb-8">{t('shop_page_description')}</p>
        
        <div className="flex w-full items-center space-x-2 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t('search_placeholder')}
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            {searchTerm && (
                <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" onClick={clearSearch}>
                    <X className="h-4 w-4" />
                </Button>
            )}
          </div>
          <Button onClick={handleSearch}>{t('search_button')}</Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {searchResults.length > 0 ? (
            searchResults.map((item) => (
              <ShopItemCard key={item.id} item={item} />
            ))
          ) : (
            <div className="text-center md:col-span-full text-muted-foreground">
                <p className="font-bold text-lg">{t('no_results_title')}</p>
                <p>{t('no_results_subtitle')}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
