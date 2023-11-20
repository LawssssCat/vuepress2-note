---
title: 2023年11月19日 馋
tags: 
  - 旅游
  - 美食
  - 鲁菜
  - 北京华都酒厂
  - 燕玲春酒
  - 包装
  - 羊肉火锅
  - 站点优化
---

## 美食、美酒 - 馋

北京八大楼 - 东兴楼 机会试试

<https://www.bilibili.com/video/BV1kw411p7QU/>

美食

+ 酱爆鸡丁
  ![image.png](https://s2.loli.net/2023/11/19/f8tUz746HNTuerP.png)
+ 老北京烧羊肉
  ![image.png](https://s2.loli.net/2023/11/19/dMWB5zgHfJw4ZXb.png)
+ 蒜蓉鸡片 （类似：浮油鸡片）
  ![image.png](https://s2.loli.net/2023/11/19/6iNyce149PuDBxE.png)
+ 糟溜三白
  ![image.png](https://s2.loli.net/2023/11/19/AT4HVDOnI3Qwsec.png)
+ 干炸丸子
  ![image.png](https://s2.loli.net/2023/11/19/w5yNd2IRV74p6Ot.png)
+ 四喜丸子 （再大点的叫“红烧狮子头”）
  ![image.png](https://s2.loli.net/2023/11/19/GDl1e4sWRrBnuQb.png)

酒

+ 北京华都酒厂生产的燕玲春酒（酱酒）
  
  > 1. 包装、配色好看
  > 1. 2023年11月19日 一箱，两瓶，300多（便宜100）
  > 1. 链接：[华都燕岭春礼盒 酱香型白酒 53度 500ml*2瓶/盒 礼盒装](https://item.jd.com/10085433161845.html?cu=true) 1975年，北京市经委、市计委委派了“八大名酒进北京”的任务，时任茅台技术科科长的季克良带领若干技术人员深入昌平酒厂，前后20余次北上，进行全面的酱香型白酒酿造技术指导。经过不懈努力，最终研制出茅台传统工艺，酿造于首都北京的酱香型白酒“燕岭春”。

  ![image.png](https://s2.loli.net/2023/11/19/HSlN51hVYeFG2LM.png)
  ![image.png](https://s2.loli.net/2023/11/19/f16T2tKZHbJcDeC.png)

## 羊肉火锅 - 吃

吃了两天羊肉火锅解馋

+ 2斤（一斤排108，一斤肉88） 小店
+ 1.5斤~2斤 厨当家

::: danger
胖了2斤 ⚡
:::

## 优化搜索 - 干

效果大致如下 —— 递归生成相关关联词

输入：

```ts
燕玲春酒: {
  alias: arrayToLowerCase(["燕玲酱酒"]),
  tags: arrayToLowerCase(["酱酒", "北京华都酒厂"]),
},
北京华都酒厂: {
  alias: arrayToLowerCase([]),
  tags: arrayToLowerCase(["国企"]),
},
美食: {
  alias: arrayToLowerCase(["delicious"]),
  tags: arrayToLowerCase([]),
},
```

中间生成：

```ts
燕玲春酒: ["燕玲春酒","燕玲酱酒","酱酒", "北京华都酒厂"],
燕玲酱酒: ["燕玲春酒","燕玲酱酒","酱酒", "北京华都酒厂"],
北京华都酒厂: ["北京华都酒厂", "国企"],
美食: ["美食", "delicious"]
```

递归生成：

```ts
燕玲春酒: ["燕玲春酒","燕玲酱酒","酱酒", "北京华都酒厂", "国企"],
燕玲酱酒: ["燕玲春酒","燕玲酱酒","酱酒", "北京华都酒厂", "国企"],
北京华都酒厂: ["北京华都酒厂", "国企"],
美食: ["美食", "delicious"]
```

e.g. 文章 frontmatter tags 如下：

```ts
// frontmatter
tags:
  - 燕玲酱酒
  - 美食
// 根据tags的ku获得最终tags
["燕玲春酒","燕玲酱酒","酱酒", "北京华都酒厂", "国企"]
+
["美食", "delicious"]
```

最终得到的 tags 可以在搜索框中被检索。
