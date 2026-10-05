/**
 * 平台 markdown 管线产物 → DreamCat DOM 形态(字符串后处理)。
 *
 * 平台 rehype-code-block 把 .code-header(lang + 复制按钮)塞进了 <pre> 内部。
 * HTML 解析遇到 <pre> 内的 <div> 会强制闭合 pre,浏览器侧 DOM 与 SSR 字符串
 * 不一致,按钮/语言标签会掉出代码块。与旗舰主题同解法:解析前把 header 外移,
 * 包一层 <div class="dc-code">。复制按钮文案与委托选择器保持平台约定
 * (.code-copy-btn),标题锚点补 data-id 供 TOC/点击 hash 使用。
 */
export function dreamcatDom(html: string): string {
  const codeBlocks = html.replace(
    /<pre class="code-block-wrapper"([^>]*)\sdata-language="([^"]*)"[^>]*>(?:<div class="code-header"[\s\S]*?<\/div>)?([\s\S]*?)<\/pre>/g,
    (_m, attrs: string, lang: string, body: string) =>
      `<div class="dc-code"><div class="dc-code-header"><span class="dc-code-lang">${lang}</span><span class="code-copy-btn" role="button" tabindex="0">复制</span></div><pre${attrs} data-language="${lang}">${body}</pre></div>`,
  );
  return codeBlocks.replace(
    /<(h[1-6])([^>]*\bid="([^"]+)"[^>]*)>/g,
    (_m, tag: string, attrs: string, id: string) => `<${tag} class="md-heading"${attrs} data-id="${id}">`,
  );
}
