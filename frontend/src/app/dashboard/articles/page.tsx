import * as React from 'react';
import { config } from '@/config';
import type { Metadata } from 'next';

export const metadata = { title: `Araştırma Makalaleri | Makaleler | ${config.site.name}` } satisfies Metadata;

export default function MediaWikiPage() {
  return (
    <iframe
      src="https://api.vitamis.hekolcu.com:8443/index.php/Vitamis"
      style={{ width: '100%', height: '100vh', border: 'none' }}
      title="MediaWiki Page"
    />
  );
}
