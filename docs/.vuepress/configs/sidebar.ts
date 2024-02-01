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
      children: ["pixel/", "svg/", "stable-diffusion/"],
    },
    {
      text: "音视频",
      children: ["ffmpeg/"],
    },
  ],
  "/management/": [
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
  "/dev/java/": [
    {
      text: "Java",
      children: [
        "java/",
        "java/lambda.md",
        {
          text: "Java 测试笔记",
          children: [
            "java/test/native.md",
            "java/test/junit.md",
            "java/test/mockito.md",
            "java/test/surefire.md",
            "java/test/jacoco.md",
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
  ],
  "/tool/": [
    {
      text: "资源管理器",
      children: ["explorer/onecommander.md"],
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
      children: ["vuepress/"],
    },
  ],
  "/ops/": [
    {
      text: "体系架构",
      link: "structure.md",
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
      children: ["oracle/database.md", "mysql/", "postgresql/", "redis/"],
    },
    {
      text: "虚拟化技术",
      children: ["vmware/", "wsl/"],
    },
    {
      text: "容器编排",
      children: ["podman/", "k8s/"],
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
    {
      text: "GPU",
      children: ["gpu/"],
    },
  ],
});
