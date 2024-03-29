/**
 * 参考： https://juejin.cn/post/7045168740643635237
 */
import type { SidebarConfig } from "vuepress";
import { generateSidebarConfig } from "./sidebarUtils";

export const sidebarConfig: SidebarConfig = generateSidebarConfig({
  "/travel/": [
    "README.md",
    "common-sense.md",
    "car.md",
    {
      text: "中国",
      children: ["cn/guangdong-dongguan.md"],
    },
  ],
  "/art/": [
    {
      text: "绘图",
      children: ["pixel/", "svg/", "ascii-art.md", "stable-diffusion/"],
    },
    {
      text: "音视频",
      children: ["ffmpeg/"],
    },
  ],
  "/management/": [
    {
      text: "软件设计",
      children: ["design/uml.md"],
    },
    {
      text: "测试管理",
      children: ["test/"],
    },
    {
      text: "Web项目",
      children: [
        {
          text: "若依",
          link: "project/ruoyi-vue/",
        },
        {
          text: "芋道（若依pro）",
          link: "project/ruoyi-vue-pro/",
        },
      ],
    },
  ],
  "/dev/project/": ["ruoyi-vue/", "ruoyi-vue-pro/"],
  "/dev/algorithm/": ["README.md", "java.md"],
  "/dev/reverse/": [
    {
      text: "Android",
      children: ["android/"],
    },
    {
      text: "Web",
      children: ["web/"],
    },
  ],
  "/dev/front-end/": [
    {
      text: "JavaScript",
      children: ["js/", "js/wtf-syntax-meaning.md"],
    },
    {
      text: "TypeScript",
      children: ["ts/", "ts/wtf-syntax-meaning.md"],
    },
    {
      text: "Vue",
      children: ["vue/", "vue/wtf-syntax-meaning.md"],
    },
  ],
  "/dev/back-end/workflow/": ["README.md", "activiti.md", "flowable.md"],
  "/dev/back-end/im/": ["README.md"],
  "/dev/c/": [
    "README.md",
    {
      text: "C/C++编译笔记",
      link: "build.md",
      children: ["gcc.md", "gpp.md", "makefile.md", "cmake.md"],
    },
    {
      text: "库",
      children: ["lib/openssl.md"],
    },
  ],
  "/dev/java/": [
    {
      text: "Java",
      children: [
        "java/",
        "java/jdk-io.md",
        "java/jdk-process.md",
        "java/lambda.md",
        {
          text: "Java 测试笔记",
          children: [
            "test/native.md",
            "test/junit.md",
            "test/mockito.md",
            "test/surefire.md",
            "test/jacoco.md",
          ],
        },
        "java/interview.md",
      ],
    },
    {
      text: "构建工具",
      children: ["build/", "build/maven.md"],
    },
    {
      text: "Spring",
      children: ["spring/", "spring/interview.md"],
    },
    {
      text: "Spring Security",
      children: ["spring/spring-security.md"],
    },
    {
      text: "Spring Cloud",
      children: ["spring-cloud/", "spring-cloud/interview.md"],
    },
    {
      text: "Mybatis",
      children: ["mybatis/"],
    },
  ],
  "/dev/python/": [
    "README.md",
    "python-build.md",
    "syntax.md",
    "pip.md",
    "pyinstaller.md",
    "jupyter.md",
    "python-network.md",
  ],
  "/dev/shell/": ["README.md", "syntax.md"],
  "/tool/": [
    {
      text: "资源管理器",
      children: ["explorer/onecommander.md"],
    },
    {
      text: "媒体播放器",
      children: ["mediaplayer/mpv.md", "mediaplayer/vlc.md"],
    },
    {
      text: "终端界面",
      children: ["terminal/"],
    },
    {
      text: "包管理",
      children: ["package/winget.md", "package/scoop.md"],
    },
    {
      text: "版本管理",
      children: ["git/"],
    },
    {
      text: "Idea",
      children: ["idea/"],
    },
    {
      text: "博客",
      children: [
        "vuepress/",
        {
          text: "Hugo",
          link: "https://lawsssscat.github.io/hugo-usage-doc/",
        },
      ],
    },
  ],
  "/ops/": [
    {
      text: "体系架构",
      link: "structure.md",
    },
    {
      text: "操作系统",
      children: [
        "os/",
        "os/internal.md",
        "os/busybox.md",
        "os/busybox-src.md",
        "os/ubuntu.md",
        "os/fedora.md",
        "os/open-euler.md",
      ],
    },
    {
      text: "软件包管理",
      children: ["pkg/yum.md"],
    },
    {
      text: "文件同步",
      children: [
        "sync/",
        "sync/rsync.md",
        "sync/freefilesync.md",
        "sync/syncthing.md",
      ],
    },
    {
      text: "DevOps",
      children: ["cicd/github-actions.md"],
    },
    {
      text: "网络中间件",
      children: ["nginx/"],
    },
    {
      text: "数据库",
      children: [
        "oracle/database.md",
        "mysql/",
        "postgresql/",
        "redis/",
        {
          text: "内存数据库",
          children: ["sqlite.md", "h2.md"],
        },
      ],
    },
    {
      text: "虚拟化技术",
      children: ["vmware/", "vagrant/", "wsl/"],
    },
    {
      text: "容器编排",
      children: ["docker.md", "podman/", "k8s/"],
    },
    {
      text: "监控",
      children: ["zabbix/", "nightingale/"],
    },
    {
      text: "堡垒机",
      children: ["jumpserver/"],
    },
    {
      text: "自动装机",
      children: ["kickstart/"],
    },
  ],
  "/post/": [
    {
      text: "2023",
      children: ["2023/*"],
    },
  ],
  "/hardware/": [
    {
      text: "说明",
      link: "README.md",
    },
    "indicator/",
    "cpu.md",
    {
      text: "GPU",
      children: ["gpu/"],
    },
  ],
  "/network/": [
    "README.md",
    {
      text: "路由系统（ROS）",
      children: ["openwrt.md"],
    },
    {
      text: "虚拟私人网络（VPN）",
      children: ["openvpn.md"],
    },
    {
      text: "防火墙（Firewall）",
      children: ["pfsense.md"],
    },
  ],
  "/security/": ["README.md", "kali.md", "python.md"],
});
