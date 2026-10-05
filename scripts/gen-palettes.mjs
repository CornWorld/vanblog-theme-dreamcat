#!/usr/bin/env node
/**
 * 生成 DreamCat 主色调调色盘目录(写仓库 hooks/palettes/,随仓库分发)。
 *
 * 平台调色盘是单 accent 槽,DreamCat 的「主色调」就映射到它:每个主色调
 * 生成 light(-<key>)/ dark(-<key>-dark)两个纯数据目录,弹窗选主色 =
 * setPalette(),完全走平台机制(link 热交换 + html.dark + 后台可选)。
 * `dreamcat` / `dreamcat-dark`(indigo 基准)已手工存在,不在此重复生成。
 *
 * 用法: node scripts/gen-palettes.mjs [输出目录=../../../hooks/palettes]
 */
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { PRIMARY_COLORS, PALETTE_PREFIX, onColor } from "../src/lib/mduiColors.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const outRoot = process.argv[2]
  ? join(process.cwd(), process.argv[2])
  : join(here, "../../../hooks/palettes");

const DARK_BG = "#303030";
const DARK_SURFACE = "#424242";
const DARK_TEXT = "#eeeeee";
const DARK_MUTED = "#9e9e9e";
const DARK_BORDER = "#575759";
const LIGHT_BG = "#f5f5f5";
const LIGHT_SURFACE = "#ffffff";
const LIGHT_TEXT = "#212121";
const LIGHT_MUTED = "#757575";
const LIGHT_BORDER = "#e0e0e0";

const label = (name) =>
  name
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

let made = 0;
for (const [key, c] of Object.entries(PRIMARY_COLORS)) {
  if (key === "indigo") continue; // 基准 dreamcat / dreamcat-dark 已存在

  const lightDir = join(outRoot, `${PALETTE_PREFIX}-${key}`);
  const darkDir = join(outRoot, `${PALETTE_PREFIX}-${key}-dark`);
  if (!existsSync(lightDir)) {
    mkdirSync(lightDir, { recursive: true });
    writeFileSync(
      join(lightDir, "palette.json"),
      `${JSON.stringify(
        {
          name: `${PALETTE_PREFIX}-${key}`,
          label: `DreamCat · ${label(key)}`,
          type: "light",
          version: "1.0.0",
          author: "LychApe / CornWorld",
          description: `DreamCat 主色调 ${key}(Material ${c.c500}), MDUI 灰底观感; 由 themes/dreamcat/scripts/gen-palettes.mjs 生成`,
        },
        null,
        2,
      )}\n`,
    );
    writeFileSync(
      join(lightDir, "tokens.css"),
      `/* DreamCat · ${label(key)}(亮色)— 生成文件,勿手改;源: themes/dreamcat/scripts/gen-palettes.mjs */
:root {
  --color-bg: ${LIGHT_BG};
  --color-surface: ${LIGHT_SURFACE};
  --color-text: ${LIGHT_TEXT};
  --color-text-muted: ${LIGHT_MUTED};
  --color-border: ${LIGHT_BORDER};
  --color-accent: ${c.c500};
}
`,
    );
    made++;
  }
  if (!existsSync(darkDir)) {
    mkdirSync(darkDir, { recursive: true });
    writeFileSync(
      join(darkDir, "palette.json"),
      `${JSON.stringify(
        {
          name: `${PALETTE_PREFIX}-${key}-dark`,
          label: `DreamCat · ${label(key)} · 暗`,
          type: "dark",
          version: "1.0.0",
          author: "LychApe / CornWorld",
          description: `DreamCat 主色调 ${key}(暗色 Material ${c.c300}), MDUI 暗色规范; 由 themes/dreamcat/scripts/gen-palettes.mjs 生成`,
        },
        null,
        2,
      )}\n`,
    );
    writeFileSync(
      join(darkDir, "tokens.css"),
      `/* DreamCat · ${label(key)}(暗色)— 生成文件,勿手改;源: themes/dreamcat/scripts/gen-palettes.mjs */
html.dark {
  --color-bg-dark: ${DARK_BG};
  --color-surface-dark: ${DARK_SURFACE};
  --color-text-dark: ${DARK_TEXT};
  --color-text-muted-dark: ${DARK_MUTED};
  --color-border-dark: ${DARK_BORDER};
  --color-accent-dark: ${c.c300};
}
`,
    );
    made++;
  }
  // on-color 只在运行时按亮度计算(lib/color.ts),palette 契约没有该槽位。
  void onColor;
}
console.log(`generated ${made} palette dirs under ${outRoot}`);
