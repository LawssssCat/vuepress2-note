---
title: hod过程（准备、面试、入职）
tags:
  - hod
  - 面试
sidebar: auto
---

2023

## o0-“术语”

+ od outsourcing dispatch
+ ITO Information Technology Outsourcing

## i1-hj 11月25日~11月30日

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
  + [x] 二叉树
    + [x] 从中序与后序遍历序列构造二叉树 <https://leetcode-cn.com/explore/learn/card/data-structure-binary-tree/4/conclusion/15/>
    + [x] 二叉树的序列化 <https://www.nowcoder.com/practice/e3a3a1a956914d8ca5688ea47a5cf9c9?tpId=182&&tqId=34761&rp=1&ru=/ta/exam-all&qru=/ta/exam-all/question-ranking>
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

第三道2星题（200分）也算是简单的题，能想到正解思路dp，但是通过率（20%）（感冒，脑梗塞；菜）。
后面用暴力穷举`O(n^3)`有居然95%的通过率。 \
（感谢出题人，测试案例安排的相当友善🙏）

::: details

答题记录：

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

## i2-zc 12月1日

综测

一个性格测评。测试之前会给你一个企业文化、核心价值观之类的陈述，需要按里面的意思去答。

<!--

e.g. 不排斥加班

e.g. 不需要太健谈、不需要太多陌生朋友 —— 搞技术的人设？

-->

## i3-zc 12月5日

资格测试（hr面试）

半小时左右

## i4-jc2 12月7日

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

## i4-jc1 12月8日

技术一面

7点开始40分钟左右，面试官样子像大佬

1. 自我介绍
1. spring ioc 作用、例子
1. aop使用注解名，使用时需要定义什么
1. 对比struct、springmvc、springboot
1. 对比ibatis、mybatis
1. 对比jdbc和mybatis
1. 之前项目亮点，具体流程描述、分析、重现
1. docker、dockerfile、dockercompose细节 e.g. env、run 指令
1. 情景题： 页面刷新慢怎么办？
    1. 如何确定后端问题
    1. 如何优化数据库查询、分表分库
    1. 数据库B+树
1. 编程题： 判断回文（输入int，输出boolean是否回文） （简单）
1. 上面题目的优化
    1. 负数的处理
    1. 如何不转字符串获取下标字符
    1. 缺省关键字protected的作用

## i5-zc 12月12日

综合面试（主管面试） 大概20分钟

主要就是一些普通问题，主管看起来挺友善的（感觉跟我上个领导气质很像，巧合？大佬的共通气质？）。我个人回答的反而有点紧张。😅

1. 自我介绍
1. 然后挑一个项目讲讲，就介绍了我比较难的那个项目
1. 到目前为止遇到的难点是什么
1. 压力大如何缓解
1. 平时有什么娱乐
1. 未来的规划
1. 对公司的了解
1. 加班文化的理解 —— ~~我说high了，说“能不加班就不加班”，不知道会不会凉凉。~~
1. 为什么接触编程；为什么写博客；
1. 上家离职原因
1. 你还有什么问题 —— ~~暂时没有。。~~

问的有点多，大概就记得这些

## i6-sp 12月13日

收到口头offer，说薪资情况。正式流程还需要审批，大概2~3天才能收到邮箱正式offer。

准备三甲体检、租房

> 2023年12月14日 09点58分 昨天口头offer，今天早上刚上班就收到消息说审批通过了，正式offer今天或者明天，比想象中快~😀
>
> 2023年12月15日 收到offer~

## i总结or感想

整个流程从11月25日电话机试邀请，到12月14日正式收到offer，20天，半个月左右，算不算长？感觉还ok，或者说幸好有间隔的时间让我刷题和准备八股。当然，就流程而言，hod算是我见过的最长、最多流程的面试体验了（以至于后期家人朋友都叫我要有多几手准备😅）。

除了流程长外，感觉跟我联系的hrs、接口人都非常尽心友善，感谢、感谢🙏。

最后，下面从网络整理了些相关资料，有好的有质疑的，那就让我亲自去体验吧。可能后面断断续续会有入职/工作体验记录 for self。

## iother|资料整理

<disclaimer/>

经验

+ 面试过程21 <https://www.nowcoder.com/discuss/353158075165122560>
+ 面试过程22 <https://zhuanlan.zhihu.com/p/516446294>
+ 面试过程22 <https://www.nowcoder.com/discuss/414191103039000576>
+ 面试过程23 <https://blog.csdn.net/banxia_frontend/article/details/130446311>
+ 面试过程23 <https://www.nowcoder.com/discuss/554359902274072576>
+ 面试过程23 <https://www.nowcoder.com/feed/main/detail/348f671f8f5541bcbfd5d48b34609ae5>
+ 面试过程23 <https://www.nowcoder.com/discuss/532194999023202304>
+ 面试过程23(细) <https://blog.csdn.net/m0_37138074/article/details/126140900>
+ 入职体验 <https://www.zhihu.com/question/356592219/answer/1198212042>
+ 入职体验 <https://www.zhihu.com/question/393448954/answer/2301608196>
+ 入职体验 <https://zhuanlan.zhihu.com/p/639420930>
+ 入职体验 <https://www.nowcoder.com/discuss/386840436000796672>
+ 入职体验 <https://www.zhihu.com/question/346354942>
  + 面试过程20 <https://www.zhihu.com/question/346354942/answer/1166810638>
  + 日记 <https://www.zhihu.com/question/346354942/answer/1844702818>
  + OD介绍 <https://www.zhihu.com/question/346354942/answer/1199831960>
+ 其他 <https://javaguide.cn/high-quality-technical-articles/personal-experience/huawei-od-275-days.html>

```txt
https://bbs.csdn.net/topics/360211633
```

~~区别~~

```txt
周末加班有加班费
工卡 夜宵 班车
外网的权限，内部论坛资料 ilearning
股票分红
免费宿舍/租房补贴
申请公寓/心声部门文章/公告
D1绩效2-3k D2绩效3-4k D3绩效4-5k D4绩效5-6k D5绩效7-8k
od离职没n＋1

工资等级对照表2022|<https://maimai.cn/article/detail?fid=1736948890&efid=B-OqWZwHHZl7krcn7VRy0Q>
```

转正

```txt
基本要求：
*入职时间：一年以上
*绩效要求：连续两次绩效A —— 是一年里两次考评都排在部门前10%，能做到属于火车头
*认证要求：通过可信专业级认证
*其他条件：根据业务部门的人员需求及指标要求确定
```

## w0-rz

todo 入职

工作照 <!-- 白底、白衬衫、黑西装、领带 -->

体检 <!-- 三甲 公务员 400报销（所在部门报销） -->

填材料 <!-- 各种：身份、户籍、学历、工作经历、社保缴纳地、... -->

合同

## w1-kx

todo 可信考试
