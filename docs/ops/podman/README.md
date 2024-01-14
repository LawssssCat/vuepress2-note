---
title: Podman 使用笔记
---

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
