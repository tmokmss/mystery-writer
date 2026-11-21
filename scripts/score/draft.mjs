import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export function loadDraft(dir) {
  const problem = readFileSync(join(dir, 'problem.md'), 'utf8');
  const solution = readFileSync(join(dir, 'solution.md'), 'utf8');
  return { dir, problem, solution, title: problem.match(/^#\s+(.+)$/m)?.[1] ?? dir };
}

// Splits the problem text at its "## " headings (or into four runs of paragraphs when it has fewer than three); the reader-challenge part stays with the last chapter.
export function chapters(problem) {
  const parts = problem.split(/\n(?=##\s)/);
  if (parts.length >= 3) return parts;
  const paras = problem.split(/\n\s*\n/);
  const size = Math.ceil(paras.length / 4);
  return Array.from({ length: 4 }, (_, i) => paras.slice(i * size, (i + 1) * size).join('\n\n')).filter(Boolean);
}

const kanjiNum = '〇一二三四五六七八九十百千0-9０-９';

export function mechanical({ problem, solution }) {
  const body = problem.replace(/\*\*読者への挑戦\*\*[\s\S]*$/, '');
  const times = body.match(new RegExp(`[${kanjiNum}]+時(半|[${kanjiNum}]+分)?`, 'g')) ?? [];
  const numbers = body.match(new RegExp(`[${kanjiNum}]{2,}`, 'g')) ?? [];
  const dialogue = (body.match(/「[^」]*」/g) ?? []).join('').length;
  const chars = body.replace(/\s/g, '').length;
  return {
    problemChars: chars,
    solutionChars: solution.replace(/\s/g, '').length,
    timeMentions: times.length,
    distinctTimes: new Set(times).size,
    numberMentions: numbers.length,
    dialogueRatio: chars ? Math.round((dialogue / chars) * 100) / 100 : 0,
  };
}
