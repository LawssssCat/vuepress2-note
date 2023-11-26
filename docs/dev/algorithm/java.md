---
title: Java 算法刷题笔记
---

## 常用函数

有个印象，用到想到就行。

```java
// 位运算
// 与（&）、非（~）、或（|）、异或（^）
int c = m^n;
int count = 0;
while(c!=0){
  count+= c&1;
  c = c >>1;
}

// 进制转换
// 16 -> 10
Integer.parseInt("0xAA".substring(2), 16);
Integer.valueOf("FFFF", 16)
// 10 -> 16
Integer.toHexString(int i);
// 10 -> 8
Integer.toOctalString(int i);
// 10 -> 2
Integer.toBinaryString(int i);

// 字符统计（技巧：标准ASCII字符在0~127位上，统计时创建一个128大小的数组即可【我的意思是：不需要map！！！】）
// 0~9=48~57,A~Z=65~90,a~z=97~122 （没必要记）
new int[128]

// 字符串
StringBuffer strb = new StringBuffer(str).reverse(); // 反转

// 正则
String[] s = str.split("[^a-zA-Z]");
```
