
"use client";

import { useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { ShopItemCard } from '@/components/shop-item-card';
import { useVideoStore } from '@/hooks/use-video-store';
import { useTranslation } from '@/context/language-context';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { ShopItemCategory } from '@/lib/types';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const categories: ShopItemCategory[] = ["All", "Digital", "Physical"];

export default function ShopPage() {
  const { t } = useTranslation();
  const { shopItems } = useVideoStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ShopItemCategory>('All');
  
  const handleSearch = (term: string, category: ShopItemCategory) => {
    let filtered = shopItems;

    if (category !== 'All') {
        filtered = filtered.filter(item => item.category === category);
    }
    
    if (term.trim() !== '') {
       filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(term.toLowerCase())
      );
    }
    
    return filtered;
  };

  const searchResults = handleSearch(searchTerm, selectedCategory);

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <>
      <PageHeader title={t('shop_page_title')} />
      <div className="container max-w-4xl mx-auto py-8">
        <p className="text-center text-muted-foreground mb-8">{t('shop_page_description')}</p>
        
        <div className="flex w-full items-center space-x-2 mb-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t('search_placeholder')}
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
                <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" onClick={clearSearch}>
                    <X className="h-4 w-4" />
                </Button>
            )}
          </div>
        </div>

        <div className="flex justify-center flex-wrap gap-2 mb-8">
            {categories.map(category => (
                <Button 
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(category)}
                    className={cn("capitalize", selectedCategory === category && "bg-primary text-primary-foreground")}
                >
                    {category}
                </Button>
            ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {searchResults.length > 0 ? (
            searchResults.map((item) => (
              <ShopItemCard key={item.id} item={item} />
            ))
          ) : (
            <div className="col-span-full text-center py-16">
                <p className="font-bold text-lg">{t('no_results_title')}</p>
                <p className="text-muted-foreground">{t('no_results_subtitle')}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
