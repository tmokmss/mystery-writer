// Calls the Claude Code CLI headlessly (`claude -p`) with no tools and no user customizations, so prompts see only the text passed in.
import { spawn } from 'node:child_process';

export function ask(model, prompt) {
  return new Promise((resolve, reject) => {
    const child = spawn(
      'claude',
      ['-p', '--model', model, '--tools', '', '--safe-mode', '--no-session-persistence'],
      { stdio: ['pipe', 'pipe', 'pipe'] },
    );
    let out = '';
    let err = '';
    child.stdout.on('data', (d) => (out += d));
    child.stderr.on('data', (d) => (err += d));
    child.on('close', (code) => (code === 0 ? resolve(out.trim()) : reject(new Error(`claude exited ${code}: ${err}`))));
    child.stdin.end(prompt);
  });
}

export async function askJSON(model, prompt) {
  const text = await ask(model, `${prompt}\n\n回答は最後に \`\`\`json で始まるコードブロック1つだけで返してください。`);
  const blocks = [...text.matchAll(/```json\s*([\s\S]*?)```/g)];
  if (blocks.length === 0) throw new Error(`no JSON block in response: ${text.slice(0, 300)}`);
  return JSON.parse(blocks.at(-1)[1]);
}
