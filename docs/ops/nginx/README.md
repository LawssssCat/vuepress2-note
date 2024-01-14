---
title: Nginx 使用笔记
---

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
