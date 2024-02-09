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