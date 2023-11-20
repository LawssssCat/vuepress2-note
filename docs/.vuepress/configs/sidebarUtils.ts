import fs from "fs";
import path from "path";
import type { SidebarConfig } from "vuepress";
import type {
  SidebarConfigObject,
  SidebarConfigArray,
  SidebarItem,
  SidebarGroup,
} from "vuepress";

const docsPath = path.join(__dirname, "../../");

function concatPath(...arr: string[]): string {
  return arr.join("/").replace(/\/+/g, "/");
}

function parseFolder(perfix: string, pattern: string): string[] | string {
  if (!pattern.endsWith("/*")) {
    return concatPath("/", perfix, pattern);
  }
  const result: string[] = [];
  const patternDir = pattern.substring(0, pattern.length - 2);
  fs.readdirSync(path.join(docsPath, perfix, patternDir))
    .sort((a, b) => b.localeCompare(a))
    .forEach((folder) => {
      const folderPath = path.join(docsPath, perfix, patternDir, folder);
      if (folderPath.endsWith(".md") && fs.statSync(folderPath).isFile()) {
        result.push(concatPath("/", perfix, patternDir, folder));
      }
    });
  return result;
}

function handleGenerateSidebarItem(
  key: string,
  item: SidebarItem | SidebarGroup | string
): SidebarItem | SidebarGroup | string | string[] {
  if (typeof item == "string") {
    return parseFolder(key, item);
  } else if (!(item as SidebarItem).link && !(item as SidebarGroup).children) {
    return item;
  } else {
    const result: SidebarItem = item;
    if ((item as SidebarGroup).children) {
      (item as SidebarGroup).children = handleGenerateSidebarArray(
        key,
        (item as SidebarGroup).children
      );
    }
    if ((item as SidebarItem).link) {
      const temp = parseFolder(key, (item as SidebarItem).link as string);
      if (temp instanceof Array) {
        // ----------- temp
        item.link = undefined;
        if ((item as SidebarGroup).children) {
          (item as SidebarGroup).children.push(...temp);
        } else {
          (item as SidebarGroup).children = temp;
        }
        // ----------- temp
      } else {
        item.link = temp;
      }
    }
    return result;
  }
}

function handleGenerateSidebarArray(
  key: string,
  value: SidebarConfigArray
): SidebarConfigArray {
  const result: SidebarConfigArray = [];
  value.forEach((item) => {
    const temp = handleGenerateSidebarItem(key, item);
    if (temp instanceof Array) temp.forEach((t) => result.push(t));
    else result.push(temp);
  });
  return result;
}

export function generateSidebarConfig(config: SidebarConfig): SidebarConfig {
  if (config instanceof Array) {
    return config as SidebarConfigArray;
  }
  for (const key in config as SidebarConfigObject) {
    config[key] = handleGenerateSidebarArray(
      key,
      (config as SidebarConfigObject)[key]
    );
  }
  console.log(JSON.stringify(config, null, 2));
  return config;
}
