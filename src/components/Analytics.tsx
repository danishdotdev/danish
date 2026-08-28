'use client';

import Script from 'next/script';
import { useEffect } from 'react';

declare global {
  interface Window { gtag?: (...args: unknown[]) => void; }
}

const measurementId = 'G-QDYRRJT1E0';

export default function Analytics() {
  useEffect(() => {
    if (!measurementId || !window.gtag) return;
    let milestones = new Set<number>();
    const onScroll = () => {
      const readable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = readable > 0 ? window.scrollY / readable : 0;
      [50, 90].forEach((milestone) => {
        if (progress >= milestone / 100 && !milestones.has(milestone)) {
          milestones.add(milestone);
          window.gtag?.('event', 'article_read', { percent_read: milestone, page_path: window.location.pathname });
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <>
    <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
    <Script id="ga4" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config','${measurementId}');`}</Script>
  </>;
}
