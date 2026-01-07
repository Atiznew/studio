
'use client';

import { useEffect, useRef } from 'react';

interface TelegramEmbedProps {
  url: string;
}

export function TelegramEmbed({ url }: TelegramEmbedProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isLoaded = useRef(false);

  useEffect(() => {
    if (ref.current && !isLoaded.current) {
        isLoaded.current = true;
        const post = url.substring(url.lastIndexOf('/') + 1).split('?')[0];
        const channel = url.split('/')[url.split('/').length - 2];
        const script = document.createElement('script');
        script.async = true;
        script.src = "https://telegram.org/js/telegram-widget.js?22";
        script.setAttribute('data-telegram-post', `${channel}/${post}`);
        script.setAttribute('data-width', '100%');
        script.setAttribute('data-userpic', 'false');

        ref.current.appendChild(script);
    }
  }, [url]);

  return (
    <div ref={ref} className="w-full h-full flex items-center justify-center [&>iframe]:w-full [&>iframe]:max-h-full [&>iframe]:h-auto" />
  );
}
