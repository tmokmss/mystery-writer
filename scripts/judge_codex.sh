#!/usr/bin/env bash
# 問題編と解決編を Codex CLI に渡して編集者として評価させ、最後の応答を <出力.md> に書く。
# 質問は scripts/judge_prompt.md で、Claude の評価役（サブエージェント）にも同じものを渡す。
# usage: scripts/judge_codex.sh <problem.md> <solution.md> <出力.md>
set -eu
problem=$1
solution=$2
out=$3
mkdir -p "$(dirname "$out")"
prompt="$(cat "$(dirname "$0")/judge_prompt.md")

# 問題編
$(cat "$problem")

# 解決編
$(cat "$solution")"
codex exec --skip-git-repo-check -s read-only -o "$out" "$prompt" > "$out.log" 2>&1
rm -f "$out.log"
