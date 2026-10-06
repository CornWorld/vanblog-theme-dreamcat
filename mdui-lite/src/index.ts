// mdui-lite 裁剪入口:只装配 DreamCat 用到的交互件。
// 裁剪自 mdui 1.0.2 (MIT, © zdhxiong), 裁剪原则与维护承诺见 README.md。

import mdui from './mdui';

import './jq';
import './global/mutation';

import './components/collapse';
import './components/collapse/customAttr';
import './components/ripple';
import './components/drawer';
import './components/drawer/customAttr';
import './components/dialog';
import './components/dialog/customAttr';
import './components/dialog/dialog';
import './components/dialog/alert';
import './components/dialog/confirm';
import './components/dialog/prompt';
import './components/textfield';
import './components/menu';
import './components/menu/customAttr';
import './components/snackbar';
import './components/slider';
import './components/bottom_nav';
import './components/table';
import './components/panel';
import './components/panel/customAttr';
import './components/headroom';
import './components/appbar';
import './components/headroom/customAttr';
import './components/tab';
import './components/tab/customAttr';
import './components/tooltip';
import './components/tooltip/customAttr';
import './components/select';
import './components/select/customAttr';

// 样式入口(裁剪版 less,产物为单一 css)
import './index.less';

// 全局暴露: 与上游 UMD 产物行为一致。DreamCat 等 PHP 主题无构建器, 经 window.mdui 使用。
(globalThis as unknown as { mdui: unknown }).mdui = mdui;

export default mdui;
