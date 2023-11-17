import { defineUserConfig, defaultTheme } from "vuepress";
import { headConfig } from "./configs/index";
import { navbarConfig, sidebarConfig } from "./configs/index";

export default defineUserConfig({
  // set site base to default value
  base: "/vuepress2-node/",

  // extra tags in `<head>`
  head: [...headConfig],

  // site-level locales config
  locales: {
    "/": {
      lang: "zh-CN",
      title: "浮世随记",
      description: "浮沉聚散不定于世，随心记录不尽“无聊”琐事",
    },
    "/en/": {
      lang: "en-US",
    },
  },

  // configure default theme
  theme: defaultTheme({
    // logo: "/pi.svg",
    repo: "lawsssscat/vuepress2-note",
    docsBranch: "master",
    docsDir: "docs",

    colorMode: "dark",

    locales: {
      "/": {
        navbar: navbarConfig,
        sidebar: sidebarConfig,
        selectLanguageName: "简体中文",
        selectLanguageText: "选择语言",
        selectLanguageAriaLabel: "选择语言",
        // page meta
        editLinkText: "在 GitHub 上编辑此页",
        lastUpdatedText: "上次更新",
        contributorsText: "贡献者",
        // custom containers
        tip: "提示",
        warning: "注意",
        danger: "警告",
        // 404 page
        notFound: [
          "这里什么都没有",
          "我们怎么到这来了？",
          "这是一个 404 页面",
          "看起来我们进入了错误的链接",
        ],
        // a11y
        openInNewWindow: "在新窗口打开",
        toggleColorMode: "切换颜色模式",
        toggleSidebar: "切换侧边栏",
      },
      "/en/": {
        selectLanguageName: "English（未开发）",
        selectLanguageText: "Languages",
        selectLanguageAriaLabel: "Select language",
      },
    },
  }),
});
