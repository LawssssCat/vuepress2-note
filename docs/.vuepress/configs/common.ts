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

export const tagsAliasConfig: Record<string, string[]> = {
  JavaScript: arrayToLowerCase(["js", "JavaScript"]),
  Kubernetes: arrayToLowerCase(["k8s", "Kubernetes"]),
  GPU: arrayToLowerCase(["gpu", "显卡"]),
  Economist: arrayToLowerCase(["economist", "经济学人"]),
  美食: arrayToLowerCase(["美食", "delicious"]),
  鲁菜: arrayToLowerCase(["美食", "鲁菜"]),
  酒: arrayToLowerCase(["酒"]),
  酱酒: arrayToLowerCase(["酒"]),
  燕玲春酒: arrayToLowerCase(["酒", "酱酒", "燕玲春酒", "北京华都酒厂"]),
  北京华都酒厂: arrayToLowerCase(["国企"]),
};
