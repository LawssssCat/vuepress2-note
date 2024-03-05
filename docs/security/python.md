---
title: Python 安全笔记
tags:
  - python
---

相比其他语言，Python 丰富的的库几乎可以覆盖安全研究的方方面面，例如：

+ Scapy 库可以很方便地实现跨平台的网络嗅探、网络发包等需求
+ PyPDF 文档分析工具提供强大的 PDF 格式解析功能，这些功能对 PDF 格式的 Fuzz 测试、PDF 0day 分析、PDF Exploit 的编写起到极大帮助
+ IDA 分析
+ 代码审计
+ 在 Exploit Safari 中，堆布局时非常关键的一环，lldb 提供的 Python 接口可以很方便地对 WebKit 对象进行分析，对每个 WebKit 对象大小以及快速发现对象的可利用特性2，对最终编写出完整的攻击代码了决定性的作用。

todo IDAPython/IDC/Immunity Debugger/Valatility —— 纯Python打造的计算机内存取证分析工具

```bash
easy_install pyPDF python-nmap pygeoip mechanize BeautifulSoup4
# 与蓝牙相关的库
apt-get install python-bluez bluetooth python-obexftp
```

## nmap

Python-nmap 是一个 Python 模块，用于与 Nmap 安全扫描器进行交互。它可以帮助您编写 Python 脚本来执行 Nmap 扫描，并从扫描结果中提取信息。

官网： <https://xael.org/pages/python-nmap-en.html>

```bash
# deprecate
wget https://xael.org/pages/python-nmap-0.7.1.tar.gz -O nmap.tar.gz
tar -xzf nmap.tar.gz
cd python-nmap-0.7.1/
python3 setup.py install
# or
easy_install python-nmap

# recommend
pip install python-nmap
```
