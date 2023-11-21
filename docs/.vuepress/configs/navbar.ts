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
    text: "语言笔记",
    children: [
      {
        text: "英语",
        children: ["/language/english/"],
      },
    ],
  },
  {
    text: "美术笔记",
    children: [
      {
        text: "绘图",
        children: ["/art/svg/", "/art/pixel/", "/art/stable-diffusion/"],
      },
    ],
  },
  {
    text: "开发笔记",
    children: [
      {
        text: "前端开发",
        children: [
          {
            text: "JavaScript",
            link: "/dev/front-end/js/",
          },
          {
            text: "TypeScript",
            link: "/dev/front-end/ts/",
          },
          {
            text: "vue",
            ariaLabel: "Vue 开发笔记",
            link: "/dev/front-end/vue/",
          },
        ],
      },
      {
        text: "后端开发",
        children: [
          {
            text: "Java",
            link: "/dev/java/java/",
          },
          {
            text: "Spring",
            link: "/dev/java/spring/",
          },
          { text: "Spring Cloud", link: "/dev/java/spring-cloud/" },
        ],
      },
      {
        text: "开发工具",
        children: [
          {
            text: "Apifox",
            link: "/dev/tool/apifox/",
          },
        ],
      },
      {
        text: "集成项目",
        children: [
          {
            text: "若依",
            link: "/dev/project/ruoyi-vue/",
          },
          {
            text: "芋道（若依pro）",
            link: "/dev/project/ruoyi-vue-pro/",
          },
        ],
      },
    ],
  },
  {
    text: "运维笔记",
    children: [
      "/ops/structure/",
      {
        text: "容器技术",
        children: [{ text: "Kubernetes", link: "/ops/k8s/" }],
      },
      {
        text: "监控工具",
        children: [{ text: "Zabbix", link: "/ops/zabbix/" }],
      },
      {
        text: "堡垒机",
        children: [{ text: "JumpServer", link: "/ops/jumpserver/" }],
      },
    ],
  },
  {
    text: "硬件笔记",
    children: ["/hardware/gpu/"],
  },
  {
    text: "脑洞工具",
    children: [
      {
        text: "博客",
        children: [
          {
            text: "Vuepress",
            link: "/dev/tool/vuepress/",
          },
          {
            text: "Hugo",
            link: "https://lawsssscat.github.io/hugo-usage-doc/",
          },
        ],
      },
    ],
  },
];
