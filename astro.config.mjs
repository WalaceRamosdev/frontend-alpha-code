// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import auth from 'auth-astro';
import tailwindcss from '@tailwindcss/vite';
import partytown from '@astrojs/partytown';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.sitesalphacode.com.br',
  output: 'server',
  adapter: vercel(),
  integrations: [react(), sitemap(), auth(), partytown({
    config: {
      forward: ['dataLayer.push'],
    },
  })], // Trigger deploy
  build: {
    inlineStylesheets: 'always'
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('gsap')) {
              return 'gsap-vendor';
            }
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          }
        }
      }
    }
  }
});