import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import mdLinks from './src/md-links-plugin.mjs';

// build.format 'preserve' writes foo.md as foo.html and README.md as index.html in the same directory, so relative links between .md files resolve the same way on GitHub and on the site.
export default defineConfig({
  site: 'https://tmokmss.github.io',
  base: '/mystery-writer',
  build: { format: 'preserve' },
  markdown: { processor: satteri({ mdastPlugins: [mdLinks] }) },
});
