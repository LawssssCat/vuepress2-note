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
          {
            text: "TypeScript",
            link: "/dev/front-end/ts/",
          },
          {
            text: "Vue",
            ariaLabel: "Vue 开发笔记",
            link: "/dev/front-end/vue/",
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
            text: "Spring",
            link: "/dev/java/spring/",
          },
          { text: "Spring Cloud", link: "/dev/java/spring-cloud/" },
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
      //   text: "Python开发",
      //   children: [],
      // },
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
        text: "WebBC项目",
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
            link: "/dev/tool/idea/",
          },
          {
            text: "Apifox",
            link: "/dev/tool/apifox/",
          },
        ],
      },
    ],
  },
  {
    text: "运维笔记",
    children: [
      "/ops/structure/",
      "/dev/tool/terminal/",
      {
        text: "网络中间件",
        children: [{ text: "Nginx", link: "/ops/nginx/" }],
      },
      {
        text: "数据库",
        children: [
          { text: "Oracle", link: "/ops/oracle/database.md" },
          { text: "MySQL", link: "/ops/mysql/" },
          { text: "PostgreSQL", link: "/ops/postgresql/" },
          { text: "Redis", link: "/ops/redis/" },
        ],
      },
      {
        text: "虚拟化技术",
        children: [
          {
            text: "VMware",
            link: "/ops/vmware/",
          },
          {
            text: "WSL",
            link: "/ops/wsl/",
          },
        ],
      },
      {
        text: "容器技术",
        children: [
          {
            text: "Podman",
            link: "/ops/podman/",
          },
          { text: "Kubernetes", link: "/ops/k8s/" },
        ],
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
