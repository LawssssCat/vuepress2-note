name = "hello world!"
print(name[0:6:2])
print(name[0:len(name):2])
print(name[0::2])
print(name[::-1])

msg = ','.join(('hello', 'world','python'))
print(msg)
print("你好，我叫{}，今年{}，性别{}".format('鸡哥','练习两年半','男'))
print("你好，我叫{0}，今年{2}，性别{1}".format('鸡哥','练习两年半','男'))

print('hello world!'.find('o'))
print('hello world!'.find('o', 5,10))

print("hello world!".replace('o', 'Z'))
print("hello world!".replace('o', 'Z', 1))

print("hello world!".split('o'))

print("橘子： {:.2f}元/斤".format(3.6666))
percent=0.472352
print(f"占比： {percent:.2%}")

print("v".center(7, "*"))

s = "hello"
print("{0:*<20}".format(s)) # hello*************** —— 左对齐
print("{0:*>20}".format(s)) # ***************hello —— 右对齐
print("{0:*^20}".format(s)) # *******hello******** —— 居中

print("{0:,}".format(123456789.123456)) # 123,456,789.123456
print("{0:,.2f}".format(123456789.123456)) # 123,456,789.12
print("{0:,.2}".format(123456789.123456)) # 1.2e+08 —— 最大显示长度
print("{0:.2}".format("123.456")) # 12

print("====================")

b = 1024
print("{0:b}".format(b))
print("{0:c}".format(b))
print("{0:d}".format(b))
print("{0:o}".format(b))
print("{0:x}".format(b))
print("{0:X}".format(b))

print("====================")

b = 10000000003.1415926
print("{0:.2f}".format(b))
print("{0:.2%}".format(b))
print("{0:.2e}".format(b))
print("{0:.2E}".format(b))

print("====================")

s = "你好".encode('gbk', errors="ignore")
print(s)

b = bytes.decode(s, 'gbk')
print(b)

print("1".isnumeric())
print("一".isnumeric())
print("壹".isnumeric())
print("①".isnumeric())
print("Ⅰ".isnumeric())
print("one".isnumeric())

s = "asfj;lenlbans;fisajf;sacxzv"

n = ""
for t in s:
    if t not in n:
        n = n + t
print(n)

import re
pattern = "python\d\.\d+"
match = re.match(pattern,"Python3.10 ever day!",re.IGNORECASE)
print(match)

print(match.start())
print(match.end())
print(match.span())
print(match.group())
print(match.string)

search = re.search(pattern,"I study Python3.10 ever day!",re.IGNORECASE)
print(search)
