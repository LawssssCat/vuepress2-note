class Student:
  name = "小明"

  # 构造方法
  def __init__(self, name, age):
    self.name = name
    self.age = age
    self.__xx = 1 # 私有

  # 构造方法，自定义
  @classmethod
  def customInit(cls):
    t = cls("custom", 99)
    t.__xx = 2
    print("custom done.")
    return t

  # 类方法
  def eat(self):
    print("eating...",self.__xx)

  # 静态方法
  @staticmethod
  def id():
    print("1313123123")

Student.id()
stu = Student("理想",19)
cstu = Student.customInit()

print(stu, cstu)
print(id(stu), id(cstu))
print(type(stu), type(cstu))
print(stu.age, cstu.age)
print(stu.name, cstu.name)
# stu.__xx # AttributeError: 'Student' object has no attribute '__xx'
stu.eat()
cstu.eat()

print(dir(stu)) # ['_Student__xx', '__class__', '__delattr__', '__dict__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__getstate__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__le__', '__lt__', '__module__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__', 'age', 'customInit', 'eat', 'id', 'name']
print(stu._Student__xx, cstu._Student__xx)

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
print(stu_1)

print("====================")

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

print("pre", id(object))
print("pre", id(Person))
print("post", id(Person("xx", 19)))

print("====================")

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

da = copy.deepcopy(a)
print(id(a), id(da))
print(id(a.b), id(da.b), a.b == da.b)
