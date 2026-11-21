#!/usr/bin/env bash
# 問題編を Codex CLI に N 回解かせ、回答を <出力ディレクトリ>/codex_<i>.log に書く。
# usage: scripts/run_codex.sh <problem.md> <出力ディレクトリ> [回数=2]
set -eu
problem=$1
outdir=$2
runs=${3:-2}
mkdir -p "$outdir"
prompt="以下は推理クイズです。ファイルやWebを調べず、本文だけから考えてください。最後に次の形式で答えてください。
犯人: <名前>
決め手: <2〜5文>
確信度: <0〜100>

$(cat "$problem")"
for i in $(seq 1 "$runs"); do
  codex exec --skip-git-repo-check -s read-only "$prompt" > "$outdir/codex_$i.log" 2>&1 &
done
wait
