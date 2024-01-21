---
title: Nginx 使用笔记
---

```bash
# 启动
nginx               #启动nginx   
nginx -s reload     #启动nginx,并重新载入配置
nginx -s reopen     #重新打开日志文件

# 关闭
nginx -s stop   #发送关闭命令
pkill -9 nginx    #强制关闭进程

# 进程状态
ps -ef | grep nginx

# 服务状态 - 配置http_stub_status_module模块
```

## 状态模块

参考： 《Nginx总结（十）如何监控Nginx的运行状态》 https://cloud.tencent.com/developer/article/1653383

```bash
nginx -V 2>&1 | grep -o with-http_stub_status_module
./configure –with-http_stub_status_module
```

```conf
location /status {
    stub_status            on;
    access_log             off;
    allow 127.0.0.1;
    deny all;
    #auth_basic              "NginxStatus";
    #auth_basic_user_file  conf/nginxstaus;
}
```

`http://127.0.0.1/status`

```bash
root@9505b26d3225:/# curl 127.0.0.1/status
Active connections: 1
server accepts handled requests
 2 2 2

Active connections – 活跃的连接数量
server accepts handled requests — 对应的是：连接数、成功创建的tcp握手、总请求数 三个参数。
reading — 读取客户端的连接数。
writing — 响应数据到客户端的数量。
waiting — 开启 keep-alive 的情况下,这个值等于 active – (reading+writing), 意思就是 Nginx 已经处理完正在等候下一次请求指令的驻留连接。
```

## 日志配置

参考 https://zhuanlan.zhihu.com/p/112314267

todo

## 正向代理

todo 正向代理配置

Nginx-正向代理实现 
https://www.cnblogs.com/yanjieli/p/15229907.html

玩转Nginx正反向代理
https://www.51cto.com/article/766532.html

```conf
# cat default.conf 
server {
    listen 80;
    server_name _;
    
    location / {
        resolver 114.114.114.114;
        set $backend_host $host;  #将原始域名存储到变量中
        proxy_pass http://$backend_host$request_uri;  #使用变量保持原始域名
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

## 分析 docker nginx 镜像

[nginx的官方镜像Dockerfile](https://github.com/nginxinc/docker-nginx/blob/master/Dockerfile-alpine.template)

```bash
$ podman pull nginx
$ podman run -it -d -p 8080:80 docker.io/library/nginx:latest
$ curl 127.0.0.1:8080
<h1>Welcome to nginx!</h1>

$ podman exec -it 2b56681a6629e32b55829d6ae64f495e935c122f626fb0c1ecd808c633bcdbbf bash.
$ whoami
root
# 发行版
$ cat /etc/os-release
PRETTY_NAME="Debian GNU/Linux 12 (bookworm)"
NAME="Debian GNU/Linux"
VERSION_ID="12"
VERSION="12 (bookworm)"
VERSION_CODENAME=bookworm
ID=debian
HOME_URL="https://www.debian.org/"
SUPPORT_URL="https://www.debian.org/support"
BUG_REPORT_URL="https://bugs.debian.org/"
$ cat /etc/debian_version
12.4
# 编译版本
$ cat /proc/version
Linux version 5.10.16.3-microsoft-standard-WSL2 (oe-user@oe-host) (x86_64-msft-linux-gcc (GCC) 9.3.0, GNU ld (GNU Binutils) 2.34.0.20200220) #1 SMP Fri Apr 2 22:23:49 UTC 2021
$ uname -a
Linux 2b56681a6629 5.10.16.3-microsoft-standard-WSL2 #1 SMP Fri Apr 2 22:23:49 UTC 2021 x86_64 GNU/Linux
# 展示信息（display message）或驱动程序信息（driver message）是大多数类Unix操作系统上的一个命令，用于打印内核的消息缓冲区的信息
$ dmesg | grep Linux
[    0.000000] Linux version 5.10.16.3-microsoft-standard-WSL2 (oe-user@oe-host) (x86_64-msft-linux-gcc (GCC) 9.3.0, GNU ld (GNU Binutils) 2.34.0.20200220) #1 SMP Fri Apr 2 22:23:49 UTC 2021
[    0.389181] ACPI: Added _OSI(Linux-Dell-Video)
[    0.390600] ACPI: Added _OSI(Linux-Lenovo-NV-HDMI-Audio)
[    0.393048] ACPI: Added _OSI(Linux-HPI-Hybrid-Graphics)

$ nginx -v
nginx version: nginx/1.25.3
$ which nginx
/usr/sbin/nginx
$ ls -l /usr/sbin/nginx
-rwxr-xr-x 1 root root 1536808 Oct 24 16:10 /usr/sbin/nginx
```

查看该镜像的组成

```bash
$ podman images
REPOSITORY               TAG         IMAGE ID      CREATED       SIZE
docker.io/library/nginx  latest      a8758716bb6a  2 months ago  191 MB
$ podman history nginx
ID            CREATED       CREATED BY                                     SIZE        COMMENT
a8758716bb6a  2 months ago  CMD ["nginx" "-g" "daemon off;"]               0B          buildkit.dockerfile.v0
<missing>     2 months ago  STOPSIGNAL SIGQUIT                             0B          buildkit.dockerfile.v0
<missing>     2 months ago  EXPOSE map[80/tcp:{}]                          0B          buildkit.dockerfile.v0
<missing>     2 months ago  ENTRYPOINT ["/docker-entrypoint.sh"]           0B          buildkit.dockerfile.v0
<missing>     2 months ago  COPY 30-tune-worker-processes.sh /docker-e...  7.17kB      buildkit.dockerfile.v0
<missing>     2 months ago  COPY 20-envsubst-on-templates.sh /docker-e...  5.12kB      buildkit.dockerfile.v0
<missing>     2 months ago  COPY 15-local-resolvers.envsh /docker-entr...  2.56kB      buildkit.dockerfile.v0
<missing>     2 months ago  COPY 10-listen-on-ipv6-by-default.sh /dock...  4.61kB      buildkit.dockerfile.v0
<missing>     2 months ago  COPY docker-entrypoint.sh / # buildkit         3.58kB      buildkit.dockerfile.v0
<missing>     2 months ago  RUN /bin/sh -c set -x     && groupadd --sy...  113MB       buildkit.dockerfile.v0
<missing>     2 months ago  ENV PKG_RELEASE=1~bookworm                     0B          buildkit.dockerfile.v0
<missing>     2 months ago  ENV NJS_VERSION=0.8.2                          0B          buildkit.dockerfile.v0
<missing>     2 months ago  ENV NGINX_VERSION=1.25.3                       0B          buildkit.dockerfile.v0
<missing>     2 months ago  LABEL maintainer=NGINX Docker Maintainers ...  0B          buildkit.dockerfile.v0
<missing>     2 months ago  /bin/sh -c #(nop)  CMD ["bash"]                0B
<missing>     2 months ago  /bin/sh -c #(nop) ADD file:9deb26e1dbc258d...  77.8MB
```

其中 `nginx -g daemon off` 命令用于让nginx在前台运行，而不是在后台作为守护进程运行。这样做的目的是为了让Docker能够正确地跟踪nginx的进程，因为Docker会根据容器内部的第一个进程（pid=1）来判断容器是否正在运行。如果nginx在后台运行，那么Docker会认为容器已经退出，从而终止容器。

## 构建 docker nginx 非 root 镜像

参考： 《如何构建一个以非root用户运行的nginx的镜像？》 https://www.cnblogs.com/chuanzhang053/p/17580014.html

查看环境情况

::: details

```bash
# 默认root用户
$ podman run --rm docker.io/library/nginx whoami
root
# 有nginx用户
$ podman run --rm docker.io/library/nginx cat /etc/passwd
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync
games:x:5:60:games:/usr/games:/usr/sbin/nologin
man:x:6:12:man:/var/cache/man:/usr/sbin/nologin
lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin
mail:x:8:8:mail:/var/mail:/usr/sbin/nologin
news:x:9:9:news:/var/spool/news:/usr/sbin/nologin
uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin
proxy:x:13:13:proxy:/bin:/usr/sbin/nologin
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin
backup:x:34:34:backup:/var/backups:/usr/sbin/nologin
list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin
irc:x:39:39:ircd:/run/ircd:/usr/sbin/nologin
_apt:x:42:65534::/nonexistent:/usr/sbin/nologin
nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin
nginx:x:101:101:nginx user:/nonexistent:/bin/false

# 相关文件
$ podman run --rm docker.io/library/nginx which nginx
/usr/sbin/nginx
$ podman run --rm docker.io/library/nginx ls -l /usr/sbin/nginx
-rwxr-xr-x 1 root root 1536808 Oct 24 16:10 /usr/sbin/nginx
$ podman run --rm docker.io/library/nginx find / -name nginx
/etc/init.d/nginx
/etc/default/nginx
/etc/logrotate.d/nginx
/etc/nginx
/usr/lib/nginx
/usr/share/doc/nginx
/usr/share/nginx
/usr/sbin/nginx
/var/cache/nginx
/var/log/nginx
$ podman run --rm docker.io/library/nginx find / -name *nginx*
/etc/systemd/system/multi-user.target.wants/nginx.service
/etc/rc5.d/S01nginx
/etc/rc4.d/S01nginx
/etc/rc6.d/K01nginx
/etc/rc0.d/K01nginx
/etc/init.d/nginx-debug
/etc/init.d/nginx
/etc/rc3.d/S01nginx
/etc/default/nginx-debug
/etc/default/nginx
/etc/rc1.d/K01nginx
/etc/rc2.d/S01nginx
/etc/logrotate.d/nginx
/etc/nginx
/etc/nginx/nginx.conf
/usr/lib/systemd/system/nginx.service
/usr/lib/systemd/system/nginx-debug.service
/usr/lib/nginx
/usr/share/doc/nginx-module-xslt
/usr/share/doc/nginx-module-njs
/usr/share/doc/nginx
/usr/share/doc/nginx-module-image-filter
/usr/share/doc/nginx-module-geoip
/usr/share/keyrings/nginx-archive-keyring.gpg
/usr/share/nginx
/usr/sbin/nginx-debug
/usr/sbin/nginx
/var/lib/systemd/deb-systemd-helper-enabled/multi-user.target.wants/nginx.service
/var/lib/systemd/deb-systemd-helper-enabled/nginx-debug.service.dsh-also
/var/lib/systemd/deb-systemd-helper-enabled/nginx.service.dsh-also
/var/lib/dpkg/info/nginx-module-image-filter.list
/var/lib/dpkg/info/nginx-module-njs.list
/var/lib/dpkg/info/nginx-module-xslt.postinst
/var/lib/dpkg/info/nginx.preinst
/var/lib/dpkg/info/nginx-module-image-filter.md5sums
/var/lib/dpkg/info/nginx-module-xslt.md5sums
/var/lib/dpkg/info/nginx-module-geoip.md5sums
/var/lib/dpkg/info/nginx-module-njs.md5sums
/var/lib/dpkg/info/nginx.postinst
/var/lib/dpkg/info/nginx-module-geoip.postinst
/var/lib/dpkg/info/nginx.list
/var/lib/dpkg/info/nginx.md5sums
/var/lib/dpkg/info/nginx.postrm
/var/lib/dpkg/info/nginx-module-njs.postinst
/var/lib/dpkg/info/nginx.prerm
/var/lib/dpkg/info/nginx-module-geoip.list
/var/lib/dpkg/info/nginx.conffiles
/var/lib/dpkg/info/nginx-module-image-filter.postinst
/var/lib/dpkg/info/nginx-module-xslt.list
/var/cache/nginx
/var/log/nginx
```

:::

脚本

::: details

```bash
$ podman run --rm docker.io/library/nginx cat /etc/init.d/nginx
#!/bin/sh
### BEGIN INIT INFO
# Provides:          nginx
# Required-Start:    $network $remote_fs $local_fs
# Required-Stop:     $network $remote_fs $local_fs
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: Stop/start nginx
### END INIT INFO

# Author: Sergey Budnevitch <sb@nginx.com>

PATH=/sbin:/usr/sbin:/bin:/usr/bin

if [ -L $0 ]; then
    SCRIPTNAME=`/bin/readlink -f $0`
else
    SCRIPTNAME=$0
fi

sysconfig=`/usr/bin/basename $SCRIPTNAME`

[ -r /etc/default/$sysconfig ] && . /etc/default/$sysconfig

DESC=${DESC:-nginx}
NAME=${NAME:-nginx}
CONFFILE=${CONFFILE:-/etc/nginx/nginx.conf}
DAEMON=${DAEMON:-/usr/sbin/nginx}
PIDFILE=${PIDFILE:-/var/run/nginx.pid}
SLEEPSEC=${SLEEPSEC:-1}
UPGRADEWAITLOOPS=${UPGRADEWAITLOOPS:-5}
CHECKSLEEP=${CHECKSLEEP:-3}

[ -x $DAEMON ] || exit 0

DAEMON_ARGS="-c $CONFFILE $DAEMON_ARGS"

. /lib/init/vars.sh

. /lib/lsb/init-functions

do_start()
{
    start-stop-daemon --start --quiet --pidfile $PIDFILE --exec $DAEMON -- \
        $DAEMON_ARGS
    RETVAL="$?"
    return "$RETVAL"
}

do_stop()
{
    # Return
    #   0 if daemon has been stopped
    #   1 if daemon was already stopped
    #   2 if daemon could not be stopped
    #   other if a failure occurred
    start-stop-daemon --stop --quiet --oknodo --retry=TERM/30/KILL/5 --pidfile $PIDFILE
    RETVAL="$?"
    rm -f $PIDFILE
    return "$RETVAL"
}

do_reload() {
    #
    start-stop-daemon --stop --signal HUP --quiet --pidfile $PIDFILE
    RETVAL="$?"
    return "$RETVAL"
}

do_configtest() {
    if [ "$#" -ne 0 ]; then
        case "$1" in
            -q)
                FLAG=$1
                ;;
            *)
                ;;
        esac
        shift
    fi
    $DAEMON -t $FLAG -c $CONFFILE
    RETVAL="$?"
    return $RETVAL
}

do_upgrade() {
    OLDBINPIDFILE=$PIDFILE.oldbin

    do_configtest -q || return 6
    start-stop-daemon --stop --signal USR2 --quiet --pidfile $PIDFILE
    RETVAL="$?"

    for i in `/usr/bin/seq  $UPGRADEWAITLOOPS`; do
        sleep $SLEEPSEC
        if [ -f $OLDBINPIDFILE -a -f $PIDFILE ]; then
            start-stop-daemon --stop --signal QUIT --quiet --pidfile $OLDBINPIDFILE
            RETVAL="$?"
            return
        fi
    done

    echo $"Upgrade failed!"
    RETVAL=1
    return $RETVAL
}

do_checkreload() {
    templog=`/bin/mktemp --tmpdir nginx-check-reload-XXXXXX.log`
    trap '/bin/rm -f $templog' 0
    /usr/bin/tail --pid=$$ -n 0 --follow=name /var/log/nginx/error.log > $templog &
    /bin/sleep 1
    start-stop-daemon --stop --signal HUP --quiet --pidfile $PIDFILE
    /bin/sleep $CHECKSLEEP
    /bin/grep -E "\[emerg\]|\[alert\]" $templog
}

case "$1" in
    start)
        [ "$VERBOSE" != no ] && log_daemon_msg "Starting $DESC " "$NAME"
        do_start
        case "$?" in
            0|1) [ "$VERBOSE" != no ] && log_end_msg 0 ;;
            2) [ "$VERBOSE" != no ] && log_end_msg 1 ;;
        esac
        ;;
    stop)
        [ "$VERBOSE" != no ] && log_daemon_msg "Stopping $DESC" "$NAME"
        do_stop
        case "$?" in
            0|1) [ "$VERBOSE" != no ] && log_end_msg 0 ;;
            2) [ "$VERBOSE" != no ] && log_end_msg 1 ;;
        esac
        ;;
  status)
        status_of_proc -p "$PIDFILE" "$DAEMON" "$NAME" && exit 0 || exit $?
        ;;
  configtest)
        do_configtest
        ;;
  upgrade)
        do_upgrade
        ;;
  reload|force-reload)
        log_daemon_msg "Reloading $DESC" "$NAME"
        do_reload
        log_end_msg $?
        ;;
  restart|force-reload)
        log_daemon_msg "Restarting $DESC" "$NAME"
        do_configtest -q || exit $RETVAL
        do_stop
        case "$?" in
            0|1)
                do_start
                case "$?" in
                    0) log_end_msg 0 ;;
                    1) log_end_msg 1 ;; # Old process is still running
                    *) log_end_msg 1 ;; # Failed to start
                esac
                ;;
            *)
                # Failed to stop
                log_end_msg 1
                ;;
        esac
        ;;
    check-reload)
        do_checkreload
        RETVAL=0
        ;;
    *)
        echo "Usage: $SCRIPTNAME {start|stop|status|restart|reload|force-reload|upgrade|configtest|check-reload}" >&2
        exit 3
        ;;
esac

exit $RETVAL
```

```bash
$ podman run --rm docker.io/library/nginx cat /docker-entrypoint.sh
#!/bin/sh
# vim:sw=4:ts=4:et

set -e

entrypoint_log() {
    if [ -z "${NGINX_ENTRYPOINT_QUIET_LOGS:-}" ]; then
        echo "$@"
    fi
}

if [ "$1" = "nginx" ] || [ "$1" = "nginx-debug" ]; then
    if /usr/bin/find "/docker-entrypoint.d/" -mindepth 1 -maxdepth 1 -type f -print -quit 2>/dev/null | read v; then
        entrypoint_log "$0: /docker-entrypoint.d/ is not empty, will attempt to perform configuration"

        entrypoint_log "$0: Looking for shell scripts in /docker-entrypoint.d/"
        find "/docker-entrypoint.d/" -follow -type f -print | sort -V | while read -r f; do
            case "$f" in
                *.envsh)
                    if [ -x "$f" ]; then
                        entrypoint_log "$0: Sourcing $f";
                        . "$f"
                    else
                        # warn on shell scripts without exec bit
                        entrypoint_log "$0: Ignoring $f, not executable";
                    fi
                    ;;
                *.sh)
                    if [ -x "$f" ]; then
                        entrypoint_log "$0: Launching $f";
                        "$f"
                    else
                        # warn on shell scripts without exec bit
                        entrypoint_log "$0: Ignoring $f, not executable";
                    fi
                    ;;
                *) entrypoint_log "$0: Ignoring $f";;
            esac
        done

        entrypoint_log "$0: Configuration complete; ready for start up"
    else
        entrypoint_log "$0: No files found in /docker-entrypoint.d/, skipping configuration"
    fi
fi

exec "$@"

$ podman run --rm docker.io/library/nginx ls -l /docker-entrypoint.d
total 20
-rwxr-xr-x 1 root root 2125 Jan 12 00:21 10-listen-on-ipv6-by-default.sh
-rwxr-xr-x 1 root root  298 Jan 12 00:21 15-local-resolvers.envsh
-rwxr-xr-x 1 root root 3018 Jan 12 00:21 20-envsubst-on-templates.sh
-rwxr-xr-x 1 root root 4619 Jan 12 00:21 30-tune-worker-processes.sh
```

:::

进程运行情况:

+ `worker_processes  auto;` —— 一个主进程，n个守护进程（n=逻辑处理器数）
+ `user  nginx;` —— 当前用户启动主进程，nginx用户启动守护进程

::: details

```bash
# 配置
$ podman run --rm docker.io/library/nginx cat /etc/nginx/nginx.conf | grep process
worker_processes  auto;
$ podman run --rm docker.io/library/nginx cat /etc/nginx/nginx.conf | grep user
user  nginx;
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
$ podman run --rm docker.io/library/nginx id nginx
uid=101(nginx) gid=101(nginx) groups=101(nginx)

# 运行进程
$ podman run --rm -it -p 8888:80 docker.io/library/nginx nginx -g "daemon off;"
/docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration
/docker-entrypoint.sh: Looking for shell scripts in /docker-entrypoint.d/
/docker-entrypoint.sh: Launching /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh
10-listen-on-ipv6-by-default.sh: info: Getting the checksum of /etc/nginx/conf.d/default.conf
10-listen-on-ipv6-by-default.sh: info: Enabled listen on IPv6 in /etc/nginx/conf.d/default.conf
/docker-entrypoint.sh: Sourcing /docker-entrypoint.d/15-local-resolvers.envsh
/docker-entrypoint.sh: Launching /docker-entrypoint.d/20-envsubst-on-templates.sh
/docker-entrypoint.sh: Launching /docker-entrypoint.d/30-tune-worker-processes.sh
/docker-entrypoint.sh: Configuration complete; ready for start up
2024/01/20 14:02:22 [notice] 1#1: using the "epoll" event method
2024/01/20 14:02:22 [notice] 1#1: nginx/1.25.3
2024/01/20 14:02:22 [notice] 1#1: built by gcc 12.2.0 (Debian 12.2.0-14)
2024/01/20 14:02:22 [notice] 1#1: OS: Linux 5.10.16.3-microsoft-standard-WSL2
2024/01/20 14:02:22 [notice] 1#1: getrlimit(RLIMIT_NOFILE): 1048576:1048576
2024/01/20 14:02:22 [notice] 1#1: start worker processes
2024/01/20 14:02:22 [notice] 1#1: start worker process 24
2024/01/20 14:02:22 [notice] 1#1: start worker process 25
2024/01/20 14:02:22 [notice] 1#1: start worker process 26
2024/01/20 14:02:22 [notice] 1#1: start worker process 27
2024/01/20 14:02:22 [notice] 1#1: start worker process 28
2024/01/20 14:02:22 [notice] 1#1: start worker process 29
2024/01/20 14:02:22 [notice] 1#1: start worker process 30
2024/01/20 14:02:22 [notice] 1#1: start worker process 31
2024/01/20 14:02:22 [notice] 1#1: start worker process 32
2024/01/20 14:02:22 [notice] 1#1: start worker process 33
2024/01/20 14:02:22 [notice] 1#1: start worker process 34
2024/01/20 14:02:22 [notice] 1#1: start worker process 35
2024/01/20 14:02:22 [notice] 1#1: start worker process 36
2024/01/20 14:02:22 [notice] 1#1: start worker process 37
2024/01/20 14:02:22 [notice] 1#1: start worker process 38
2024/01/20 14:02:22 [notice] 1#1: start worker process 39
$ ps -ef | grep nginx
root      1762    32  0 22:02 pts/1    00:00:01 podman run --rm -it -p 8888:80 docker.io/library/nginx nginx -g daemon off;
root      1829  1827  0 22:02 pts/0    00:00:00 nginx: master process nginx -g daemon off;
101       1854  1829  0 22:02 pts/0    00:00:00 nginx: worker process
101       1855  1829  0 22:02 pts/0    00:00:00 nginx: worker process
101       1856  1829  0 22:02 pts/0    00:00:00 nginx: worker process
101       1857  1829  0 22:02 pts/0    00:00:00 nginx: worker process
101       1858  1829  0 22:02 pts/0    00:00:00 nginx: worker process
101       1859  1829  0 22:02 pts/0    00:00:00 nginx: worker process
101       1860  1829  0 22:02 pts/0    00:00:00 nginx: worker process
101       1861  1829  0 22:02 pts/0    00:00:00 nginx: worker process
101       1862  1829  0 22:02 pts/0    00:00:00 nginx: worker process
101       1863  1829  0 22:02 pts/0    00:00:00 nginx: worker process
101       1864  1829  0 22:02 pts/0    00:00:00 nginx: worker process
101       1865  1829  0 22:02 pts/0    00:00:00 nginx: worker process
101       1866  1829  0 22:02 pts/0    00:00:00 nginx: worker process
101       1867  1829  0 22:02 pts/0    00:00:00 nginx: worker process
101       1868  1829  0 22:02 pts/0    00:00:00 nginx: worker process
101       1869  1829  0 22:02 pts/0    00:00:00 nginx: worker process
root      1871  1598  0 22:11 pts/3    00:00:00 grep --color=auto nginx
$ curl 127.0.0.1:8888
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
html { color-scheme: light dark; }
body { width: 35em; margin: 0 auto;
font-family: Tahoma, Verdana, Arial, sans-serif; }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>

# 关闭进程
$ <Ctrl+C>
10.88.0.1 - - [20/Jan/2024:15:45:42 +0000] "GET / HTTP/1.1" 200 615 "-" "curl/8.2.1" "-"
^C2024/01/20 15:46:14 [notice] 38#38: signal 2 (SIGINT) received, exiting
2024/01/20 15:46:14 [notice] 33#33: signal 2 (SIGINT) received, exiting
2024/01/20 15:46:14 [notice] 32#32: signal 2 (SIGINT) received, exiting
2024/01/20 15:46:14 [notice] 35#35: signal 2 (SIGINT) received, exiting
2024/01/20 15:46:14 [notice] 31#31: signal 2 (SIGINT) received, exiting
2024/01/20 15:46:14 [notice] 30#30: signal 2 (SIGINT) received, exiting
2024/01/20 15:46:14 [notice] 37#37: signal 2 (SIGINT) received, exiting
2024/01/20 15:46:14 [notice] 39#39: signal 2 (SIGINT) received, exiting
2024/01/20 15:46:14 [notice] 34#34: signal 2 (SIGINT) received, exiting
2024/01/20 15:46:14 [notice] 29#29: signal 2 (SIGINT) received, exiting
2024/01/20 15:46:14 [notice] 33#33: exiting
2024/01/20 15:46:14 [notice] 32#32: exiting
2024/01/20 15:46:14 [notice] 36#36: signal 2 (SIGINT) received, exiting
2024/01/20 15:46:14 [notice] 30#30: exiting
2024/01/20 15:46:14 [notice] 34#34: exiting
2024/01/20 15:46:14 [notice] 29#29: exiting
2024/01/20 15:46:14 [notice] 33#33: exit
2024/01/20 15:46:14 [notice] 35#35: exiting
2024/01/20 15:46:14 [notice] 39#39: exiting
2024/01/20 15:46:14 [notice] 31#31: exiting
2024/01/20 15:46:14 [notice] 38#38: exiting
2024/01/20 15:46:14 [notice] 36#36: exiting
2024/01/20 15:46:14 [notice] 27#27: signal 2 (SIGINT) received, exiting
2024/01/20 15:46:14 [notice] 28#28: signal 2 (SIGINT) received, exiting
2024/01/20 15:46:14 [notice] 1#1: signal 2 (SIGINT) received, exiting
2024/01/20 15:46:14 [notice] 25#25: signal 2 (SIGINT) received, exiting
2024/01/20 15:46:14 [notice] 26#26: signal 2 (SIGINT) received, exiting
2024/01/20 15:46:14 [notice] 31#31: exit
2024/01/20 15:46:14 [notice] 26#26: exiting
2024/01/20 15:46:14 [notice] 28#28: exiting
2024/01/20 15:46:14 [notice] 34#34: exit
2024/01/20 15:46:14 [notice] 29#29: exit
2024/01/20 15:46:14 [notice] 27#27: exiting
2024/01/20 15:46:14 [notice] 25#25: exiting
2024/01/20 15:46:14 [notice] 32#32: exit
2024/01/20 15:46:14 [notice] 30#30: exit
2024/01/20 15:46:14 [notice] 35#35: exit
2024/01/20 15:46:14 [notice] 24#24: signal 2 (SIGINT) received, exiting
2024/01/20 15:46:14 [notice] 24#24: exiting
2024/01/20 15:46:14 [notice] 26#26: exit
2024/01/20 15:46:14 [notice] 37#37: exiting
2024/01/20 15:46:14 [notice] 38#38: exit
2024/01/20 15:46:14 [notice] 25#25: exit
2024/01/20 15:46:14 [notice] 39#39: exit
2024/01/20 15:46:14 [notice] 36#36: exit
2024/01/20 15:46:14 [notice] 24#24: exit
2024/01/20 15:46:14 [notice] 27#27: exit
2024/01/20 15:46:14 [notice] 37#37: exit
2024/01/20 15:46:14 [notice] 28#28: exit
2024/01/20 15:46:14 [notice] 1#1: signal 14 (SIGALRM) received
2024/01/20 15:46:14 [notice] 1#1: signal 17 (SIGCHLD) received from 31
2024/01/20 15:46:14 [notice] 1#1: worker process 31 exited with code 0
2024/01/20 15:46:14 [notice] 1#1: worker process 29 exited with code 0
2024/01/20 15:46:14 [notice] 1#1: worker process 32 exited with code 0
2024/01/20 15:46:14 [notice] 1#1: worker process 36 exited with code 0
2024/01/20 15:46:14 [notice] 1#1: worker process 37 exited with code 0
2024/01/20 15:46:14 [notice] 1#1: worker process 39 exited with code 0
2024/01/20 15:46:14 [notice] 1#1: signal 29 (SIGIO) received
2024/01/20 15:46:14 [notice] 1#1: signal 17 (SIGCHLD) received from 29
2024/01/20 15:46:14 [notice] 1#1: signal 17 (SIGCHLD) received from 38
2024/01/20 15:46:14 [notice] 1#1: worker process 38 exited with code 0
2024/01/20 15:46:14 [notice] 1#1: signal 29 (SIGIO) received
2024/01/20 15:46:14 [notice] 1#1: signal 17 (SIGCHLD) received from 34
2024/01/20 15:46:14 [notice] 1#1: worker process 34 exited with code 0
2024/01/20 15:46:14 [notice] 1#1: signal 29 (SIGIO) received
2024/01/20 15:46:14 [notice] 1#1: signal 17 (SIGCHLD) received from 26
2024/01/20 15:46:14 [notice] 1#1: worker process 26 exited with code 0
2024/01/20 15:46:14 [notice] 1#1: signal 29 (SIGIO) received
2024/01/20 15:46:14 [notice] 1#1: signal 17 (SIGCHLD) received from 33
2024/01/20 15:46:14 [notice] 1#1: worker process 33 exited with code 0
2024/01/20 15:46:14 [notice] 1#1: worker process 24 exited with code 0
2024/01/20 15:46:14 [notice] 1#1: worker process 35 exited with code 0
2024/01/20 15:46:14 [notice] 1#1: signal 29 (SIGIO) received
2024/01/20 15:46:14 [notice] 1#1: signal 17 (SIGCHLD) received from 24
2024/01/20 15:46:14 [notice] 1#1: signal 17 (SIGCHLD) received from 30
2024/01/20 15:46:14 [notice] 1#1: worker process 30 exited with code 0
2024/01/20 15:46:14 [notice] 1#1: signal 29 (SIGIO) received
2024/01/20 15:46:14 [notice] 1#1: signal 17 (SIGCHLD) received from 27
2024/01/20 15:46:14 [notice] 1#1: worker process 27 exited with code 0
2024/01/20 15:46:14 [notice] 1#1: signal 29 (SIGIO) received
2024/01/20 15:46:14 [notice] 1#1: signal 17 (SIGCHLD) received from 28
2024/01/20 15:46:14 [notice] 1#1: worker process 25 exited with code 0
2024/01/20 15:46:14 [notice] 1#1: worker process 28 exited with code 0
2024/01/20 15:46:14 [notice] 1#1: exit
```

:::

直接切换非root用户遇到的问题

```bash
$ podman run --rm -it -p 8888:80 -p 9999:9999 -v ./conf.d/:/etc/nginx/conf.d/ docker.io/library/nginx bash
root@9a93e5f60273:/# su -s /bin/bash -c "id" nginx
uid=101(nginx) gid=101(nginx) groups=101(nginx)

# 错误： 缺少权限（日志写入）；需要更改配置
root@9a93e5f60273:/# su -s /bin/bash -c "nginx" nginx
nginx: [alert] could not open error log file: open() "/var/log/nginx/error.log" failed (13: Permission denied)
2024/01/20 17:19:28 [warn] 55#55: the "user" directive makes sense only if the master process runs with super-user privileges, ignored in /etc/nginx/nginx.conf:2
2024/01/20 17:19:28 [emerg] 55#55: open() "/var/log/nginx/error.log" failed (13: Permission denied)
# 处理： 开放权限
root@9a93e5f60273:/# chown -R nginx:nginx /var/log/nginx
# 处理： 删除默认日志链接（否则即使改了权限，依然无法输入）
root@9a93e5f60273:/# ls -l /var/log/nginx
total 0
lrwxrwxrwx 1 nginx nginx 11 Jan 12 00:21 access.log -> /dev/stdout
lrwxrwxrwx 1 nginx nginx 11 Jan 12 00:21 error.log -> /dev/stderr
# 处理： 注释配置（根据提示）
root@9a93e5f60273:/# sed -i 's/user  nginx;/#user  nginx;/g' /etc/nginx/nginx.conf 

# 错误： 缺少权限（缓存写入）
root@9a93e5f60273:/# sed -i 's/user  nginx;/#user  nginx;/g' /etc/nginx/nginx.conf
root@9a93e5f60273:/# su -s /bin/bash -c "nginx" nginx
nginx: [emerg] mkdir() "/var/cache/nginx/client_temp" failed (13: Permission denied)
# 处理： 开放权限
root@9a93e5f60273:/# chown -R nginx:nginx /var/cache/nginx

# 错误： 无法开启端口（非root用户只能起1024后的端口）
root@9a93e5f60273:/# su -s /bin/bash -c "nginx" nginx
nginx: [emerg] bind() to 0.0.0.0:80 failed (13: Permission denied)
# 处理： 更改端口
root@9a93e5f60273:/# sed -i 's/listen       80;/listen       9999;/g' /etc/nginx/conf.d/default.conf 

# 错误： 缺少权限（写入PID）
root@9a93e5f60273:/# su -s /bin/bash -c "nginx" nginx
nginx: [emerg] open() "/var/run/nginx.pid" failed (13: Permission denied)
root@9a93e5f60273:/# touch /run/nginx.pid
root@9a93e5f60273:/# chown -R nginx:nginx /run/nginx.pid
```

启动成功： master权限为nginx

```bash
[root@lpc19 nginx]# ps -ef | grep nginx
root      3235    32  0 01:26 pts/1    00:00:01 podman run --rm -it -p 8888:80 -p 9999:9999 -v ./conf.d/:/etc/nginx/conf.d/ docker.io/library/nginx bash
101       3336  3309  0 01:38 ?        00:00:00 nginx: master process nginx
101       3337  3336  0 01:38 ?        00:00:00 nginx: worker process
101       3338  3336  0 01:38 ?        00:00:00 nginx: worker process
101       3339  3336  0 01:38 ?        00:00:00 nginx: worker process
101       3340  3336  0 01:38 ?        00:00:00 nginx: worker process
101       3341  3336  0 01:38 ?        00:00:00 nginx: worker process
101       3342  3336  0 01:38 ?        00:00:00 nginx: worker process
101       3343  3336  0 01:38 ?        00:00:00 nginx: worker process
101       3344  3336  0 01:38 ?        00:00:00 nginx: worker process
101       3345  3336  0 01:38 ?        00:00:00 nginx: worker process
101       3346  3336  0 01:38 ?        00:00:00 nginx: worker process
101       3347  3336  0 01:38 ?        00:00:00 nginx: worker process
101       3348  3336  0 01:38 ?        00:00:00 nginx: worker process
101       3349  3336  0 01:38 ?        00:00:00 nginx: worker process
101       3350  3336  0 01:38 ?        00:00:00 nginx: worker process
101       3351  3336  0 01:38 ?        00:00:00 nginx: worker process
101       3352  3336  0 01:38 ?        00:00:00 nginx: worker process
root      3354  1598  0 01:38 pts/3    00:00:00 grep --color=auto nginx
[root@lpc19 nginx]# curl 127.0.0.1:9999
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
html { color-scheme: light dark; }
body { width: 35em; margin: 0 auto;
font-family: Tahoma, Verdana, Arial, sans-serif; }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
```

```dockerfile
# todo “*” 指令是否必要？

FROM docker.io/library/nginx:latest

RUN mkdir -p /var/cache/nginx && chown -R nginx:nginx /var/cache/nginx && \
    mkdir -p /var/log/nginx  && chown -R nginx:nginx /var/log/nginx && \
    * mkdir -p /var/lib/nginx  && chown -R nginx:nginx /var/lib/nginx && \
    touch /run/nginx.pid && chown -R nginx:nginx /run/nginx.pid && \
    mkdir -p /etc/nginx/templates /etc/nginx/ssl/certs && \
    * chown -R nginx:nginx /etc/nginx && \
    * chmod -R 777 /etc/nginx/conf.d && \
    sed -i 's/user  nginx;/#user  nginx;/g' /etc/nginx/nginx.conf && \
    sed -i 's/listen       80;/listen       1080;/g' /etc/nginx/conf.d/default.conf 

USER nginx

EXPOSE 1080
```
