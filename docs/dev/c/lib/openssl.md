---
title: openssl 使用笔记
---

## 编译

编译、安装、配置 openssl

```bash
# 编译、安装
wget https://www.openssl.org/source/openssl-1.1.1w.tar.gz
tar -zxvf openssl-1.1.1w.tar.gz
cd openssl-1.1.1w

OPENSSL_HOME=$(mktemp -d) # /tmp/tmp.9MXkZ2NTbO
# ./config
# ./config -h # 帮助
./config --prefix=$OPENSSL_HOME
./config -t # 查看配置情况
make 
make install
```

```bash
$ export PATH=$OPENSSL_HOME/bin/:$PATH
```

注册库： 注册新库的位置，否则其他软件可能还是用的旧 openssl 库

+ 临时更改库

  ```bash
  export LD_LIBRARY_PATH=$OPENSSL_HOME/lib/:$LD_LIBRARY_PATH
  ```

+ 永久更改（需管理员权限）

  ```bash
  # 修改链接文件
  mv /usr/bin/openssl /usr/bin/openssl.bak
  ln -sf /usr/local/openssl/bin/openssl /usr/bin/openssl

  # 添加路径至ld.so.conf
  ## 路径最后不带“/”，否则报错
  echo "/usr/local/openssl/lib" >> /etc/ld.so.conf
  ldconfig -v
  ```

```bash
$ openssl version
```

## 源码

参考：

+ todo 使用 - https://www.bilibili.com/video/BV1Kj421o7vQ/
+ todo 带你深入浅出OpenSSL(更新中) - https://www.bilibili.com/video/BV19A4y1X7iC
+ todo 基于openssl的C++实战加密与解密 - https://www.bilibili.com/video/BV1N84y1A7Gt/
