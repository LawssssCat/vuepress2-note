print(set("123321"))
print(set([1,2,3,3,2,1]))
d = {
  "年龄": 18,
  "名字": "橘子"
}
print(set(d))

print({1,2,3,3,2,1})

a = {1,2,3}
print(a.add(6))
print(a.add(2))
print(a)

a = {1,2,3}
b = {3,4,5}
print(a.update(b))
print(a)

a = {1,2,3}
b = {3,4,5}
# & —— 交集
print(a & b)
# | —— 并集
print(a | b)
