import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: process.env.SITE_URL,
  trailingSlash: 'always',
  build: { inlineStylesheets: 'always' },
});
