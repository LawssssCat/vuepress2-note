/**
 * 参考： https://juejin.cn/post/7045168740643635237
 */
import type { SidebarConfig } from "vuepress";
import { generateSidebarConfig } from "./sidebarUtils";

export const sidebarConfig: SidebarConfig = generateSidebarConfig({
  "/travel/": [],
  "/art/": [
    {
      text: "绘图",
      children: ["pix/README.md", "svg/README.md"],
    },
  ],
  "/dev/ruoyi-vue/": ["/*"],
  "/dev/ruoyi-vue-pro/": ["/*"],
  "/dev/vue/": [
    {
      text: "vue",
      link: "/*",
    },
  ],
  "/post/": [
    {
      text: "2023",
      children: ["2023/*"],
    },
  ],
});
