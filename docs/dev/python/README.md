---
title: Python 使用笔记
---

todo https://www.bilibili.com/video/BV1ZP4y1o7Sc?p=3

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

```py
# 格式
if 2>1:
  print(123)
```

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

字符串运算

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

# 拼接
print('hello'+' '+'world')
print(','.join(('hello', 'world','python')))
print('0'*3) # 000

# 定位
print('hello world!'.find('o')) # 4
print('hello world!'.find('o', 5,10)) # 7
print('hello world!'.find('z')) # -1 —— 找不到！
print('hello world!'.count('0')) # 2

# 分割
print("hello world!".split('o')) # ['hell', ' w', 'rld!']

# 替换
print("hello world!".replace('o', 'Z'))    # hellZ wZrld!
print("hello world!".replace('o', 'Z', 1)) # hellZ world!
"    v   ".strip() # trim
"666    v   ".strip('6') # trim 6

# 大写/小写
s = "Aa"
s.upper()
s.lower()
```

格式化输出

```py
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


# 格式化输出格式

# 指定小数点后几位 —— 四舍五入！
print("橘子： {:.2f}元/斤".format(3.6666)) # 橘子： 3.67元/斤

# 百分比输出
percent=0.472352
print(f"占比： {percent:.2%}") # 占比： 47.23%
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
