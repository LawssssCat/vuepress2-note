---
title: Vuepress 使用笔记
tags:
  - vuepress
  - 博客
  - 工具
  - mermaid
---

官网（vuepress-next）： <https://v2.vuepress.vuejs.org/zh/> \
awesome-vuepress： <https://github.com/vuepress/awesome-vuepress>

视频教程：

+ 【啰里啰嗦】一步步搭建 VuePress 及优化 - <https://www.bilibili.com/video/BV1vb411m7NY> （快速上手）

博客/主题：

+ 内容不错 - <https://docs.shanyuhai.top/>
+ 太花哨，但牛逼 - <https://artiely.github.io/>

## 样式

默认主题使用 SASS 作为 CSS 预处理器。

用户可以通过 palette 文件 来自定义样式变量，还可以通过 style 文件 来添加额外的样式。

<https://ecosystem.vuejs.press/zh/themes/default/styles.html>

## 内置功能（默认主题）

### 内置组件 - 提示框

<https://v2.vuepress.vuejs.org/zh/reference/default-theme/markdown.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%AE%B9%E5%99%A8>

```markdown
::: tip
这是一个提示
:::

::: warning
这是一个警告
:::

::: danger
这是一个危险警告
:::

::: details
这是一个 details 标签
:::

::: v-pre
`{{ This will be displayed as-is }}`
:::
```

::: tip
这是一个提示
:::

::: warning
这是一个警告
:::

::: danger
这是一个危险警告
:::

::: details
这是一个 details 标签
:::

::: v-pre
`{{ This will be displayed as-is }}`
:::

### 内置组件 - 代码引用

其中 `@code/java` 为用户配置内容（配置在 `.vuepress/config.ts` 中） 

```vue
@[code](@code/java/main/java/org/example/algorithm/SortBubble.java)
```

::: details
可以引用文件内容作为代码块

@[code](@code/java/main/java/org/example/algorithm/SortBubble.java)
:::

### 内置组件 - Badge

<https://v2.vuepress.vuejs.org/zh/reference/default-theme/components.html#badge>

```markdown
- VuePress - <Badge type="tip" text="v2" vertical="top" />
- VuePress - <Badge type="warning" text="v2" vertical="middle" />
- VuePress - <Badge type="danger" text="v2" vertical="bottom" />
```

- VuePress - <Badge type="tip" text="v2" vertical="top" />
- VuePress - <Badge type="warning" text="v2" vertical="middle" />
- VuePress - <Badge type="danger" text="v2" vertical="bottom" />

### 内置组件 - CodeGroup

<https://v2.vuepress.vuejs.org/zh/reference/default-theme/components.html#codegroup>

``````markdown
<CodeGroup>
  <CodeGroupItem title="PNPM">

```bash:no-line-numbers
pnpm install
```

  </CodeGroupItem>

  <CodeGroupItem title="YARN">

```bash:no-line-numbers
yarn install
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM" active>

```bash:no-line-numbers
npm install
```

  </CodeGroupItem>
</CodeGroup>
``````


<CodeGroup>
  <CodeGroupItem title="PNPM">

```bash:no-line-numbers
pnpm install
```

  </CodeGroupItem>

  <CodeGroupItem title="YARN">

```bash:no-line-numbers
yarn install
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM" active>

```bash:no-line-numbers
npm install
```

  </CodeGroupItem>
</CodeGroup>

### 内置组件 - `@[...](...)`

<https://v2.vuepress.vuejs.org/zh/guide/markdown.html#%E5%AF%BC%E5%85%A5%E4%BB%A3%E7%A0%81%E5%9D%97>

插入文件作为代码块 （拆分文件，方便编辑、统计和复用）

```markdown
<!-- 最简单的语法 -->
@[code](../foo.js)
<!-- 仅导入第 1 行至第 10 行 -->
@[code{1-10}](../foo.js)
<!-- 指定代码语言 -->
@[code js](../foo.js)
<!-- 行高亮 -->
@[code js{2,4-5}](../foo.js)
@[code{3-10} js{3}:no-line-numbers](../foo.js)
```

自定义路径

```js
import { getDirname, path } from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)

export default {
  markdown: {
    importCode: {
      handleImportPath: (str) =>
        str.replace(/^@src/, path.resolve(__dirname, 'path/to/src')),
    },
  },
}
```

```markdown
<!-- 会被解析至 'path/to/src/foo.js' -->
@[code](@src/foo.js)
```

## 使用 “数据” （data）

todo 有没这功能？要查一下。

## Vuepress 2.x 配置 Mermaid

mermaid 官网 <https://mermaid.nodejs.cn/>

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
