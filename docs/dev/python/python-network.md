---
title: Python 网络编程
---

## 抓取网络数据

不管是半结构化数据（HTML）还是结构化数据（JSON、XML），通过解析网站提供的这些数据可以获取更多的信息。比如，通过 USGS 地震观测数据网站（<https://eqrthquake.usgs.gov/earthquakes/>）可以以视觉的方式看到全球地震相关信息，同时也能以不同的格式提取这些数据。

```py
# 解析url
from urllib.parse import urlparse
uc = urlparse("https://www.baidu.com")
print(uc) # ParseResult(scheme='https', netloc='www.baidu.com', path='', params='', query='', fragment='')

# 发送请求
import requests
url = 'https://www.baidu.com'
# html = requests.get(url).text # 乱码，默认GBK解析？
html = requests.get(url).content.decode('utf-8')
print(type(html)) # <class 'str'>
print(html)
if "百度" in html:
    print("包含关键字“百度”") # 打印

# 正则表达式
import requests, re
regex = r"([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)" # 邮箱
emails = re.findall(regex, html) # 获取返回内容中的所有邮箱
```

上面通过字符串匹配的方式提取到网页信息，但是不精确。需要精确解析网页内容就需要解析网页结构。
BeautifulSoup 是一款解析网页结构的项目产品。官网地址 <https://www.crummy.com/software/BeautifulSoup/>。

```bash
pip install beautifulsoup4
```

```py
from bs4 import BeautifulSoup
import requests

url = 'https://www.baidu.com'
html = requests.get(url).content.decode('utf-8')

# 解析网页标签
sp = BeautifulSoup(html, 'html.parser')

# 获取所有链接
links = sp.find_all('a')
for l in links:
    print(type(l), l)
# <class 'bs4.element.Tag'> <a class="mnav" href="http://news.baidu.com" name="tj_trnews">新闻</a>
# <class 'bs4.element.Tag'> <a class="mnav" href="https://www.hao123.com" name="tj_trhao123">hao123</a>
# <class 'bs4.element.Tag'> <a class="mnav" href="http://map.baidu.com" name="tj_trmap">地图</a>
# <class 'bs4.element.Tag'> <a class="mnav" href="http://v.baidu.com" name="tj_trvideo">视频</a>
# <class 'bs4.element.Tag'> <a class="mnav" href="http://tieba.baidu.com" name="tj_trtieba">贴吧</a>
# <class 'bs4.element.Tag'> <a class="lb" href="http://www.baidu.com/bdorz/login.gif?login&amp;tpl=mn&amp;u=http%3A%2F%2Fwww.baidu.com%2f%3fbdorz_come%3d1" name="tj_login">登录</a>
# <class 'bs4.element.Tag'> <a class="bri" href="//www.baidu.com/more/" name="tj_briicon" style="display: block;">更多产品</a>
# <class 'bs4.element.Tag'> <a href="http://home.baidu.com">关于百度</a>
# <class 'bs4.element.Tag'> <a href="http://ir.baidu.com">About Baidu</a>
# <class 'bs4.element.Tag'> <a href="http://www.baidu.com/duty/">使用百度前必读</a>
# <class 'bs4.element.Tag'> <a class="cp-feedback" href="http://jianyi.baidu.com/">意见反馈</a>
print(links[0].contents) # ['新闻']
print(links[0].get('href')) # http://news.baidu.com
```

> DEMO: 拉取网站图片
> 
> ::: details
> @[code](@code/python/network/download-image.py)
> 
> ```bash
> $ xxxxxx\vuepress2-note\code\demo-python\network\download-image.py https://www.baidu.com 
> Downloading: https://www.baidu.com/img/bd_logo1.png
> Downloaded: https://www.baidu.com/img/bd_logo1.png
> Downloading: http://www.baidu.com/bdorz/login.gif?login&tpl=mn&u=http%3A%2F%2Fwww.baidu.com%2f%3fbdorz_come%3d1
> Downloaded: http://www.baidu.com/bdorz/login.gif?login&tpl=mn&u=http%3A%2F%2Fwww.baidu.com%2f%3fbdorz_come%3d1
> Downloading: https://www.baidu.com/img/gs.gif
> Downloaded: https://www.baidu.com/img/gs.gif
>
> $ tree xxxxxx\vuepress2-note\code\demo-python\network\target 
> target
>  └── www.baidu.com
>      ├── bd_logo1.png
>      ├── gs.gif
>      └── login.gif
> ```
> :::

检测页面内容是否更新

```py
import requests
import hashlib
r = requests.get('http://target.web.site.page')
sig = hashlib.md5(r.text.encode('utf-8')).hexdigets()
```
