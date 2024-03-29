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

print(isinstance(1, bool))
print(isinstance(True, bool))
print(isinstance(1, int))
print(isinstance(1.1, int))
print(isinstance(1.1, (int,float,bool)))

for i in range(0,10,2): #
  print(i)

d = {
  "name": "oracle",
  "age": 18,
  "skill": ("python", "java")
}
for k in d:
    print(k, d[k])
for i in d.items():
    print(i)

i = 1
while i<100:
    i = i + 1
    print(i)

def abc(a=1,b=2,c=3):
  print(a+b+c)

abc() #
abc(100)
abc(b=200)

def abc(a,*,b,c):
  print(a+b+c)

# abc(1,2,3)
# abc(1)
abc(1,b=2,c=3)

def abc(a,*b):
    print(a,b)
abc(1)
abc(1,2,3)

def abc(a, **b):
  print(a,b)
abc(1) # 1 {}
abc(1,x=2,y=3)

def abc(a,b,c):
  print(a,b,c)
abc(*"123")
abc(*[1,2,3])
abc(*{
    "a":1,
    "b":2,
    "c":3
})
abc(**{
    "a":1,
    "b":2,
    "c":3
})

try:
    c = 1 / 0 # ZeroDivisionError: division by zero
except ZeroDivisionError:
    print("wtf")
print("done.")

import traceback
try:
    print(1/0)
except:
    traceback.print_exc()
print("hello world!")

s = "1 2 3 4 5"
l = list(map(int, s.split()))
print(l)
