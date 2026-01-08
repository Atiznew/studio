
'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    Telegram: any;
  }
}

interface TelegramEmbedProps {
  url: string;
}

export function TelegramEmbed({ url }: TelegramEmbedProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const post = url.substring(url.lastIndexOf('/') + 1).split('?')[0];
    const channel = url.split('/')[url.split('/').length - 2];
    
    if (window.Telegram) {
      window.Telegram.Post.init(ref.current, {
        "data-telegram-post": `${channel}/${post}`,
        "data-width": "100%",
        "data-userpic": "false"
      });
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.setAttribute('data-telegram-post', `${channel}/${post}`);
    script.setAttribute('data-width', '100%');
    script.setAttribute('data-userpic', 'false');

    if (ref.current) {
        ref.current.appendChild(script);
    }
  }, [url]);

  return (
    <div ref={ref} className="w-full h-full flex items-center justify-center [&>iframe]:w-full [&>iframe]:max-h-full [&>iframe]:h-auto" />
  );
}
