---
title: Vmware 使用笔记
---

激活 https://gist.github.com/NSWG/2ad67111efb983c762e3425ff49ba2ad

## 安装win11

视频： https://www.youtube.com/watch?v=HtrNwFXHxTs

文章： https://developer.aliyun.com/article/849370

## 安装Fedora

## 配置SSH

```bash
# 连接SSH
C:\Windows\System32\OpenSSH\ssh.exe
C:\Windows\System32\OpenSSH\ssh.exe mp0a@vm-fedora-01
# 免密登录
ssh-keygen -f .ssh/vm-fedora
scp .ssh/vm-fedora.pub mp0a@vm-fedora-01:/tmp
ssh mp0a@vm-fedora-01
[mp0a@fedora ~]$ mkdir ~/.ssh
[mp0a@fedora ~]$ touch ~/.ssh/authorized_keys
[mp0a@fedora ~]$ cat /tmp/vm-fedora.pub >> ~/.ssh/authorized_keys
[mp0a@fedora ~]$ rm /tmp/vm-fedora.pub
C:\Windows\System32\OpenSSH\ssh.exe mp0a@vm-fedora-01 -i ~/.ssh/vm-fedora
```

配置复用

```bash
~/.ssh/config

Host l1
HostName lab1
Port 22
User qiangzibro

ssh l1
```

::: tip

ssh 命令除了登陆外还有三种代理功能： https://zhuanlan.zhihu.com/p/57630633

+ 正向代理（-L）：相当于 iptable 的 port forwarding
+ 反向代理（-R）：相当于 frp 或者 ngrok
+ socks5 代理（-D）：相当于 ss/ssr

:::

## 共享目录 for linux

问题： 挂在共享目录 https://kb.vmware.com/s/article/60262?lang=zh_CN

```bash
# 临时挂载
/usr/bin/vmhgfs-fuse .host:/mysharedfolder /mnt/hgfs -o subtype=vmhgfs-fuse,allow_other

# 永久挂载
vi /etc/fstab
<file system> <mount point> <type> <options> <dump> <pass>
vmhgfs-fuse    /mnt/hgfs    fuse    defaults,allow_other    0    0
<server>:</remote/export> </local/directory> <fuse-type> <options> <dump> <pass>
.host:/    /mnt/hgfs        fuse.vmhgfs-fuse    defaults,allow_other    0    0
```
