import type { HeadConfig } from "vuepress";

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
      href: `/images/icons/favicon-16x16.png`,
    },
  ],
  [
    "link",
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: `/images/icons/favicon-32x32.png`,
    },
  ],
  [
    "link",
    { rel: "apple-touch-icon", href: `/images/icons/apple-touch-icon.png` },
  ],
  [
    "link",
    {
      rel: "mask-icon",
      href: "/images/icons/safari-pinned-tab.svg",
      color: "#3eaf7c",
    },
  ],
];

const seoConfig = [];

export const headConfig: HeadConfig[] = [...iconConfig, ...seoConfig];
