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
      // Excluir páginas que não devem ser indexadas: áreas privadas, transacionais,
      // URLs legadas redirecionadas (criacao-de-sites-* da raiz, exceto /local/),
      // páginas de bairro noindex (cidades/bairros/*) e o redirect itaim-bibi local
      filter: (page) =>
        !/\/(dashboard|admin|perfil|login|cadastro|obrigado|pedido|parceiro-alpha|faturas|loja|manutencao|compile-images|api|upgrade|oferta-exclusiva)/.test(
          page,
        ) &&
        !(/\/criacao-de-sites-/.test(page) && !/\/local\/criacao-de-sites-/.test(page)) &&
        !/\/cidades\/bairros\//.test(page) &&
        !/\/local\/criacao-de-sites-itaim-bibi-sp/.test(page),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      // Páginas long-tail bairro×nicho×cidade devem ter prioridade 0.6
      // (são internas, segmentadas, não são páginas principais)
      entryLimit: 45000,
    }),
    auth(),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
  ],
  build: {
    // Inline de TODAS as folhas de estilo: elimina CSS render-blocking externo
    // (3 requests + parse bloqueante na home). Custo: HTML maior, mas 1 request só.
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      sourcemap: true,
      // Desabilita o polyfill automático de module preload (evita JS extra no head)
      modulePreload: {
        polyfill: false,
      },
      rollupOptions: {
        // Pagefind é gerado em runtime (após o build) via `pagefind --site dist/client`.
        // Não deve ser resolvido estaticamente pelo Rollup.
        external: [/^\/pagefind\//],
        output: {
          manualChunks: {
            // Bibliotecas pesadas em chunks próprios: só são carregadas
            // quando a página realmente usa o componente (code splitting real).
            'react-vendor': ['react', 'react-dom'],
            'three-vendor': ['three'],
            'gsap-vendor': ['gsap'],
          },
        },
      },
    },
  },
});