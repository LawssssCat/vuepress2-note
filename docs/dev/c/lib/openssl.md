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

### 问题： You need Perl 5.

方式一： todo 包作用

```bash
yum -y install perl-IPC-Cmd
```

```bash
Installing:
 perl-IPC-Cmd                                           noarch                           2:1.04-501.fc39                                   fedora                             39 k
Installing dependencies:
 groff-base                                             x86_64                           1.23.0-3.fc39                                     updates                           1.1 M
 ncurses                                                x86_64                           6.4-7.20230520.fc39                               fedora                            416 k
 perl-AutoLoader                                        noarch                           5.74-502.fc39                                     updates                            21 k
 perl-B                                                 x86_64                           1.88-502.fc39                                     updates                           177 k
 perl-Carp                                              noarch                           1.54-500.fc39                                     fedora                             29 k
 perl-Class-Struct                                      noarch                           0.68-502.fc39                                     updates                            22 k
 perl-Data-Dumper                                       x86_64                           2.188-501.fc39                                    fedora                             56 k
 perl-Digest                                            noarch                           1.20-500.fc39                                     fedora                             25 k
 perl-Digest-MD5                                        x86_64                           2.58-500.fc39                                     fedora                             35 k
 perl-DynaLoader                                        x86_64                           1.54-502.fc39                                     updates                            26 k
 perl-Encode                                            x86_64                           4:3.19-500.fc39                                   fedora                            1.7 M
 perl-Errno                                             x86_64                           1.37-502.fc39                                     updates                            15 k
 perl-Exporter                                          noarch                           5.77-500.fc39                                     fedora                             31 k
 perl-ExtUtils-MM-Utils                                 noarch                           2:7.70-501.fc39                                   fedora                             11 k
 perl-Fcntl                                             x86_64                           1.15-502.fc39                                     updates                            21 k
 perl-File-Basename                                     noarch                           2.86-502.fc39                                     updates                            17 k
 perl-File-Find                                         noarch                           1.43-502.fc39                                     updates                            25 k
 perl-File-Path                                         noarch                           2.18-500.fc39                                     fedora                             35 k
 perl-File-Temp                                         noarch                           1:0.231.100-500.fc39                              fedora                             58 k
 perl-File-stat                                         noarch                           1.13-502.fc39                                     updates                            17 k
 perl-FileHandle                                        noarch                           2.05-502.fc39                                     updates                            16 k
 perl-Getopt-Long                                       noarch                           1:2.54-500.fc39                                   fedora                             60 k
 perl-Getopt-Std                                        noarch                           1.13-502.fc39                                     updates                            16 k
 perl-HTTP-Tiny                                         noarch                           0.088-3.fc39                                      fedora                             56 k
 perl-I18N-LangTags                                     noarch                           0.45-502.fc39                                     updates                            53 k
 perl-IO                                                x86_64                           1.52-502.fc39                                     updates                            82 k
 perl-IO-Socket-IP                                      noarch                           0.42-1.fc39                                       fedora                             42 k
 perl-IO-Socket-SSL                                     noarch                           2.083-3.fc39                                      fedora                            225 k
 perl-IPC-Open3                                         noarch                           1.22-502.fc39                                     updates                            22 k
 perl-Locale-Maketext                                   noarch                           1.33-501.fc39                                     fedora                             94 k
 perl-Locale-Maketext-Simple                            noarch                           1:0.21-502.fc39                                   updates                            18 k
 perl-MIME-Base64                                       x86_64                           3.16-500.fc39                                     fedora                             29 k
 perl-Module-CoreList                                   noarch                           1:5.20240223-1.fc39                               updates                            89 k
 perl-Module-Load                                       noarch                           1:0.36-500.fc39                                   fedora                             17 k
 perl-Module-Load-Conditional                           noarch                           0.74-500.fc39                                     fedora                             22 k
 perl-Module-Metadata                                   noarch                           1.000038-3.fc39                                   fedora                             35 k
 perl-Mozilla-CA                                        noarch                           20230801-1.fc39                                   fedora                             13 k
 perl-Net-SSLeay                                        x86_64                           1.92-10.fc39                                      fedora                            360 k
 perl-POSIX                                             x86_64                           2.13-502.fc39                                     updates                            97 k
 perl-Params-Check                                      noarch                           1:0.38-500.fc39                                   fedora                             22 k
 perl-PathTools                                         x86_64                           3.89-500.fc39                                     fedora                             87 k
 perl-Pod-Escapes                                       noarch                           1:1.07-500.fc39                                   fedora                             20 k
 perl-Pod-Perldoc                                       noarch                           3.28.01-501.fc39                                  fedora                             86 k
 perl-Pod-Simple                                        noarch                           1:3.45-4.fc39                                     fedora                            218 k
 perl-Pod-Usage                                         noarch                           4:2.03-500.fc39                                   fedora                             39 k
 perl-Scalar-List-Utils                                 x86_64                           5:1.63-500.fc39                                   fedora                             72 k
 perl-SelectSaver                                       noarch                           1.02-502.fc39                                     updates                            12 k
 perl-Socket                                            x86_64                           4:2.037-3.fc39                                    fedora                             55 k
 perl-Storable                                          x86_64                           1:3.32-500.fc39                                   fedora                             99 k
 perl-Symbol                                            noarch                           1.09-502.fc39                                     updates                            14 k
 perl-Term-ANSIColor                                    noarch                           5.01-501.fc39                                     fedora                             47 k
 perl-Term-Cap                                          noarch                           1.18-500.fc39                                     fedora                             22 k
 perl-Text-ParseWords                                   noarch                           3.31-500.fc39                                     fedora                             16 k
 perl-Text-Tabs+Wrap                                    noarch                           2023.0511-3.fc39                                  fedora                             22 k
 perl-Time-HiRes                                        x86_64                           4:1.9775-500.fc39                                 fedora                             57 k
 perl-Time-Local                                        noarch                           2:1.350-3.fc39                                    fedora                             34 k
 perl-URI                                               noarch                           5.21-1.fc39                                       fedora                            125 k
 perl-base                                              noarch                           2.27-502.fc39                                     updates                            16 k
 perl-constant                                          noarch                           1.33-501.fc39                                     fedora                             22 k
 perl-if                                                noarch                           0.61.000-502.fc39                                 updates                            14 k
 perl-interpreter                                       x86_64                           4:5.38.2-502.fc39                                 updates                            72 k
 perl-libnet                                            noarch                           3.15-501.fc39                                     fedora                            129 k
 perl-libs                                              x86_64                           4:5.38.2-502.fc39                                 updates                           2.4 M
 perl-locale                                            noarch                           1.10-502.fc39                                     updates                            14 k
 perl-mro                                               x86_64                           1.28-502.fc39                                     updates                            29 k
 perl-overload                                          noarch                           1.37-502.fc39                                     updates                            46 k
 perl-overloading                                       noarch                           0.02-502.fc39                                     updates                            13 k
 perl-parent                                            noarch                           1:0.241-500.fc39                                  fedora                             14 k
 perl-podlators                                         noarch                           1:5.01-500.fc39                                   fedora                            125 k
 perl-vars                                              noarch                           1.05-502.fc39                                     updates                            13 k
 perl-version                                           x86_64                           8:0.99.30-1.fc39                                  fedora                             62 k
Installing weak dependencies:
 perl-NDBM_File                                         x86_64                           1.16-502.fc39                                     updates                            23 k
```

方式二： 编译、安装perl5

```bash
wget https://www.cpan.org/src/5.0/perl-5.28.0.tar.gz
tar -zxvf perl-5.28.0.tar.gz      
cd perl-5.28.0

PERL_HOME=`mktemp -d`
./Configure -des -Dprefix=$PERL_HOME
make
# make test
make install
```

## 源码

参考：

+ todo 使用 - https://www.bilibili.com/video/BV1Kj421o7vQ/
+ todo 带你深入浅出OpenSSL(更新中) - https://www.bilibili.com/video/BV19A4y1X7iC
+ todo 基于openssl的C++实战加密与解密 - https://www.bilibili.com/video/BV1N84y1A7Gt/
