---
title: rsync 使用笔记
---

`remote synchronize`

features

- 可以实现跨平台、全量、增量、本地、远程数据同步备份
- 同步数据镜像时，通过“quick check”算法，仅同步大小、最后修改时间发生变化的文件、目录
	- 当然，也可以根据权限、属主等属性变化进行同步

## 命令

```bash
shell模式：使用ssh程序传送

rsync [OPTION]... SRC DEST
rsync [OPTION]... SRC [USER@]HOST:DEST
rsync [OPTION]... [USER@]HOST:SRC DEST

daemon模式：使用tcp连接rsync daemon。需要远程机器上开启了rsync daemon，默认端口873

rsync --daemon
rsync [OPTION]... [USER@]HOST::SRC DEST
rsync [OPTION]... SRC [USER@]HOST::DEST
rsync [OPTION]... rsync://[USER@]HOST[:PORT]/SRC [DEST]
```

参数

```bash
-n 执行一次空运行。不做任何改变，但是会显示与真实执行一样的结果。可用于在正真执行前，严查命令是否正确。
-v verbose
-a "archive mode" 会启用下面参数： equals -rlptgoD
    -r 递归 
    -l 同步软链接
    -H 同步硬链接
    -D 同步设备文件
    -p 保留权限
    -o 保留所有者
    -g 保留所属组
    -t 保留时间戳
-A 同步时保留ACLs内容
-X 同步时保留selinux内容
--delete 同步删除（删除目标文件夹中无关的内容）

     --iconv=CONVERT_SPEC    request charset conversion of filenames

 -z, --compress              compress file data during the transfer
 -h, --human-readable        output numbers in a human-readable format
     --progress              show progress during transfer
```

例子

```bash
rsync -a file/photo/ secret/photo/ -nv
```

## 问题：File name too long

```bash
--iconv=utf8
```

## 实时同步

要实现实时同步，需要在目标机器上开启一个后台进程，实时监听某一个具体文件或目录的变化（增加、删除、修改）

- inotify
- sersync