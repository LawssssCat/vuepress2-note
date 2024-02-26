from urllib.parse import urlparse
uc = urlparse("https://www.baidu.com")
print(uc) # ParseResult(scheme='https', netloc='www.baidu.com', path='', params='', query='', fragment='')

import requests
url = 'https://www.baidu.com'
# html = requests.get(url).text # 乱码，默认GBK解析？
r = requests.get(url)
print(r.encoding)
print(r.apparent_encoding) # 网页编码
html = r.content.decode('utf-8')
print(type(html)) # <class 'str'>
print(html)
if "百度" in html:
    print("包含关键字“百度”") # 打印

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
print(links[0].contents)
print(links[0].get('href'))
