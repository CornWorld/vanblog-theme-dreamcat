# @vanblog/mdui-lite

[mdui](https://github.com/zdhxiong/mdui) v1.0.2(MIT)的 DreamCat 裁剪 fork:
只保留 DreamCat 用到的 **5 个交互件**,为 VanBlog `themes/dreamcat` 主题提供
Material 交互行为层(视觉皮肤仍由主题的 `dc-*` CSS 负责)。

## 保留范围

| 保留 | 内容 |
| --- | --- |
| 交互件 | drawer / dialog(含 alert/confirm/prompt)/ snackbar / ripple / collapse / menu(分享与赞赏弹出的菜单) |
| 公共层 | jq.ts(mdui.jq 装配)/ jq_extends / utils / global(mutation)/ interfaces |
| 样式 | 上游「不能删除」段(mixin/variable/normalize/global)+ button(被 dialog/snackbar 依赖)+ 5 件套样式 |
| 裁掉 | 其余 21 个组件;颜色矩阵/图标/Roboto/栅格/排版等「可删除」样式段 |

源文件除 `src/index.ts`、`src/index.less` 与构建配置外**逐字保留自上游**,
便于日后与 v1.0.2 tag diff。

## 维护承诺

- **范围内 5 件**:bug / 安全 / 集成问题主动维护。
- **范围外(裁掉的 21 个组件与样式段)**:不维护;有 issue 时按需评估是否纳入。
- **上游**:mdui 1.x 已冻结于 v1.0.2(上游主力在 mdui 2 / MD3 线),本 fork **零合并负担**;不跟踪 mdui 2。
- **被动维护项**:浏览器 API 弃用时修复;不主动追新特性。

## 构建

```bash
pnpm build     # dist/mdui-lite.js (ESM) + dist/mdui-lite.css
pnpm typecheck # tsc --noEmit
```

## 与上游的差异

- `src/index.ts` / `src/index.less`:裁剪入口(组件装配表)
- `vite.config.ts` / `package.json` / `tsconfig.json`:构建现代化(vite lib 模式,ES2020 target)
- 其余源文件与上游 v1.0.2 逐字一致
