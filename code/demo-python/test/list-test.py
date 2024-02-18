list_1 = [1,2,3]
list_2 = [4,2,3]
print(list_1 + list_2) #

list_1 = [1,2,3]
print(list_1 * 3) #

list_1 = [1,2,3]
print(list_1[1:2]) # [2]

a = [1,2,3]
a.insert(2,99)
print(a) #

a = [1,2,3]
print(a.pop()) # 3
print(a) #

a = [1,2,3,1]
print(a.remove(1))
print(a)

a = [1,2,99,3,4]
print(a.index(99)) # 2

# 反转
list_1 = [1,2,3]
print(list_1[::-1])
print(list_1.reverse())
print(list_1)

a = [1,2,3]
a.extend([4,5,6])
print(a) #

# 排序
# ASCII 编码排序： 0~9<A~Z<a~z
list_1 = ["hello", "world", "hw", "python"]
list_1.sort()
print(list_1)
list_1.sort(reverse=True)
print(list_1)

list_1 = ["hello", "world", "hw", "python", "hello"]
print(list_1.count("hello"))

a = (1,2,3)
b = (4,[1,2])
print(a + b)

print((1))
print((1,))
print((1,2))

list_1 = [1,2,3,4]
for i in range(len(list_1)):
  print(i, list_1[i])

list_1 = [1,2,3]
print(sum(list_1))
from functools import reduce
print(reduce(lambda x,y:x+y, list_1))

list_1 = [1,2,3,4]
for i,v in enumerate(list_1):
  print(i,v)