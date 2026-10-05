/**
 * DreamCat 的 MDUI 色板(v3 dreamcat.js 的 mdui-theme 主色/强调色表)。
 * 纯数据 .mjs:主题 TS 与调色盘生成脚本(scripts/gen-palettes.mjs)共用,
 * 保证「弹窗选色」与「平台调色盘目录」永远同一套色值。
 *
 * 主色调在调色盘体系里占据 --color-accent 槽位(平台只有这一个强调槽):
 * 亮色 palette 用 Material 500,暗色用 300(暗底提亮);amber/lime/yellow
 * 等浅色上的文字/图标需深色(运行时按相对亮度计算,见 lib/color.ts)。
 */

/** @type {Record<string, {c500: string, c300: string, on: string}>} */
export const PRIMARY_COLORS = {
  amber: { c500: "#ffc107", c300: "#ffd54f", on: "#212121" },
  blue: { c500: "#2196f3", c300: "#64b5f6", on: "#ffffff" },
  "blue-grey": { c500: "#607d8b", c300: "#90a4ae", on: "#ffffff" },
  brown: { c500: "#795548", c300: "#a1887f", on: "#ffffff" },
  cyan: { c500: "#00bcd4", c300: "#4dd0e1", on: "#212121" },
  "deep-orange": { c500: "#ff5722", c300: "#ff8a65", on: "#ffffff" },
  "deep-purple": { c500: "#673ab7", c300: "#9575cd", on: "#ffffff" },
  green: { c500: "#4caf50", c300: "#81c784", on: "#212121" },
  grey: { c500: "#9e9e9e", c300: "#bdbdbd", on: "#212121" },
  indigo: { c500: "#3f51b5", c300: "#7986cb", on: "#ffffff" },
  "light-blue": { c500: "#03a9f4", c300: "#4fc3f7", on: "#212121" },
  "light-green": { c500: "#8bc34a", c300: "#aed581", on: "#212121" },
  lime: { c500: "#cddc39", c300: "#e6ee9c", on: "#212121" },
  orange: { c500: "#ff9800", c300: "#ffb74d", on: "#212121" },
  pink: { c500: "#e91e63", c300: "#f06292", on: "#ffffff" },
  purple: { c500: "#9c27b0", c300: "#ba68c8", on: "#ffffff" },
  red: { c500: "#f44336", c300: "#e57373", on: "#ffffff" },
  teal: { c500: "#009688", c300: "#4db6ac", on: "#ffffff" },
  yellow: { c500: "#ffeb3b", c300: "#fff59d", on: "#212121" },
};

/** @type {Record<string, string>} */
export const ACCENT_COLORS = {
  amber: "#ffc400",
  blue: "#448aff",
  cyan: "#18ffff",
  "deep-orange": "#ff6e40",
  "deep-purple": "#7c4dff",
  green: "#69f0ae",
  indigo: "#536dfe",
  "light-blue": "#40c4ff",
  "light-green": "#b2ff59",
  lime: "#eeff41",
  orange: "#ffab40",
  pink: "#ff4081",
  purple: "#e040fb",
  red: "#ff5252",
  teal: "#64ffda",
  yellow: "#ffff00",
};

/** 强调色作背景(FAB 等)时,其上图标用深色的浅色 A200 集合。 */
export const ACCENT_DARK_ICON = new Set([
  "amber",
  "cyan",
  "green",
  "light-green",
  "lime",
  "teal",
  "yellow",
]);

/** 调色盘命名约定:dreamcat[-<key>][-dark];dreamcat 即 indigo 基准。 */
export const PALETTE_PREFIX = "dreamcat";

/**
 * 相对亮度(WCAG):hex(#rgb/#rrggbb)→ 0~1;≥0.5 视为浅底用深字。
 * @param {string} hex
 * @returns {number}
 */
export function relativeLuminance(hex) {
  const m = hex.replace("#", "");
  const v =
    m.length === 3
      ? m.split("").map((c) => c + c).join("")
      : m.padEnd(6, "0").slice(0, 6);
  const num = Number.parseInt(v, 16);
  if (Number.isNaN(num)) return 0;
  // eslint-disable-next-line no-bitwise
  const r = (num >> 16) & 255, g = (num >> 8) & 255, b = num & 255;
  const lin = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

/** 浅底 → 深字。 */
export function onColor(hex) {
  return relativeLuminance(hex) >= 0.5 ? "#212121" : "#ffffff";
}
