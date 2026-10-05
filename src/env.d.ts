
// Virtual module declarations for @vanblog/base imports.
// The themes integration resolves these at build time via Vite aliases.
declare module "@vanblog/base/*" {
  const Component: import("astro").AstroComponentFactory;
  export default Component;
}

declare module "vanblog:theme" {
  import type { AstroComponentFactory } from "astro/runtime/server/index.js";
  export const Page: AstroComponentFactory;
}


declare namespace App {
  interface Locals {
    pb: import("@vanblog/sdk").VanblogClient;
    pbUrl: string;
    getSite(): Promise<Partial<import("@vanblog/sdk").Site> | null>;
    getThemeSettings(): Promise<Record<string, unknown>>;
  }
}

/** themes() integration 的 Vite define:本主题挂载前缀(/themes/<name>)。 */
declare const __VANBLOG_THEME_PREFIX__: string;

/** mdui-lite(裁剪 fork)未携带 d.ts,按 any 引用;API 见 packages/mdui-lite/README。 */
declare module "@vanblog/mdui-lite";

interface Window {
  vanblog: { pb: import("@vanblog/sdk").VanblogClient };
  /** mdui.snackbar 语义的全局浮层(v3 回到顶部彩蛋等使用)。 */
  dcSnackbar?: (message: string, position?: string) => void;
  /** mdui-lite 全局实例(BaseLayout 挂载,供内联脚本使用)。 */
  mdui?: {
    Dialog: new (el: Element, options?: Record<string, unknown>) => {
      open(): void;
      close(): void;
      toggle(): void;
    };
    dialog(options: Record<string, unknown>): unknown;
    snackbar(message: string, options?: Record<string, unknown>): unknown;
    Drawer: new (
      el: Element | string,
      options?: Record<string, unknown>,
    ) => { open(): void; close(): void; toggle(): void };
  };
}
