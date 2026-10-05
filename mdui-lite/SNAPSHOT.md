# mdui-lite/ — DreamCat 主题的交互层包(本仓库正式组成部分)

mdui v1.0.2(MIT,© zdhxiong)按"减法"裁剪的 DreamCat 发行版:
保留 drawer/dialog(含 alert/confirm/prompt)/snackbar/ripple/collapse/menu/
textfield/tab/select/tooltip/headroom 等契约组件与 --mdui-* CSS 变量调色板层;
调色板全面变量化(19 主色/16 强调色, body 类切换)。

**规范源 = 本目录**。vanblog 主仓 `packages/mdui-lite` 是同一内容的镜像副本
(供主仓工作区构建使用), 两边同步时以先改动一方为准并在 commit message
标注对应提交(当前基准: vanblog 8d02066)。

## 维护章程
- 范围内组件: bug/安全/集成问题主动维护
- 裁掉的组件: 不维护, issue 触发评估
- 上游 mdui 1.x 已冻结(v1.0.2 终版), 零合并负担; 不跟踪 mdui 2
