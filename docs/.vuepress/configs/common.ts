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
  JavaScript: {
    alias: arrayToLowerCase(["js"]),
    tags: arrayToLowerCase([]),
  },
  Kubernetes: {
    alias: arrayToLowerCase(["k8s"]),
    tags: arrayToLowerCase(["容器编排"]),
  },
  运维: {
    alias: arrayToLowerCase(["operator"]),
    tags: arrayToLowerCase([]),
  },
  GPU: {
    alias: arrayToLowerCase(["显卡"]),
    tags: arrayToLowerCase([]),
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
});
