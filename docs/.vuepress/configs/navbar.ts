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
      {
        text: "音视频",
        children: ["/art/ffmpeg"],
      },
    ],
  },
  {
    text: "硬件笔记",
    children: ["/hardware/indicator/", "/hardware/gpu/"],
  },
  {
    text: "网络笔记",
    link: "/network/",
  },
  {
    text: "开发笔记",
    children: [
      {
        text: "算法与数据结构",
        link: "/dev/algorithm/",
        children: [],
      },
      {
        text: "前端技术",
        children: [
          {
            text: "JavaScript",
            link: "/dev/front-end/js/",
          },
        ],
      },
      {
        text: "后端技术",
        link: "/dev/back-end/",
        children: [
          {
            text: "Java",
            link: "/dev/java/java/",
          },
          {
            text: "Python",
            link: "/dev/python/",
          },
          {
            text: "Shell",
            link: "/dev/shell/",
          },
        ],
      },
      {
        text: "后端业务",
        children: [
          {
            text: "工作流（workflow）",
            link: "/dev/back-end/workflow/",
          },
          {
            text: "及时通讯（IM）",
            link: "/dev/back-end/im/",
          },
        ],
      },
      // {
      //   text: "Go开发",
      //   children: [],
      // },
      // {
      //   text: "Rust开发",
      //   children: [],
      // },
      // {
      //   text: "大数据开发",
      //   link: "/dev/big-data/",
      //   children: [],
      // },
      {
        text: "逆向技术",
        children: [
          {
            text: "Android",
            link: "/dev/reverse/android/",
          },
          {
            text: "Web",
            link: "/dev/reverse/web/",
          },
        ],
      },
      {
        text: "开发工具",
        children: [
          {
            text: "Idea",
            link: "/tool/idea/",
          },
          {
            text: "Apifox",
            link: "/tool/apifox/",
          },
        ],
      },
    ],
  },
  {
    text: "运维笔记",
    link: "/ops/structure/",
  },
  {
    text: "安全笔记",
    link: "/security/",
  },
  {
    text: "管理笔记",
    children: [
      {
        text: "软件设计",
        children: ["/management/design/uml.md"],
      },
      {
        text: "测试管理",
        children: ["/management/test/"],
      },
      {
        text: "Web项目",
        children: [
          {
            text: "若依",
            link: "/management/project/ruoyi-vue/",
          },
          {
            text: "芋道（若依pro）",
            link: "/management/project/ruoyi-vue-pro/",
          },
        ],
      },
    ],
  },
  {
    text: "脑洞工具",
    link: "/tool/mediaplayer/mpv.md",
  },
];
