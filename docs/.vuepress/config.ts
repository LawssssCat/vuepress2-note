import process from "node:process";
import { defineUserConfig, defaultTheme } from "vuepress";
import { getDirname, path } from "@vuepress/utils";
import { googleAnalyticsPlugin } from "@vuepress/plugin-google-analytics";
import { registerComponentsPlugin } from "@vuepress/plugin-register-components";
import { searchPlugin } from "@vuepress/plugin-search";
import { headConfig, tagAliasMapConfig } from "./configs/index";
import { baseConfig, navbarConfig, sidebarConfig } from "./configs/index";
import appRoot from "app-root-path";

// 获取 ".vupress" 目录的绝对路径
const __dirname = appRoot.resolve("docs/.vuepress/");

export default defineUserConfig({
  // set site base to default value
  base: baseConfig,

  // extra tags in `<head>`
  head: [...headConfig],

  markdown: {
    headers: {
      level: [2, 3, 4],
    },
    importCode: {
      handleImportPath: (str) => {
        str = str.replace(
          /^@code\/java/,
          path.resolve(appRoot.path, "code/demo-java/src")
        );
        str = str.replace(
          /^@code\/python/,
          path.resolve(appRoot.path, "code/demo-python/")
        );
        return str;
      },
    },
  },

  // site-level locales config
  locales: {
    "/": {
      lang: "zh-CN",
      title: "浮世随记",
      description: "浮沉聚散不定于世，随心记录不尽琐事",
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
    sidebarDepth: 4,

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

  plugins: [
    // google 分析插件
    googleAnalyticsPlugin({
      // we have multiple deployments, which would use different id
      id: process.env.DOCS_GA_ID ?? "",
    }),
    // search 插件
    searchPlugin({
      maxSuggestions: 10,
      locales: {
        "/": {
          placeholder: "搜索",
        },
        "/en/": {
          placeholder: "Search",
        },
      },
      getExtraFields: (page) => {
        // 默认情况下，该插件会将页面标题和小标题作为搜索索引
        let extra = new Set<string>();
        // 标签 Frontmatter 中的 `tags`
        if (page.frontmatter.tags && page.frontmatter.tags instanceof Array) {
          page.frontmatter.tags.forEach((tag) => {
            // console.log(page.title, "-", tag);
            const tagLower = tag.toLowerCase();
            extra.add(tagLower);
            const arr = tagAliasMapConfig[tagLower];
            if (arr) arr.forEach((i) => extra.add(i));
          });
        }
        // 描述 Frontmatter 中的 `description`
        if (page.frontmatter.description) {
          extra.add(page.frontmatter.description);
        }
        // 日期 Page 中的 `date` '2020-09-09'
        if (page.date) {
          extra.add(page.date);
        }
        return Array.from(extra);
      },
    }),
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, "./components"),
    }),
  ],
});
