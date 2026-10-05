/**
 * Strip constructs that could execute scripts from rendered Markdown HTML
 * before it is injected via set:html (stored-XSS defense). The markdown
 * pipeline only emits safe elements, but authors can embed raw HTML in posts,
 * which the pipeline passes through unchanged.
 *
 * <iframe> is allowed (B 站/YouTube 等视频嵌入全走 iframe);其上的 srcdoc、
 * on* 事件与 javascript: src 由下方规则剥离。
 */
export function sanitizeHtml(html: string): string {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, "")
    .replace(/<script\b[^>]*\/?>/gi, "")
    .replace(/<object\b[^>]*>[\s\S]*?<\/object\s*>/gi, "")
    .replace(/<object\b[^>]*\/?>/gi, "")
    .replace(/<embed\b[^>]*\/?>/gi, "")
    .replace(/<base\b[^>]*\/?>/gi, "")
    .replace(/<link\b[^>]*\/?>/gi, "")
    .replace(/<meta\b[^>]*\/?>/gi, "")
    .replace(/\s+on[a-z][a-z0-9_]*\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/(\s(?:href|src|xlink:href|action)\s*=\s*)(["'])\s*(?:javascript|vbscript)\s*:[^"'<]*\2/gi, "$1$2#")
    .replace(/(\s(?:href|src)\s*=\s*)(["'])data\s*:\s*text\s*\/\s*html[^"'<]*\2/gi, "$1$2#")
    .replace(/\s+srcdoc\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "");
}
