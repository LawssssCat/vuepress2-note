---
title: Podman 使用笔记
tags:
  - podman
  - docker
---

## 使用Dockerfile构建Alpine镜像

参考： 《使用podman进行Dockerfile创建Alpine镜像》 https://www.cnblogs.com/nie123/p/16644467.html

```bash
podman pull alpine
# 启动并进入容器
podman run -it alpine
```

```bash
# 改镜像源
sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories 
apk update

# 用户
adduser -SHs /sbin/nologin apache
```

todo

## 不退出问题

参考： 《前后端分离，如何在前端项目中动态插入后端API基地址？（in docker）》 https://www.cnblogs.com/JulianHuang/p/13032240.html \
参考： 《nginx -g "daemon off;" 你学废了吗？》 https://www.cnblogs.com/JulianHuang/p/15753732.html

## 镜像原理

参考： 《docker 如何导出某个镜像增量部分》 https://blog.csdn.net/qq_36120342/article/details/119937352 \
参考： 《Docker镜像解析获取Dockerfile文件》 https://cloud.tencent.com/developer/article/2328049

观察镜像内部，由多个layer组成

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

加上 `--no-trunc` 参数可查看全部命令

```bash
podman history nginx --no-trunc
```

使用 `inspect` 命令来查看镜像的详细信息，通过 `--format` 参数可自行定义输出信息，获取镜像的配置信息。

```bash
podman inspect --format='{{json.config}}' nginx
```

## podman pod

todo podman pod

参考 https://ithelp.ithome.com.tw/articles/10239822

Pod 概念由 Kubernetes 引入。一个 Pod 管理多个容器，其中所有容器共享网络，可以轻松通过 localhost 相互通信，而无需设定任何额外的服务端口。

```bash
# 创建Pod
podman pod create -n my-app -p 8081:80
# 添加容器
podman run -dt --pod my-app -v /opt/http:/usr/share/nginx/html:ro --security-opt="seccomp=unconfined" --name hello-nginx nginx
# 查看
podman pod ps
# 开始/停止
podman pod start my-app
podman pod stop my-app
```

## podman play

参考 https://zhuanlan.zhihu.com/p/398928004

todo podman play kube

按照 yaml 配置运行 Pod

```bash
podman play kube ./my-app.yaml
```

`my-app.yaml`

```yaml
# my-app.yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-app
spec:
  containers:
  - name: ng1
    image: nginx
    ports:
    # nodePort       在Pod外部访问
    # port           在Pod内部访问
    # targetPort     是pod上的端口。从port/nodePort上来的数据，经过kube-proxy流入到后端pod的targetPort上，最后进入容器。
    # containerPort  在pod控制器中定义的、pod中的容器需要暴露的端口。该端口只是起到specification作用，哪怕不在yaml中定义，也是可以通过nodePort->targetPort的流向(外部)或者port->targetPort流向(内部)进行访问。
    # 更多： 《循序渐进地学习kubernetes网络》 https://zhuanlan.zhihu.com/p/563148579
      - containerPort: 8001
        hostPort: 8001
        protocol: TCP
    volumeMounts:
      - name: html1-volume
        mountPath: /opt/html
      - name: config1-volume
        mountPath: /etc/nginx/conf.d
  - name: ng2
    image: nginx
    ports:
      - containerPort: 8002
        hostPort: 8002
        protocol: TCP
    volumeMounts:
      - name: html2-volume
        mountPath: /opt/html
      - name: config2-volume
        mountPath: /etc/nginx/conf.d
  volumes:
    - name: html1-volume
      hostPath:
        path: /opt/myapp/html1
        type: Directory
    - name: config1-volume
      hostPath:
        path: /opt/myapp/config1
        type: Directory
    - name: html2-volume
      hostPath:
        path: /opt/myapp/html2
        type: Directory
    - name: config2-volume
      hostPath:
        path: /opt/myapp/config2
        type: Directory
```

::: warning
Pod 里面所有容器共享 127.0.0.1 IP, 所以它们必须设定不同的服务端口．否则容器启动失败。
:::
