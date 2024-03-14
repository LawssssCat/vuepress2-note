---
title: Git 使用笔记
---

```bash
#配置用户名
git config --global user.name "test"
#配置邮箱
git config --global user.email  abc@163.com
#生成密钥对
ssh-keygen -t rsa
#登录验证
ssh -T git@github.com
```

hub 选择

+ github —— 默认选择
+ BitBucket —— 私人小项目
+ gitee —— ！？....

创建新分支

```bash
git checkout --orphan <branch> # 创建空白分支
git commit --allow-empty # 空提交
```

邮箱匿名 todo

批量修改git commit记录中的用户名和邮箱

```bash
#!/bin/sh

git filter-branch --env-filter '
OLD_EMAIL="原邮箱地址"
CORRECT_NAME="新用户名"
CORRECT_EMAIL="新邮箱地址"

if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags
```

```bash
sh rename.sh
```

todo 修改 commit 历史

+ https://www.cnblogs.com/flying_bat/p/4172435.html
+ https://blog.csdn.net/dd121494648/article/details/102277068
+ https://cloud.tencent.com/developer/section/1138641
