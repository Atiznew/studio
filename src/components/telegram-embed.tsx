
'use client';

import { useEffect, useRef } from 'react';

interface TelegramEmbedProps {
  url: string;
}

export function TelegramEmbed({ url }: TelegramEmbedProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const post = url.substring(url.lastIndexOf('/') - url.split('/')[url.split('/').length-2].length).replace('/', '');
      const script = document.createElement('script');
      script.async = true;
      script.src = "https://telegram.org/js/telegram-widget.js?22";
      script.setAttribute('data-telegram-post', post);
      script.setAttribute('data-width', '100%');
      script.setAttribute('data-userpic', 'false');

      // Clear previous embed before appending a new one
      while(ref.current.firstChild) {
        ref.current.removeChild(ref.current.firstChild);
      }
      
      ref.current.appendChild(script);
    }
  }, [url]);

  return (
    <div ref={ref} className="w-full h-full flex items-center justify-center [&>iframe]:w-full [&>iframe]:max-h-full [&>iframe]:h-auto" />
  );
}
