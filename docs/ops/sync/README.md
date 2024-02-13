---
title: 文件同步工具使用笔记
---

文件同步工具有单次同步和实时同步两种：

+ 单次同步/文件传送 —— scp、rsync、winrm、
+ 实时同步 —— 实时同步的脚本形式、

### windows 实时同步软件

参考：

+ b站 | 文件夹同步软件体验 —— <https://www.bilibili.com/video/BV1PW4y1D73s/>

软件列表整理：

+ synctoy
    + 免费、microsoft、可排除子文件夹
    + 不能热备份
+ goodsync
    + 热备份强、能自动、可多组执行
    + 收费、需登录
+ freefile sync
    + 免费、热备份、锁定文件权限
    + 无法指定子文件夹、成功率不高
+ WindataReflector
    + 可自动
    + 收费、不能同时同步多组、热备份成功率低、不能单独显示错误日志、不能单独排除子文件夹
+ realtime sync 功能缺陷，是 freefile sync 的一部分
+ ~~duplicati2 只备份~~
+ ~~disksync 收费、垃圾~~
+ ~~fileYee 收费、垃圾~~
