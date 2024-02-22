d = {
  "年龄": 18,
  "名字": "橘子",
  1: 18,
  (1,2,3): "123"
}
print(d)

d = dict((["年龄", 18], ["姓名", "橘子"], [1, 18], [(1,2,3), "123"]))
print(d)

d = {"name": "橘子"}

# 增加
d["技能"] = ("python", "java", "js")

# 删除
del d['技能']

# 查
print(d["name"]) # 橘子
# print(d["无"]) # 报错： KeyError: '无'
print(d.get("无"))
print(d.get("无", "没有啦~")) # 没有啦~

d = {"name": "橘子", "age": 18}
print(d.keys())
print(d.items())
print(d.values())

d = {"name": "橘子", "age": 18}
print("pop: " + str(d.pop("age")))
print("pop: " + str(d.pop("age", None)))

print({}.fromkeys(("name", "skill")))

print({}.fromkeys(("name", "skill"), 12)) # {'name': 12, 'skill': 12}

obj = [1,2,3]
fromkeys = {}.fromkeys(("key1", "key2"), obj)
print(fromkeys)
obj.append(4)
print(fromkeys)

obj = {
  "name": "橘子",
  "age": 18
}
item = obj.popitem()
print(obj)
print(item)

d = {"name": "橘子"}
d["技能"] = ("python", "java", "js")
print(d) #

d = {"name": "橘子", "技能": ("python", "java", "js")}
del d['技能']
print(d)

obj = {
  "name": "橘子",
  "age": 18
}
obj.setdefault("age", 35)
obj.setdefault("技能", ("python",))
print(obj) #

obj = {
  "name": "橘子",
  "age": 18
}
obj.update({"age": 35, "skill": ("python", "java")})
print(obj)

k = [1,2,3]
v = ['a','b','c']
print(list(zip(k,v))) # [(1, 'a'), (2, 'b'), (3, 'c')]

s = ['s']
k = [1,2]
v = ['a','b','c']
print(list(zip(s, k,v))) # [('s', 1, 'a')]
