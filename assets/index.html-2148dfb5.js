import{_ as e,r as p,o as t,c as o,a as n,b as i,d as l,e as s}from"./app-04e6f892.js";const c={},r=s(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 启动</span>
nginx               <span class="token comment">#启动nginx   </span>
nginx <span class="token parameter variable">-s</span> reload     <span class="token comment">#启动nginx,并重新载入配置</span>
nginx <span class="token parameter variable">-s</span> reopen     <span class="token comment">#重新打开日志文件</span>

<span class="token comment"># 关闭</span>
nginx <span class="token parameter variable">-s</span> stop   <span class="token comment">#发送关闭命令</span>
<span class="token function">pkill</span> <span class="token parameter variable">-9</span> nginx    <span class="token comment">#强制关闭进程</span>

<span class="token comment"># 进程状态</span>
<span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span> <span class="token function">grep</span> nginx

<span class="token comment"># 服务状态 - 配置http_stub_status_module模块</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="状态模块" tabindex="-1"><a class="header-anchor" href="#状态模块" aria-hidden="true">#</a> 状态模块</h2><p>参考： 《Nginx总结（十）如何监控Nginx的运行状态》 https://cloud.tencent.com/developer/article/1653383</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>nginx <span class="token parameter variable">-V</span> <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-o</span> with-http_stub_status_module
./configure –with-http_stub_status_module
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code>location /status {
    stub_status            on;
    access_log             off;
    allow 127.0.0.1;
    deny all;
    #auth_basic              &quot;NginxStatus&quot;;
    #auth_basic_user_file  conf/nginxstaus;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>http://127.0.0.1/status</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@9505b26d3225:/<span class="token comment"># curl 127.0.0.1/status</span>
Active connections: <span class="token number">1</span>
server accepts handled requests
 <span class="token number">2</span> <span class="token number">2</span> <span class="token number">2</span>

Active connections – 活跃的连接数量
server accepts handled requests — 对应的是：连接数、成功创建的tcp握手、总请求数 三个参数。
reading — 读取客户端的连接数。
writing — 响应数据到客户端的数量。
waiting — 开启 keep-alive 的情况下,这个值等于 active – <span class="token punctuation">(</span>reading+writing<span class="token punctuation">)</span>, 意思就是 Nginx 已经处理完正在等候下一次请求指令的驻留连接。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="日志配置" tabindex="-1"><a class="header-anchor" href="#日志配置" aria-hidden="true">#</a> 日志配置</h2><p>参考 https://zhuanlan.zhihu.com/p/112314267</p><p>todo</p><h2 id="正向代理" tabindex="-1"><a class="header-anchor" href="#正向代理" aria-hidden="true">#</a> 正向代理</h2><p>todo 正向代理配置</p><p>Nginx-正向代理实现 https://www.cnblogs.com/yanjieli/p/15229907.html</p><p>玩转Nginx正反向代理 https://www.51cto.com/article/766532.html</p><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code># cat default.conf 
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="分析-docker-nginx-镜像" tabindex="-1"><a class="header-anchor" href="#分析-docker-nginx-镜像" aria-hidden="true">#</a> 分析 docker nginx 镜像</h2>`,16),u={href:"https://github.com/nginxinc/docker-nginx/blob/master/Dockerfile-alpine.template",target:"_blank",rel:"noopener noreferrer"},k=s(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">podman</span> pull nginx
$ <span class="token function">podman</span> run <span class="token parameter variable">-it</span> <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">8080</span>:80 docker.io/library/nginx:latest
$ <span class="token function">curl</span> <span class="token number">127.0</span>.0.1:8080
<span class="token operator">&lt;</span>h<span class="token operator"><span class="token file-descriptor important">1</span>&gt;</span>Welcome to nginx<span class="token operator">!</span><span class="token operator">&lt;</span>/h<span class="token operator"><span class="token file-descriptor important">1</span>&gt;</span>

$ <span class="token function">podman</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> 2b56681a6629e32b55829d6ae64f495e935c122f626fb0c1ecd808c633bcdbbf bash.
$ <span class="token function">whoami</span>
root
<span class="token comment"># 发行版</span>
$ <span class="token function">cat</span> /etc/os-release
<span class="token assign-left variable">PRETTY_NAME</span><span class="token operator">=</span><span class="token string">&quot;Debian GNU/Linux 12 (bookworm)&quot;</span>
<span class="token assign-left variable">NAME</span><span class="token operator">=</span><span class="token string">&quot;Debian GNU/Linux&quot;</span>
<span class="token assign-left variable">VERSION_ID</span><span class="token operator">=</span><span class="token string">&quot;12&quot;</span>
<span class="token assign-left variable">VERSION</span><span class="token operator">=</span><span class="token string">&quot;12 (bookworm)&quot;</span>
<span class="token assign-left variable">VERSION_CODENAME</span><span class="token operator">=</span>bookworm
<span class="token assign-left variable">ID</span><span class="token operator">=</span>debian
<span class="token assign-left variable">HOME_URL</span><span class="token operator">=</span><span class="token string">&quot;https://www.debian.org/&quot;</span>
<span class="token assign-left variable">SUPPORT_URL</span><span class="token operator">=</span><span class="token string">&quot;https://www.debian.org/support&quot;</span>
<span class="token assign-left variable">BUG_REPORT_URL</span><span class="token operator">=</span><span class="token string">&quot;https://bugs.debian.org/&quot;</span>
$ <span class="token function">cat</span> /etc/debian_version
<span class="token number">12.4</span>
<span class="token comment"># 编译版本</span>
$ <span class="token function">cat</span> /proc/version
Linux version <span class="token number">5.10</span>.16.3-microsoft-standard-WSL2 <span class="token punctuation">(</span>oe-user@oe-host<span class="token punctuation">)</span> <span class="token punctuation">(</span>x86_64-msft-linux-gcc <span class="token punctuation">(</span>GCC<span class="token punctuation">)</span> <span class="token number">9.3</span>.0, GNU ld <span class="token punctuation">(</span>GNU Binutils<span class="token punctuation">)</span> <span class="token number">2.34</span>.0.20200220<span class="token punctuation">)</span> <span class="token comment">#1 SMP Fri Apr 2 22:23:49 UTC 2021</span>
$ <span class="token function">uname</span> <span class="token parameter variable">-a</span>
Linux 2b56681a6629 <span class="token number">5.10</span>.16.3-microsoft-standard-WSL2 <span class="token comment">#1 SMP Fri Apr 2 22:23:49 UTC 2021 x86_64 GNU/Linux</span>
<span class="token comment"># 展示信息（display message）或驱动程序信息（driver message）是大多数类Unix操作系统上的一个命令，用于打印内核的消息缓冲区的信息</span>
$ <span class="token function">dmesg</span> <span class="token operator">|</span> <span class="token function">grep</span> Linux
<span class="token punctuation">[</span>    <span class="token number">0.000000</span><span class="token punctuation">]</span> Linux version <span class="token number">5.10</span>.16.3-microsoft-standard-WSL2 <span class="token punctuation">(</span>oe-user@oe-host<span class="token punctuation">)</span> <span class="token punctuation">(</span>x86_64-msft-linux-gcc <span class="token punctuation">(</span>GCC<span class="token punctuation">)</span> <span class="token number">9.3</span>.0, GNU ld <span class="token punctuation">(</span>GNU Binutils<span class="token punctuation">)</span> <span class="token number">2.34</span>.0.20200220<span class="token punctuation">)</span> <span class="token comment">#1 SMP Fri Apr 2 22:23:49 UTC 2021</span>
<span class="token punctuation">[</span>    <span class="token number">0.389181</span><span class="token punctuation">]</span> ACPI: Added _OSI<span class="token punctuation">(</span>Linux-Dell-Video<span class="token punctuation">)</span>
<span class="token punctuation">[</span>    <span class="token number">0.390600</span><span class="token punctuation">]</span> ACPI: Added _OSI<span class="token punctuation">(</span>Linux-Lenovo-NV-HDMI-Audio<span class="token punctuation">)</span>
<span class="token punctuation">[</span>    <span class="token number">0.393048</span><span class="token punctuation">]</span> ACPI: Added _OSI<span class="token punctuation">(</span>Linux-HPI-Hybrid-Graphics<span class="token punctuation">)</span>

$ nginx <span class="token parameter variable">-v</span>
nginx version: nginx/1.25.3
$ <span class="token function">which</span> nginx
/usr/sbin/nginx
$ <span class="token function">ls</span> <span class="token parameter variable">-l</span> /usr/sbin/nginx
-rwxr-xr-x <span class="token number">1</span> root root <span class="token number">1536808</span> Oct <span class="token number">24</span> <span class="token number">16</span>:10 /usr/sbin/nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看该镜像的组成</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">podman</span> images
REPOSITORY               TAG         IMAGE ID      CREATED       SIZE
docker.io/library/nginx  latest      a8758716bb6a  <span class="token number">2</span> months ago  <span class="token number">191</span> MB
$ <span class="token function">podman</span> <span class="token function">history</span> nginx
ID            CREATED       CREATED BY                                     SIZE        COMMENT
a8758716bb6a  <span class="token number">2</span> months ago  CMD <span class="token punctuation">[</span><span class="token string">&quot;nginx&quot;</span> <span class="token string">&quot;-g&quot;</span> <span class="token string">&quot;daemon off;&quot;</span><span class="token punctuation">]</span>               0B          buildkit.dockerfile.v0
<span class="token operator">&lt;</span>missing<span class="token operator">&gt;</span>     <span class="token number">2</span> months ago  STOPSIGNAL SIGQUIT                             0B          buildkit.dockerfile.v0
<span class="token operator">&lt;</span>missing<span class="token operator">&gt;</span>     <span class="token number">2</span> months ago  EXPOSE map<span class="token punctuation">[</span><span class="token number">80</span>/tcp:<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">]</span>                          0B          buildkit.dockerfile.v0
<span class="token operator">&lt;</span>missing<span class="token operator">&gt;</span>     <span class="token number">2</span> months ago  ENTRYPOINT <span class="token punctuation">[</span><span class="token string">&quot;/docker-entrypoint.sh&quot;</span><span class="token punctuation">]</span>           0B          buildkit.dockerfile.v0
<span class="token operator">&lt;</span>missing<span class="token operator">&gt;</span>     <span class="token number">2</span> months ago  COPY <span class="token number">30</span>-tune-worker-processes.sh /docker-e<span class="token punctuation">..</span>.  <span class="token number">7</span>.17kB      buildkit.dockerfile.v0
<span class="token operator">&lt;</span>missing<span class="token operator">&gt;</span>     <span class="token number">2</span> months ago  COPY <span class="token number">20</span>-envsubst-on-templates.sh /docker-e<span class="token punctuation">..</span>.  <span class="token number">5</span>.12kB      buildkit.dockerfile.v0
<span class="token operator">&lt;</span>missing<span class="token operator">&gt;</span>     <span class="token number">2</span> months ago  COPY <span class="token number">15</span>-local-resolvers.envsh /docker-entr<span class="token punctuation">..</span>.  <span class="token number">2</span>.56kB      buildkit.dockerfile.v0
<span class="token operator">&lt;</span>missing<span class="token operator">&gt;</span>     <span class="token number">2</span> months ago  COPY <span class="token number">10</span>-listen-on-ipv6-by-default.sh /dock<span class="token punctuation">..</span>.  <span class="token number">4</span>.61kB      buildkit.dockerfile.v0
<span class="token operator">&lt;</span>missing<span class="token operator">&gt;</span>     <span class="token number">2</span> months ago  COPY docker-entrypoint.sh / <span class="token comment"># buildkit         3.58kB      buildkit.dockerfile.v0</span>
<span class="token operator">&lt;</span>missing<span class="token operator">&gt;</span>     <span class="token number">2</span> months ago  RUN /bin/sh <span class="token parameter variable">-c</span> <span class="token builtin class-name">set</span> <span class="token parameter variable">-x</span>     <span class="token operator">&amp;&amp;</span> <span class="token function">groupadd</span> --sy<span class="token punctuation">..</span>.  113MB       buildkit.dockerfile.v0
<span class="token operator">&lt;</span>missing<span class="token operator">&gt;</span>     <span class="token number">2</span> months ago  ENV <span class="token assign-left variable">PKG_RELEASE</span><span class="token operator">=</span><span class="token number">1</span>~bookworm                     0B          buildkit.dockerfile.v0
<span class="token operator">&lt;</span>missing<span class="token operator">&gt;</span>     <span class="token number">2</span> months ago  ENV <span class="token assign-left variable">NJS_VERSION</span><span class="token operator">=</span><span class="token number">0.8</span>.2                          0B          buildkit.dockerfile.v0
<span class="token operator">&lt;</span>missing<span class="token operator">&gt;</span>     <span class="token number">2</span> months ago  ENV <span class="token assign-left variable">NGINX_VERSION</span><span class="token operator">=</span><span class="token number">1.25</span>.3                       0B          buildkit.dockerfile.v0
<span class="token operator">&lt;</span>missing<span class="token operator">&gt;</span>     <span class="token number">2</span> months ago  LABEL <span class="token assign-left variable">maintainer</span><span class="token operator">=</span>NGINX Docker Maintainers <span class="token punctuation">..</span>.  0B          buildkit.dockerfile.v0
<span class="token operator">&lt;</span>missing<span class="token operator">&gt;</span>     <span class="token number">2</span> months ago  /bin/sh <span class="token parameter variable">-c</span> <span class="token comment">#(nop)  CMD [&quot;bash&quot;]                0B</span>
<span class="token operator">&lt;</span>missing<span class="token operator">&gt;</span>     <span class="token number">2</span> months ago  /bin/sh <span class="token parameter variable">-c</span> <span class="token comment">#(nop) ADD file:9deb26e1dbc258d...  77.8MB</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中 <code>nginx -g daemon off</code> 命令用于让nginx在前台运行，而不是在后台作为守护进程运行。这样做的目的是为了让Docker能够正确地跟踪nginx的进程，因为Docker会根据容器内部的第一个进程（pid=1）来判断容器是否正在运行。如果nginx在后台运行，那么Docker会认为容器已经退出，从而终止容器。</p><h2 id="构建-docker-nginx-非-root-镜像" tabindex="-1"><a class="header-anchor" href="#构建-docker-nginx-非-root-镜像" aria-hidden="true">#</a> 构建 docker nginx 非 root 镜像</h2><p>参考： 《如何构建一个以非root用户运行的nginx的镜像？》 https://www.cnblogs.com/chuanzhang053/p/17580014.html</p><p>查看环境情况</p><details class="custom-container details"><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 默认root用户</span>
$ <span class="token function">podman</span> run <span class="token parameter variable">--rm</span> docker.io/library/nginx <span class="token function">whoami</span>
root
<span class="token comment"># 有nginx用户</span>
$ <span class="token function">podman</span> run <span class="token parameter variable">--rm</span> docker.io/library/nginx <span class="token function">cat</span> /etc/passwd
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

<span class="token comment"># 相关文件</span>
$ <span class="token function">podman</span> run <span class="token parameter variable">--rm</span> docker.io/library/nginx <span class="token function">which</span> nginx
/usr/sbin/nginx
$ <span class="token function">podman</span> run <span class="token parameter variable">--rm</span> docker.io/library/nginx <span class="token function">ls</span> <span class="token parameter variable">-l</span> /usr/sbin/nginx
-rwxr-xr-x <span class="token number">1</span> root root <span class="token number">1536808</span> Oct <span class="token number">24</span> <span class="token number">16</span>:10 /usr/sbin/nginx
$ <span class="token function">podman</span> run <span class="token parameter variable">--rm</span> docker.io/library/nginx <span class="token function">find</span> / <span class="token parameter variable">-name</span> nginx
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
$ <span class="token function">podman</span> run <span class="token parameter variable">--rm</span> docker.io/library/nginx <span class="token function">find</span> / <span class="token parameter variable">-name</span> *nginx*
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><p>脚本</p><details class="custom-container details"><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">podman</span> run <span class="token parameter variable">--rm</span> docker.io/library/nginx <span class="token function">cat</span> /etc/init.d/nginx
<span class="token comment">#!/bin/sh</span>
<span class="token comment">### BEGIN INIT INFO</span>
<span class="token comment"># Provides:          nginx</span>
<span class="token comment"># Required-Start:    $network $remote_fs $local_fs</span>
<span class="token comment"># Required-Stop:     $network $remote_fs $local_fs</span>
<span class="token comment"># Default-Start:     2 3 4 5</span>
<span class="token comment"># Default-Stop:      0 1 6</span>
<span class="token comment"># Short-Description: Stop/start nginx</span>
<span class="token comment">### END INIT INFO</span>

<span class="token comment"># Author: Sergey Budnevitch &lt;sb@nginx.com&gt;</span>

<span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span>/sbin:/usr/sbin:/bin:/usr/bin

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-L</span> <span class="token variable">$0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token assign-left variable">SCRIPTNAME</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span>/bin/readlink <span class="token parameter variable">-f</span> $0<span class="token variable">\`</span></span>
<span class="token keyword">else</span>
    <span class="token assign-left variable">SCRIPTNAME</span><span class="token operator">=</span><span class="token variable">$0</span>
<span class="token keyword">fi</span>

<span class="token assign-left variable">sysconfig</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span>/usr/bin/basename $SCRIPTNAME<span class="token variable">\`</span></span>

<span class="token punctuation">[</span> <span class="token parameter variable">-r</span> /etc/default/<span class="token variable">$sysconfig</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">.</span> /etc/default/<span class="token variable">$sysconfig</span>

<span class="token assign-left variable">DESC</span><span class="token operator">=</span><span class="token variable">\${DESC<span class="token operator">:-</span>nginx}</span>
<span class="token assign-left variable">NAME</span><span class="token operator">=</span><span class="token variable">\${NAME<span class="token operator">:-</span>nginx}</span>
<span class="token assign-left variable">CONFFILE</span><span class="token operator">=</span><span class="token variable">\${CONFFILE<span class="token operator">:-</span><span class="token operator">/</span>etc<span class="token operator">/</span>nginx<span class="token operator">/</span>nginx.conf}</span>
<span class="token assign-left variable">DAEMON</span><span class="token operator">=</span><span class="token variable">\${DAEMON<span class="token operator">:-</span><span class="token operator">/</span>usr<span class="token operator">/</span>sbin<span class="token operator">/</span>nginx}</span>
<span class="token assign-left variable">PIDFILE</span><span class="token operator">=</span><span class="token variable">\${PIDFILE<span class="token operator">:-</span><span class="token operator">/</span>var<span class="token operator">/</span>run<span class="token operator">/</span>nginx.pid}</span>
<span class="token assign-left variable">SLEEPSEC</span><span class="token operator">=</span><span class="token variable">\${SLEEPSEC<span class="token operator">:-</span>1}</span>
<span class="token assign-left variable">UPGRADEWAITLOOPS</span><span class="token operator">=</span><span class="token variable">\${UPGRADEWAITLOOPS<span class="token operator">:-</span>5}</span>
<span class="token assign-left variable">CHECKSLEEP</span><span class="token operator">=</span><span class="token variable">\${CHECKSLEEP<span class="token operator">:-</span>3}</span>

<span class="token punctuation">[</span> <span class="token parameter variable">-x</span> <span class="token variable">$DAEMON</span> <span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token builtin class-name">exit</span> <span class="token number">0</span>

<span class="token assign-left variable">DAEMON_ARGS</span><span class="token operator">=</span><span class="token string">&quot;-c <span class="token variable">$CONFFILE</span> <span class="token variable">$DAEMON_ARGS</span>&quot;</span>

<span class="token builtin class-name">.</span> /lib/init/vars.sh

<span class="token builtin class-name">.</span> /lib/lsb/init-functions

<span class="token function-name function">do_start</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    start-stop-daemon <span class="token parameter variable">--start</span> <span class="token parameter variable">--quiet</span> <span class="token parameter variable">--pidfile</span> <span class="token variable">$PIDFILE</span> <span class="token parameter variable">--exec</span> <span class="token variable">$DAEMON</span> -- <span class="token punctuation">\\</span>
        <span class="token variable">$DAEMON_ARGS</span>
    <span class="token assign-left variable">RETVAL</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">$?</span>&quot;</span>
    <span class="token builtin class-name">return</span> <span class="token string">&quot;<span class="token variable">$RETVAL</span>&quot;</span>
<span class="token punctuation">}</span>

<span class="token function-name function">do_stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment"># Return</span>
    <span class="token comment">#   0 if daemon has been stopped</span>
    <span class="token comment">#   1 if daemon was already stopped</span>
    <span class="token comment">#   2 if daemon could not be stopped</span>
    <span class="token comment">#   other if a failure occurred</span>
    start-stop-daemon <span class="token parameter variable">--stop</span> <span class="token parameter variable">--quiet</span> <span class="token parameter variable">--oknodo</span> <span class="token parameter variable">--retry</span><span class="token operator">=</span><span class="token environment constant">TERM</span>/30/KILL/5 <span class="token parameter variable">--pidfile</span> <span class="token variable">$PIDFILE</span>
    <span class="token assign-left variable">RETVAL</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">$?</span>&quot;</span>
    <span class="token function">rm</span> <span class="token parameter variable">-f</span> <span class="token variable">$PIDFILE</span>
    <span class="token builtin class-name">return</span> <span class="token string">&quot;<span class="token variable">$RETVAL</span>&quot;</span>
<span class="token punctuation">}</span>

<span class="token function-name function">do_reload</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">#</span>
    start-stop-daemon <span class="token parameter variable">--stop</span> <span class="token parameter variable">--signal</span> HUP <span class="token parameter variable">--quiet</span> <span class="token parameter variable">--pidfile</span> <span class="token variable">$PIDFILE</span>
    <span class="token assign-left variable">RETVAL</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">$?</span>&quot;</span>
    <span class="token builtin class-name">return</span> <span class="token string">&quot;<span class="token variable">$RETVAL</span>&quot;</span>
<span class="token punctuation">}</span>

<span class="token function-name function">do_configtest</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">$#</span>&quot;</span> <span class="token parameter variable">-ne</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token keyword">case</span> <span class="token string">&quot;<span class="token variable">$1</span>&quot;</span> <span class="token keyword">in</span>
            -q<span class="token punctuation">)</span>
                <span class="token assign-left variable">FLAG</span><span class="token operator">=</span><span class="token variable">$1</span>
                <span class="token punctuation">;</span><span class="token punctuation">;</span>
            *<span class="token punctuation">)</span>
                <span class="token punctuation">;</span><span class="token punctuation">;</span>
        <span class="token keyword">esac</span>
        <span class="token builtin class-name">shift</span>
    <span class="token keyword">fi</span>
    <span class="token variable">$DAEMON</span> <span class="token parameter variable">-t</span> <span class="token variable">$FLAG</span> <span class="token parameter variable">-c</span> <span class="token variable">$CONFFILE</span>
    <span class="token assign-left variable">RETVAL</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">$?</span>&quot;</span>
    <span class="token builtin class-name">return</span> <span class="token variable">$RETVAL</span>
<span class="token punctuation">}</span>

<span class="token function-name function">do_upgrade</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token assign-left variable">OLDBINPIDFILE</span><span class="token operator">=</span><span class="token variable">$PIDFILE</span>.oldbin

    do_configtest <span class="token parameter variable">-q</span> <span class="token operator">||</span> <span class="token builtin class-name">return</span> <span class="token number">6</span>
    start-stop-daemon <span class="token parameter variable">--stop</span> <span class="token parameter variable">--signal</span> USR2 <span class="token parameter variable">--quiet</span> <span class="token parameter variable">--pidfile</span> <span class="token variable">$PIDFILE</span>
    <span class="token assign-left variable">RETVAL</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">$?</span>&quot;</span>

    <span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token variable"><span class="token variable">\`</span>/usr/bin/seq  $UPGRADEWAITLOOPS<span class="token variable">\`</span></span><span class="token punctuation">;</span> <span class="token keyword">do</span>
        <span class="token function">sleep</span> <span class="token variable">$SLEEPSEC</span>
        <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-f</span> <span class="token variable">$OLDBINPIDFILE</span> <span class="token parameter variable">-a</span> <span class="token parameter variable">-f</span> <span class="token variable">$PIDFILE</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
            start-stop-daemon <span class="token parameter variable">--stop</span> <span class="token parameter variable">--signal</span> QUIT <span class="token parameter variable">--quiet</span> <span class="token parameter variable">--pidfile</span> <span class="token variable">$OLDBINPIDFILE</span>
            <span class="token assign-left variable">RETVAL</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">$?</span>&quot;</span>
            <span class="token builtin class-name">return</span>
        <span class="token keyword">fi</span>
    <span class="token keyword">done</span>

    <span class="token builtin class-name">echo</span> $<span class="token string">&quot;Upgrade failed!&quot;</span>
    <span class="token assign-left variable">RETVAL</span><span class="token operator">=</span><span class="token number">1</span>
    <span class="token builtin class-name">return</span> <span class="token variable">$RETVAL</span>
<span class="token punctuation">}</span>

<span class="token function-name function">do_checkreload</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token assign-left variable">templog</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span>/bin/mktemp <span class="token parameter variable">--tmpdir</span> nginx-check-reload-XXXXXX.log<span class="token variable">\`</span></span>
    <span class="token builtin class-name">trap</span> <span class="token string">&#39;/bin/rm -f $templog&#39;</span> <span class="token number">0</span>
    /usr/bin/tail <span class="token parameter variable">--pid</span><span class="token operator">=</span><span class="token variable">$$</span> <span class="token parameter variable">-n</span> <span class="token number">0</span> <span class="token parameter variable">--follow</span><span class="token operator">=</span>name /var/log/nginx/error.log <span class="token operator">&gt;</span> <span class="token variable">$templog</span> <span class="token operator">&amp;</span>
    /bin/sleep <span class="token number">1</span>
    start-stop-daemon <span class="token parameter variable">--stop</span> <span class="token parameter variable">--signal</span> HUP <span class="token parameter variable">--quiet</span> <span class="token parameter variable">--pidfile</span> <span class="token variable">$PIDFILE</span>
    /bin/sleep <span class="token variable">$CHECKSLEEP</span>
    /bin/grep <span class="token parameter variable">-E</span> <span class="token string">&quot;\\[emerg\\]|\\[alert\\]&quot;</span> <span class="token variable">$templog</span>
<span class="token punctuation">}</span>

<span class="token keyword">case</span> <span class="token string">&quot;<span class="token variable">$1</span>&quot;</span> <span class="token keyword">in</span>
    start<span class="token punctuation">)</span>
        <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">$VERBOSE</span>&quot;</span> <span class="token operator">!=</span> no <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> log_daemon_msg <span class="token string">&quot;Starting <span class="token variable">$DESC</span> &quot;</span> <span class="token string">&quot;<span class="token variable">$NAME</span>&quot;</span>
        do_start
        <span class="token keyword">case</span> <span class="token string">&quot;<span class="token variable">$?</span>&quot;</span> <span class="token keyword">in</span>
            <span class="token number">0</span><span class="token operator">|</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">$VERBOSE</span>&quot;</span> <span class="token operator">!=</span> no <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> log_end_msg <span class="token number">0</span> <span class="token punctuation">;</span><span class="token punctuation">;</span>
            <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">$VERBOSE</span>&quot;</span> <span class="token operator">!=</span> no <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> log_end_msg <span class="token number">1</span> <span class="token punctuation">;</span><span class="token punctuation">;</span>
        <span class="token keyword">esac</span>
        <span class="token punctuation">;</span><span class="token punctuation">;</span>
    stop<span class="token punctuation">)</span>
        <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">$VERBOSE</span>&quot;</span> <span class="token operator">!=</span> no <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> log_daemon_msg <span class="token string">&quot;Stopping <span class="token variable">$DESC</span>&quot;</span> <span class="token string">&quot;<span class="token variable">$NAME</span>&quot;</span>
        do_stop
        <span class="token keyword">case</span> <span class="token string">&quot;<span class="token variable">$?</span>&quot;</span> <span class="token keyword">in</span>
            <span class="token number">0</span><span class="token operator">|</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">$VERBOSE</span>&quot;</span> <span class="token operator">!=</span> no <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> log_end_msg <span class="token number">0</span> <span class="token punctuation">;</span><span class="token punctuation">;</span>
            <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">$VERBOSE</span>&quot;</span> <span class="token operator">!=</span> no <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> log_end_msg <span class="token number">1</span> <span class="token punctuation">;</span><span class="token punctuation">;</span>
        <span class="token keyword">esac</span>
        <span class="token punctuation">;</span><span class="token punctuation">;</span>
  status<span class="token punctuation">)</span>
        status_of_proc <span class="token parameter variable">-p</span> <span class="token string">&quot;<span class="token variable">$PIDFILE</span>&quot;</span> <span class="token string">&quot;<span class="token variable">$DAEMON</span>&quot;</span> <span class="token string">&quot;<span class="token variable">$NAME</span>&quot;</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">exit</span> <span class="token number">0</span> <span class="token operator">||</span> <span class="token builtin class-name">exit</span> <span class="token variable">$?</span>
        <span class="token punctuation">;</span><span class="token punctuation">;</span>
  configtest<span class="token punctuation">)</span>
        do_configtest
        <span class="token punctuation">;</span><span class="token punctuation">;</span>
  upgrade<span class="token punctuation">)</span>
        do_upgrade
        <span class="token punctuation">;</span><span class="token punctuation">;</span>
  reload<span class="token operator">|</span>force-reload<span class="token punctuation">)</span>
        log_daemon_msg <span class="token string">&quot;Reloading <span class="token variable">$DESC</span>&quot;</span> <span class="token string">&quot;<span class="token variable">$NAME</span>&quot;</span>
        do_reload
        log_end_msg <span class="token variable">$?</span>
        <span class="token punctuation">;</span><span class="token punctuation">;</span>
  restart<span class="token operator">|</span>force-reload<span class="token punctuation">)</span>
        log_daemon_msg <span class="token string">&quot;Restarting <span class="token variable">$DESC</span>&quot;</span> <span class="token string">&quot;<span class="token variable">$NAME</span>&quot;</span>
        do_configtest <span class="token parameter variable">-q</span> <span class="token operator">||</span> <span class="token builtin class-name">exit</span> <span class="token variable">$RETVAL</span>
        do_stop
        <span class="token keyword">case</span> <span class="token string">&quot;<span class="token variable">$?</span>&quot;</span> <span class="token keyword">in</span>
            <span class="token number">0</span><span class="token operator">|</span><span class="token number">1</span><span class="token punctuation">)</span>
                do_start
                <span class="token keyword">case</span> <span class="token string">&quot;<span class="token variable">$?</span>&quot;</span> <span class="token keyword">in</span>
                    <span class="token number">0</span><span class="token punctuation">)</span> log_end_msg <span class="token number">0</span> <span class="token punctuation">;</span><span class="token punctuation">;</span>
                    <span class="token number">1</span><span class="token punctuation">)</span> log_end_msg <span class="token number">1</span> <span class="token punctuation">;</span><span class="token punctuation">;</span> <span class="token comment"># Old process is still running</span>
                    *<span class="token punctuation">)</span> log_end_msg <span class="token number">1</span> <span class="token punctuation">;</span><span class="token punctuation">;</span> <span class="token comment"># Failed to start</span>
                <span class="token keyword">esac</span>
                <span class="token punctuation">;</span><span class="token punctuation">;</span>
            *<span class="token punctuation">)</span>
                <span class="token comment"># Failed to stop</span>
                log_end_msg <span class="token number">1</span>
                <span class="token punctuation">;</span><span class="token punctuation">;</span>
        <span class="token keyword">esac</span>
        <span class="token punctuation">;</span><span class="token punctuation">;</span>
    check-reload<span class="token punctuation">)</span>
        do_checkreload
        <span class="token assign-left variable">RETVAL</span><span class="token operator">=</span><span class="token number">0</span>
        <span class="token punctuation">;</span><span class="token punctuation">;</span>
    *<span class="token punctuation">)</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;Usage: <span class="token variable">$SCRIPTNAME</span> {start|stop|status|restart|reload|force-reload|upgrade|configtest|check-reload}&quot;</span> <span class="token operator">&gt;</span><span class="token file-descriptor important">&amp;2</span>
        <span class="token builtin class-name">exit</span> <span class="token number">3</span>
        <span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token keyword">esac</span>

<span class="token builtin class-name">exit</span> <span class="token variable">$RETVAL</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">podman</span> run <span class="token parameter variable">--rm</span> docker.io/library/nginx <span class="token function">cat</span> /docker-entrypoint.sh
<span class="token comment">#!/bin/sh</span>
<span class="token comment"># vim:sw=4:ts=4:et</span>

<span class="token builtin class-name">set</span> <span class="token parameter variable">-e</span>

<span class="token function-name function">entrypoint_log</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token string">&quot;<span class="token variable">\${NGINX_ENTRYPOINT_QUIET_LOGS<span class="token operator">:-</span>}</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$@</span>&quot;</span>
    <span class="token keyword">fi</span>
<span class="token punctuation">}</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">$1</span>&quot;</span> <span class="token operator">=</span> <span class="token string">&quot;nginx&quot;</span> <span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">$1</span>&quot;</span> <span class="token operator">=</span> <span class="token string">&quot;nginx-debug&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token keyword">if</span> /usr/bin/find <span class="token string">&quot;/docker-entrypoint.d/&quot;</span> <span class="token parameter variable">-mindepth</span> <span class="token number">1</span> <span class="token parameter variable">-maxdepth</span> <span class="token number">1</span> <span class="token parameter variable">-type</span> f <span class="token parameter variable">-print</span> <span class="token parameter variable">-quit</span> <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span>/dev/null <span class="token operator">|</span> <span class="token builtin class-name">read</span> <span class="token function">v</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        entrypoint_log <span class="token string">&quot;<span class="token variable">$0</span>: /docker-entrypoint.d/ is not empty, will attempt to perform configuration&quot;</span>

        entrypoint_log <span class="token string">&quot;<span class="token variable">$0</span>: Looking for shell scripts in /docker-entrypoint.d/&quot;</span>
        <span class="token function">find</span> <span class="token string">&quot;/docker-entrypoint.d/&quot;</span> <span class="token parameter variable">-follow</span> <span class="token parameter variable">-type</span> f <span class="token parameter variable">-print</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-V</span> <span class="token operator">|</span> <span class="token keyword">while</span> <span class="token builtin class-name">read</span> <span class="token parameter variable">-r</span> f<span class="token punctuation">;</span> <span class="token keyword">do</span>
            <span class="token keyword">case</span> <span class="token string">&quot;<span class="token variable">$f</span>&quot;</span> <span class="token keyword">in</span>
                *.envsh<span class="token punctuation">)</span>
                    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-x</span> <span class="token string">&quot;<span class="token variable">$f</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
                        entrypoint_log <span class="token string">&quot;<span class="token variable">$0</span>: Sourcing <span class="token variable">$f</span>&quot;</span><span class="token punctuation">;</span>
                        <span class="token builtin class-name">.</span> <span class="token string">&quot;<span class="token variable">$f</span>&quot;</span>
                    <span class="token keyword">else</span>
                        <span class="token comment"># warn on shell scripts without exec bit</span>
                        entrypoint_log <span class="token string">&quot;<span class="token variable">$0</span>: Ignoring <span class="token variable">$f</span>, not executable&quot;</span><span class="token punctuation">;</span>
                    <span class="token keyword">fi</span>
                    <span class="token punctuation">;</span><span class="token punctuation">;</span>
                *.sh<span class="token punctuation">)</span>
                    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-x</span> <span class="token string">&quot;<span class="token variable">$f</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
                        entrypoint_log <span class="token string">&quot;<span class="token variable">$0</span>: Launching <span class="token variable">$f</span>&quot;</span><span class="token punctuation">;</span>
                        <span class="token string">&quot;<span class="token variable">$f</span>&quot;</span>
                    <span class="token keyword">else</span>
                        <span class="token comment"># warn on shell scripts without exec bit</span>
                        entrypoint_log <span class="token string">&quot;<span class="token variable">$0</span>: Ignoring <span class="token variable">$f</span>, not executable&quot;</span><span class="token punctuation">;</span>
                    <span class="token keyword">fi</span>
                    <span class="token punctuation">;</span><span class="token punctuation">;</span>
                *<span class="token punctuation">)</span> entrypoint_log <span class="token string">&quot;<span class="token variable">$0</span>: Ignoring <span class="token variable">$f</span>&quot;</span><span class="token punctuation">;</span><span class="token punctuation">;</span>
            <span class="token keyword">esac</span>
        <span class="token keyword">done</span>

        entrypoint_log <span class="token string">&quot;<span class="token variable">$0</span>: Configuration complete; ready for start up&quot;</span>
    <span class="token keyword">else</span>
        entrypoint_log <span class="token string">&quot;<span class="token variable">$0</span>: No files found in /docker-entrypoint.d/, skipping configuration&quot;</span>
    <span class="token keyword">fi</span>
<span class="token keyword">fi</span>

<span class="token builtin class-name">exec</span> <span class="token string">&quot;<span class="token variable">$@</span>&quot;</span>

$ <span class="token function">podman</span> run <span class="token parameter variable">--rm</span> docker.io/library/nginx <span class="token function">ls</span> <span class="token parameter variable">-l</span> /docker-entrypoint.d
total <span class="token number">20</span>
-rwxr-xr-x <span class="token number">1</span> root root <span class="token number">2125</span> Jan <span class="token number">12</span> 00:21 <span class="token number">10</span>-listen-on-ipv6-by-default.sh
-rwxr-xr-x <span class="token number">1</span> root root  <span class="token number">298</span> Jan <span class="token number">12</span> 00:21 <span class="token number">15</span>-local-resolvers.envsh
-rwxr-xr-x <span class="token number">1</span> root root <span class="token number">3018</span> Jan <span class="token number">12</span> 00:21 <span class="token number">20</span>-envsubst-on-templates.sh
-rwxr-xr-x <span class="token number">1</span> root root <span class="token number">4619</span> Jan <span class="token number">12</span> 00:21 <span class="token number">30</span>-tune-worker-processes.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><p>进程运行情况:</p><ul><li><code>worker_processes auto;</code> —— 一个主进程，n个守护进程（n=逻辑处理器数）</li><li><code>user nginx;</code> —— 当前用户启动主进程，nginx用户启动守护进程</li></ul><details class="custom-container details"><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 配置</span>
$ <span class="token function">podman</span> run <span class="token parameter variable">--rm</span> docker.io/library/nginx <span class="token function">cat</span> /etc/nginx/nginx.conf <span class="token operator">|</span> <span class="token function">grep</span> process
worker_processes  auto<span class="token punctuation">;</span>
$ <span class="token function">podman</span> run <span class="token parameter variable">--rm</span> docker.io/library/nginx <span class="token function">cat</span> /etc/nginx/nginx.conf <span class="token operator">|</span> <span class="token function">grep</span> user
user  nginx<span class="token punctuation">;</span>
    log_format  main  <span class="token string">&#39;$remote_addr - $remote_user [$time_local] &quot;$request&quot; &#39;</span>
                      <span class="token string">&#39;&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot;&#39;</span><span class="token punctuation">;</span>
$ <span class="token function">podman</span> run <span class="token parameter variable">--rm</span> docker.io/library/nginx <span class="token function">id</span> nginx
<span class="token assign-left variable">uid</span><span class="token operator">=</span><span class="token number">101</span><span class="token punctuation">(</span>nginx<span class="token punctuation">)</span> <span class="token assign-left variable">gid</span><span class="token operator">=</span><span class="token number">101</span><span class="token punctuation">(</span>nginx<span class="token punctuation">)</span> <span class="token assign-left variable">groups</span><span class="token operator">=</span><span class="token number">101</span><span class="token punctuation">(</span>nginx<span class="token punctuation">)</span>

<span class="token comment"># 运行进程</span>
$ <span class="token function">podman</span> run <span class="token parameter variable">--rm</span> <span class="token parameter variable">-it</span> <span class="token parameter variable">-p</span> <span class="token number">8888</span>:80 docker.io/library/nginx nginx <span class="token parameter variable">-g</span> <span class="token string">&quot;daemon off;&quot;</span>
/docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration
/docker-entrypoint.sh: Looking <span class="token keyword">for</span> shell scripts <span class="token keyword">in</span> /docker-entrypoint.d/
/docker-entrypoint.sh: Launching /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh
<span class="token number">10</span>-listen-on-ipv6-by-default.sh: info: Getting the checksum of /etc/nginx/conf.d/default.conf
<span class="token number">10</span>-listen-on-ipv6-by-default.sh: info: Enabled listen on IPv6 <span class="token keyword">in</span> /etc/nginx/conf.d/default.conf
/docker-entrypoint.sh: Sourcing /docker-entrypoint.d/15-local-resolvers.envsh
/docker-entrypoint.sh: Launching /docker-entrypoint.d/20-envsubst-on-templates.sh
/docker-entrypoint.sh: Launching /docker-entrypoint.d/30-tune-worker-processes.sh
/docker-entrypoint.sh: Configuration complete<span class="token punctuation">;</span> ready <span class="token keyword">for</span> start up
<span class="token number">2024</span>/01/20 <span class="token number">14</span>:02:22 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: using the &quot;epoll&quot; event method</span>
<span class="token number">2024</span>/01/20 <span class="token number">14</span>:02:22 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: nginx/1.25.3</span>
<span class="token number">2024</span>/01/20 <span class="token number">14</span>:02:22 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: built by gcc 12.2.0 (Debian 12.2.0-14)</span>
<span class="token number">2024</span>/01/20 <span class="token number">14</span>:02:22 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: OS: Linux 5.10.16.3-microsoft-standard-WSL2</span>
<span class="token number">2024</span>/01/20 <span class="token number">14</span>:02:22 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: getrlimit(RLIMIT_NOFILE): 1048576:1048576</span>
<span class="token number">2024</span>/01/20 <span class="token number">14</span>:02:22 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: start worker processes</span>
<span class="token number">2024</span>/01/20 <span class="token number">14</span>:02:22 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: start worker process 24</span>
<span class="token number">2024</span>/01/20 <span class="token number">14</span>:02:22 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: start worker process 25</span>
<span class="token number">2024</span>/01/20 <span class="token number">14</span>:02:22 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: start worker process 26</span>
<span class="token number">2024</span>/01/20 <span class="token number">14</span>:02:22 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: start worker process 27</span>
<span class="token number">2024</span>/01/20 <span class="token number">14</span>:02:22 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: start worker process 28</span>
<span class="token number">2024</span>/01/20 <span class="token number">14</span>:02:22 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: start worker process 29</span>
<span class="token number">2024</span>/01/20 <span class="token number">14</span>:02:22 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: start worker process 30</span>
<span class="token number">2024</span>/01/20 <span class="token number">14</span>:02:22 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: start worker process 31</span>
<span class="token number">2024</span>/01/20 <span class="token number">14</span>:02:22 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: start worker process 32</span>
<span class="token number">2024</span>/01/20 <span class="token number">14</span>:02:22 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: start worker process 33</span>
<span class="token number">2024</span>/01/20 <span class="token number">14</span>:02:22 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: start worker process 34</span>
<span class="token number">2024</span>/01/20 <span class="token number">14</span>:02:22 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: start worker process 35</span>
<span class="token number">2024</span>/01/20 <span class="token number">14</span>:02:22 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: start worker process 36</span>
<span class="token number">2024</span>/01/20 <span class="token number">14</span>:02:22 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: start worker process 37</span>
<span class="token number">2024</span>/01/20 <span class="token number">14</span>:02:22 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: start worker process 38</span>
<span class="token number">2024</span>/01/20 <span class="token number">14</span>:02:22 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: start worker process 39</span>
$ <span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span> <span class="token function">grep</span> nginx
root      <span class="token number">1762</span>    <span class="token number">32</span>  <span class="token number">0</span> <span class="token number">22</span>:02 pts/1    00:00:01 <span class="token function">podman</span> run <span class="token parameter variable">--rm</span> <span class="token parameter variable">-it</span> <span class="token parameter variable">-p</span> <span class="token number">8888</span>:80 docker.io/library/nginx nginx <span class="token parameter variable">-g</span> daemon off<span class="token punctuation">;</span>
root      <span class="token number">1829</span>  <span class="token number">1827</span>  <span class="token number">0</span> <span class="token number">22</span>:02 pts/0    00:00:00 nginx: master process nginx <span class="token parameter variable">-g</span> daemon off<span class="token punctuation">;</span>
<span class="token number">101</span>       <span class="token number">1854</span>  <span class="token number">1829</span>  <span class="token number">0</span> <span class="token number">22</span>:02 pts/0    00:00:00 nginx: worker process
<span class="token number">101</span>       <span class="token number">1855</span>  <span class="token number">1829</span>  <span class="token number">0</span> <span class="token number">22</span>:02 pts/0    00:00:00 nginx: worker process
<span class="token number">101</span>       <span class="token number">1856</span>  <span class="token number">1829</span>  <span class="token number">0</span> <span class="token number">22</span>:02 pts/0    00:00:00 nginx: worker process
<span class="token number">101</span>       <span class="token number">1857</span>  <span class="token number">1829</span>  <span class="token number">0</span> <span class="token number">22</span>:02 pts/0    00:00:00 nginx: worker process
<span class="token number">101</span>       <span class="token number">1858</span>  <span class="token number">1829</span>  <span class="token number">0</span> <span class="token number">22</span>:02 pts/0    00:00:00 nginx: worker process
<span class="token number">101</span>       <span class="token number">1859</span>  <span class="token number">1829</span>  <span class="token number">0</span> <span class="token number">22</span>:02 pts/0    00:00:00 nginx: worker process
<span class="token number">101</span>       <span class="token number">1860</span>  <span class="token number">1829</span>  <span class="token number">0</span> <span class="token number">22</span>:02 pts/0    00:00:00 nginx: worker process
<span class="token number">101</span>       <span class="token number">1861</span>  <span class="token number">1829</span>  <span class="token number">0</span> <span class="token number">22</span>:02 pts/0    00:00:00 nginx: worker process
<span class="token number">101</span>       <span class="token number">1862</span>  <span class="token number">1829</span>  <span class="token number">0</span> <span class="token number">22</span>:02 pts/0    00:00:00 nginx: worker process
<span class="token number">101</span>       <span class="token number">1863</span>  <span class="token number">1829</span>  <span class="token number">0</span> <span class="token number">22</span>:02 pts/0    00:00:00 nginx: worker process
<span class="token number">101</span>       <span class="token number">1864</span>  <span class="token number">1829</span>  <span class="token number">0</span> <span class="token number">22</span>:02 pts/0    00:00:00 nginx: worker process
<span class="token number">101</span>       <span class="token number">1865</span>  <span class="token number">1829</span>  <span class="token number">0</span> <span class="token number">22</span>:02 pts/0    00:00:00 nginx: worker process
<span class="token number">101</span>       <span class="token number">1866</span>  <span class="token number">1829</span>  <span class="token number">0</span> <span class="token number">22</span>:02 pts/0    00:00:00 nginx: worker process
<span class="token number">101</span>       <span class="token number">1867</span>  <span class="token number">1829</span>  <span class="token number">0</span> <span class="token number">22</span>:02 pts/0    00:00:00 nginx: worker process
<span class="token number">101</span>       <span class="token number">1868</span>  <span class="token number">1829</span>  <span class="token number">0</span> <span class="token number">22</span>:02 pts/0    00:00:00 nginx: worker process
<span class="token number">101</span>       <span class="token number">1869</span>  <span class="token number">1829</span>  <span class="token number">0</span> <span class="token number">22</span>:02 pts/0    00:00:00 nginx: worker process
root      <span class="token number">1871</span>  <span class="token number">1598</span>  <span class="token number">0</span> <span class="token number">22</span>:11 pts/3    00:00:00 <span class="token function">grep</span> <span class="token parameter variable">--color</span><span class="token operator">=</span>auto nginx
$ <span class="token function">curl</span> <span class="token number">127.0</span>.0.1:8888
<span class="token operator">&lt;</span><span class="token operator">!</span>DOCTYPE html<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>html<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>head<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>title<span class="token operator">&gt;</span>Welcome to nginx<span class="token operator">!</span><span class="token operator">&lt;</span>/title<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>style<span class="token operator">&gt;</span>
html <span class="token punctuation">{</span> color-scheme: light dark<span class="token punctuation">;</span> <span class="token punctuation">}</span>
body <span class="token punctuation">{</span> width: 35em<span class="token punctuation">;</span> margin: <span class="token number">0</span> auto<span class="token punctuation">;</span>
font-family: Tahoma, Verdana, Arial, sans-serif<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token operator">&lt;</span>/style<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>/head<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>body<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>h<span class="token operator"><span class="token file-descriptor important">1</span>&gt;</span>Welcome to nginx<span class="token operator">!</span><span class="token operator">&lt;</span>/h<span class="token operator"><span class="token file-descriptor important">1</span>&gt;</span>
<span class="token operator">&lt;</span>p<span class="token operator">&gt;</span>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.<span class="token operator">&lt;</span>/p<span class="token operator">&gt;</span>

<span class="token operator">&lt;</span>p<span class="token operator">&gt;</span>For online documentation and support please refer to
<span class="token operator">&lt;</span>a <span class="token assign-left variable">href</span><span class="token operator">=</span><span class="token string">&quot;http://nginx.org/&quot;</span><span class="token operator">&gt;</span>nginx.org<span class="token operator">&lt;</span>/a<span class="token operator">&gt;</span>.<span class="token operator">&lt;</span>br/<span class="token operator">&gt;</span>
Commercial support is available at
<span class="token operator">&lt;</span>a <span class="token assign-left variable">href</span><span class="token operator">=</span><span class="token string">&quot;http://nginx.com/&quot;</span><span class="token operator">&gt;</span>nginx.com<span class="token operator">&lt;</span>/a<span class="token operator">&gt;</span>.<span class="token operator">&lt;</span>/p<span class="token operator">&gt;</span>

<span class="token operator">&lt;</span>p<span class="token operator">&gt;</span><span class="token operator">&lt;</span>em<span class="token operator">&gt;</span>Thank you <span class="token keyword">for</span> using nginx.<span class="token operator">&lt;</span>/em<span class="token operator">&gt;</span><span class="token operator">&lt;</span>/p<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>/body<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>/html<span class="token operator">&gt;</span>

<span class="token comment"># 关闭进程</span>
$ <span class="token operator">&lt;</span>Ctrl+C<span class="token operator">&gt;</span>
<span class="token number">10.88</span>.0.1 - - <span class="token punctuation">[</span><span class="token number">20</span>/Jan/2024:15:45:42 +0000<span class="token punctuation">]</span> <span class="token string">&quot;GET / HTTP/1.1&quot;</span> <span class="token number">200</span> <span class="token number">615</span> <span class="token string">&quot;-&quot;</span> <span class="token string">&quot;curl/8.2.1&quot;</span> <span class="token string">&quot;-&quot;</span>
^C2024/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">38</span><span class="token comment">#38: signal 2 (SIGINT) received, exiting</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">33</span><span class="token comment">#33: signal 2 (SIGINT) received, exiting</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">32</span><span class="token comment">#32: signal 2 (SIGINT) received, exiting</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">35</span><span class="token comment">#35: signal 2 (SIGINT) received, exiting</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">31</span><span class="token comment">#31: signal 2 (SIGINT) received, exiting</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">30</span><span class="token comment">#30: signal 2 (SIGINT) received, exiting</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">37</span><span class="token comment">#37: signal 2 (SIGINT) received, exiting</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">39</span><span class="token comment">#39: signal 2 (SIGINT) received, exiting</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">34</span><span class="token comment">#34: signal 2 (SIGINT) received, exiting</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">29</span><span class="token comment">#29: signal 2 (SIGINT) received, exiting</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">33</span><span class="token comment">#33: exiting</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">32</span><span class="token comment">#32: exiting</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">36</span><span class="token comment">#36: signal 2 (SIGINT) received, exiting</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">30</span><span class="token comment">#30: exiting</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">34</span><span class="token comment">#34: exiting</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">29</span><span class="token comment">#29: exiting</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">33</span><span class="token comment">#33: exit</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">35</span><span class="token comment">#35: exiting</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">39</span><span class="token comment">#39: exiting</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">31</span><span class="token comment">#31: exiting</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">38</span><span class="token comment">#38: exiting</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">36</span><span class="token comment">#36: exiting</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">27</span><span class="token comment">#27: signal 2 (SIGINT) received, exiting</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">28</span><span class="token comment">#28: signal 2 (SIGINT) received, exiting</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: signal 2 (SIGINT) received, exiting</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">25</span><span class="token comment">#25: signal 2 (SIGINT) received, exiting</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">26</span><span class="token comment">#26: signal 2 (SIGINT) received, exiting</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">31</span><span class="token comment">#31: exit</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">26</span><span class="token comment">#26: exiting</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">28</span><span class="token comment">#28: exiting</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">34</span><span class="token comment">#34: exit</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">29</span><span class="token comment">#29: exit</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">27</span><span class="token comment">#27: exiting</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">25</span><span class="token comment">#25: exiting</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">32</span><span class="token comment">#32: exit</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">30</span><span class="token comment">#30: exit</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">35</span><span class="token comment">#35: exit</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">24</span><span class="token comment">#24: signal 2 (SIGINT) received, exiting</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">24</span><span class="token comment">#24: exiting</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">26</span><span class="token comment">#26: exit</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">37</span><span class="token comment">#37: exiting</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">38</span><span class="token comment">#38: exit</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">25</span><span class="token comment">#25: exit</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">39</span><span class="token comment">#39: exit</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">36</span><span class="token comment">#36: exit</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">24</span><span class="token comment">#24: exit</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">27</span><span class="token comment">#27: exit</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">37</span><span class="token comment">#37: exit</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">28</span><span class="token comment">#28: exit</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: signal 14 (SIGALRM) received</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: signal 17 (SIGCHLD) received from 31</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: worker process 31 exited with code 0</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: worker process 29 exited with code 0</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: worker process 32 exited with code 0</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: worker process 36 exited with code 0</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: worker process 37 exited with code 0</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: worker process 39 exited with code 0</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: signal 29 (SIGIO) received</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: signal 17 (SIGCHLD) received from 29</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: signal 17 (SIGCHLD) received from 38</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: worker process 38 exited with code 0</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: signal 29 (SIGIO) received</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: signal 17 (SIGCHLD) received from 34</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: worker process 34 exited with code 0</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: signal 29 (SIGIO) received</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: signal 17 (SIGCHLD) received from 26</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: worker process 26 exited with code 0</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: signal 29 (SIGIO) received</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: signal 17 (SIGCHLD) received from 33</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: worker process 33 exited with code 0</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: worker process 24 exited with code 0</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: worker process 35 exited with code 0</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: signal 29 (SIGIO) received</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: signal 17 (SIGCHLD) received from 24</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: signal 17 (SIGCHLD) received from 30</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: worker process 30 exited with code 0</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: signal 29 (SIGIO) received</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: signal 17 (SIGCHLD) received from 27</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: worker process 27 exited with code 0</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: signal 29 (SIGIO) received</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: signal 17 (SIGCHLD) received from 28</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: worker process 25 exited with code 0</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: worker process 28 exited with code 0</span>
<span class="token number">2024</span>/01/20 <span class="token number">15</span>:46:14 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: exit</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><p>直接切换非root用户遇到的问题</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">podman</span> run <span class="token parameter variable">--rm</span> <span class="token parameter variable">-it</span> <span class="token parameter variable">-p</span> <span class="token number">8888</span>:80 <span class="token parameter variable">-p</span> <span class="token number">9999</span>:9999 <span class="token parameter variable">-v</span> ./conf.d/:/etc/nginx/conf.d/ docker.io/library/nginx <span class="token function">bash</span>
root@9a93e5f60273:/<span class="token comment"># su -s /bin/bash -c &quot;id&quot; nginx</span>
<span class="token assign-left variable">uid</span><span class="token operator">=</span><span class="token number">101</span><span class="token punctuation">(</span>nginx<span class="token punctuation">)</span> <span class="token assign-left variable">gid</span><span class="token operator">=</span><span class="token number">101</span><span class="token punctuation">(</span>nginx<span class="token punctuation">)</span> <span class="token assign-left variable">groups</span><span class="token operator">=</span><span class="token number">101</span><span class="token punctuation">(</span>nginx<span class="token punctuation">)</span>

<span class="token comment"># 错误： 缺少权限（日志写入）；需要更改配置</span>
root@9a93e5f60273:/<span class="token comment"># su -s /bin/bash -c &quot;nginx&quot; nginx</span>
nginx: <span class="token punctuation">[</span>alert<span class="token punctuation">]</span> could not <span class="token function">open</span> error log file: open<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token string">&quot;/var/log/nginx/error.log&quot;</span> failed <span class="token punctuation">(</span><span class="token number">13</span>: Permission denied<span class="token punctuation">)</span>
<span class="token number">2024</span>/01/20 <span class="token number">17</span>:19:28 <span class="token punctuation">[</span>warn<span class="token punctuation">]</span> <span class="token number">55</span><span class="token comment">#55: the &quot;user&quot; directive makes sense only if the master process runs with super-user privileges, ignored in /etc/nginx/nginx.conf:2</span>
<span class="token number">2024</span>/01/20 <span class="token number">17</span>:19:28 <span class="token punctuation">[</span>emerg<span class="token punctuation">]</span> <span class="token number">55</span><span class="token comment">#55: open() &quot;/var/log/nginx/error.log&quot; failed (13: Permission denied)</span>
<span class="token comment"># 处理： 开放权限</span>
root@9a93e5f60273:/<span class="token comment"># chown -R nginx:nginx /var/log/nginx</span>
<span class="token comment"># 处理： 删除默认日志链接（否则即使改了权限，依然无法输入）</span>
root@9a93e5f60273:/<span class="token comment"># ls -l /var/log/nginx</span>
total <span class="token number">0</span>
lrwxrwxrwx <span class="token number">1</span> nginx nginx <span class="token number">11</span> Jan <span class="token number">12</span> 00:21 access.log -<span class="token operator">&gt;</span> /dev/stdout
lrwxrwxrwx <span class="token number">1</span> nginx nginx <span class="token number">11</span> Jan <span class="token number">12</span> 00:21 error.log -<span class="token operator">&gt;</span> /dev/stderr
<span class="token comment"># 处理： 注释配置（根据提示）</span>
root@9a93e5f60273:/<span class="token comment"># sed -i &#39;s/user  nginx;/#user  nginx;/g&#39; /etc/nginx/nginx.conf </span>

<span class="token comment"># 错误： 缺少权限（缓存写入）</span>
root@9a93e5f60273:/<span class="token comment"># sed -i &#39;s/user  nginx;/#user  nginx;/g&#39; /etc/nginx/nginx.conf</span>
root@9a93e5f60273:/<span class="token comment"># su -s /bin/bash -c &quot;nginx&quot; nginx</span>
nginx: <span class="token punctuation">[</span>emerg<span class="token punctuation">]</span> mkdir<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token string">&quot;/var/cache/nginx/client_temp&quot;</span> failed <span class="token punctuation">(</span><span class="token number">13</span>: Permission denied<span class="token punctuation">)</span>
<span class="token comment"># 处理： 开放权限</span>
root@9a93e5f60273:/<span class="token comment"># chown -R nginx:nginx /var/cache/nginx</span>

<span class="token comment"># 错误： 无法开启端口（非root用户只能起1024后的端口）</span>
root@9a93e5f60273:/<span class="token comment"># su -s /bin/bash -c &quot;nginx&quot; nginx</span>
nginx: <span class="token punctuation">[</span>emerg<span class="token punctuation">]</span> bind<span class="token punctuation">(</span><span class="token punctuation">)</span> to <span class="token number">0.0</span>.0.0:80 failed <span class="token punctuation">(</span><span class="token number">13</span>: Permission denied<span class="token punctuation">)</span>
<span class="token comment"># 处理： 更改端口</span>
root@9a93e5f60273:/<span class="token comment"># sed -i &#39;s/listen       80;/listen       9999;/g&#39; /etc/nginx/conf.d/default.conf </span>

<span class="token comment"># 错误： 缺少权限（写入PID）</span>
root@9a93e5f60273:/<span class="token comment"># su -s /bin/bash -c &quot;nginx&quot; nginx</span>
nginx: <span class="token punctuation">[</span>emerg<span class="token punctuation">]</span> open<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token string">&quot;/var/run/nginx.pid&quot;</span> failed <span class="token punctuation">(</span><span class="token number">13</span>: Permission denied<span class="token punctuation">)</span>
root@9a93e5f60273:/<span class="token comment"># touch /run/nginx.pid</span>
root@9a93e5f60273:/<span class="token comment"># chown -R nginx:nginx /run/nginx.pid</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动成功： master权限为nginx</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@lpc19 nginx<span class="token punctuation">]</span><span class="token comment"># ps -ef | grep nginx</span>
root      <span class="token number">3235</span>    <span class="token number">32</span>  <span class="token number">0</span> 01:26 pts/1    00:00:01 <span class="token function">podman</span> run <span class="token parameter variable">--rm</span> <span class="token parameter variable">-it</span> <span class="token parameter variable">-p</span> <span class="token number">8888</span>:80 <span class="token parameter variable">-p</span> <span class="token number">9999</span>:9999 <span class="token parameter variable">-v</span> ./conf.d/:/etc/nginx/conf.d/ docker.io/library/nginx <span class="token function">bash</span>
<span class="token number">101</span>       <span class="token number">3336</span>  <span class="token number">3309</span>  <span class="token number">0</span> 01:38 ?        00:00:00 nginx: master process nginx
<span class="token number">101</span>       <span class="token number">3337</span>  <span class="token number">3336</span>  <span class="token number">0</span> 01:38 ?        00:00:00 nginx: worker process
<span class="token number">101</span>       <span class="token number">3338</span>  <span class="token number">3336</span>  <span class="token number">0</span> 01:38 ?        00:00:00 nginx: worker process
<span class="token number">101</span>       <span class="token number">3339</span>  <span class="token number">3336</span>  <span class="token number">0</span> 01:38 ?        00:00:00 nginx: worker process
<span class="token number">101</span>       <span class="token number">3340</span>  <span class="token number">3336</span>  <span class="token number">0</span> 01:38 ?        00:00:00 nginx: worker process
<span class="token number">101</span>       <span class="token number">3341</span>  <span class="token number">3336</span>  <span class="token number">0</span> 01:38 ?        00:00:00 nginx: worker process
<span class="token number">101</span>       <span class="token number">3342</span>  <span class="token number">3336</span>  <span class="token number">0</span> 01:38 ?        00:00:00 nginx: worker process
<span class="token number">101</span>       <span class="token number">3343</span>  <span class="token number">3336</span>  <span class="token number">0</span> 01:38 ?        00:00:00 nginx: worker process
<span class="token number">101</span>       <span class="token number">3344</span>  <span class="token number">3336</span>  <span class="token number">0</span> 01:38 ?        00:00:00 nginx: worker process
<span class="token number">101</span>       <span class="token number">3345</span>  <span class="token number">3336</span>  <span class="token number">0</span> 01:38 ?        00:00:00 nginx: worker process
<span class="token number">101</span>       <span class="token number">3346</span>  <span class="token number">3336</span>  <span class="token number">0</span> 01:38 ?        00:00:00 nginx: worker process
<span class="token number">101</span>       <span class="token number">3347</span>  <span class="token number">3336</span>  <span class="token number">0</span> 01:38 ?        00:00:00 nginx: worker process
<span class="token number">101</span>       <span class="token number">3348</span>  <span class="token number">3336</span>  <span class="token number">0</span> 01:38 ?        00:00:00 nginx: worker process
<span class="token number">101</span>       <span class="token number">3349</span>  <span class="token number">3336</span>  <span class="token number">0</span> 01:38 ?        00:00:00 nginx: worker process
<span class="token number">101</span>       <span class="token number">3350</span>  <span class="token number">3336</span>  <span class="token number">0</span> 01:38 ?        00:00:00 nginx: worker process
<span class="token number">101</span>       <span class="token number">3351</span>  <span class="token number">3336</span>  <span class="token number">0</span> 01:38 ?        00:00:00 nginx: worker process
<span class="token number">101</span>       <span class="token number">3352</span>  <span class="token number">3336</span>  <span class="token number">0</span> 01:38 ?        00:00:00 nginx: worker process
root      <span class="token number">3354</span>  <span class="token number">1598</span>  <span class="token number">0</span> 01:38 pts/3    00:00:00 <span class="token function">grep</span> <span class="token parameter variable">--color</span><span class="token operator">=</span>auto nginx
<span class="token punctuation">[</span>root@lpc19 nginx<span class="token punctuation">]</span><span class="token comment"># curl 127.0.0.1:9999</span>
<span class="token operator">&lt;</span><span class="token operator">!</span>DOCTYPE html<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>html<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>head<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>title<span class="token operator">&gt;</span>Welcome to nginx<span class="token operator">!</span><span class="token operator">&lt;</span>/title<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>style<span class="token operator">&gt;</span>
html <span class="token punctuation">{</span> color-scheme: light dark<span class="token punctuation">;</span> <span class="token punctuation">}</span>
body <span class="token punctuation">{</span> width: 35em<span class="token punctuation">;</span> margin: <span class="token number">0</span> auto<span class="token punctuation">;</span>
font-family: Tahoma, Verdana, Arial, sans-serif<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token operator">&lt;</span>/style<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>/head<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>body<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>h<span class="token operator"><span class="token file-descriptor important">1</span>&gt;</span>Welcome to nginx<span class="token operator">!</span><span class="token operator">&lt;</span>/h<span class="token operator"><span class="token file-descriptor important">1</span>&gt;</span>
<span class="token operator">&lt;</span>p<span class="token operator">&gt;</span>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.<span class="token operator">&lt;</span>/p<span class="token operator">&gt;</span>

<span class="token operator">&lt;</span>p<span class="token operator">&gt;</span>For online documentation and support please refer to
<span class="token operator">&lt;</span>a <span class="token assign-left variable">href</span><span class="token operator">=</span><span class="token string">&quot;http://nginx.org/&quot;</span><span class="token operator">&gt;</span>nginx.org<span class="token operator">&lt;</span>/a<span class="token operator">&gt;</span>.<span class="token operator">&lt;</span>br/<span class="token operator">&gt;</span>
Commercial support is available at
<span class="token operator">&lt;</span>a <span class="token assign-left variable">href</span><span class="token operator">=</span><span class="token string">&quot;http://nginx.com/&quot;</span><span class="token operator">&gt;</span>nginx.com<span class="token operator">&lt;</span>/a<span class="token operator">&gt;</span>.<span class="token operator">&lt;</span>/p<span class="token operator">&gt;</span>

<span class="token operator">&lt;</span>p<span class="token operator">&gt;</span><span class="token operator">&lt;</span>em<span class="token operator">&gt;</span>Thank you <span class="token keyword">for</span> using nginx.<span class="token operator">&lt;</span>/em<span class="token operator">&gt;</span><span class="token operator">&lt;</span>/p<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>/body<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>/html<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code><span class="token comment"># todo “*” 指令是否必要？</span>

<span class="token instruction"><span class="token keyword">FROM</span> docker.io/library/nginx:latest</span>

<span class="token instruction"><span class="token keyword">RUN</span> mkdir -p /var/cache/nginx &amp;&amp; chown -R nginx:nginx /var/cache/nginx &amp;&amp; <span class="token operator">\\</span>
    mkdir -p /var/log/nginx  &amp;&amp; chown -R nginx:nginx /var/log/nginx &amp;&amp; <span class="token operator">\\</span>
    * mkdir -p /var/lib/nginx  &amp;&amp; chown -R nginx:nginx /var/lib/nginx &amp;&amp; <span class="token operator">\\</span>
    touch /run/nginx.pid &amp;&amp; chown -R nginx:nginx /run/nginx.pid &amp;&amp; <span class="token operator">\\</span>
    mkdir -p /etc/nginx/templates /etc/nginx/ssl/certs &amp;&amp; <span class="token operator">\\</span>
    * chown -R nginx:nginx /etc/nginx &amp;&amp; <span class="token operator">\\</span>
    * chmod -R 777 /etc/nginx/conf.d &amp;&amp; <span class="token operator">\\</span>
    sed -i <span class="token string">&#39;s/user  nginx;/#user  nginx;/g&#39;</span> /etc/nginx/nginx.conf &amp;&amp; <span class="token operator">\\</span>
    sed -i <span class="token string">&#39;s/listen       80;/listen       1080;/g&#39;</span> /etc/nginx/conf.d/default.conf </span>

<span class="token instruction"><span class="token keyword">USER</span> nginx</span>

<span class="token instruction"><span class="token keyword">EXPOSE</span> 1080</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,18);function m(d,b){const a=p("ExternalLinkIcon");return t(),o("div",null,[r,n("p",null,[n("a",u,[i("nginx的官方镜像Dockerfile"),l(a)])]),k])}const g=e(c,[["render",m],["__file","index.html.vue"]]);export{g as default};
