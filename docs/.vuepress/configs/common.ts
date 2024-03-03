// Problem: (todo!)
// Error [ERR_MODULE_NOT_FOUND]: Cannot find package '@internal/pagesData' ...
// issue https://github.com/vuepress/vuepress-next/issues/1283 -- [unwork]
// import { withBase } from "@vuepress/client";

export const baseConfig = "/vuepress2-note/";

export function withBase(dir: string): string {
  return `${baseConfig}/${dir}`.replace("//", "/");
}

function arrayToLowerCase(arr: string[]) {
  return arr.map((t) => t.toLowerCase());
}

type TagAliasConfig = {
  alias: string[];
  tags: string[];
};

function genTagAliasConfig(
  map: Record<string, TagAliasConfig>
): Record<string, string[]> {
  const result: Record<string, string[]> = {};
  // 1 base
  Object.keys(map).forEach((key) => {
    const value = map[key];
    const keys = new Set<string>([key.toLowerCase(), ...value.alias]);
    const tags = new Set<string>([...keys, ...value.tags]);
    keys.forEach((k) => (result[k] = Array.from(tags)));
  });
  // 2 recursion
  Object.keys(result).forEach((key) => {
    result[key] = handleGenerateTagRescursion(result, result[key], []);
  });
  // 3
  return result;
}

function handleGenerateTagRescursion(
  map: Record<string, string[]>,
  raw: string[] | null,
  gen: string[]
): string[] {
  if (raw) {
    raw.forEach((tag) => {
      if (!gen.includes(tag)) {
        gen.push(tag);
        gen.push(...handleGenerateTagRescursion(map, map[tag], gen));
      }
    });
  }
  return gen;
}

// result search docs/.vuepress/.temp/internal/searchIndex.js
export const tagAliasMapConfig: Record<string, string[]> = genTagAliasConfig({
  开源: {
    alias: arrayToLowerCase([
      "OpenSource",
      "open source",
      "open-source",
      "open_source",
    ]),
    tags: arrayToLowerCase([]),
  },
  测试: {
    alias: arrayToLowerCase(["test"]),
    tags: arrayToLowerCase([]),
  },
  安全: {
    alias: arrayToLowerCase(["Security"]),
    tags: arrayToLowerCase([]),
  },
  验证: {
    alias: arrayToLowerCase(["Authentication"]),
    tags: arrayToLowerCase([]),
  },
  授权: {
    alias: arrayToLowerCase(["Authorization"]),
    tags: arrayToLowerCase([]),
  },
  JavaScript: {
    alias: arrayToLowerCase(["js"]),
    tags: arrayToLowerCase([]),
  },
  Java: {
    alias: arrayToLowerCase([]),
    tags: arrayToLowerCase([]),
  },
  Spring: {
    alias: arrayToLowerCase([]),
    tags: arrayToLowerCase(["Java"]),
  },
  SpringSecurity: {
    alias: arrayToLowerCase([
      "Spring Security",
      "Spring-Security",
      "Spring_Security",
    ]),
    tags: arrayToLowerCase(["安全", "验证", "授权"]),
  },
  SpringCloud: {
    alias: arrayToLowerCase(["spring cloud", "spring-cloud", "spring_cloud"]),
    tags: arrayToLowerCase(["Spring", "微服务"]),
  },
  微服务: {
    alias: arrayToLowerCase([]),
    tags: arrayToLowerCase([]),
  },
  JumpServer: {
    alias: arrayToLowerCase([]),
    tags: arrayToLowerCase(["堡垒机", "开源"]),
  },
  堡垒机: {
    alias: arrayToLowerCase([]),
    tags: arrayToLowerCase(["跳板机"]),
  },
  Kubernetes: {
    alias: arrayToLowerCase(["k8s"]),
    tags: arrayToLowerCase(["容器编排", "微服务"]),
  },
  运维: {
    alias: arrayToLowerCase(["operator"]),
    tags: arrayToLowerCase([]),
  },
  GPU: {
    alias: arrayToLowerCase(["显卡"]),
    tags: arrayToLowerCase([]),
  },
  tool: {
    alias: arrayToLowerCase(["tools", "util", "utils", "工具"]),
    tags: arrayToLowerCase([]),
  },
  blog: {
    alias: arrayToLowerCase(["博客"]),
    tags: arrayToLowerCase([]),
  },
  vuepress: {
    alias: arrayToLowerCase([]),
    tags: arrayToLowerCase(["博客"]),
  },
  面试: {
    alias: arrayToLowerCase(["interview"]),
    tags: arrayToLowerCase([]),
  },
  Language: {
    alias: arrayToLowerCase(["语言"]),
    tags: arrayToLowerCase(["听力", "口语", "写作", "听", "说", "读", "写"]),
  },
  English: {
    alias: arrayToLowerCase(["英语"]),
    tags: arrayToLowerCase(["语言"]),
  },
  Economist: {
    alias: arrayToLowerCase(["经济学人"]),
    tags: arrayToLowerCase([]),
  },
  美食: {
    alias: arrayToLowerCase(["delicious"]),
    tags: arrayToLowerCase([]),
  },
  鲁菜: {
    alias: arrayToLowerCase([]),
    tags: arrayToLowerCase(["美食"]),
  },
  酱酒: {
    alias: arrayToLowerCase([]),
    tags: arrayToLowerCase(["酒"]),
  },
  燕玲春酒: {
    alias: arrayToLowerCase([]),
    tags: arrayToLowerCase(["酱酒", "北京华都酒厂"]),
  },
  北京华都酒厂: {
    alias: arrayToLowerCase([]),
    tags: arrayToLowerCase(["国企"]),
  },
  华为: {
    alias: arrayToLowerCase(["Huawei"]),
    tags: arrayToLowerCase([]),
  },
  hod: {
    alias: arrayToLowerCase([]),
    tags: arrayToLowerCase(["华为", "外包"]),
  },
});
