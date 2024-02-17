---
title: Python 使用笔记
---

todo 《Python 程序设计入门到实战》 by 何敏煌
todo 《Python 网络编程攻略》 by Dr.M.O.Faruque Sarker
todo 《Python 绝技 —— 运用 Python 成为顶级黑客》 by TJ.O' Connor
todo 《完全学会 Git · Github · Git Server 的 24 堂课》 by 孙宏明

官网： https://www.python.org/

```bash
$ python -c 'print("hello world")'
hello world
```

## 环境配置

### 编译

源码地址： https://www.python.org/downloads/source/

参考： https://www.cnblogs.com/minseo/p/17817739.html

```bash
$ cat /etc/os-release
NAME="Fedora Linux"
VERSION="39 (Workstation Edition)"
ID=fedora
VERSION_ID=39
VERSION_CODENAME=""
PLATFORM_ID="platform:f39"
PRETTY_NAME="Fedora Linux 39 (Workstation Edition)"
ANSI_COLOR="0;38;2;60;110;180"
LOGO=fedora-logo-icon
CPE_NAME="cpe:/o:fedoraproject:fedora:39"
DEFAULT_HOSTNAME="fedora"
HOME_URL="https://fedoraproject.org/"
DOCUMENTATION_URL="https://docs.fedoraproject.org/en-US/fedora/f39/system-administrators-guide/"
SUPPORT_URL="https://ask.fedoraproject.org/"
BUG_REPORT_URL="https://bugzilla.redhat.com/"
REDHAT_BUGZILLA_PRODUCT="Fedora"
REDHAT_BUGZILLA_PRODUCT_VERSION=39
REDHAT_SUPPORT_PRODUCT="Fedora"
REDHAT_SUPPORT_PRODUCT_VERSION=39
SUPPORT_END=2024-05-14
VARIANT="Workstation Edition"
VARIANT_ID=workstation
$ uname -a
Linux fedora 6.5.6-300.fc39.x86_64 #1 SMP PREEMPT_DYNAMIC Fri Oct  6 19:57:21 UTC 2023 x86_64 GNU/Linux
```

```bash
wget https://www.python.org/ftp/python/3.12.1/Python-3.12.1.tgz

# 安装依赖
yum -y install make gcc gcc-c++
# 解压
tar -xf Python-3.11.6.tgz 
# 编译安装
# 默认在 /usr/local | 通过 ./configure --prefix=/usr/local/python3 指定安装目录
./configure
make && make install
```

```bash
$ python3 --version
Python 3.11.5
```

### （可选）创建虚拟环境

参考：

+ 官方 - https://docs.python.org/3/library/venv.html

```bash
python3 -m venv tutorial_env
source tutorial_env/bin/activate
```

### 安装 pip 安装器

::: tip
Python 2.7.9 + 或 Python 3.4+ 以上版本都自带 pip 工具
:::

参考： 

+ 官方 - https://docs.python.org/zh-cn/3.11/library/ensurepip.html
+ [安装pip的三种方法](https://www.jianshu.com/p/96bfccc7c680)

```bash
python -m ensurepip
```

在默认情况下，pip 会被安装到当前虚拟环境（如果激活了虚拟环境）或系统的包目录（如果未激活虚拟环境）。 安装位置可通过两个额外的命令行选项来控制:

+ `--rootdir`: 相对于给定的根目录而不是当前已激活虚拟环境（如果存在）的根目录或当前 Python 安装版的默认根目录来安装 pip。
+ `--user`: 将 pip 安装到用户包目录而不是全局安装到当前 Python 安装版（此选项不允许在已激活虚拟环境中使用）。


::: danger
旧版安装方式

```bash
$ curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py   # 下载安装脚本
$ sudo python get-pip.py    # 运行安装脚本
```
:::

基本使用

```bash
python -m pip --version
pip --help
pip install -U pip # 升级

pip install SomePackage              # 最新版本
pip install SomePackage==1.0.4       # 指定版本
pip install 'SomePackage>=1.0.4'     # 最小版本
pip install --upgrade SomePackage # 升级
pip uninstall SomePackage # 卸载

pip search SomePackage # 搜索
pip show # 安装包信息
pip show -f SomePackage # 安装包详情
pip list # 列出已安装包
pip list -o # 列出可升级安装包
```

更换镜像源

```bash
# 临时使用
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple some-package
# 永久使用
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

### 安装 IDE PyCharm

todo ja-netfilter https://zhaiblog.cn/169.html

## 基础

#### 注释

```py
# aaa
```

#### 字符串

```py
a = "xxx"
b = 'xxx'
c = "xx" \
    "xx"
# 多行
d = """
xxxxxx
bbbbb
"""
```

##### 字符串运算

```py
name = "hello world!"

# 切片
print(name[0:3]) # hel
print(name[:3]) # hel
print(name[:3]) # hel
print(name[-2]) # d!
print(name[-2:]) # d!
print(name[-2:-1]) # d
# 开始:结尾:步长
print(name[0:6:2]) # hlo
print(name[0::2]) # hlowrd 
print(name[0:len(name):2]) # hlowrd 
# 反转
print(name[::-1]) # !dlrow olleh

# 分割
print("hello world!".split('o')) # ['hell', ' w', 'rld!']

# 拼接
print('hello'+' '+'world')
print(','.join(('hello', 'world','python')))
print('0'*3) # 000

# 定位
# "hello world!".index("x") # 找不到时报错 —— 不推荐，改为 find 方法❗
print('hello world!'.find('o')) # 4
print('hello world!'.find('o', 5,10)) # 7
print('hello world!'.find('z')) # -1 —— 找不到！
print('hello world!'.count('0')) # 2
# 类似方法还有： startwith、endwith

# 替换
print("hello world!".replace('o', 'Z'))    # hellZ wZrld!
print("hello world!".replace('o', 'Z', 1)) # hellZ world!
```

##### 格式化输出

::: tip
参考： 

+ https://blog.csdn.net/moqisaonianqiong/article/details/114674204
:::

```py
# 大写/小写
s = "Aa"
s.upper()
s.lower()

# 左右优化
print("v".center(7, "*")) # ***v*** —— 居中，填充
"    v   ".strip() # trim —— 清空左右空格
"666    v   ".strip('6') # trim 6
# 类似还有 lstrip、rstrip
# 另外，后面提到的 format 函数可以实现同样的功能！

"""
传统的格式化输出方法： %
%s: 为字符占位，任意类型
%d: 为整数占位
%f: 为浮点数占位
"""
s1 = '你好，我叫%s！！！今年%d岁！'%('Eason', 18.5) # 18.5 -> 18

"""
format函数
"""
print("你好，我叫{}，今年{}，性别{}".format('鸡哥','练习两年半','男'))    # 你好，我叫鸡哥，今年练习两年半，性别男
print("你好，我叫{0}，今年{2}，性别{1}".format('鸡哥','练习两年半','男')) # 你好，我叫鸡哥，今年男，性别练习两年半

"""
语法糖：
F表达式（F、f均可，python3.6以上支持）
"""
name="eason"
s3=F'你好，我叫{name}！！！'
print(s3)

######################
# 格式化输出格式
######################

# 指定小数点后几位 —— 四舍五入！
print("橘子： {:.2f}元/斤".format(3.6666)) # 橘子： 3.67元/斤

# 百分比输出
percent=0.472352
print(f"占比： {percent:.2%}") # 占比： 47.23%

# 对齐/居中
s = "hello"
print("{0:*<20}".format(s)) # hello*************** —— 左对齐
print("{0:*>20}".format(s)) # ***************hello —— 右对齐
print("{0:*^20}".format(s)) # *******hello******** —— 居中

# 数字格式
print("{0:,}".format(123456789.123456)) # 123,456,789.123456 —— 千位分隔符
print("{0:,.2f}".format(123456789.123456)) # 123,456,789.12 —— 浮点数小数部分的精度
print("{0:,.2}".format(123456789.123456)) # 1.2e+08 —— 最大显示长度
print("{0:.2}".format("123.456")) # 12

# 类型：
"""
整数：
s —— 字符串
b —— 二进制
c —— Unicode字符
d —— 十进制
o —— 八进制
x or X —— 十六进制
"""
b = 1024
print("{0:b}".format(b)) # 10000000000
print("{0:c}".format(b)) # Ѐ
print("{0:d}".format(b)) # 1024
print("{0:o}".format(b)) # 2000
print("{0:x}".format(b)) # 400
print("{0:X}".format(b)) # 400
"""
浮点数：
f
%
e or E —— 科学计数法
g or G —— 在 e / f 中切换
"""
b = 10000000003.1415926
print("{0:.2f}".format(b)) # 10000000003.14
print("{0:.2%}".format(b)) # 1000000000314.16%
print("{0:.2e}".format(b)) # 1.00e+10
print("{0:.2E}".format(b)) # 1.00E+10
```

##### 编码/解码

```py
str.encode(encoding='utf-8',errors='strict/ignore/replace')
bytes.decode(encoding='utf-8',errors='strict/ignore/replace')
# strict —— 抛出报错
# ignore —— 忽略
# replace —— 错误解析换成 ? 问号

# 编码
s = "你好".encode('gbk', errors="ignore")
print(s) # b'\xc4\xe3\xba\xc3'

# 解码
b = bytes.decode(s, 'gbk')
print(b) # 你好
```

##### 数据验证

```py
"""
str.isdigit() —— 所有字符都是数字（阿拉伯数字，1=True，一=False）
str.isnumeric() —— 所有字符都是数字（1、一、壹、Ⅰ（罗马数字）、①=True，one（不是一个字符）=False）
str.isalpha() —— 所有字符都是字母（包含中文字符）
str.isalnum() —— 所有字符都是数字或者字母（包含中文字符）
str.islower() —— 所有字符都是小写
str.isupper() —— 所有字符都是大写
str.istitle() —— 所有字符都是首字母大写
str.isspace() —— 所有字符都是空白字符（\n,\t,...）
"""
```

##### 正则表达式

正则表达式是一个特殊的字符序列，它能帮助用户便捷地检查一个字符串是否符合某种规则/模式

```py
# 位置
$
^

# 字符
. —— 任意
\w —— 字母、数字、下划线
\W —— 非\w
\s —— 空白字符，如 \t
\S —— 非\s
\b —— 空格
\d —— 任意十进制

# 次数
? —— 0~1
+ —— 1~n
* —— 0~n
{n} —— n
{n,} —— n~∞
{n,m} —— n~m

# 分组
() —— 分组
| —— 或者
[] —— 包含其一
[^] —— 排除全部
[\u4e00-\u9fa5] —— 任意一个汉字
```

re模块： 用于实现正则表达式的操作。内置模块，不需要安装，导入即可使用。

```py
import re

#######################
# 查找
#######################

# re.match(pattern,string,flags=0) —— 从字符串开始位置进行匹配。如果匹配成功，结果为Match对象；否则结果为None。
pattern = "python\d\.\d+"
match = re.match(pattern,"Python3.10 ever day!",re.IGNORECASE)
print(match) # <re.Match object; span=(0, 10), match='Python3.10'>

print(match.start()) # 0
print(match.end()) # 10
print(match.span()) # (0, 10)
print(match.group()) # Python3.10
print(match.string) # Python3.10 ever day!

# re.search(pattern,string,flags=0) —— 用于在整个字符串中搜索第一个匹配的值。如果匹配成功，返回Match对象；否则返回None
pattern = "python\d\.\d+"
search = re.search(pattern,"I study Python3.10 ever day!",re.IGNORECASE)
print(search) # <re.Match object; span=(8, 18), match='Python3.10'>

# re.findall(pattern,string,flags=0) —— 用于在整个字符串搜索所有符合正则表达式的值。返回list

#######################
# 加工
#######################
# re.sub(pattern,repl,string,count,flags=0) —— 实现字符串的替换
# re.split(pattern,string,maxsplit,flags=0)
```

#### 标准输入/输出

```py
print(1)
print("1")
# 转义符
\n —— 换行
\r —— 清空行
\t
\b
\\
# 关闭转义符
print(r"xxx")
print(R"xxx")


name = input("请输入：")
```

#### 变量定义/运算

```py
a = 1
ddd = a + \
      b + \
      c 

# 约定： 大写为常量
PI = 3.14


# 整数 Int
a = 100
a = +100
a = -100

# 浮点 float
a = 99.99


# 布尔 boolean
bb = True # 值 1
cc = False # 值 0


# 运算
print(4+5) # 9
print(4-5) # -1
print(4*5) # 20 
print(4/5) # 0.8
print(4//5) # 0 —— 向下取整
print(7 % 3) # 1 —— 取余
print(2 ** 10) # 1024 —— 乘方

print(1+True) # 2
print(1+False) # 1

# 判断
print(6>3) # True
# > 大于
# >= 大于等于
# < 小于
# <= 小于等于
# != 不等于
# == 等于

# 逻辑运算
print(True and True) # True
print(not True) # False
a = 3>1 or 2<1
# and
# or
# not
```

#### 列表（List）

```py
# 不要求统一数据类型
list = [1,2,3,"hello world!",[1,2,3,4]]

print(list[0]) # 1
print(list[4][3]) # 4
```

运算

```py
# 加法
list_1 = [1,2,3]
list_2 = [4,2,3]
print(list_1 + list_2) # [1, 2, 3, 4, 2, 3]

# 乘法
list_1 = [1,2,3]
print(list_1 * 3) # [1, 2, 3, 1, 2, 3, 1, 2, 3]

# 提取
list_1 = [1,2,3]
print(list_1[1:2]) # [2]

# 反转
list_1 = [1,2,3]
print(list_1[::-1]) # [3, 2, 1]
print(list_1.reverse()) # None
print(list_1) # [3, 2, 1]

# 排序
# ASCII 编码排序： 0~9<A~Z<a~z
list_1 = ["hello", "world", "hw", "python"]
list_1.sort()
print(list_1) # ['hello', 'hw', 'python', 'world']
list_1.sort(reverse=True)
print(list_1) # ['world', 'python', 'hw', 'hello']

# 计数
list_1 = ["hello", "world", "hw", "python", "hello"]
print(list_1.count("hello")) # 2
```

增加/删除

```py
# append —— 加到最后
a = [1,2,3]
a.append(4)
print(a)

# extend —— 添加（多个）到最后
a = [1,2,3]
a.extend([4,5,6])
print(a) # [1, 2, 3, 4, 5, 6]
# 与 [1,2,3] + [4,5,6] 效果类似

# insert
a = [1,2,3]
a.insert(2,99)
print(a) # [1, 2, 99, 3]

# pop —— 弹出最后
a = [1,2,3]
print(a.pop()) # 3
print(a) # [1, 2]

# del —— 删除关键字 （在计算机内存层面删除）
a = [1,2,3]
del a[1] # 删除元素
del a # 删除数组

# remove —— 删除匹配的
a = [1,2,3,1]
print(a.remove(1)) # None
print(a) # [2, 3, 1]

# clear
a.clear()
```

定位

```py
a = [1,2,99,3,4]
print(a.index(99)) # 2
```

复制

```py
a = [1,2,3]
b = a.copy()
```

#### 元组（Tuple）

元组与列表类似，不同之处在于元组的元素不能修改。

```py
# list
a = [1,2,99,3,4]
# tuple
a = (1,2,99,3,4)

# 报错：修改元素
a = (1,2,3,4)
a[1] = 99

Traceback (most recent call last):
  File "xxxx\vuepress2-note\code\demo-python\list-test.py", line 49, in <module>
    a[1] = 99
    ~^^^
TypeError: 'tuple' object does not support item assignment

# 拼接 —— 不允许修改，但是其他可行
a = (1,2,3)
b = (4,[1,2])
print(a + b) # (1, 2, 3, 4, [1, 2])
```

坑： 只有一个值时，会被识别为普通值，而不是元组

```py
print((1)) # 1
print((1,)) # (1,) —— 单值时，元组的写法❗
print((1,2)) # (1, 2)
```

#### 集合（Set）

集合是无序的，元素唯一的！ —— 集合用于去重

```py
print(set("123321")) # {'1', '3', '2'}
print(set([1,2,3,3,2,1])) # {1, 2, 3}
d = {
  "年龄": 18,
  "名字": "橘子"
}
print(set(d)) # {'名字', '年龄'}

# 语法糖
# tips： 使用这种形式时，不能传入列表/字典
print({1,2,3,3,2,1}) # {1, 2, 3}
```

操作

```py
# add
a = {1,2,3}
print(a.add(6)) # None
print(a.add(2)) # None
print(a) # {1, 2, 3, 6}

# update —— 合并两个集合
a = {1,2,3}
b = {3,4,5}
print(a.update(b)) # None
print(a) # {1, 2, 3, 4, 5}

# remove —— 删除，没有就报错
# discard —— 删除，没有就忽略
# pop —— 随机删除

# 交集/并集
a = {1,2,3}
b = {3,4,5}
# & —— 交集
print(a & b) # {3}
# | —— 并集
print(a | b) # {1, 2, 3, 4, 5}
```

#### 字典（Dict）

字典是一种映射类型，它的元素是键值对。
字典的键必须为不可变类型，且不能重复。

```py
d = {
  "年龄": 18,
  "名字": "橘子",
  1: 18,
  (1,2,3): "123"
}
print(d) # {'年龄': 18, '名字': '橘子', 1: 18, (1, 2, 3): '123'}

# 另一种定义方式
d = dict((["年龄", 18], ["姓名", "橘子"], [1, 18], [(1,2,3), "123"]))
print(d) # {'年龄': 18, '姓名': '橘子', 1: 18, (1, 2, 3): '123'}
```

操作

```py
# 增加
d = {"name": "橘子"}
d["技能"] = ("python", "java", "js")
print(d) # {'name': '橘子', '技能': ('python', 'java', 'js')}

# 删除
d = {"name": "橘子", "技能": ("python", "java", "js")}
del d['技能']
print(d) # {'name': '橘子'}
# pop —— 从字典中移除指定键，并返回该键所对应的值
d = {"name": "橘子", "age": 18}
print("pop: " + str(d.pop("age"))) # pop: 18
print("pop: " + str(d.pop("age", None))) # pop: None
# popitem —— 用于从字典中删除最后一项，并以元组形式返回该项对应的键值
obj = {
  "name": "橘子",
  "age": 18
}
item = obj.popitem()
print(item) # ('age', 18) —— 删除项
print(obj) # {'name': '橘子'} —— 剩余字典内容

# setdefault —— 设置键的默认值。若字典中该键已经存在，则忽略设置；若不存在，则添加键、值；
obj = {
  "name": "橘子",
  "age": 18
}
obj.setdefault("age", 35)
obj.setdefault("技能", ("python",))
print(obj) # {'name': '橘子', 'age': 18, '技能': 'python'}
# update —— 更新值
obj = {
  "name": "橘子",
  "age": 18
}
obj.update({"age": 35, "skill": ("python", "java")})
print(obj) # {'name': '橘子', 'age': 35, 'skill': ('python', 'java')}

# 查 —— 不安全，会报错
print(d["name"]) # 橘子
# print(d["无"]) # 报错： KeyError: '无'
# 查 —— 安全，不报错，且能设定默认值
print(d.get("无")) # None
print(d.get("无", "没有啦~")) # 没有啦~

# 遍历字典
d = {"name": "橘子", "age": 18}
# 获取所有键值（key）
print(d.keys()) # dict_keys(['name', 'age'])
# 获取所有键值对（item）
print(d.keys()) # dict_items([('name', '橘子'), ('age', 18)])
# 获取所有值（value）
print(d.values()) # dict_values(['橘子', 18])

# 清空（clear） —— 将字典清空
# 复制（copy） —— 创建字典的副本，修改原字典对象，不会影响其副本

# fromkeys —— 创建一个新字典，默认值 None。注意：并不会看方法对象的内容。
d = {"name": "橘子", "age": 18}
print(d.fromkeys(("name", "skill"))) # {'name': None, 'skill': None}
print({}.fromkeys(("name", "skill"))) # {'name': None, 'skill': None}
# 可以设定统一的默认值
print({}.fromkeys(("name", "skill"), 12)) # {'name': 12, 'skill': 12}
# ❗但是需要注意，值为对象类型时，指向同一个对象
obj = [1,2,3]
fromkeys = {}.fromkeys(("key1", "key2"), obj)
print(fromkeys) # {'key1': [1, 2, 3], 'key2': [1, 2, 3]}
obj.append(4)
print(fromkeys) # {'key1': [1, 2, 3, 4], 'key2': [1, 2, 3, 4]}
```

#### 关键字

```py
# 关键字
import keyword
print(keyword.kwlist) # 列出 python 所有关键字

a = None # 空值 / 内置函数返回值（默认为None）
```

#### 关键字： in

判断“集合”是否包含元素

```py
# in —— 判断对象是否在序列（列表/字符串/元组/字典）中
print("4" in "1234") # True
print(4 in (1,2,3,4)) # True
print("name" in {"name": "xxx"}) # True —— 判断 keys 集合，不判断 values 集合
# not in
print("4" not in "1234") # False
```

#### 关键字： is （有坑❗）

判断两个对象是否相同

```py
###############################
# 数字 / 【字符串】 / 【元组】 —— 所见即所得！
###############################

a = "111"
b = "222"
c = "111"

print(a is b) # False
print(a is c) # True —— 相当于 Equals ？

###############################
# 列表 / 字典 / 集合 —— 对象比较
###############################

# 对象比较 False❗

print([1] is [1]) # False —— 列表
print({"name":"haha"} is {"name":"haha"}) # False —— 字典
print({1} is {1}) # False —— 集合

# 对象指向一致时，才是 True❗
a = {}
b = a
print(a is b) # True
```

#### 数据类型

```py
print(type(None)) # <class 'NoneType'>
print(type(True)) # <class 'bool'>
print(type(1)) # <class 'int'>
print(type(1.1)) # <class 'float'>
print(type('1')) # <class 'str'>
print(type((1,))) # <class 'tuple'>
print(type({1})) # <class 'set'>
print(type({"a":1})) # <class 'dict'>
```

#### 数据类型转换

由于不同的数据类型之间时不能进行运算的，所以我们需要数据类型的转换。

数据类型转换有两种：

1. 自动类型转换 —— Python 在计算中会自动按不同类型的数据转换为同类型的数据（根据优先级）后再进行运算 —— 不推荐！会出现奇奇怪怪的问题；
1. 强制类型转换 —— 开发者显式地进行数据转换 —— 推荐！诸多开发规范甚至要求在相应场景进行强制类型转换；

##### 自动类型转换

```py
# 精度等级： 布尔 < 整型 < 浮点型

a = True
b = 1
c = 3.14

print(a + b) # 2
print(b + c) # 4.140000000000001 —— 不推荐！

from decimal import Decimal
a = Decimal('1')
b = Decimal('3.14')
print(a + b) # 4.14 —— 推荐！ python 浮点数计算方式！
```

##### 强制转换

```py
#########################
# 字符串：
# 1. 所有类型都可以转化为字符串类型
#########################

# str() —— 把其他类型数据转化为字符串类型

#########################
# 数字类型： 
# 1. 数字类型之间可以相互转换
# 1. 只有字符串可以转换为数字类型
#########################

# int()
# float()

print(int("1")) # 1
# print(int("1.5")) # ValueError: invalid literal for int() with base 10: '1.5'
print(int(1.1)) # 1
print(int(1.5)) # 1 —— 向下取整！不是四舍五入！不是！
print(float(1)) # 1.0
print(float("1.5"))

#########################
# 布尔类型：
# 
# 转换结果有如下情况：
# 1. “集合”类型： 字符串、列表、元组、字典、集合
#     + 内容空 --> False
#     + 内容非空 --> True
# 1. 数字类型： int、float
#     + 0 --> False
#     + 非0 --> True
#########################

# bool()

print(bool("")) # False
print(bool(" ")) # True
print(bool([])) # False
print(bool([1])) # True
print(bool(())) # False
print(bool((0,))) # True
print(bool({})) # False
print(bool({"0":0})) # True
print(bool(set())) # False
print(bool(set([0]))) # True

print(bool(0)) # False
print(bool(1)) # True
print(bool(0.0)) # False
print(bool(0.1)) # True

#########################
# 列表类型：
# 1. 数字（int、float）类型不能转换为列表❌
# 1. 字符串（string）类型 —— 每个字符会被转换为列表元素
# 1. 元组（tuple）类型 —— 一比一对应
# 1. 字典（dict）类型 —— 保留键
# 1. 集合（set）类型 —— 一比一对应，但是无序
#########################

# list()

print(list("1234")) # ['1', '2', '3', '4']

#########################
# 元组类型： 同 list() ，但无法修改
#########################

# tuple()

#########################
# 集合类型： 同 list() ，但无序
#########################

# set()

#########################
# 字典类型： 
# 1. 数字（int、float）类型不能转换为字典❌
# 1. 字符串（string）类型不能转换为字典❌
# 1. 列表（list）、元组（tuple）类型 —— [(key,val),...] 形式
# 1. 集合（set）类型不能转换为字典❌
#########################

# dict()

print(dict([["k1","v1"], ["k2","v2"]])) # {'k1': 'v1', 'k2': 'v2'}
print(dict((["k1","v1"], ["k2","v2"]))) # {'k1': 'v1', 'k2': 'v2'}
print(dict((("k1","v1"), ["k2","v2"]))) # {'k1': 'v1', 'k2': 'v2'}
```

批量转换

```py
s = "1 2 3 4 5"
l = list(map(int, s.split()))
```

#### 数据类型判断

```py
# isinstance(对象, 对象类型)

print(isinstance(1, bool)) # False
print(isinstance(True, bool)) # True
print(isinstance(1, int)) # True
print(isinstance(1.1, int)) # False
print(isinstance(1.1, (int,float,bool))) # True
```

#### 关键字： if/elif/else —— 条件语句❗

```py
# 格式
if 2>1:
  print(123)
```

```py
a = int(input("输入你的成绩："))
if a<60:
  print("不及格！")
else:
  if a>=90:
    print("牛逼")
  elif a>=80:
    print("棒")
  else:
    print("及格")
```

#### 关键字： for —— 循环❗

```py
for i in "123":
  print(i)
for i in [1,2,3]:
  print(i)
for i in range(0,10):
  print(i)
for i in range(0,10,2): # 0 2 4 6 8
  print(i)
```

遍历数组

```py
list_1 = [1,2,3,4]
for i in range(len(list_1)):
  print(i, list_1[i])
```

遍历字典

```py
d = {
  "name": "oracle",
  "age": 18,
  "skill": ("python", "java")
}

'''
name oracle
age 18
skill ('python', 'java')
'''
for k in d:
    print(k, d[k])

"""
('name', 'oracle')
('age', 18)
('skill', ('python', 'java'))
"""
for i in d.items():
    print(i)
```

#### 关键字： while —— 循环❗

```py
i = 1
while i<100:
    i = i + 1
    print(i)
```

#### 关键字： break/continue

```py
for i in "python":
  if i == "t":
    break
  elif i == "n":
    continue
  print("当前的字符：", i)
```

#### 关键字： pass

空语句，用于一些语法上需要做什么，但程序不需要做做什么的场景。
使用 pass 保持程序结构的完整性。

```py
def abc(a, name="hel", *args, **kwargs):
  pass
```

#### 函数（Function）

关键字： def

```py
def say():
  print("hello world!")

say() # hello world!
```

参数定义

```py
# 默认参数
def abc(a=1,b=2,c=3):
  print(a+b+c)
abc() # 6
abc(100) # 105
abc(b=200) # 204

# 可变参数 —— 元组 args
def abc(a,*b):
  print(a,b)
abc(1) # 1 ()
abc(1,2,3) # 1 (2, 3)

# 可变参数 —— 字典 kwargs
def abc(a, **b):
  print(a,b)
abc(1) # 1 {}
abc(1,x=2,y=3) # 1 {'x': 2, 'y': 3}

# 变量名参数 —— * 号后的参数值必须通过变量名传入
def abc(a,*,b,c):
  print(a+b+c)
# abc(1) # TypeError: abc() missing 2 required keyword-only arguments: 'b' and 'c'
# abc(1,2,3) # TypeError: abc() takes 1 positional argument but 3 were given
abc(1,b=2,c=3) # 6
```

参数拆包

```py
def abc(a,b,c):
  print(a,b,c)
abc(*"123") # 1 2 3
abc(*[1,2,3]) # 1 2 3
# 字典key❗
abc(*{
    "a":1,
    "b":2,
    "c":3
}) # a b c
# 字典value❗
abc(**{
    "a":1,
    "b":2,
    "c":3
}) # 1 2 3
```

返回值：

```py
def abc():
  pass # 默认返回 None
def abc():
  return 1 # 指定返回值
def abc():
  return 1,2,3 # 返回元组
```

#### 关键字： try/except/else/finally —— 异常❗

```py
try:
  c = 1 / 0 # ZeroDivisionError: division by zero
except ZeroDivisionError:
  print("wtf!")
else:
  print("ok~")
finally:
  print("done.")
```

常见异常

异常 | 描述
--- | ---
ZeroDivisionError | 0除/0取模
IndexError | 数组越界
KeyError | 没有key
NameError | 没声明变量
SyntaxError | 语法错误
ValueError | 无效传参

##### traceback模块

打印异常的堆栈信息

```py
import traceback
try:
    print(1/0)
except:
    traceback.print_exc()
print("hello world!")

打印：
# Traceback (most recent call last):
#   File "***\vuepress2-note\code\demo-python\type-test.py", line 132, in <module>
#     print(1/0)
#           ~^~
# ZeroDivisionError: division by zero
# hello world!
```

#### 关键字： with

with 语句可以自动管理上下文资源。
不论什么原因跳出 with 块，都能确保文件正确的关闭，以此来达到释放资源的目的。

```py
with open("a.txt", "r") as file:
  print(file.read())
```

::: tip
open 方法遵守了上下文管理协议，实现了 `__enter()` 方法和 `__exit__()` 方法。
进入 with 块前，会调用 `__enter__()` 方法并将返回值赋值给 `as` 后的变量。
推出 with 快后，会调用 `__exit__()` 方法释放该变量引用的资源。 

上下文管理器： 遵循上下文管理器协议，实现了 `__enter__()` 方法和 `__exit__()` 方法的类对象。

```py
# 定义
class MyContextMgr(object):
  def __enter__(self):
    print("__enter__")
    return self
  def __exit__(self, exc_type, exc_val, exc_tb):
    print("__exit__", exc_type, exc_val, exc_tb)
  def show():
    print("show")
# 调用
with MyContextMgr() as file:
  file.show()
```
:::

#### 关键字： class —— 类❗

##### 定义类

关键字 class

```py
class Student: # 要求首字母大写！
  pass
```

类的组成：

+ 属性
+ 构造方法
+ 静态方法
+ 类方法

```py
class Student:
  name = "小明"

  # 构造方法
  def __init__(self, name, age):
    self.name = name
    self.age = age
    self.__xx = 1 # 私有

  # 构造方法/工具方法，自定义方法名 —— 方便封装为工具方法，内部编写类的工作函数调用❗
  @classmethod
  def customInit(cls):
    t = cls("custom", 99)
    t.__xx = 2
    print("custom done.")
    # 调用工作函数...
    # t.eat()
    return t

  # 类方法
  def eat(self):
    print("eating...",self.__xx)

  # 静态方法
  @staticmethod
  def id():
    print("1313123123")
```

##### 创建类实例

```py
Student.id() # 1313123123
stu = Student("理想",19)
cstu = Student.customInit() # custom done.

print(stu, cstu) # <__main__.Student object at 0x0000023D69E34EF0> <__main__.Student object at 0x0000023D69E34F80>
print(id(stu), id(cstu)) # 2462792765168 2462792765312
print(type(stu), type(cstu)) # <class '__main__.Student'> <class '__main__.Student'>
print(stu.age, cstu.age) # 19 99
print(stu.name, cstu.name) # 理想 custom
# stu.__xx # AttributeError: 'Student' object has no attribute '__xx'
stu.eat() # eating... 1
cstu.eat() # eating... 2
```

##### 私有属性

通过添加 `__` 前缀声明属性私有

::: tip
内置函数 `dir()` 可以查看指定对象所有属性
:::

```py
# 前提：
# __xx 是私有属性

print(dir(stu)) # ['_Student__xx', '__class__', '__delattr__', '__dict__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__getstate__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__le__', '__lt__', '__module__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__', 'age', 'customInit', 'eat', 'id', 'name']
print(stu._Student__xx, cstu._Student__xx) # 1 2
```

通过 `dir(obj)` 方法查看到 `_Student__xx` 是私有属性的具体名称

##### 特殊属性、特殊方法

特殊属性

名称 | 描述
--- | ---
`__dict__` | 获得类对象或实例对象所绑定的所有属性和方法的字典
`__class__` | 对象所属的类
`__bases__` | 对象所属的父类类型（列表）
`__base__` | 对象所属的父类类型（第一个）
`__mro__` | 对象所属的类的层次结构
`__subclasses__` | 对象所属的类的子类列表

特殊方法

名称 | 描述
--- | ---
`__len__()` | 长度计算
`__add__()` | 加法计算
`__new__()` | 用于创建对象，需要返回对象；先于 `__init__()` 被调用
`__init__()` | 对创建的对象进行初始化

```py
class Person(object):
  def __new__(cls, *args, **kwargs):
    print("__new__", id(cls))
    obj = super().__new__(cls)
    print("__new__", id(obj))
    return obj
  def __init__(self, name, age):
    print("__init__", id(self))
    self.name = name
    self.age = age

print("pre", id(object)) # pre 140710997362448
print("pre", id(Person)) # pre 2558888675456
# __new__ 2558888675456
# __new__ 2558890830128
# __init__ 2558890830128
print("post", id(Person("xx", 19))) # post 2558890830128
```

##### 继承

python 支持多继承！

```py
class Person(object):
  def __init__(self, name, age):
    self.name = name
    self.age = age
  def __str__(self):
    return str((self.name, self.age))
class Student(Person): # 多继承： Student(A,B,C,...)
  def __init__(self, name, age, stu_no):
    super().__init__(name, age)
    self.stu_no = stu_no
stu_1 = Student("s1", 18, 1)
print(stu_1) # ('s1', 18)
```

::: tip
object 类： 

1. object 类是所有类的父类
1. object 类有 `__str__()` 方法 —— java 中的 `toString()`
:::

##### 浅拷贝、深拷贝

概念：

+ **浅拷贝** —— 源对象与拷贝对象的属性值引用至同一个对象
+ **深拷贝** —— 使用 copy 模块的 deepcopy 函数，递归拷贝对象中包含的对象

浅拷贝

```py
class A:
  def __init__(self, b):
    self.b = b
class B:
  pass

import copy

a = A(B())
ca = copy.copy(a)
print(id(a), id(ca))
print(id(a.b), id(ca.b), a.b == ca.b)
```

深拷贝

```py
da = copy.deepcopy(a)
print(id(a), id(da))
print(id(a.b), id(da.b), a.b == da.b)
```

#### 模块（Module）

在 Python 中一个扩展名为 `.py` 的文件就是一个模块。一个模块中可以包含多个函数。

使用模块的好处：

+ 方便其他程序和脚本的导入并使用
+ 避免函数名和变量名冲突
+ 提高代码的可维护性
+ 提高代码的可重用性

```py
# 导入模块
import 模块名
import 模块名 as 别名
from 模块名 import 函数/变量/类
```

##### 常用的内置模块

模块名 | 描述
--- | ---
sys | 与 Python 解析器及其环境操作相关的标准库
time | 提供与时间相关的各种函数的标准库
os | 提供了访问操作系统服务功能的标准库
calendar | 提供与日期相关的各种函数的标准库
urllib | 提供读取来自网上（服务器）的数据标准库
json | 提供用于使用 json 序列化和反序列化对象的标准库
re | 提供用于在字符串中执行正则表达式匹配和替换的标准库
math | 提供标准算术运算函数的标准库
decimal | 提供用于进行精确控制运算精度、有效数位和四舍五入操作的十进制运算标准库
logging | 提供了灵活的记录事件、错误、警告和调试等日志信息的功能

```py
import sys
print(sys.getsizeof(24))
print(sys.getsizeof(True))

import time
print(time.time())
print(time.localtime(time.time()))

import urllib
print(urllib.request.urlopen("http://www.baidu.com").read())
```

##### 以主程序形式运行

在每个模块的定义中都包括一个记录模块名称的变量 `__name__`。程序可以检查该变量，以确定他们在哪个模块中执行。
如果一个模块不是被导入到其他程序中执行的，那么它可能在解释器的顶级模块中执行。顶级模块的 `__name__` 变量的值为 `__main__`。

```py
def add(a,b):
  return a+b

if __name__ = '__main__':
  # test add() method
  pass
```

##### 包结构

Python 中的包是一个分层次的目录结构，它将一组功能相近的模块组织在一个目录下。

```py
test/
├── __init__.py
├── set-test.py
└── type-test.py
```

作用：

+ 规范代码
+ 避免模块名称冲突

包与目录的区别： 包含 `__init__.py` 文件的目录称为 “包”

```py
import 包名.模块名
```

##### 第三方模块的安装

```bash
pip install 模块名
```

```py
import 模块名
```

e.g.

```py
import schedule

def job()
  print("test".center(10, "-"))

schedule.every(3).seconds.do(job)
while True:
  schedule.run_pending()
  time.sleep(1)
```

#### 模块： IO流

```py
# file = open(filename, [, mode, encoding])

file = open('a.txt', 'r')
print(file.readlines())
file.close()

# write/read

src_file = open("logo.png", "rb")
tar_file = open("copylogo.png", "wb")
tar_file.write(src_file.read())
tar_file.close()
src_file.close()
```

::: tip
文件类型： 按文件中数据的组织形式，文件分为两大类：

1. 文本文件 —— 存储的是普通 “字符” 文本，默认为 unicode 字符集。
1. 二进制文件 —— 把数据内容用 “字节” 进行存储，无法用笔记本打开，如：mp3、jpg、doc、...
:::

文件打开模式 | 描述
--- | ---
r | 以只读模式打开文件。文件的指针将会放在文件的开头。
w | 以只写模式打开文件。如果文件不存在则创建；如果文件存在则覆盖原有内容，文件指针在文件的开头。
a | 以追加模式打开文件。如果文件不存在则创建，文件指针在文件开头；如果文件存在则在文件末尾追加内容，文件指针在原文件末尾。
b | 以二进制方式打开文件。不能单独使用，需要与其他模式一起使用，如：`rb`、`wb`、...
\+ | 以读写方式打开文件。不能单独使用，需要与其他模式一起使用，如：`a+`

文件对象的常用方法 | 说明
--- | ---
`read([size])`
`readline()`
`readlines()`
`write(str)`
`writelines(s_list)`
`seek(offset[,whence])` | 把文件指针移到最新的位置。<br> offset 表示相对于 whence 的位置。<br><br> whence 不同值代表的不同含义： <ul><li>0: 从文件头开始计算（默认） </li><li>1: 从当前位置开始计算</li><li>2: 从文件尾开始计算</li></ul>
`tell()` | 返回文件指针的当前位置
`flush()` | 把缓冲区的内容写入文件，但不关闭文件
`close()` | 把缓冲区的内容写入文件，且关闭文件，释放文件对象相关资源

#### 模块： os —— 系统命令执行、目录操作

os 模块是 Python 内置的与操作系统功能和文件系统相关的模块。
该模块中的语句的执行结果通常与操作系统有关，在不同的操作系统上运行，得到的结果可能不一样。

```py
import os
os.system("notepad")
os.startfile("C:\\Program Files\\Tencent\\QQ\\Bin\\qq.exe") # 调用可执行文件
```

os 模块与 os.path 模块用于对目录或文件进行操作。

目录相关函数 | 说明
--- | ---
`getcwd()` | 返回当前的工作目录
`listdir(path)`
`mkdir(path[,mode])`
`makedirs(path1/path2/...[,mode])`
`rmdir(path)`
`removedirs(path1/path2/...)`
`chdir(path)` | 将 path 设置为当前工作目录
`abspath(path)`
`exists(path)`
`join(path, name)` | 将路径与目录或者文件名拼接起来
`splitext()` | 分离文件名和扩展名
`basename(path)` | 从一个路径中提取文件名
`dirname(path)` | 从一个路径中提取文件路径，不包含文件名
`isdir(path)`

```py
import os
path = os.getcwd()
lst = os.listdir(path)
for filename in lst:
  if filename.endwith('.py')
    print(filename)
```

## 场景

### 去重

方式一（低效）

```py
s = "asfj;lenlbans;fisajf;sacxzv"
n = "" # or [] and append
for t in s:
    if t not in n:
        n = n + t
print(n)
```

方式二：set（推荐，但是乱序）

```py
print(set("sdfsfsfasfsdfs"))
```

### 项目打包

编译 py 文件生成 exe 文件

```bash
# 安装工具
pip install PyInstaller
# 生成 exe 文件
pyinstaller -F stusystem.py # stusystem.exe
```
