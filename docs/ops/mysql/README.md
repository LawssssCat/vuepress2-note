---
title: MySQL 使用笔记
---

## SQL

【中字】SQL进阶教程 | 史上最易懂SQL教程！10小时零基础成长SQL大师！！ \
<https://www.bilibili.com/video/BV1UE41147KC/>

窗口函数 <https://zhuanlan.zhihu.com/p/123170975>

```sql
select 学号,班级,成绩,rank() over (order by 成绩 desc) as ranking, 
dense_rank() over (order by 成绩 desc) as dese_rank,
row_number() over (order by 成绩 desc) as row_num
from 班级表;
```
