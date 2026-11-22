import { getCollection } from 'astro:content';

export const url = (path: string) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path}`;

export const pagePath = (id: string) => id.replace(/(^|\/)README$/, '$1index') + '.html';

export const titleOf = (body: string | undefined, fallback: string) =>
  body?.match(/^#\s+(.+)$/m)?.[1].trim() ?? fallback;

export const firstParagraph = (body: string | undefined) =>
  body
    ?.split(/\n\s*\n/)
    .map((p) => p.trim())
    .find((p) => p && !p.startsWith('#') && !p.startsWith('-') && !p.startsWith('|'))
    ?.split('\n')
    .filter((line) => !/^\s*[-*] /.test(line))
    .join('')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1') ?? '';

export async function allDocs() {
  return (await getCollection('docs')).sort((a, b) => a.id.localeCompare(b.id));
}

export type Draft = { version: string; problem?: string; solution?: string; answers: string[] };

export function draftsOf(dir: string, ids: string[]): Draft[] {
  const byVersion = new Map<string, Draft>();
  const prefix = `${dir}/drafts/`;
  for (const id of ids) {
    if (!id.startsWith(prefix)) continue;
    const [version, ...rest] = id.slice(prefix.length).split('/');
    const d = byVersion.get(version) ?? { version, answers: [] };
    const name = rest.join('/');
    if (name === 'problem') d.problem = id;
    else if (name === 'solution') d.solution = id;
    else if (rest[0] === 'answers') d.answers.push(id);
    byVersion.set(version, d);
  }
  return [...byVersion.values()].sort((a, b) =>
    a.version.localeCompare(b.version, undefined, { numeric: true }),
  );
}

const answerLabels: Record<string, string> = {
  haiku: 'Haiku', sonnet: 'Sonnet', opus: 'Opus', codex: 'Codex', judge: '評価役',
};

export const answerLabel = (id: string) => {
  const name = id.split('/').pop() ?? id;
  const [kind, n] = name.split('_');
  if (kind === 'judge') return `評価役 ${answerLabels[n] ?? n[0].toUpperCase() + n.slice(1)}`;
  return `${answerLabels[kind] ?? kind} ${n ?? ''}`.trim();
};
