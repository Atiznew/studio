
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
  const scriptInjected = useRef(false);

  useEffect(() => {
    const postMatch = url.match(/\/(\w+)\/(\d+)/);
    if (!postMatch) return;
    
    const [, channel, post] = postMatch;

    const createWidget = () => {
        if (ref.current) {
            // Clear previous widget
            ref.current.innerHTML = '';
            
            const script = document.createElement('script');
            script.async = true;
            script.src = "https://telegram.org/js/telegram-widget.js?22";
            script.setAttribute('data-telegram-post', `${channel}/${post}`);
            script.setAttribute('data-width', '100%');
            script.setAttribute('data-userpic', 'false');
            
            ref.current.appendChild(script);
        }
    };
    
    if (window.Telegram && window.Telegram.Post) {
        createWidget();
    } else if (!scriptInjected.current) {
        const script = document.createElement('script');
        script.src = "https://telegram.org/js/telegram-widget.js?22";
        script.async = true;
        script.onload = createWidget;
        document.body.appendChild(script);
        scriptInjected.current = true;
    }

  }, [url]);

  return (
    <div ref={ref} className="w-full h-full flex items-center justify-center [&>iframe]:max-w-full [&>iframe]:mx-auto" />
  );
}
