// Scores one or more drafts (directories holding problem.md and solution.md) and writes <out>/<name>.json.
// usage: node scripts/score/score.mjs <出力ディレクトリ> <稿のディレクトリ>...
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { ask, askJSON } from './claude.mjs';
import { loadDraft, chapters, mechanical } from './draft.mjs';

const STAGED_RUNS = 3;

const isCulprit = (who, aliases) => !!who && aliases.some((a) => who.includes(a) || a.includes(who));

async function extract(d) {
  return askJSON(
    'sonnet',
    `次の短編ミステリーの問題編と解決編を読み、JSONで答えてください。
- culprit: 解決編で示される犯人の呼び名の一覧（名前・苗字・続柄など、作中で使われる呼び方をすべて。例: ["美咲", "姉"]）
- names: 問題編に出てくる、名前で呼ばれる人物・動物の名前の一覧
- facts: 解決編の推理に使われる事実のうち、読者が問題編を読みながら覚えておく必要のあるもの（時刻・場所・規則・数値・人物の習慣など）を短文で列挙
- unfamiliar: 一般の日本人の大人が読んで、意味が分からず手が止まる語や、何を指しているのか分からない描写だけを、本文から抜き出して列挙（スマートウォッチ・アリバイのように普通の大人が知っている語は含めない。無ければ空、多くても5つ）
- core: 核の着想を一文で

# 問題編
${d.problem}

# 解決編
${d.solution}`,
  );
}

async function stagedReading(d, culprit) {
  const chs = chapters(d.problem);
  const stages = [];
  for (let k = 1; k <= chs.length; k++) {
    const text = chs.slice(0, k).join('\n');
    const runs = await Promise.all(
      Array.from({ length: STAGED_RUNS }, () =>
        askJSON(
          'haiku',
          `あなたはミステリーを時々読む一般の読者です。次の小説を、ここまで一度読んだところです。読み返したり、じっくり推理したりはしないでください。今の印象だけで、犯人だと思う人物を答えてください。見当がつかなければ who を「分からない」にしてください。
JSON: {"who": "<名前>", "confidence": <0-100>}

${text}`,
        ),
      ),
    );
    const hits = runs.filter((r) => isCulprit(r.who, culprit)).length;
    stages.push({ chapter: k, of: chs.length, hitRate: hits / runs.length, guesses: runs });
  }
  return stages;
}

async function carefulSolve(d) {
  const text = await ask(
    'sonnet',
    `推理クイズを解いてください。本文だけから考え、最後の行に「犯人: <名前>」とだけ書いてください。

${d.problem}`,
  );
  return text.match(/犯人[:：]\s*(.+)\s*$/m)?.[1].trim() ?? text.split('\n').at(-1);
}

export async function scoreDraft(dir) {
  const d = loadDraft(dir);
  const ex = await extract(d);
  const [stages, solved] = await Promise.all([stagedReading(d, ex.culprit), carefulSolve(d)]);
  const early = stages.slice(0, -1);
  return {
    draft: relative(process.cwd(), dir),
    title: d.title,
    mechanical: mechanical(d),
    culprit: ex.culprit,
    core: ex.core,
    nameCount: ex.names.length,
    names: ex.names,
    factCount: ex.facts.length,
    facts: ex.facts,
    unfamiliar: ex.unfamiliar,
    staged: {
      firstChapterMajority: stages.find((s) => s.hitRate > 0.5)?.chapter ?? null,
      earlyHitRate: early.length ? early.reduce((a, s) => a + s.hitRate, 0) / early.length : null,
      finalHitRate: stages.at(-1).hitRate,
      stages,
    },
    carefulSolver: { answer: solved, correct: isCulprit(solved, ex.culprit) },
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const [out, ...dirs] = process.argv.slice(2);
  mkdirSync(out, { recursive: true });
  await Promise.all(
    dirs.map(async (dir) => {
      const result = await scoreDraft(dir);
      const name = relative('experiments', dir).replace(/\/drafts\//, '-').replaceAll('/', '-');
      writeFileSync(join(out, `${name}.json`), JSON.stringify(result, null, 2) + '\n');
      console.log(`${name}: names=${result.nameCount} facts=${result.factCount} unfamiliar=${result.unfamiliar.length} earlyHit=${result.staged.earlyHitRate?.toFixed(2)} solved=${result.carefulSolver.correct}`);
    }),
  );
}
