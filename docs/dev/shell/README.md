---
title: Shell 使用笔记
tags:
  - linux
  - bash
  - profile
---

Bash（Bourne Again Shell）

## 语法

[link](./syntax.md)

## 三剑客

+ grep 过滤
+ awk 转换
+ sed 格式化

todo

## 环境变量

登录式： `/etc/profile`、`~/.bash_profile`、`~/.bashrc`、`/etc/bashrc` \
非登录式： `~/.bashrc`、`/etc/bashrc` （bash特有）

+ `/etc/profile` —— 此文件为系统的每个用户设置环境信息，系统中每个用户登录时都要执行这个脚本。如果系统管理员希望某个设置对所有用户都生效，可以写在这个脚本里。这个文件也会从`/etc/profile.d`目录中配置文件中搜集shell的设置。
+ `~/.bash_profile` —— 每个用户都可以使用该文件设置专属于自己的shell信息。当用户登录时，该文件仅执行一次。默认情况下，它设置一些环境变量，执行用户的`.bashrc`文件。
+ `~/.bashrc` —— 该文件包含专属于用户自己的shell信息。当登录时，每次打开新shell时，该文件被读取。
+ `/etc/bashrc` —— 为每一个运行bash shell的用户执行此文件，当bash shell被打开时，该文件被读取。

::: tip
总结：profile for 用户（登录）、bashrc for bash（非登录）
:::

查看其他进程环境变量

```bash
$ sudo cat /proc/1/environ
WSL2_CROSS_DISTRO=/wslkCcfnf
$ sleep 10000 &
[1] 87
$ pgrep sleep
87
# 下面变量彼此用 \0 分割，而不是用 \n 分割
$ cat /proc/87/environ
SHELL=/bin/bashWSL_DISTRO_NAME=UbuntuNAME=lpc19PWD=/mnt/c/Users/xxxxLOGNAME=uv01MOTD_SHOWN=.....PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/usr/lib/wsl/lib:/mnt/c/Program Files (x86)/......5/bin:/snap/binHOSTTYPE=x86_64_=/usr/bin/sleep
# 换行
$ cat /proc/87/environ | tr '\0' '\n'
SHELL=/bin/bash
WSL_DISTRO_NAME=Ubuntu
NAME=lpc19
PWD=/mnt/c/Users/xxxx
LOGNAME=uv01
MOTD_SHOWN=update-motd
HOME=/home/uv01
LANG=C.UTF-8
....
```

检查当前shell版本

```bash
echo $SHELL
echo $0
```

检查是否为超级用户

```bash
if [ $UID -ne 0 ]; then
  echo Non root user. Please run as root.
else
  echo Root user
fi
```

todo 用 PS1 改变提示文本

## 历史记录

`~/.bash_history`

`history` 查看

## 回放

用 `script` 和 `scriptreplay` 命令可以将终端的会话记录记录下来并回放。

```bash
script # 进入会话记录模式，并默认将会话记录记录在 typescript 文件中
exit # 退出会话模式
```

会话记录和回放

```bash
# 记录命令时间戳
# script [options] [file]
# -t[<file>], --timing[=<file>] deprecated alias to -T (default file is stderr)
# -T, --log-timing <file>       log timing information to file
# -a, --append                  append to the log file

# 旧写法
script -t 2>timing.log -a output.session

# 新写法
script -T timing.log -a output.session

...

exit

# 回放上述命令
# scriptreplay [-t] timingfile [typescript] [divisor]
scriptreplay timing.log output.session
```

会话记录广播

```bash
# session1
mkfifo scriptfifo
script -f scriptfifo

....

exit

# session2
cat scriptfifo # waiting change
```

## 系统时间

在 UNIX 系统中，时间被存储为一个整数，其大小为自世界标准时间（UTC）时间1970年1月1日0时0分0秒起所流逝的秒数。

::: tip
UTC（Coordinated Universal Time，世界标准时间或世界协调时间）是以原子时秒长为基础，在时刻上尽量接近于世界时的一种时间计量系统。

UNIX 认为 UTC 1979年1月1日0点 是纪元时间或UNIX时间。POSIX标准 推出后，这个时间也被称为 POSIX时间。
:::

```bash
# 时间格式化
$ date
Wed Feb 28 22:01:52 CST 2024
$ date +%s
1709128922
$ date --date "Wed Feb 28 22:01:52 CST 2024" +%s
1709128912
$ date +"%s %B %Y"
1709129831 February 2024

# 设置时间
$ date -s "Wed Feb 28 22:01:52 CST 2024"
date: cannot set date: Operation not permitted
Wed Feb 28 22:01:52 CST 2024

# 时间差
$ start=$(date +%s)
$ sleep 10
$ end=$(date +%s)
$ echo "Time taken to execute commands is $(( end - start)) seconds."
```

内容 | 格式
--- | ---
星期（Sat） | `%a`
星期（Saturday） | `%A`
月（Nov） | `%b`
月（November） | `%B`
日（28） | `%d`
固定格式日期（`mm/dd/yy`） | `%D`
年（10） | `%y`
年（2010） | `%Y`
小时（08） | `%H`/`%I`
分钟（33） | `%M`
秒（10） | `%S`
纳秒（695208515） | `%N`
UNIX纪元时（以秒为单位，1709128922） | `%s`

## 文件

### 路径处理

#### 获取路径文件名
```bash
$ basename "/var/services/backup//tmp//backup__2023-05-02_0.tar.gz"
backup__2023-05-02_0.tar.gz
```
#### 获取路径文件夹名
```bash
$ str="/var/services/backup//tmp//backup__2023-05-02_0.tar.gz"; 
$ echo "${str%/*}"
/var/services/backup//tmp/
```
解释：
+ `%/` ——  拿掉最后一个`/`及其右边的字符串

### 文件编辑

追加（append）、覆盖

```bash
sudo tee /etc/nginx/sites-available/$project_name <<EOF
server {
    listen 80;
    server_name test.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF
```

### 文件查找

find

```bash
# 行为：打印
find . -print # 默认，用 \n 分割每个匹配的文件
find . -print0 # 用 \0 分割每个匹配的文件
# 行为：跳过
find . \( -name ".git" -prune \) -o \( -type f -print \)
# 行为：删除
# -delete
# 行为：执行
find . -exec echo "-- {}" \; # 注意结尾

# 匹配文件名
find . -name "*.txt"
find . -iname "*.txt" # 忽略大小写
# 匹配整个路径
find . -path "*slynux*"
# 匹配整个路径（正则）
find . -regex ".*\(\.py\|\.sh\)$"
# 匹配用户
# -user username
# 匹配权限
# -perm 644
# 匹配类型
find . -type f # 匹配文件
# f 普通文件
# l 符号链接
# d 目录
# c 字符设备
# b 块设备
# s 套接字
# p 管道Fifo
# 匹配时间（每个文件都有三种时间戳，单位“天”）
# -atime 访问时间，用户最近一次访问文件的时间
# -mtime 修改时间，文件内容最后一次被修改的时间
# -ctime 变化时间，文件元素据（matedata，如权限、所有权）最后一次变化的时间
find . -type f -atime -7 -print # 在7天内访问
find . -type f -atime 7 -print # 在前第7天访问
find . -type f -atime -7 -print # 在7天前访问
# -newer file 比某个文件更新
find . -type f -newer file.txt -print
# 匹配大小
# -size +2k
# -size -2k
# -size 2k
# 大小单位
# b 块
# c 字节
# w 字（2字节）
# k 千字节
# M
# G

# 取反
find . ! -name "*.txt" # 排除

# 多个条件
# -o 或
find . -name "*.txt" -o -name "*.pdf"
find . \( -name "*.txt" -o -name "*.pdf" \) -print # 如果参数比较多，可以将相似的放在一起，括起来

# 搜索深度
-maxdepth 10
-mindepth 1
```

### 文件读取

#### cat、tr

```bash
cat filename
cat -s filename # 压缩空行，将多个连续空行压缩为一个空行
cat filename | tr -s '\n' # 删除空行

# -T 显示制表符
# -n 显示行号
```

### 文件校验和核实

校验和（checksum）程序用来从文件中生成校验和密钥，然后利用这个校验和密钥核实文件的完整性。

`md5sum`/`sha1sum`

```bash
$ md5sum filename
$ md5sum filename > file_sum.md5

# 生成密钥
$ touch filename
$ md5sum filename
d41d8cd98f00b204e9800998ecf8427e  filename
$ touch filename1
$ md5sum filename1
d41d8cd98f00b204e9800998ecf8427e  filename1

# 校验和
$ md5sum filename > file_sum.md5
$ md5sum -c file_sum.md5
filename: OK
$ echo a >> filename
$ md5sum -c file_sum.md5
filename: FAILED
md5sum: WARNING: 1 computed checksum did NOT match
```

对目录校验

```bash
# 生成校验文件
# 方式一： 使用 md5deep/sha1deep（需要安装）
uv01@lpc19:~$ ll test
total 20
drwxr-xr-x 2 uv01 uv01 4096 Mar  2 11:40 ./
drwxr-x--- 4 uv01 uv01 4096 Mar  2 11:46 ../
-rw-r--r-- 1 uv01 uv01   43 Mar  2 11:20 file_sum.md5
-rw-r--r-- 1 uv01 uv01   44 Mar  2 11:26 file_sum1.md5
-rw-r--r-- 1 uv01 uv01    2 Mar  2 11:20 filename
-rw-r--r-- 1 uv01 uv01    0 Mar  2 11:17 filename1
uv01@lpc19:~$ md5deep -rl test/ > test.md5
uv01@lpc19:~$ cat test.md5
d41d8cd98f00b204e9800998ecf8427e  test/filename1
e914786832e3689d3ccec80c0689ed64  test/file_sum.md5
60b725f10c9c85c70d97880dfe8191b3  test/filename
3152d0d707b419f8291d55de09ef4b0a  test/file_sum1.md5
uv01@lpc19:~$ md5sum -c test.md5
test/filename1: OK
test/file_sum.md5: OK
test/filename: OK
test/file_sum1.md5: OK

# 方式二： 使用 find 命令
find test/ -type f -print0 | xargs -0 md5sum >> test.md5
```

### 临时文件

linux 中 `/tmp` 中的内容会在系统重启后被清空，所以这个路径适合存放临时文件。

`tempfile` （只有 debian 系列中才有，且该工具已废弃，因改用 `mktemp` 工具）

```bash
$ tempfile
WARNING: tempfile is deprecated; consider using mktemp instead.
/tmp/filei2TnrT
```

随机文件名

```bash
# 可使用 `$RANDOM` 创建
temp_file="/tmp/file-$RANDOM"
# 也可使用下面命令
# 这里 $$ 表示当前运行中的 PID
temp_file="/tmp/var.$$"
```

## 调试

+ `bash -n` 不执行，检查语法
+ `bash -v` 将脚本内容打印到屏幕，再执行
+ `bash +v` 禁止打印输入
+ `bash -x` 将脚本内容和输出都打印到屏幕，再执行
+ `bash +x` 关闭调试

::: tip
上述时命令行执行时添加（shebang方式）的形式。另外也可以在脚本文件中添加上诉参数。

```bash
set -xe
```
:::

+ `:` 不执行任何操作
+ 自定义调试方法
  ```bash
  function DEBUG() {
    [ "$_DEBUG" == "on" ] && $@ || :
  }
  for i in {1..10}; do
    DEBUG echo $i
  done
  ```

e.g. 扫描机器是否在线

```bash
#!/bin/sh
for i in `seq 1 254`
do
  ping -c2 192.168.20.$i > /dev/null 2>&1
  if [ $? -eq 0 ]; then
    echo "192.168.20.$i is online" >> node_online.txt
  else
    echo "192.168.20.$i is offline" >> node_offline.txt
  fi
done 
```

e.g. 监控主机磁盘：如果主机磁盘分区使用超过80%，则报警。\
假设被监控主机ip列表存放再文件`/tmp/hosts`

```bash
#!/bin/bash
hostfile=/tmp/hosts
if [ $(wc -l $hostfile | cut -f1 -d ' ') -lt 1 ]; then
  exit 1
fi
for i in $(cat $hostfile); do
  ssh $i df -h | grep '^/dev/' | awk '{print $1,$5}' | cut -f 1 -d% | awk '{if ($2 > 80) print $0}' >  disk.log
  str=(`cat disk.log`)
  if [ -n ${str} ]; then
    cat disk.log | mail -s "$i: disk is greater than 80%" root@localhost
  fi 
done
```

## 终端处理工具

### tput

```bash
# 终端列数、行数
$ tput cols # 120
$ tput lines # 30
# 打印当前终端名称
$ tput longname # xterm with 256 colors

# 将光标位置移动
$ tput cup 100 100 # 移动
$ tput cup 0 0     # 复原
# 删除光标到行尾的内容
$ tput ed

# 设置终端背景色
$ tput setb no # no值可以在0~7之间
# 设置文本样式为粗体
$ tput bold
# 设置下划线的开关
$ tput smul
$ tput rmul
```

计时

```bash
#!/bin/bash
echo -n Count:
tput sc # 保留光标当前的位置

count=0;
while true; do
  if [ $count -lt 40 ]; then
    let count++;
    sleep 1;
    tput rc # 回到sc保存的位置
    tput ed # 删除光标到行尾的内容
    echo -n $count;
  else 
    exit 0;
  fi
done
```

### stty

在输入密码时，不能让输入的内容显示出来

```bash
#!/bin/bash
#Filename: password.sh
echo -e "Enter password: "
stty -echo
read password
stty echo
echo
echo "password read"
```

## 例子

### 收集系统信息

```bash
#!/bin/bash
echo -n "hostname is: "; hostname
# cpu、内存
lscpu; free
# 网络设备、连接
ip link; ip a
# 块情况（设备、挂载）、文件系统情况（文件系统、挂载）
lsblk; df
# Report virtual memory statistics
vmstat 2 5
# 进程情况，每2s检查一次，共检查5次
top -n 5 -d 2
sar -n DEV -p 2 5
sar -d -p 2 5 
```

todo [https://zhuanlan.zhihu.com/p/625392303](https://zhuanlan.zhihu.com/p/625392303)

### 自动化部署Web项目脚本


用于自动化部署一个 Node.js 项目。脚本假设已经在服务器上安装了 Git、Node.js、npm、pm2 和 Nginx 等必要的工具和服务。
该脚本执行以下步骤：

1. 定义了一些变量，包括项目名称、Git 仓库地址、项目路径等。
1. 检查项目目录是否存在，如果存在则删除。
1. 克隆代码到指定目录。
1. 进入项目目录，安装依赖。
1. 构建项目代码。
1. 启动项目。
1. 配置 Nginx 反向代理。
1. 检查 Nginx 配置是否正确，如果正确，则启用配置并重启 Nginx；否则，恢复原有状态并输出错误信息。

```bash
#!/bin/bash

# 定义变量
project_name="my-project"
git_repo="https://github.com/username/my-project.git"
project_dir="/var/www/html/my-project"

# 检查目录是否存在
if [ -d "$project_dir" ]; then
    echo "Project directory already exists. Removing..."
    rm -rf $project_dir
fi

# 克隆代码
echo "Cloning project from Git repo..."
git clone $git_repo $project_dir

# 切换到项目目录
cd $project_dir || exit

# 安装依赖
echo "Installing dependencies..."
npm install

# 构建代码
echo "Building project..."
npm run build

# 启动项目
echo "Starting project..."
pm2 start server.js --name $project_name

# 配置 Nginx 反向代理
echo "Configuring Nginx..."
sudo tee /etc/nginx/sites-available/$project_name <<EOF
server {
    listen 80;
    server_name test.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# 检查 Nginx 配置是否正确
echo "Checking Nginx configuration..."
if sudo nginx -t; then
    # 如果配置无误，启用配置并重启 Nginx
    sudo ln -s /etc/nginx/sites-available/$project_name /etc/nginx/sites-enabled/
    sudo systemctl restart nginx
    echo "Deployment complete!"
else
    # 如果配置有误，恢复原有状态
    sudo rm /etc/nginx/sites-available/$project_name
    rm -rf $project_dir
    echo "Nginx configuration is invalid. Deployment failed."
fi
```

## 参考

+ 《Linux Shell Scripting Cookbook》 by Sarath Lakshman | 译-中 《Linux Shell 脚本攻略》 by 门佳 
