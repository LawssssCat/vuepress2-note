---
title: Python 网络编程
---

## 套接字（socket）

@[code](@code/python/security/vulnerable-scanning.py)

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

## 操作浏览器

request 只能获取 html。但是有的操作需要解析 html 并执行 js 脚本。

解决上述问题需要 selenium 模块，它可以直接操作系统中的浏览器，就好像人工在操作一样！

```py
pip install selenium
```

::: tip
如果是 firefox 浏览器，可以下载 firebug 附加组件。它能帮我们更加方便地分析网页！
:::

```py
from selenium import webdriver
web = webdriver.Firefox()
web.get('https://www.sina.com.cn')
web.quit()
```

webdriver 方法 | 说明
--- | ---
`get_window_position()` | 获取窗口位置（左上角）
`set_window_position(x,y)` | 设置窗口位置（左上角）
`maximize_window()`
`get_window_size()`
`set_window_size(x,y)`
`refresh()`
`back()` | 返回上一页
`forward()` | 前往下一页
`close()` | 关闭窗口
`quit()` | 结束浏览器的执行
`get(url)` | 浏览这个网页
`save_screenshot(filename)` | 以 png 格式保存当前浏览器屏幕截图（存储完整的页面截图，不受窗口大小限制）
`current_url`
`page_source`
`title`

```py
# _*_ coding: utf-8 _*_
# 下载页面截图

from selenium import webdriver
urls = [
    "https://www.sina.com.cn",
    "https://www.sohu.com",
    "https://www.eastmoney.com",
    "https://www.newone.com.cn",
    "https://www.baidu.com"
]
web = webdriver.Firefox()
web.set_window_position(0,0)
web.set_window_size(800,600) # 窗口大小不限制截图大小
i = 0
for url in urls:
    web.get(url)
    web.save_screenshot("webpage{}.png".format(i))
    i = i + 1
web.quit()
```

不需要 BeautifulSoup， Selenium 的 webdriver 本身就能检索页面的元素

webdirver 方法 | 说明
--- | ---
`find_element(by, value)` | 使用 by 方法查询第一个符合 value 的元素
`find_element_by_class_name(name)`
`find_element_by_css_selector(selector)`
`find_element_by_id(id)`
`find_element_by_link_text(text)`
`find_element_by_name(name)`
`find_element_by_tag_name(name)`

对于找到的页面元素，有以下方法

页面元素方法 | 说明
--- | ---
`clear()` | 清除内容 content
`click()` |
`is_display()` | 是否可见状态
`is_enabled()` | 是否可用状态
`is_selected()` | 是否被选中的状态
`send_keys(value)` | 对此元素送出一串字符，也可以是特定的按键

```py
# _*_ coding: utf-8 _*_
# 模拟登录

from selenium import webdriver

web = webdriver.Firefox()
web.get("https://www.jd.com")
web.find_element_by_id('ttbar-login').click()
web.find_element_by_name('loginname').clear()
web.find_element_by_name('loginname').send_keys('your account')
web.find_element_by_name('nloginpwd').clear()
web.find_element_by_name('nloginpwd').send_keys('you password')
web.find_element_by_id('loginsubmit').click()
```
