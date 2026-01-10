
'use client';

import { useEffect, useRef, memo } from 'react';

declare global {
  interface Window {
    Telegram: {
      Post: any;
    };
  }
}

interface TelegramEmbedProps {
  url: string;
}

const TelegramEmbed = memo(({ url }: TelegramEmbedProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const postMatch = url.match(/\/(\w+)\/(\d+)/);
    if (!postMatch || !ref.current) return;

    const [, channel, post] = postMatch;
    const widgetId = `telegram-post-${channel}-${post}-${Math.random().toString(36).substring(7)}`;

    const createWidget = () => {
      if (ref.current) {
        // Clear previous widget before creating a new one
        ref.current.innerHTML = '';
        const script = document.createElement('script');
        script.async = true;
        script.src = "https://telegram.org/js/telegram-widget.js?22";
        script.setAttribute('data-telegram-post', `${channel}/${post}`);
        script.setAttribute('data-width', '100%');
        script.setAttribute('data-userpic', 'false');
        script.setAttribute('data-id', widgetId);
        ref.current.appendChild(script);
      }
    };
    
    if (window.Telegram && window.Telegram.Post) {
      // If widget script is already loaded, just create the widget
      createWidget();
    } else {
      // If not, load the script and then create the widget
      const script = document.createElement('script');
      script.src = "https://telegram.org/js/telegram-widget.js?22";
      script.async = true;
      script.onload = createWidget;
      document.body.appendChild(script);
      
      return () => {
          document.body.removeChild(script);
      }
    }

  }, [url]);

  return (
    <div ref={ref} className="w-full h-full flex items-center justify-center [&>iframe]:max-w-full [&>iframe]:mx-auto" />
  );
});

TelegramEmbed.displayName = 'TelegramEmbed';

export { TelegramEmbed };
