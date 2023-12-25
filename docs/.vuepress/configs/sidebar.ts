/**
 * 参考： https://juejin.cn/post/7045168740643635237
 */
import type { SidebarConfig } from "vuepress";
import { generateSidebarConfig } from "./sidebarUtils";

export const sidebarConfig: SidebarConfig = generateSidebarConfig({
  "/travel/": [
    "README.md",
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
      children: ["java/", "java/interview.md"],
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
  "/dev/tool/": [
    "terminal/",
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
      text: "数据库",
      children: ["oracle/database.md", "mysql/", "redis/"],
    },
    {
      text: "容器编排",
      children: ["k8s/"],
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
});
