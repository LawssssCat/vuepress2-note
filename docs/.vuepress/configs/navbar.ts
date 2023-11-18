import type { NavbarConfig } from "vuepress";

export const navbarConfig: NavbarConfig = [
  {
    text: "生活随笔",
    link: "/post/",
  },
  {
    text: "旅游日志",
    link: "/travel/",
  },
  {
    text: "美术笔记",
    children: [
      {
        text: "绘图",
        children: [
          "/art/svg/",
          {
            text: "像素图片",
            link: "/art/pix",
          },
        ],
      },
    ],
  },
  {
    text: "开发笔记",
    children: [
      {
        text: "前端开发",
        children: [
          "/dev/js/",
          "/dev/ts/",
          {
            text: "vue",
            ariaLabel: "Vue 开发笔记",
            link: "/dev/vue/",
          },
        ],
      },
      {
        text: "后端开发",
        children: ["/dev/java/"],
      },
      {
        text: "开发工具",
        children: ["/dev/apifox/"],
      },
      {
        text: "集成项目",
        children: [
          {
            text: "若依",
            link: "/dev/ruoyi-vue/",
          },
          {
            text: "芋道（若依pro）",
            link: "/dev/ruoyi-vue-pro/",
          },
        ],
      },
    ],
  },
  {
    text: "运维笔记",
    children: [
      {
        text: "容器技术",
        children: ["/ops/k8s/"],
      },
      {
        text: "监控工具",
        children: ["/ops/zabbix/"],
      },
    ],
  },
  {
    text: "脑洞工具",
    children: [
      {
        text: "博客",
        children: [
          "/dev/vuepress/",
          {
            text: "hugo",
            link: "https://lawsssscat.github.io/hugo-usage-doc/",
          },
        ],
      },
    ],
  },
];
