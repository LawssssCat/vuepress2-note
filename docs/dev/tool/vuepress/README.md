---
title: Vuepress 使用笔记
tags:
  - vuepress
---

官网（vuepress-next）： <https://v2.vuepress.vuejs.org/zh/> \
awesome-vuepress： <https://github.com/vuepress/awesome-vuepress>

视频教程：

+ 【啰里啰嗦】一步步搭建 VuePress 及优化 - <https://www.bilibili.com/video/BV1vb411m7NY> （快速上手）

博客/主题：

+ 内容不错 - <https://docs.shanyuhai.top/>
+ 太花哨，但牛逼 - <https://artiely.github.io/>

## Vuepress 2.x 配置 Mermaid

~~由于第三方插件 [vuepress-plugin-mermaidjs](https://github.com/eFrane/vuepress-plugin-mermaidjs) 并没有适配最新版的 VuePress 2.x，因此需要手动配置 VuePress 2.x 来渲染 Mermaid 绘图。~~ （已经支持）

手动配置参考： <https://www.techgrow.cn/posts/bc19d204.html>

```bash
npm install mermaid -D
npm install @vuepress/plugin-register-components@next -D
```

```bash
npm install @vuepress/utils -D
```

编辑 `.vuepress/config.ts` 文件

```js
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { getDirname, path } from '@vuepress/utils'
const __dirname = getDirname(import.meta.url)

export default {
  plugins: [
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components'),
    })
  ]
}
```

在上面的自定义组件目录下，创建 `mermaid.vue` 源文件，例如源文件路径为 `.vuepress/components/mermaid.vue`，文件的内容如下：

```vue
<template>
  <div class="mermaid">
    <slot></slot>
  </div>
</template>

<script>
export default {
  mounted() {
    import("mermaid/dist/mermaid").then((m) => {
      m.initialize({
        startOnLoad: true,
      });
      m.init();
    });
  },
  updated() {
    import("mermaid/dist/mermaid").then((m) => {
      m.initialize({
        startOnLoad: true,
      });
      m.init();
    });
  }
};
</script>
```

Markdown 渲染 - 语法说明 \
在 MarkDown 文件内添加 `<mermaid>` 标签，Mermaid 的内容需要使用 `{{ ... }}` 包裹住，并写在 `<mermaid>` 标签内（如下所示）。

::: warning
特别注意，`<mermaid>` 标签内不允许存在空行。
:::

```md
<mermaid>
{{`
  ......（Mermaid 的内容）
`}}
</mermaid>
```

### 使用示例

#### 流程图

<mermaid>
{{`
graph TB
  id1(圆角矩形)--普通线-->id2[矩形];
  subgraph 子图
   id2==粗线==>id3{菱形}
   id3-.虚线.->id4>右向旗帜]
   id3--无箭头---id5((圆形))
  end
`}}
</mermaid>

#### 时序图

<mermaid>
{{`
sequenceDiagram
Alice->>John: Hello John, how are you?
loop Healthcheck
    John->>John: Fight against hypochondria
end
Note right of John: Rational thoughts!
     John-->>Alice: Great!
     John->>Bob   : How about you?
     Bob-->>John  : Jolly good!
`}}
</mermaid>

#### 饼图

<mermaid>
{{`
pie
  title Key elements in Product X
  "Calcium" : 42.96
  "Potassium" : 50.05
  "Magnesium" : 10.01
  "Iron" :  5
`}}
</mermaid>

#### 类别图

<mermaid>
{{`
classDiagram
     Animal <|-- Duck
     Animal <|-- Fish
     Animal <|-- Zebra
     Animal : +int age
     Animal : +String gender
     Animal: +isMammal()
     Animal: +mate()
     class Duck{
         +String beakColor
         +swim()
         +quack()
     }
     class Fish{
         -int sizeInFeet
         -canEat()
     }
     class Zebra{
         +bool is_wild
         +run()
     }
`}}
</mermaid>

#### 甘特图

<mermaid>
{{`
gantt
section Section
          Completed: done,   des1,       2014-01-06, 2014-01-08
          Active   : active, des2,       2014-01-07, 3d
         Parallel 1        : des3,   after des1, 1d
         Parallel 2        : des4,   after des1, 1d
         Parallel 3        : des5,   after des3, 1d
         Parallel 4        : des6,   after des4, 1d
`}}
</mermaid>

#### 状态图

<mermaid>
{{`
stateDiagram
    [*]-->Active
    state Active {
        [*]-->NumLockOff
        NumLockOff-->NumLockOn : EvNumLockPressed
        NumLockOn-->NumLockOff : EvNumLockPressed
        --
        [*]-->CapsLockOff
        CapsLockOff-->CapsLockOn : EvCapsLockPressed
        CapsLockOn-->CapsLockOff : EvCapsLockPressed
        --
        [*]-->ScrollLockOff
        ScrollLockOff-->ScrollLockOn : EvCapsLockPressed
        ScrollLockOn-->ScrollLockOff : EvCapsLockPressed
    }
`}}
</mermaid>

#### 实体关系图

<mermaid>
{{`
erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses
`}}
</mermaid>
