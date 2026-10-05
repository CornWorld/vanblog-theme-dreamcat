/**
 * TOC 辅助:从渲染后的 Markdown HTML 提取标题,供侧栏目录与页面判断共用。
 * 平台管线为标题注入 id,这里按 id 抓 h1–h4。
 */

export interface TocItem {
  id: string;
  tag: "h1" | "h2" | "h3" | "h4";
  text: string;
  /** 0 = h1,1 = h2,2 = h3,3 = h4 */
  level: number;
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

/** 按文档顺序提取带 id 的 h1–h4 标题;无标题时为空数组。 */
export function extractHeadings(html: string): TocItem[] {
  const items: TocItem[] = [];
  const re = /<(h[1-4])[^>]*\bid="([^"]+)"[^>]*>([\s\S]*?)<\/h[1-4]>/gi;
  const levelMap: Record<string, number> = { h1: 0, h2: 1, h3: 2, h4: 3 };
  let match: RegExpExecArray | null;

  while ((match = re.exec(html)) !== null) {
    const tag = match[1] as TocItem["tag"];
    const text = decodeEntities(match[3].replace(/<[^>]*>/g, "").trim());
    if (text) items.push({ id: match[2], tag, text, level: levelMap[tag] });
  }

  return items;
}

/** 文章是否含可生成目录的标题。 */
export function hasHeadings(html: string): boolean {
  return /<h[1-4][^>]*\bid=/.test(html);
}
