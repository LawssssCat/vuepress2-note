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
