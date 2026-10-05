import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

export default defineConfig({
  build: {
    lib: {
      entry: fileURLToPath(new URL("./src/index.ts", import.meta.url)),
      name: "mduiLite",
      formats: ["es"],
      fileName: () => "mdui-lite.js",
    },
    cssCodeSplit: false,
    // 字体以独立文件产出(不内联 base64,避免 CSS 体积膨胀)
    assetsInlineLimit: 0,
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      // mdui.jq 为外部依赖?否 —— mdui 1.x 的组件面向全局 mdui 对象注册,
      // 独立使用时无第二消费方,直接内联打包,产物自包含。
      external: [],
    },
  },
});
