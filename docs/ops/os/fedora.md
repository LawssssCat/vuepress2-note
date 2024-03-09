---
title: Fedora 使用笔记
---

## 更换镜像源

### 国内

参考：

+ 清华 https://mirrors.tuna.tsinghua.edu.cn/help/fedora/
+ 阿里云 https://developer.aliyun.com/article/831637

```bash
cp /etc/yum.repos.d/fedora.{repo,repo.bak} -v
cp /etc/yum.repos.d/fedora-updates.{repo,repo.bak} -v
wget -O /etc/yum.repos.d/fedora.repo https://mirrors.aliyun.com/repo/fedora.repo
wget -O /etc/yum.repos.d/fedora-updates.repo https://mirrors.aliyun.com/repo/fedora-updates.repo
yum clean all
yum makecache
```

## 问题

#### Curl error (37): Couldn't read a file:// file for file:///etc/pki/rpm-gpg/RPM-GPG-KEY-fedora-x86_64 [Couldn't open file /etc/pki/rpm-gpg/RPM-GPG-KEY-fedora-x86_64]

参考： https://www.cnblogs.com/linux234/p/7235467.html

```bash
# rpmkeys - RHEL7引入的命令，用于密钥环导入和签名验证 | https://access.redhat.com/documentation/zh-cn/red_hat_enterprise_linux/7/html/rpm_packaging_guide/new_features_of_rpm_in_rhel_7
rpmkeys --import /etc/pki/rpm-gpg/RPM-GPG-KEY-fedora-39-x86_64
```
