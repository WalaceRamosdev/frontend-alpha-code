// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import auth from 'auth-astro';

// https://astro.build/config
export default defineConfig({
  site: 'https://sitesalphacode.vercel.app',
  output: 'server',
  adapter: vercel(),
  integrations: [react(), sitemap(), auth()]
});