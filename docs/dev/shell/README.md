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

## 历史记录

`~/.bash_history`

`history` 查看

## 调试

+ `bash -n` 不执行，检查语法
+ `bash -v` 将脚本内容打印到屏幕，再执行
+ `bash -x` 将脚本内容和输出都打印到屏幕，再执行

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
