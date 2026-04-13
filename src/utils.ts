/** 简单 Markdown → HTML 渲染器 */
export function renderMarkdown(content: string): string {
  const lines = content.trim().split('\n');
  const output: string[] = [];
  let inCode = false;

  for (const raw of lines) {
    if (raw.startsWith('```')) {
      if (!inCode) {
        const lang = raw.slice(3).trim();
        output.push(`<pre class="code-block${lang ? ` language-${lang}` : ''}"><code>`);
        inCode = true;
      } else {
        output.push('</code></pre>');
        inCode = false;
      }
      continue;
    }
    if (inCode) { output.push(escapeHtml(raw)); continue; }

    if (raw.startsWith('### ')) { output.push(`<h3>${raw.slice(4)}</h3>`); continue; }
    if (raw.startsWith('## '))  { output.push(`<h2>${raw.slice(3)}</h2>`); continue; }
    if (raw.startsWith('# '))   { output.push(`<h1>${raw.slice(2)}</h1>`); continue; }
    if (raw.startsWith('- '))   { output.push(`<li>${inline(raw.slice(2))}</li>`); continue; }
    if (/^\d+\. /.test(raw))    { output.push(`<li>${inline(raw.slice(raw.indexOf(' ') + 1))}</li>`); continue; }
    if (!raw.trim())             { output.push('<br/>'); continue; }
    output.push(`<p>${inline(raw)}</p>`);
  }
  return output.join('\n');
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function inline(line: string): string {
  line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  line = line.replace(/\*(.*?)\*/g, '<em>$1</em>');
  line = line.replace(/`([^`]+)`/g, '<code>$1</code>');
  return line;
}

/** 根据分类名返回对应 CSS class */
export function getCategoryClass(category: string): string {
  const map: Record<string, string> = {
    Research:       'cat-research',
    Technical:      'cat-technical',
    'Daily Life':   'cat-daily',
    'Month Journal':'cat-journal',
  };
  return map[category] ?? '';
}
