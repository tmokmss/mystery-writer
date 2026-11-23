// 原稿から常用漢字表にない漢字を抜き出し、字ごとに回数と最初の出現箇所を出す。
// scripts/joyo.txt は https://kanjiapi.dev/v1/kanji/joyo から取得した常用漢字（異体字を含む2140字）。
// 字が常用漢字でも語として馴染みのないもの（衣桁など）は拾えないので、評価役の読みやすさの項目で見る。
// 漢字の割合（漢字÷(漢字＋ひらがな)）も出す。一般向けの小説より大きく低ければ、ひらがなに開きすぎている。
// usage: node scripts/check_kanji.mjs <原稿.md>...
import { readFileSync } from 'node:fs';

const joyo = new Set(readFileSync(new URL('./joyo.txt', import.meta.url), 'utf8').trim());
for (const file of process.argv.slice(2)) {
  const text = readFileSync(file, 'utf8');
  const found = new Map();
  for (const m of text.matchAll(/\p{Script=Han}/gu)) {
    if (joyo.has(m[0]) || m[0] === '々') continue;
    const f = found.get(m[0]) ?? { n: 0, at: text.slice(Math.max(0, m.index - 8), m.index + 8).replace(/\s/g, '') };
    f.n++;
    found.set(m[0], f);
  }
  const han = text.match(/\p{Script=Han}/gu)?.length ?? 0;
  const hira = text.match(/\p{Script=Hiragana}/gu)?.length ?? 0;
  console.log(`# ${file}: 常用漢字表にない字 ${found.size}種、漢字の割合 ${(han / (han + hira) * 100).toFixed(1)}%`);
  for (const [c, f] of found) console.log(`${c}\t${f.n}回\t${f.at}`);
}
