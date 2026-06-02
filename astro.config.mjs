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
  integrations: [
    react(),
    sitemap({
      // Excluir páginas que não devem ser indexadas: áreas privadas, transacionais
      // e URLs legadas redirecionadas (criacao-de-sites-*)
      filter: (page) =>
        !/\/(dashboard|admin|perfil|login|cadastro|obrigado|pedido|parceiro-alpha|faturas|loja|manutencao|compile-images|api|upgrade|oferta-exclusiva|criacao-de-sites-)/.test(
          page,
        ),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
    auth(),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
  ],
  build: {
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('gsap')) {
              return 'gsap-vendor';
            }
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
        },
      },
    },
  },
});