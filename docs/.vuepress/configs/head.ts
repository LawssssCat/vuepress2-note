import type { HeadConfig } from "vuepress";
// import { withBase } from "@vuepress/client";

function withBase(dir: string): string {
  return `/vuepress2-note${dir.startsWith("/") ? "" : "/"}${dir}`;
}

// Allowed tags in `<head>`
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head

// https://favicon.io
// https://cthedot.de/icongen/
const iconConfig: HeadConfig[] = [
  [
    "link",
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: withBase(`/images/icons/favicon-16x16.png`),
    },
  ],
  [
    "link",
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: withBase(`/images/icons/favicon-32x32.png`),
    },
  ],
  [
    "link",
    {
      rel: "apple-touch-icon",
      href: withBase(`/images/icons/apple-touch-icon.png`),
    },
  ],
  [
    "link",
    {
      rel: "mask-icon",
      href: withBase("/images/icons/safari-pinned-tab.svg"),
      color: "#3eaf7c",
    },
  ],
];

const seoConfig: HeadConfig[] = [
  ["meta", { name: "author", content: "lawsssscat" }],
  ["meta", { name: "keywords", content: "vuepress,随笔,笔记,日常,开发,旅游" }],
];

export const headConfig: HeadConfig[] = [...iconConfig, ...seoConfig];
