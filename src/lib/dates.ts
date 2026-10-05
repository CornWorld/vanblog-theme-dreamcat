/**
 * 日期辅助。PocketBase 时间为 "YYYY-MM-DD HH:mm:ss"(空格分隔),
 * new Date() 在部分引擎解析不了,统一先换成 "T"。
 *
 * 有意不直接用 @vanblog/sdk 的 fmtDate/fmtDateTime:SDK 输出 locale 格式
 * ("2026/10/5"),本主题需要 "YYYY-MM-DD" 等宽稳定格式(与旗舰主题各主题
 * 内的 lib/dates.ts 同样的分歧理由)。platform 语义更新时此处跟随。
 */

export function parseDate(raw: string | undefined | null): Date | null {
  if (!raw) return null;
  const d = new Date(raw.replace(" ", "T"));
  return Number.isNaN(d.getTime()) ? null : d;
}

/** YYYY-MM-DD;非法输入返回空串。 */
export function fmtDate(raw: string | undefined | null): string {
  const d = parseDate(raw);
  if (!d) return "";
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

/** YYYY-MM-DD HH:mm;非法输入返回空串。 */
export function fmtDateTime(raw: string | undefined | null): string {
  const d = parseDate(raw);
  if (!d) return "";
  const hh = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");
  return `${fmtDate(raw)} ${hh}:${mi}`;
}
