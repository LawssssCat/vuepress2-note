print("4" in "1234") # True
print("name" in {"name": "xxx"}) # True

print([1] is [1])
print({"name":"haha"} is {"name":"haha"})

a = {}
b = a
print(a is b)

a = True
b = 1
c = 3.14

print(a + b) # 2
print(b + c) # 4.140000000000001 —— 不推荐！

from decimal import Decimal
a = Decimal('1.1')
b = Decimal('2.2')
print(a + b)

print(type(None))
print(type(True))
print(type(1))
print(type(1.1))
print(type('1'))
print(type((1,)))
print(type({1}))
print(type({"a":1}))

print(int("1"))
# print(int("1.5")) # ValueError: invalid literal for int() with base 10: '1.5'
print(int(1.1))
print(int(1.5))
print(float(1))
print(float("1.5"))

print(bool(""))
print(bool(" "))
print(bool([]))
print(bool([1]))
print(bool(()))
print(bool((0,)))
print(bool({}))
print(bool({"0":0}))
print(bool(set()))
print(bool(set([0])))

print(bool(0))
print(bool(1))
print(bool(0.0))
print(bool(0.1))

print(list("1234"))

print(dict([["k1","v1"], ["k2","v2"]]))
print(dict((["k1","v1"], ["k2","v2"])))
print(dict((("k1","v1"), ["k2","v2"])))
