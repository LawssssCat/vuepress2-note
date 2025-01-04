内容将逐步向新地址迁移。
新地址：https://github.com/LawssssCat/blog

# Getting Started

```bash
pnpm docs:dev
```

+ Markdown语法基础： <https://commonmark.org/help/>
+ Markdown语法扩展： <https://v2.vuepress.vuejs.org/zh/guide/markdown.html#markdown>
  + emoji-cheat-sheet <https://github.com/ikatyang/emoji-cheat-sheet>
  + 自定义容器 <https://v2.vuepress.vuejs.org/zh/reference/default-theme/markdown.html>
+ Vuepress使用指南： <https://v2.vuepress.vuejs.org/zh/guide/getting-started.html>
+ Vuepress配置列表： <https://v2.vuepress.vuejs.org/zh/reference/config.html>

目录/文件说明：

```txt
├─ .vscode                  ⚙vscode配置文件
│  ├─ extensions.json       ⚙vscode插件列表
│  ├─ launch.json           ⚙vscode运行和调试配置
│  └─ settings.json         ⚙vscode工作空间配置（覆盖vscode全局配置）
├─ docs                     📝vuepress主要目录，存放其配置和文章
│  ├─ .vuepress             📝vuepress配置和资源文件
│  ├─ public                📝vuepress静态资源目录，编译后发布在根目录（在文章中用根目录"/"访问其中文件）
│  ├─ config.ts             📝vuepress配置文件
│  └─ README.md             📝vuepress内容首页
├─ .gitattributes           🐈‍⬛git文件属性配置
├─ .gitignore               🐈‍⬛git忽略配置
├─ .prettierignore          🤖vscode插件"prettier"配置（代码格式化）
├─ package.json             🤖项目依赖和入口脚本
├─ pnpm-lock.yaml           🤖项目依赖-lock
└─ README.md                💡项目说明 <--- this file
```

文章 frontmatter \
<https://v2.vuepress.vuejs.org/zh/reference/frontmatter.html>

```yaml
title: 标题 （被搜索）
description: 描述 （被搜索）
tags:
  - 标签 （被搜索）
date: 日期 yyyy-MM-dd （被搜索）
```
