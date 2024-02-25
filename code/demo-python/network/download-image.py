# _*_ coding: utf-8 _*_

from functools import reduce
import pathlib
from bs4 import BeautifulSoup
import requests
import sys, os
from urllib.parse import urlparse
from urllib.request import urlopen

if len(sys.argv) < 2:
    print("请传入 url 参数")
    exit(1)

url = sys.argv[1]
domain = "{}://{}".format(urlparse(url).scheme, urlparse(url).hostname)
r = requests.get(url)
r.encoding = r.apparent_encoding # 网页编码
html = r.text

sp = BeautifulSoup(html, 'html.parser')
all_links = sp.find_all(['a', 'img'])

for link in all_links:
    src = link.get('src')
    href = link.get('href')
    targets = [src, href]
    for t in targets:
        if t is None or reduce(lambda s, i: s and i not in t, ('.jpg', '.png', '.gif'), True):
            continue
        if t.startswith('http'):
            full_path = t
        elif t.startswith('//'):
            full_path = "https:" + t
        else:
            full_path = domain + t
        print("Downloading: " + full_path)
        image_dir = os.path.join(os.path.dirname(__file__), "target", url.split('/')[-1])
        if not os.path.exists(image_dir):
            pathlib.Path(image_dir).mkdir(parents=True, exist_ok=True)
        filename = (lambda s: s.path[s.path.rfind('/')+1:])(urlparse(full_path))
        image = urlopen(full_path)
        fp = open(os.path.join(image_dir, filename), 'wb')
        fp.write(image.read())
        fp.close()
        print("Downloaded: " + full_path)
