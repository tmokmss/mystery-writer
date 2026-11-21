# mystery-writer

AIに短編ミステリーを書かせ、AIの解答役・評価役で確かめる実験の記録。原稿と結果は https://tmokmss.github.io/mystery-writer/ で読める。

- `experiments/`: 実験ごとの原稿・結果・プロンプト。各ディレクトリのREADMEに結論を書く。原稿は `drafts/<稿>/problem.md`・`solution.md`、回答は `drafts/<稿>/answers/` に置くと、サイトの稿ごとの表と「読む」ページに載る。
- `research/`: 実験の土台にした調査の報告とメモ。
- `scripts/run_codex.sh`: 問題編をCodex CLIに解かせる。`scripts/run_codex.sh <problem.md> <出力ディレクトリ> [回数]`
- `src/`: サイト（Astro）。`npm install` のあと `npm run dev` で手元に表示できる。mainへのpushでGitHub Pagesに公開される。
