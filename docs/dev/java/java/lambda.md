---
title: Lambda 使用笔记
---

todo https://www.bilibili.com/video/BV15k4y1c7uR/

todo https://www.bilibili.com/video/BV1jw411v7KV/

参考：

+ [8. 方法引用的花式写法](https://www.bilibili.com/video/BV1FF411m7y2)

```java
(参数) -> {处理}
class::func
obj::func
```

`java.util.function`

`@FunctionalInterface`

```java
// 原理
BiPredicate<String, String> biPredicate = (x, y) -> x.equals(y);
biPredicate.test("a", "b");

// 对象::实例方法
ListUtil.toList(2,1,3).forEach(System.out::println);

// 类名::实例方法
List<String> names = list.stream().map(User::getUsername).collect(Collectors.toList());
// 等于
List<String> names = list.stream().map(user -> user.getUsername()).collect(Collectors.toList());
// 
list.sort(Integer::compare);
list.sort((a,b) -> Integer.compare(a,b));

// 构造器
list.stream().map(User::new).collect(Collectors.toList());
// 等于
list.stream().map(n -> new User(n)).collect(Collectors.toList());

// 数组引用
list.stream().map(i -> "str"+i).toArray(String[]:new);
// 等于
list.stream().map(i -> "str"+i).toArray(v -> new String[v]);
```
