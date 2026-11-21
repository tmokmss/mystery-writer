// Compares two drafts on each axis, asking twice with the order swapped, and writes <out>/<A>__<B>.json.
// usage: node scripts/score/compare.mjs <出力ディレクトリ> <稿Aのディレクトリ> <稿Bのディレクトリ>
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { askJSON } from './claude.mjs';
import { loadDraft } from './draft.mjs';

export const AXES = {
  surprise: '意外さ: 問題編を読み終えた時点で、一般の読者が真相を見抜きにくいのはどちらか',
  readability: '読みやすさ: 馴染みのない語、分かりにくい描写、覚えにくい名前、覚えるべき情報の多さが少ないのはどちらか',
  payoff: '読み返したときの納得: 解決を知って読み返すと「最初から書いてあった」と思えるのはどちらか',
  idea: '着想の面白さ: 真相が明かされたとき、絵として浮かび、人に話したくなるのはどちらか',
  overall: '総合: ミステリーを時々読む一般の読者が、読んで面白かったと感じるのはどちらか',
};

const prompt = (x, y) => `二つの短編ミステリー（作品X・作品Y）を、ミステリーを時々読む一般の日本人の読者の立場で比べてください。各観点について、より優れているほうを X か Y で選び、根拠を本文の短い引用とともに一文で書いてください。引き分けは選べません。

観点:
${Object.entries(AXES).map(([k, v]) => `- ${k}: ${v}`).join('\n')}

JSON: {"<観点のキー>": {"winner": "X" or "Y", "reason": "<一文>"}, ...}

# 作品X 問題編
${x.problem}

# 作品X 解決編
${x.solution}

# 作品Y 問題編
${y.problem}

# 作品Y 解決編
${y.solution}`;

export async function compare(dirA, dirB) {
  const a = loadDraft(dirA);
  const b = loadDraft(dirB);
  const [ab, ba] = await Promise.all([askJSON('opus', prompt(a, b)), askJSON('opus', prompt(b, a))]);
  const result = {};
  for (const axis of Object.keys(AXES)) {
    const first = ab[axis]?.winner === 'X' ? 'A' : 'B';
    const second = ba[axis]?.winner === 'X' ? 'B' : 'A';
    result[axis] = {
      winner: first === second ? first : 'split',
      reasons: [ab[axis]?.reason, ba[axis]?.reason],
    };
  }
  return { A: relative(process.cwd(), dirA), B: relative(process.cwd(), dirB), axes: result };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const [out, dirA, dirB] = process.argv.slice(2);
  mkdirSync(out, { recursive: true });
  const r = await compare(dirA, dirB);
  const tag = (p) => relative('experiments', p).replace(/\/drafts\//, '-').replaceAll('/', '-');
  writeFileSync(join(out, `${tag(dirA)}__${tag(dirB)}.json`), JSON.stringify(r, null, 2) + '\n');
  console.log(`${tag(dirA)} vs ${tag(dirB)}: ${Object.entries(r.axes).map(([k, v]) => `${k}=${v.winner}`).join(' ')}`);
}
