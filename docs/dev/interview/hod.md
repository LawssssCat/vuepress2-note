---
title: hod准备、过程
tags:
  - hod
  - 面试
sidebar: auto
---

outsourcing dispatch

## 1-hj 11月25日~11月30日

### 准备

机测

```txt
考点:
1、字符串处理:截取、遍历和字符的拼接，循环注意下标的准确
2、数组:排序和下标的使用
3、数学:考察基本的数学功底，注意有效数据筛选，保证时间复杂度和空间复杂度
4、栈:熟悉入栈、出栈基本操作，可以借助数组来辅助
5、链表:熟悉单项链表、双向链表的代码实现
在牛客网站相关练习题目，每种数据结构保证10道以上无辅助一次性通过
```

练习

+ [x] 极客时间王争《数据结构与算法之美》
  + [x] 基础
  + [ ] 实战
+ [ ] 算法面试题 <https://www.amoscloud.com/zh/ProgramingPractice/NowCoder/Adecco>
+ [ ] 牛客网（简单、中等难度） <https://www.nowcoder.com/exam/company>
+ [ ] 力扣（简单、中等难度） <https://leetcode-cn.com/problemset/all/>
+ [ ] 分类练习：
  + [x] 基础能力 <https://www.nowcoder.com/practice/649b210ef44446e3b1cd1be6fa4cab5e?tpId=37&&tqId=21258&rp=1&ru=/ta/huawei&qru=/ta/huawei/question-ranking>
  + [x] 字符串操作 <https://www.nowcoder.com/practice/637062df51674de8ba464e792d1a0ac6?tpId=37&&tqId=21319&rp=1&ru=/ta/huawei&qru=/ta/huawei/question-ranking>
  + [ ] ~~栈 <https://www.nowcoder.com/practice/f549ee08ddd84b8485a4fa9aefaf4a38?tpId=37&&tqId=21302&rp=1&ru=/ta/huawei&qru=/ta/huawei/question-ranking>~~ （没了）
  + [x] 链表 <https://www.nowcoder.com/practice/54404a78aec1435a81150f15f899417d?tpId=37&&tqId=21274&rp=1&ru=/ta/huawei&qru=/ta/huawei/question-ranking>
  + [x] 排序 <https://www.nowcoder.com/practice/9a763ed59c7243bd8ab706b2da52b7fd?tpId=37&&tqId=21248&rp=1&ru=/ta/huawei&qru=/ta/huawei/question-ranking>
  + [x] 搜索遍历 <https://www.nowcoder.com/practice/cf24906056f4488c9ddb132f317e03bc?tpId=37&tqId=21266&ru=/exam/oj>
  + [x] 字符串
    + [x] 字符统计 <https://www.nowcoder.com/practice/c1f9561de1e240099bdb904765da9ad0?tpId=37&&tqId=21325&rp=1&ru=/ta/huawei&qru=/ta/huawei/question-ranking>
  + [x] 数组
    + [x] 合并区间 <https://www.nowcoder.com/practice/0596b6232ce74b18b60ba0367d7f2492?tpId=182&&tqId=34827&rp=1&ru=/ta/exam-all&qru=/ta/exam-all/question-ranking>
  + [x] 链表
    + [x] 链表合并： <https://www.nowcoder.com/practice/46bda7f0570a47b6b54a29a0a6ae4c27?tpId=182&&tqId=34634&rp=1&ru=/ta/exam-all&qru=/ta/exam-all/question-ranking>
  + [ ] 二叉树
    + [x] 从中序与后序遍历序列构造二叉树 <https://leetcode-cn.com/explore/learn/card/data-structure-binary-tree/4/conclusion/15/>
    + [ ] 二叉树的序列化 <https://www.nowcoder.com/practice/e3a3a1a956914d8ca5688ea47a5cf9c9?tpId=182&&tqId=34761&rp=1&ru=/ta/exam-all&qru=/ta/exam-all/question-ranking>
  + [x] 动态规划
    + [x] 猴子爬山（牛客）/爬楼梯（leetcode） <https://www.nowcoder.com/practice/b178fcef3ed4448c99d7c0297312212d?tpId=182&&tqId=34365&rp=1&ru=/ta/exam-all&qru=/ta/exam-all/question-ranking>
  + [x] 数学题 <https://www.nowcoder.com/practice/caf35ae421194a1090c22fe223357dca?tpId=37&&tqId=21330&rp=1&ru=/ta/huawei&qru=/ta/huawei/question-ranking>
  + [x] 图 <https://www.nowcoder.com/practice/5427af99168b45f4a14aec195b28a839?tpId=182&&tqId=34439&rp=1&ru=/activity/oj&qru=/ta/exam-all/question-ranking>

+ <https://space.bilibili.com/70333083>

### 上机

2023年11月30日 OD统一考试（C卷） 100% 95% 95% 385

两道1星题，一道2星题 —— 可以说非常简单了，但是没全部做完，确实不像话。

第一道1星题（100分）啥忘了，非常简单。

第二道1星题（100分）就是排序+字符串拼接，通过率95%。没满分是有一个测试案例死活通过不了，又看不到测试案例，烦死了。

```txt
按总分/科目分数排名
e.g.
输入：
2 <--- 人数
yuwen shuxue <---- 科目
xiaoming 90 90
zhangsan 1 95
shuxue <--- 排名科目
输出：
zhangsan xiaoming
```

第三道2星题（200分）也算是简单的题，通过率90%。这个95%的通过率是通过穷举`O(n^3)`实现的。也有正解思路，但是通过率（20%）没有前者高。看不到测试案例，烦死了。 \
（好在出题人的测试案例安排的友善，居然能用暴力穷举得出这么多答案🙏）

::: details

```java
package org.example;

import java.util.Scanner;

/**

 19点05分
 */

// 注意类名必须为 Main, 不要有任何 package xxx 信息
public class Main {
    public static void main(String[] args) {
        System.out.println("ss".compareTo("ss"));
        xx("4\n" +
                "1 2 3 4");
        xx("3\n" +
                "5 4 7");
        xx("7\n" +
                "0 7 1 2 3 4 5");
    }
    public static void xx(String str) {
        Scanner in = new Scanner(str);
        // 注意 hasNext 和 hasNextLine 的区别
            while (in.hasNextInt()) { // 注意 while 处理多个 case
                // int a = in.nextInt();
                // int b = in.nextInt();
                // System.out.println(a + b);
                int n = in.nextInt();
                int[] arr = new int[n];
                for(int i=0; i<n; i++) {
                    arr[i] = in.nextInt();
                }
                System.out.println(dfs(arr, 0, arr.length));
            }
        }
    static int dfs(int[] arr, int istart, int iend) {
        // if(iend-istart<3) return 0;
        // if(iend-istart==3) {
        //     for() {

        //     }
        // }
        // --------------------------------------------------
        int count =0;
        for(int i=0; i<arr.length-2; i++) {
            for(int j=i+1; j<arr.length-1; j++) {
                for(int k=j+1; k<arr.length; k++) {
                    if(arr[i]<arr[j] && arr[j]<arr[k]) {
                        count ++;
                    } else if(arr[i]>arr[j] && arr[j]>arr[k]) {
                        count++;
                    }
                }
            }
        }
        return count;
        // --------------------------------------------------

        // return A(arr) + B(arr);
    }
    // 4 3 2 1
    static int A(int[] arr) {
        int[] temp = new int[arr.length];
        for(int i=arr.length-1; i>=0; i--) {
            int count = 0;
            for(int j=i+1; j<arr.length; j++) {
                if(arr[i]>arr[j]) {
                    count++;
                }
            }
            temp[i] = count;
        }
        return C(temp, arr, -1);
    }
    // 1 2 3 4
    static int B(int[] arr) {
        int[] temp = new int[arr.length];
        for(int i=arr.length-1; i>=0; i--) {
            int count = 0;
            for(int j=i+1; j<arr.length; j++) {
                if(arr[i]<arr[j]) {
                    count++;
                }
            }
            temp[i] = count;
        }
        return C(temp, arr, 1);
    }
    static int C(int[] temp, int[] arr,int flag) {
        int count = 0;
        for(int i=0; i<temp.length; i++) {
            int x = temp[i];
            int a = arr[i];
            if(x==0) continue;
            else if(x==1) {
                continue;
            }
            else if(x==2) {
                count++;
                continue;
            } else {
                for(int j=i+1; j<temp.length; j++)   {
                    if(temp[j]>=1 && (flag>0?a<arr[j]:arr[j]<a)) {
                        count += temp[j];
                    }
                }
            }
        }
        return count;
    }
}
```

:::

### 思考

2023年12月1日 后来想到如何获取测试样例 —— 通过判断输入，然后抛出异常（异常中包含输入）

```java
String s = "";
while(in.hasNextLine()) {
  s = in.nextLine() + "\n";
}
if(!arr.contains(s)) {
  throw new RuntimeException("my:"+s);
}
```

或者对两个算法输出值对比，不一样则抛出异常

```java
int a = 穷举(xx)
int b = 优化解法(xx)
if(a==b) return a;
throw new RuntimeException("输入："+input+"\n输出（期望）："+a+"\n输出（实际）："+b);
```

## 2-zc 12月1日

综测

一个性格测评。测试之前会给你一个企业文化、核心价值观之类的陈述，需要按里面的意思去答。

<!--

e.g. 不排斥加班

e.g. 不需要太健谈、不需要太多陌生朋友 —— 搞技术的人设？

-->

## 3-zc 12月5日

资格测试

半小时左右

## 4-jc2 12月7日

先技术测试二面 （因为时间原因先二面。好像说一面面试官是本部门的，二面不是本部门的。）

7点开始半小时左右

1. 自我介绍
1. 一道编程题（简单）

    题描述：

    ```txt
    你从供应商买材料，怎么买花钱最少，每个供应商，[每卖出一单位材料，材料单价+1]，现在你要买n个单位的材料，怎么买价格才能最低？
    输入：{100, 200}, {9, 2}, {10, 3}, {10, 1}, {10, 3}
    n = 4
    输出：39
    上述第一行表示供应商的{材料单价，材料个数}
    第二行表示你总共要买4个单位的材料。
    ```

    答题： 贪心

1. 问：

    1. 堆排序 描述
    1. redis 描述
    1. redis 大数什么？（不记得问的什么，布隆？）
    1. redis 键、string类型（尤其string比较大时）使用注意什么
    1. springcloud/微服务 描述
    1. ~~描述你前端开发能做到什么程度？~~ （？）

## 4-jc1 12月8日

技术一面

7点开始40分钟左右，面试官样子像大佬

1. 自我介绍
1. spring ioc 作用、例子
1. aop使用注解名，使用时需要定义什么
1. 对比struct、springmvc、springboot
1. 对比ibatis、mybatis
1. 对比jdbc和mybatis
1. 之前项目亮点，具体流程描述、分析、重现
1. 情景题： 页面刷新慢怎么办？
    1. 如何确定后端问题
    1. 如何优化数据库查询、分表分库
    1. 数据库B+树
1. 编程题： 判断回文（输入int，输出boolean是否回文） （简单）
1. 上面题目的优化
    1. 负数的处理
    1. 如何不转字符串获取下标字符
    1. 缺省关键字protected的作用
