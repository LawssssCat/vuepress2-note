---
title: PostgreSQL 使用笔记
---

todo 系统学习！（note：架构、优势、容灾、备份、迁移、分布式）

### 更改密码

::: danger
字符串拼接可能导致命令行注入！
:::

```bash
psql --quiet --single-line --host='127.0.0.1' --username='root' --password --command='\password'
```

参考

+ `--password` （options） https://www.postgresql.org/docs/16/app-psql.html#APP-PSQL-OPTION-NO-PASSWORD
+ `\password [ username ]` （meta-command） https://www.postgresql.org/docs/16/app-psql.html#APP-PSQL-META-COMMAND-PASSWORD
