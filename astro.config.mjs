import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';  // ← 이 줄

export default defineConfig({
  site: 'https://opsoult.com',
  integrations: [sitemap()],  // ← 이 줄
});
