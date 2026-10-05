/**
 * 站内路径守卫(与平台 themes 布局的 lib/base.ts 同语义)。
 *
 * 页面链接是根路径(/posts/x);主题构建资产经 assetsPrefix 落在
 * /themes/<name>/_astro/ 目录(immutable 层),/themes/<name>/ 的页面请求由
 * 主题宿主剥前缀后路由到同一套根相对路由。withBase() 因此是恒等返回,
 * 保留为唯一收口点,豁免平台根路径:/admin/**、/api/**。外链原样返回。
 */
export const withBase = (path: string): string => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  if (path === "/admin" || path.startsWith("/admin/") || path.startsWith("/api/")) return path;
  if (base && (path === base || path.startsWith(base + "/"))) return path;
  return base + path;
};

/**
 * 文章路径:平台 pathname 存储混用 "/slug"/"slug" 两种形态,
 * 统一取无前导斜杠形态;无 pathname 回落 id。
 */
export function articlePath(pathname?: string | null, id?: string | null): string {
  const p = pathname ? pathname.replace(/^\/+/, "") : "";
  return p || (id ?? "");
}
