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
};
