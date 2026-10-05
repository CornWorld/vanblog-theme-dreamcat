# DreamCat for VanBlog

DreamCat 经典 Material 视觉的 VanBlog 主题移植版,承自 [LychApe/DreamCat](https://github.com/LychApe/DreamCat)(Typecho 主题,GPLv3)。

**布局/配色基准 = 2.x LTS 经典版**(`2.10.230801_LTS`):content-header 标题带、
顶部双卡(横幅 + 作者卡)、ImgMode 封面卡(标题压图)/文字模式卡、
timershaft index 卡(meta.timershaft_opt = A说说/B日志/C公告/D状态)、
post 页上叠卡(作者头 + 五色条 + 时间/字数/浏览 chips + detail-info 版权)、
页脚「关于 DreamCat」弹窗。3.x master 独有的 toolbar/sidebar/img-header
未纳入(避免混代)。

交互行为层使用 [`@vanblog/mdui-lite`](../../packages/mdui-lite)(mdui 1.0.2 的 DreamCat 裁剪 fork,MIT):drawer/dialog/snackbar/ripple 四类原语由其提供,`dc-*` CSS 只做品牌皮肤;裁剪范围与维护章程见该包 README。

视觉承接 **2.x LTS 经典版**(抽屉导航 / 大圆角软阴影卡片 / 五色装饰条 / 时间轴),工程上承接 **3.x 的现代化成果**(CSS token 化 / 目录树 / 代码复制 / 图片灯箱),并完成两件 Typecho 版没做的事:

- **去框架**:不再依赖 MDUI,全部视觉为现代原生 CSS(调色盘 token 驱动,无 Tailwind / React 运行时)
- **去 CMS 耦合**:数据面全部走 VanBlog L0 契约(SDK + PB),评论用平台内置 Artalk

## 页面

首页 / 文章(含密码解锁、上下篇、目录、访问计数)/ 归档 / 时间轴 / 搜索 / 分类、标签(索引+详情)/ 友链 / 关于 / 404 / permalink 直连桩。

数据来源均为平台层:文章与分类标签走 `pb.vanblog.*` 与 PB collections;**社交图标、友链、赞赏码、导航、备案号**全部来自站点配置(`site.socials / links / rewards / nav / beian*`),后台改配置即可,无需改主题。

## 主题设置(theme.json settings)

| key | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `footerText` | text | 空 | 页脚附言 |
| `drawerBgUrl` | string | 空 | 抽屉顶部背景图(留空用主题色渐变) |
| `heroImageUrl` | string | 空 | 首页 Hero 背景图(留空用主题色渐变) |
| `showListCover` | boolean | true | 列表/文章页显示封面图(关闭后列表走文字模式卡) |
| `showToc` | boolean | true | 文章页目录(宽屏面板 + 窄屏弹层) |
| `showLightbox` | boolean | true | 文章图片灯箱 |
| `showClickHearts` | boolean | false | 点击爱心特效(2.x axtx 移植) |
| `showBackToTop` | boolean | true | 回到顶部按钮(带 2.x 彩蛋文案) |
| `showThemePicker` | boolean | true | 左下角调色盘按钮:访客可选 19 主色 / 16 强调色 / 亮·暗·自动(移植 3.x dreamcat-theme-dialog,存 localStorage `dreamcat-theme-settings`) |
| `fontFamily` | select | `jetbrains-mono` | 正文字体(主题自带):`jetbrains-mono` / `smiley`(得意黑)/ `system`,对齐 v3 `DC_CustomFontRadio` |

站点级「自定义 CSS / JS / Head / HTML」由平台注入,主题已在 BaseLayout 接线(`site.customCss` 等),无需主题设置。

## 调色盘与访客配色

**主色调 / 明暗模式 → 平台调色盘机制**。`scripts/gen-palettes.mjs` 依据
`src/lib/mduiColors.mjs`(与弹窗共用的 v3 MDUI 色表)生成
`dreamcat-<key>` / `dreamcat-<key>-dark` 共 38 个纯数据调色盘
(19 主色 × 亮/暗,indigo 基准即 `dreamcat` / `dreamcat-dark`)。
弹窗选主色/模式 = 写 `vanblog-palette`(平台语义),link 热交换 +
`html.dark` 翻转全由平台机制驱动,后台调色盘列表同样可见可选。

**强调色 → 主题层**。平台调色盘只有 `--color-accent` 一个强调槽,没有
mdui 的 primary+accent 双维度,16 个强调色落在主题 `--dc-pink`
(存 localStorage `dreamcat-theme-settings.accent`,对齐 v2 存储键)。

主色/强调色背景上的文字与图标颜色按 WCAG 相对亮度实时计算,不查表。

## 开发

```bash
# 在 vanblog 主仓库内
cd themes/dreamcat
pnpm dev        # http://localhost:4321
pnpm check      # astro check
pnpm build      # 产出 dist/(theme.json + dist/ 即可安装)
```

安装到已运行站点:把 `theme.json + dist/` 放入主题卷 `/var/lib/vanblog/themes/dreamcat`(或 `./vanblog.sh pack theme install <目录>`),Caddy themeWatcher 自动发现,后台切换 `site.activeTheme` 即热切换。

> 注意:自建 dist 里对 `piccolore` 等平台依赖是裸导入,运行时从 workspace 根的
> node_modules 解析;用户主题卷内需保证解析链(容器内置主题在 /build/themes
> 依赖 /build/node_modules,自装主题可用 `ln -s` 把 workspace node_modules
> 链到主题卷根)。

## 结构

```
src/
├── layouts/BaseLayout.astro   # 外壳: 抽屉 + 顶栏 + SEO/JSON-LD + palette 注入 + pack/自定义代码注入
├── layouts/PackPage.astro     # Pack 页宿主
├── components/                # Drawer / PostCard / AuthorCard / SocialLinks / Comments(Artalk) / Toc / PostEffects / Footer / ...
├── lib/                       # base(路径) / dates / sanitizeHtml / mdDom(代码块DOM对齐) / toc / socials(图标注册表)
├── styles/global.css          # 全部视觉: --dc-* 语义 token 映射 --color-* 原子调色盘
└── pages/                     # 10 个 public 页面 + api/unlock(密码解锁中继)
```

## 版权

继承 DreamCat 的 GPLv3 与附加条款;页面页脚保留「DreamCat Theme」原版权声明按钮。
