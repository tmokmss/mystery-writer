import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

// The repository's own Markdown is the content; an entry's id is its path without .md (e.g. experiments/02-one-idea/README).
const docs = defineCollection({
  loader: glob({
    pattern: ['experiments/**/*.md', 'research/**/*.md'],
    base: '.',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
});

export const collections = { docs };
