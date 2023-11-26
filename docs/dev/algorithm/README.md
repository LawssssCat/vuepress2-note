---
title: 算法与数据结构 - 导论
tags:
  - 算法
  - 数据结构
---

## 时间、空间复杂度

说明： 书面说法看书，笔记记理解

::: tip
一般，`T()`表示时间复杂度，`O()`表示趋势函数。这里就不细分，统一用`T()`了。
:::

### 时间复杂度分析

1. 常量阶

    `T(1)`

    ```c
    int i = 8; 
    int j = 6; 
    int sum = i + j;
    ```

1. 平方阶 —— 看多少个循环

    一个循环`T(n)`

    ```c
    int cal(int n) { 
      int sum = 0; 
      int i = 1; 
      for (; i <= n; ++i) { 
        sum = sum + i; 
      } 
      return sum; 
    }
    ```

    两个循环`T(n^2)`

    ```c
    int cal(int n) {
      int sum = 0;
      int i = 1;
      int j = 1;
      for (; i <= n; ++i) {
        j = 1;
        for (; j <= n; ++j) {
          sum = sum +  i * j;
        }
      }
    }
    ```

1. 对数阶 —— 关注下标是否跳跃

    下标跳跃 `T(logn)`

    ```c
    i=1;
    while (i <= n) {
      i = i * 2; 
    }
    ```

    ::: tip
    下标不跳跃： 1,2,3,4,5,... \
    下表跳跃： 1,2,2*2,2*2*2,...
    :::

1. 线性对数阶 —— 上面两种情况的集合

    `T(n*logn)`

    ```c
    for n
      i=1;
      while (i <= n) {
        i = i * 2; 
      }
    ```

还有 指数阶`T(2^n)`、阶乘阶`T(n!)` 基本不会遇到。 \
下面是不同时间复杂度的性能发展：

![497a3f120b7debee07dc0d03984faf04.webp](https://s2.loli.net/2023/11/25/VMFBXQHTfJZjzwd.webp)

### 空间复杂度分析

表示生成了多少个内存变量。

常见的 `O(1)`、`O(n)`、`O(n^2)`

如： 下面是 `O(n)`

```c
void print(int n) {
  int i = 0;
  int[] a = new int[n];
  for (i; i <n; ++i) {
    a[i] = i * i;
  }

  for (i = n-1; i >= 0; --i) {
    print out a[i]
  }
}
```

### 细分时间复杂度

+ 最好情况时间复杂度（best case time complexity）
+ 最坏情况时间复杂度（worst case time complexity）
+ 平均情况时间复杂度（average case time complexity）
+ 均摊时间复杂度（amortized time complexity） —— 特殊的“平均情况时间复杂度” —— 用“摊还分析法”分析，将最坏情况时间均摊到其他情况中，往往统计结果得到最好时间情况。

## 数据结构和算法

20 个重点：

```txt
数据结构
    数组
    链表
    栈
    队列
    散列表
    二叉树
    堆
    跳表
    图
    Trie 树
算法
    递归
    排序
    二分查找
    搜索
    哈希算法
    贪心算法
    分治算法
    回溯算法
    动态规划
    字符串匹配算法
```

### 数据结构 - 数组

![b6b71ec46935130dff5c4b62cf273477.webp](https://s2.loli.net/2023/11/25/rD2PxI7STemoKt4.webp)

#### 数组类型

1. 有序数组
1. 无序数组 —— 单纯用来存数据

#### 数组应用

1. 添加时需要遍历 —— 无序数组插入时可用快排优化添加情况：将插入的位置原数据放最后，插入的新数据放空坑；
1. 删除时需要遍历 —— 标记删除优化删除情况，如 JVM 的标记删除垃圾回收机制

### 数据结构 - 链表

#### 链表类型

1. 单向链表

    ![b93e7ade9bb927baad1348d9a806ddeb.webp](https://s2.loli.net/2023/11/25/S6RXHk5iZOU7ftC.webp)
    ![452e943788bdeea462d364389bd08a17.webp](https://s2.loli.net/2023/11/25/cEHqlepVxCyzNfn.webp)

1. 循环链表

    ![86cb7dc331ea958b0a108b911f38d155.webp](https://s2.loli.net/2023/11/25/ufbC168nNzgOlIP.webp)

    > 约瑟夫问题 <https://zh.wikipedia.org/wiki/%E7%BA%A6%E7%91%9F%E5%A4%AB%E6%96%AF%E9%97%AE%E9%A2%98>

1. 双向链表

    ![cbc8ab20276e2f9312030c313a9ef70b.webp](https://s2.loli.net/2023/11/25/AyxMq7UHXkCRdcD.webp)

#### 链表应用

1. LRU 缓存淘汰算法 —— 维护一个有序单链表。当有数据被访问，遍历链表删除相同数据并在头部插入数据。当有缓存要清除，删除尾部数据。 时间复杂度`O(n)`

    ::: tip
    缓存清理通常有三种策略： 先进先出策略 FIFO（First In，First Out）、最少使用策略 LFU（Least Frequently Used）、最近最少使用策略 LRU（Least Recently Used）
    :::

#### 链表题目

1. 如何判断一个字符串是否是回文字符串的问题

    使用快慢两个指针找到链表中点，慢指针每次前进一步，快指针每次前进两步。在慢指针前进的过程中，同时修改其 next 指针，使得链表前半部分反序。最后比较中点两侧的链表是否相等。 \
    时间复杂度：O(n) \
    空间复杂度：O(1) \
    <https://github.com/andavid/leetcode-java/blob/master/note/234/README.md>

#### 链表代码

常见的链表操作

+ 单链表反转
+ 链表中环的检测
+ 两个有序的链表合并
+ 删除链表倒数第 n 个结点
+ 求链表的中间结点

### 数据结构 - 栈

![3e20cca032c25168d3cc605fa7a53a0b.webp](https://s2.loli.net/2023/11/25/fmWRuIUpDxE4MYw.webp)

todo

#### 栈应用

+ 浏览器历史记录

### 数据结构 - 队列

![9eca53f9b557b1213c5d94b94e9dce3e.webp](https://s2.loli.net/2023/11/25/fCkr1tcuGWE8RD5.webp)

todo

#### 队列题目

+ 除了线程池这种池结构用到队列排队请求，还有那些场景用到队列排队请求？
+ 如何实现无锁并发队列

### 算法 - 递归

```java
int f(int n) {
  if (n == 1) return 1;
  return f(n-1) + 1;
}
```

什么时候用递归？

1. 一个问题可以分为多个子问题
1. 子问题解决方法类似
1. 有中止条件

#### 递归应用

+ DFS 深度优先搜索
+ 前中后序
+ 二叉树遍历

### 算法 - 分治

### 算法 - 动态规划

## 参考

+ [x] 极客时间王争《数据结构与算法之美》 【本文图片来源之一】
  + [x] 基础
  + [ ] 实战
+ [ ] 算法面试题 <https://www.amoscloud.com/zh/ProgramingPractice/NowCoder/Adecco>
+ [ ] 牛客网（简单、中等难度） <https://www.nowcoder.com/exam/company>
+ [ ] 力扣（简单、中等难度） <https://leetcode-cn.com/problemset/all/>
+ [ ] 分类练习：
  + [x] 基础能力 <https://www.nowcoder.com/practice/649b210ef44446e3b1cd1be6fa4cab5e?tpId=37&&tqId=21258&rp=1&ru=/ta/huawei&qru=/ta/huawei/question-ranking>
  + [x] 字符串操作 <https://www.nowcoder.com/practice/637062df51674de8ba464e792d1a0ac6?tpId=37&&tqId=21319&rp=1&ru=/ta/huawei&qru=/ta/huawei/question-ranking>
  + [ ] 栈 <https://www.nowcoder.com/practice/f549ee08ddd84b8485a4fa9aefaf4a38?tpId=37&&tqId=21302&rp=1&ru=/ta/huawei&qru=/ta/huawei/question-ranking>
  + [x] 链表 <https://www.nowcoder.com/practice/54404a78aec1435a81150f15f899417d?tpId=37&&tqId=21274&rp=1&ru=/ta/huawei&qru=/ta/huawei/question-ranking>
  + [ ] 排序 <https://www.nowcoder.com/practice/9a763ed59c7243bd8ab706b2da52b7fd?tpId=37&&tqId=21248&rp=1&ru=/ta/huawei&qru=/ta/huawei/question-ranking>
  + [ ] 搜索遍历 <https://www.nowcoder.com/questionTerminal/cf24906056f4488c9ddb132f317e03bc?answerType=1&f=discussion>
  + [ ] 字符串
    + [ ] 字符统计 <https://www.nowcoder.com/practice/c1f9561de1e240099bdb904765da9ad0?tpId=37&&tqId=21325&rp=1&ru=/ta/huawei&qru=/ta/huawei/question-ranking>
  + [ ] 数组
    + [ ] 合并区间 <https://www.nowcoder.com/practice/0596b6232ce74b18b60ba0367d7f2492?tpId=182&&tqId=34827&rp=1&ru=/ta/exam-all&qru=/ta/exam-all/question-ranking>
  + [ ] 链表
    + [ ] 链表合并： <https://www.nowcoder.com/practice/46bda7f0570a47b6b54a29a0a6ae4c27?tpId=182&&tqId=34634&rp=1&ru=/ta/exam-all&qru=/ta/exam-all/question-ranking>
  + [ ] 二叉树
    + [ ] 从中序与后序遍历序列构造二叉树 <https://leetcode-cn.com/explore/learn/card/data-structure-binary-tree/4/conclusion/15/>
    + [ ] 二叉树的序列化 <https://www.nowcoder.com/practice/e3a3a1a956914d8ca5688ea47a5cf9c9?tpId=182&&tqId=34761&rp=1&ru=/ta/exam-all&qru=/ta/exam-all/question-ranking>
  + [ ] 动态规划
    + [ ] 猴子爬山（牛客）/爬楼梯（leetcode） <https://www.nowcoder.com/practice/b178fcef3ed4448c99d7c0297312212d?tpId=182&&tqId=34365&rp=1&ru=/ta/exam-all&qru=/ta/exam-all/question-ranking>
  + [ ] 数学题 <https://www.nowcoder.com/practice/caf35ae421194a1090c22fe223357dca?tpId=37&&tqId=21330&rp=1&ru=/ta/huawei&qru=/ta/huawei/question-ranking>
  + [ ] 图 <https://www.nowcoder.com/practice/5427af99168b45f4a14aec195b28a839?tpId=182&&tqId=34439&rp=1&ru=/activity/oj&qru=/ta/exam-all/question-ranking>
