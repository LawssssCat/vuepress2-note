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
    children: [
      "/ops/structure/",
      {
        text: "操作系统",
        link: "/ops/os/",
        children: [],
      },
      {
        text: "软件包管理",
        link: "/ops/pkg/yum.md",
        children: [],
      },
      {
        text: "DevOps",
        link: "/ops/cicd/github-actions.md",
        children: [],
      },
      {
        text: "网络中间件",
        link: "/ops/nginx/",
        children: [],
      },
      {
        text: "数据库",
        link: "/ops/oracle/database.md",
        children: [],
      },
      {
        text: "虚拟化技术",
        link: "/ops/vmware/",
        children: [],
      },
      {
        text: "容器技术",
        link: "/ops/podman/",
        children: [],
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
    children: [
      {
        text: "资源管理器",
        children: [
          {
            text: "OneCommander",
            link: "/tool/explorer/onecommander.md",
          },
        ],
      },
      {
        text: "终端界面",
        children: [
          {
            text: "Terminal",
            link: "/tool/terminal/",
          },
        ],
      },
      {
        text: "包管理",
        children: [
          {
            text: "WinGet",
            link: "/tool/package/winget.md",
          },
          {
            text: "Scoop",
            link: "/tool/package/scoop.md",
          },
        ],
      },
      {
        text: "版本管理",
        children: [
          {
            text: "Git",
            link: "/tool/git/",
          },
        ],
      },
      {
        text: "博客",
        children: [
          {
            text: "Vuepress",
            link: "/tool/vuepress/",
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
