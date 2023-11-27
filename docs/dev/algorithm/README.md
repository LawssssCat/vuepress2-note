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

20 个重点： （按常用程度/难易程度排序）

<!--

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

-->

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
+ 表达式求值：中缀、后缀、逆波兰（RPN） <https://www.nowcoder.com/practice/9566499a2e1546c0a257e885dfdbf30d>
  + 中缀转后缀
    + 数字直接写入RPN
    + 运算符优先级大进栈，优先级小先出栈写入RPN后进栈
    + "(" 进栈
    + ")" 出栈写入RPN
    + 遍历完成后，全部出栈，写入RPN
  + 后缀计算

### 实现方式 - 递归

一些算法/数据结构遍历需要用到的实现方法。

e.g.

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

调试递归:

1. 打印日志发现，递归值。
2. 结合条件断点进行调试。

#### 递归应用

+ DFS 深度优先搜索
+ 前中后序
+ 二叉树遍历

### 算法 - 排序🔥

排序算法时间复杂度： <https://blog.csdn.net/LawssssCat/article/details/102798623>

常用的其实就三个：

+ 冒泡/插入 —— 喜欢哪个用哪个
+ 快排
+ 二分

#### 冒泡排序（Bubble-Sort）

online visual demo: <https://algorithm-visualizer.org/brute-force/bubble-sort>

```java
int[] arr = {2,5,9,3,7,6,0,1,99,22,44,4,8};
// bubble sort —— 
int n = arr.length;
boolean swapped;
do {
    swapped = false;
    for (int i=1; i<n; i++) {
        if(arr[i-1] > arr[i]) {
            swapped = true;
            int t = arr[i];
            arr[i] = arr[i-1];
            arr[i-1] = t;
        }
    }
    n--;
} while(swapped);
System.out.println(Arrays.toString(arr));
// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 22, 44, 99]
```

::: tip
冒泡排序写法有许多。上述的写法初看会有疑问 “为什么swapped为false就可以停止排序了？” 这里解释下：

有这疑问大概是不清楚这个代码做了什么，其实就三步：

1. 检查排序是否正确（从小到大排序`for i=1 .. if(arr[i-1] > arr[i])`）
    + 如果排序不正确则需要进行下一步替换（`swapped=true`）
    + 如果排序正确，则任务完成(๑•̀ㅂ•́)و✧（`swapped=false`，`while(swapped)不成立`）
1. 把最大的放最后，然后排除考虑
1. 继续第一步（只是考虑范围变小了）

所以，“swapped为false就可以停止排序” 其实就是说 “排序正确！任务完成！”。很直白吧？
:::

#### 插入排序（Insertion-Sort）

online visual demo: <https://algorithm-visualizer.org/brute-force/insertion-sort>

```java
int[] arr = {2,5,9,3,7,6,0,1,99,22,44,4,8};
// insertion sort
for(int i=1; i<arr.length; i++) {
    int value = arr[i];
    int j = i-1;
    for (; j>=0; j--) {
        if(arr[j] > value) {
            arr[j+1] = arr[j];
        } else {
            break;
        }
    }
    arr[j+1] = value;
}
System.out.println(Arrays.toString(arr));
// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 22, 44, 99]
```

::: tip
插入排序的思想是先把左边的（已知的）排序好，再考虑新的值：

1. 判断新的值位置是否正确（`arr[j] > value`）
    1. 如果新的值位置不对
        + 把左边已排序的后移，空出位置（`arr[j+1] = arr[j]`）
        + 再把新的值 “插入” 到对的位置上（`arr[j+1] = value`）
    1. 如果新的值位置对了
        + 继续第一步（只是考虑范围变大了）

💡插入排序这种逐渐把考虑范围扩大的做法和冒泡排序那种逐渐把考虑范围缩小的做法刚好相反！
:::

#### 选择排序（Selection-Sort）❌

::: danger
不建议使用
:::

简而言之： 遍历多次，每次把最大/最小的放在前面/后面。

不建议使用的原因是它的最大、最小、平均时间复杂度都是`O(n^2)`，没有任何优化空间，属于最慢的排序算法。且不稳定。

好处是直观（一个对程序没啥用的好处）

![348604caaf0a1b1d7fee0512822f0e50.webp](https://s2.loli.net/2023/11/26/9iTQkDY1nluM76y.webp)

#### 归并排序（Merge-Sort）✈️

<!-- <Badge type="tip" text="快速" vertical="top" /> -->

Alias: 二分查找

::: tip
上述的三种排序（冒泡、插入、选择）时间复杂度高，适合小规模排序。下面介绍的归并排序、快速排序时间复杂度`O(n^2)`，可以用在大规模排序上。
:::

用了 “分治” 思想，用 “递归” 实现。

![db7f892d3355ef74da9cd64aa926dc2b.webp](https://s2.loli.net/2023/11/26/keKQPUSW18izEv7.webp)

#### 快速排序（Quicksort）✈️

### 算法 - 动态规划

## 参考

+ [x] 极客时间王争《数据结构与算法之美》 【本文图片来源之一】
  + [x] 基础
  + [ ] 实战
