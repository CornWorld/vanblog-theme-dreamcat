/**
 * 主题配色:主色调/模式走平台调色盘(palette),强调色走主题层。
 * 色值数据在 lib/mduiColors.mjs(TS 与调色盘生成脚本共用,勿在此复制)。
 */
import {
  PRIMARY_COLORS,
  ACCENT_COLORS,
  ACCENT_DARK_ICON,
  PALETTE_PREFIX,
  relativeLuminance,
  onColor,
} from "./mduiColors.mjs";

export interface PrimaryColor {
  /** 亮色模式:Material 500 */
  c500: string;
  /** 暗色模式:Material 300 */
  c300: string;
  /** 主色作背景时,其上的文字/图标颜色(查表值,运行时亦可按亮度算) */
  on: string;
}

/** 强调色作背景(FAB 等)时,其上图标的颜色。 */
export function accentOnColor(name: string): string {
  return onColor(ACCENT_COLORS[name] ?? "#ffffff");
}

export { relativeLuminance, onColor, PALETTE_PREFIX };

/** 平台「跟随系统」伪调色盘名。 */
export const SYSTEM_PALETTE = "system";

/**
 * 调色盘名 → 主色调 key 与明暗。
 * `dreamcat-teal-dark` → { key: "teal", dark: true };`dreamcat` → indigo。
 */
export function parsePaletteName(name: string | null | undefined): {
  key: string;
  dark: boolean;
} {
  const n = (name || "").replace(/-dark$/, "");
  const key = n.startsWith(`${PALETTE_PREFIX}-`)
    ? n.slice(PALETTE_PREFIX.length + 1)
    : "indigo";
  const dark = (name || "").endsWith("-dark");
  return {
    key: PRIMARY_COLORS[key] ? key : "indigo",
    dark,
  };
}

/** 主色调 key + 明暗 → 调色盘名。 */
export function buildPaletteName(key: string, dark: boolean): string {
  const k = PRIMARY_COLORS[key] ? key : "indigo";
  if (k === "indigo") return dark ? "dreamcat-dark" : "dreamcat";
  return `${PALETTE_PREFIX}-${k}${dark ? "-dark" : ""}`;
}
