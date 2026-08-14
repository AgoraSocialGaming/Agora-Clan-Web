import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { SITE } from './src/data/site.js';

export default defineConfig({
  site: SITE.url,
  trailingSlash: 'never',
  build: { inlineStylesheets: 'auto', format: 'file' },
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
  image: {
    // Todas las <Image /> se sirven en AVIF/WebP con fallback y lazy por defecto.
    service: { entrypoint: 'astro/assets/services/sharp' },
    responsiveStyles: true,
    layout: 'constrained',
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/legal/') && !page.includes('/gracias'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      serialize: (item) => {
        const path = new URL(item.url).pathname.replace(/\/$/, '');
        if (path === '') return { ...item, priority: 1.0, changefreq: 'weekly' };
        if (path === '/torneos' || path === '/descargar') return { ...item, priority: 0.9 };
        if (path === '/juegos') return { ...item, priority: 0.8 };
        return { ...item, priority: 0.6, changefreq: 'monthly' };
      },
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
