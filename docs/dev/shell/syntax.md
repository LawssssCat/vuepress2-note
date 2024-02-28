---
title: Shell 语法笔记
---

todo 参考 <https://blog.csdn.net/LawssssCat/article/details/103434668>

todo 参考 <https://blog.csdn.net/LawssssCat/article/details/103410045>

## 注释

### 多行

双字节魔法数字符号表示为可解释性脚本

`#!` 称为 `sh-bang`、`she-bang` 源于 `sharp`（升半音符号）、`bang`（感叹号）

`#!/bin/bash`

```bash
# <blink>
  ###################### IMPORTANT ############################
  #### DO NOT MAKE ANY CHANGE TO THIS FILE.                ####
  #############################################################
# </blink>
```

```bash
# <blink>
   ###################### IMPORTANT ########################
   ###### DO NOT MAKE ANY CHANGES TO THIS FILE. IT IS ######
   ###### MAINTAINED BY GHACKER@REDHAT.COM.           ######
   #########################################################
# </blink>
```

详情：`file(1)`、`magic(5)`

### 单行

```bash
#   * Thu Oct  2 2014 George Hacker <ghacker@redhat.com>
#   - added warn and fatal functions
#   - fixed stationNum and MYHOST caculation (server33-a -> server-a)
#   - added MYHOSTX variable (server33-a -> serverX-a)
#   * Thu Sep  2 2010 Joshua M. Hoffman
#   - original code
#
```

## 变量

+ `$0` 命令名、脚本名
+ `$1` 第一个参数名
+ ...
+ `$#` 参数个数
+ `$*` 所有参数（当作一个整体）
+ `$@` 所有参数（每个独立）
+ `$?` 上一个命令返回值
+ `$!` 上一个后台执行的PID

### 默认值

```bash
# defaults, but use exported values if they are set
: ${LOG_FACILITY:=local0}
```

上述分两步：

1.  `${LOG_FACILITY:=local0}` —— 若空则赋值，并传回
2.  `: local0` —— 忽略

对比 `# {LOG_FACILITY:=local0}`，多了`${LOG_FACILITY:=local0}`的执行

### 别名

`alias` `unalias`

```bash
alias srb="ssh root@serverb"
alias ps1='ps axo pid,ppid,nice,cmd'
```

想永久生效，保存进 `~/.bashrc`

`unalias <command>` 清除别名

### 算术 / 计算

`$[...]`

```bash
echo $[1+1]
echo $[4-2]
echo $[2*2]
echo $[4/2]
echo $[5%2]
expr 5 % 2
```

`$((...))`

```bash
$ echo $a
11
$ echo $((a+1))
12
```

`RANDOM` —— 随机数

```bash
echo $RANDOM
```

## 变量定义、作用范围

参考：

+ <https://www.gnu.org/software/bash/manual/bash.html#Bash-Builtins>

---

查询

+ `env`

定义变量

+ `local` —— 在`function`内使用，避免影响 current shell variables
+ `export` —— 设置 shell variables ，让 current、other shells that are created from current 使用

调用命令

+ `.` or `source` —— 在当前环境，调用命令。命令会改变当前环境变量。
+ `bash` or `/bin/bash` —— 构建全新的环境，调用命令。命令无法改变当前变量（隔离）。

---

><https://superuser.com/questions/821094/what-is-the-difference-between-set-env-declare-and-export-when-setting-a-varia>
>
>First, you must understand that environment variables and shell variables are not the same thing.
>
>Then, you should know that shells have attributes which govern how it works. These attributes are not environment nor shell variables.
>
>Now, on to answering your question.
>
>1. `env`: without any options, shows current environment variables with their values; However can be used to set environment variable for a single command with the -i flag
>1. `set`: without options, the name and value of each shell variable are displayed* ~ from running man set in rhel; can also be used to set shell attribute. This command DOES NOT set environment nor shell variable.
>1. `declare`: without any options, the same as env; can also be used to set shell variable
>export: makes shell variables environment variables
>
>In short:
>
>1. `set` doesn't set shell nor environment variables
>1. `env` can set environment variables for a single command
>1. `declare` sets shell variables
>1. `export` makes shell variables environment variables
>
><p class="callout info">
> <code>declare -x VAR=VAL</code> creates the shell variable and also exports it, making it environment variable.<br>
  > So <code>declare -x</code> is almost the same as export according to <a href="https://stackoverflow.com/q/5785668/322020">stackoverflow.com/q/5785668/322020</a>
></p>
>  <p class="callout info"><code>declare -g VAR=VAL</code> creates the shell variable that has global scope</p>

```bash
$ x=5                <= here variable is set without export command
$ echo $x
5
$ bash               <= subshell creation
$ echo $x            <= subshell doesnt know $x variable value
$ exit               <= exit from subshell
exit
$ echo $x            <= parent shell still knows $x variable
5
$ export x=5         <= specify $x variable value using export command
$ echo $x            <= parent shell doesn't see any difference from the first declaration
5
$ bash               <= create subshell again
$ echo $x            <= now the subshell knows $x variable value
5
```

### env

+ `a=1` 无法在 `env` 中看到，需要 `expor`

### export

same as `declare -x`

当前会话全局变量

### declare

+ `a=1` 可以通过 `declare` 查看
+ `perfix_a=1` 可以通过 ` declare -p ${!perfix_@}` 查看

### set 

todo

### local

`local` —— `function` 内部作用 - local: can only be used in a function

### 父定义、子读

`source`/`function` - `=`、`declare`、`export`

`bash` - `export`

## 数学运算

### 基础运算 —— 整数运算

可以利用 `let`/`(())`/`[]` 执行数学运算。在高级操作时，`expr`/`bc` 两个工具也非常有用！

```bash
a=1
b=2
let c=a+b
echo $c # 3
let c--; echo $c # 2
let c++; echo $c # 3
let c+=6; echo $c # 9
```

```bash
a=1
b=2
c=$[ a + b ]; echo $c # 3
c=$[ a + 100 ]; echo $c # 101
c=$(( a + b )); echo $c # 3
c=$(( a + 100 )); echo $c # 101
c=`expr $a + $b`; echo $c # 3
c=`expr $a + 100`; echo $c # 101
```

::: warnning
以上方法只能用于整数，不支持浮点数！
:::

### bc —— 精确运算

bc 至此精确的数学运算，包含了大量的高级选项。

```bash
a=2.2
echo "1.3 + $a" | bc # 2.8 —— 默认 scale=2
echo "scale=3;1.3 * $a" | bc # 2.86 —— 更改 scale
# 乘方
echo "2^10" | bc # 1024
echo "sqrt(4)" | bc # 2
# 进制转换
echo "obase=2;7" | bc # 111
```

## 字符串（基础）

### 截取 —— `#`、`##`、`%`、`%%`

```bash
先赋值一个变量为一个路径，如下：
file=/dir1/dir2/dir3/my.file.txt

命令    解释    结果
${file#*/}    拿掉第一条 / 及其左边的字符串    dir1/dir2/dir3/my.file.txt
[root@localhost ~]# echo ${file#*/}
dir1/dir2/dir3/my.file.txt

${file##*/}    拿掉最后一条 / 及其左边的字符串    my.file.txt
[root@localhost ~]# echo ${file##*/}
my.file.txt

${file#*.}    拿掉第一个 . 及其左边的字符串    file.txt
[root@localhost ~]# echo ${file#*.}
file.txt

${file##*.}    拿掉最后一个 . 及其左边的字符串    txt
[root@localhost ~]# echo ${file##*.}
txt

${file%/*}    拿掉最后一条 / 及其右边的字符串    /dir1/dir2/dir3
[root@localhost ~]# echo ${file%/*}
/dir1/dir2/dir3

${file%%/*}    拿掉第一条 / 及其右边的字符串    (空值)
[root@localhost ~]# echo ${file%%/*}
(空值)

${file%.*}    拿掉最后一个 . 及其右边的字符串    /dir1/dir2/dir3/my.file
[root@localhost ~]# echo ${file%.*}
/dir1/dir2/dir3/my.file

${file%%.*}    拿掉第一个 . 及其右边的字符串    /dir1/dir2/dir3/my￼
[root@localhost ~]# echo ${file%%.*}
/dir1/dir2/dir3/my
记忆方法如下：

# 是去掉左边(在键盘上 # 在 $ 之左边)
% 是去掉右边(在键盘上 % 在 $ 之右边)
单一符号是最小匹配;两个符号是最大匹配
*是用来匹配不要的字符，也就是想要去掉的那部分
还有指定字符分隔号，与*配合，决定取哪部分
```

### 截取、替换 —— `:0:5`、`//.../...`、`/.../...`

```bash
命令                                    解释                           　　 结果
${file:0:5}            　　　提取最左边的 5 个字节    　　　　　　　　　　　　/dir1
${file:5:5}            　　　提取第 5 个字节右边的连续 5 个字节    　　　　　/dir2
${file/dir/path}            将第一个 dir 提换为 path    　　　　　　　　　 /path1/dir2/dir3/my.file.txt
${file//dir/path}    　　　　将全部 dir 提换为 path    　　　　　　　　　　　/path1/path2/path3/my.file.txt
${#file}    　　　　　　　　　 获取变量长度    　　　　　　　　　　　　　　　　　27         
```

e.g. <https://unix.stackexchange.com/questions/480846/removing-first-forward-slash-from-string>

```bash
$ var='file:///path/to/file'

$ echo "${var/\//}"
file://path/to/file
```

### 根据状态为变量赋值 `-`、`:-`、`+`、`:+`、`=`、`:=`、`?`、`:?`

命令 |	解释 |	备注
:--- | :--- | :---
`${file-my.file.txt}`	| 若 `$file` 没设定,则使用 my.file.txt 作传回值	          | 空值及非空值不作处理
`${file:-my.file.txt}`	| 若 `$file` 没有设定或为空值,则使用 my.file.txt 作传回值 | 非空值时不作处理
`${file+my.file.txt}`	| 若 `$file` 设为空值或非空值,均使用my.file.txt作传回值	  | 没设定时不作处理
`${file:+my.file.txt}`	| 若 `$file` 为非空值,则使用 my.file.txt 作传回值	      | 没设定及空值不作处理
`${file=txt}`	        | 若 `$file` 没设定,则回传 txt ,并将 `$file` 赋值为 txt	  | 空值及非空值不作处理
`${file:=txt}`	        | 若 `$file` 没设定或空值,则回传 txt ,将 `$file` 赋值为txt| 非空值时不作处理
`${file?my.file.txt}`	| 若 `$file` 没设定,则将 my.file.txt 输出至 STDERR	      | 空值及非空值不作处理
`${file:?my.file.txt}`	| 若 `$file` 没设定或空值,则将 my.file.txt 输出至 STDERR  | 非空值时不作处理

### 扩展字符

- `*` ── 0个以上任何字符
- `?` ── 任何一个字符
- `~` ── 当前用户家目录
- `~username` ── 指定用户家目录
- `~+` ── 当前工作目录
- `~-` ── 上个工作目录
- `[a-e]` —— a到e字符（最小匹配）
    ```bash
    # 没有文件时，作为字符串
    $ echo aa[0-33]
    aa[0-33]
    $ ls aa[0-33]
    ls: cannot access 'aa[0-33]': No such file or directory
    
    # 有文件时，会加工处理
    $ touch aa1 aa2 aa3
    $ ls aa[0-33]
    aa1  aa2  aa3
    $ echo aa[0-33]
    aa1 aa2 aa3
    ```
- `{a..e}` —— a到e字符（固定匹配）
    ```bash
    # 没文件时，依然会加工处理
    $ echo aa{0..3}
    aa0 aa1 aa2 aa3
    [kiosk@foundation0 test]$ ls aa{0..3}
    ls: cannot access 'aa0': No such file or directory
    ls: cannot access 'aa1': No such file or directory
    ls: cannot access 'aa2': No such file or directory
    ls: cannot access 'aa3': No such file or directory
    
    # 有文件时，依然会加工处理
    [kiosk@foundation0 test]$ touch aa1 aa2
    [kiosk@foundation0 test]$ echo aa{0..3}
    aa0 aa1 aa2 aa3
    [kiosk@foundation0 test]$ ls aa{0..3}
    ls: cannot access 'aa0': No such file or directory
    ls: cannot access 'aa3': No such file or directory
    aa1  aa2
    ```
- `[abc...]` ── 包含括号中的任意一个字符
- `[!abc...]` ── 不包含括号中任何一个字符
- `[~abc...]` ── 同`[!abc...]`
- `[[:alpha:]]` ── 任何字母字符 \[posix\]
- `[[:lower:]]` ── 任何小写字符 \[posix\]
- `[[:upper:]]` ── 任何大写字符 \[posix\]
- `[[:alnum:]]` ── 任何字母字符或数字 \[posix\]
- `[[:punct:]]` ── 除空格和字母数字以外的任何可打印字符 \[posix\]
- `[[digit]]` ── 任何数字 0~9  \[posix\]
- `[[:space:]]` ── 空白字符、制表符、换行、回车、换页 \[posix\]

::: tip
预设的 \[POSIX\] 字符串，针对当前区域而调整

e.g. 可以在命令行中通过`tab`匹配文件名

```bash
$ touch aabb
$ ls aa* #tab补全
$ ls aabb
```
:::

### 例子

#### 获取路径的文件夹、文件名

```bash
$ a=/volume1/docker/file1.tar.gz
$ echo $a
/volume1/docker/file1.tar.gz
$ echo ${a%/*}
/volume1/docker
$ echo ${a##*/}
file1.tar.gz
$ b=${a##*/}; echo ${b%%.*}
file1
```

## 字符串（扩展）

### 打印

#### echo

`set -H` 可以打印 `!`

`echo -e` 转义字符

#### printf

格式替代符（format substitution character）

```bash
printf "%-5s %-10s %-4s\n" No Name Mark
printf "%-5s %-10s %-4.2f\n" 1 Sarath 80.2455
printf "%-5s %-10s %-4.2f\n" 1 James 12.321312
printf "%-5s %-10s %-4.2f\n" 1 Jeff 44.12313
```

### 颜色（color）

<https://stackoverflow.com/questions/5947742/how-to-change-the-output-color-of-echo-in-linux>

```bash
Black        0;30     Dark Gray     1;30
Red          0;31     Light Red     1;31
Green        0;32     Light Green   1;32
Brown/Orange 0;33     Yellow        1;33
Blue         0;34     Light Blue    1;34
Purple       0;35     Light Purple  1;35
Cyan         0;36     Light Cyan    1;36
Light Gray   0;37     White         1;37
```

```bash
#    .---------- constant part!
#    vvvv vvvv-- the code from above
RED='\033[0;31m'
NC='\033[0m' # No Color
printf "I ${RED}love${NC} Stack Overflow\n"
```

```bash
echo -e "\e[1;42m Green Background \e[0m"
```

### 列提取

```bash
$ lines="

a   b  c
1 2 3

"
$ echo "$lines" | grep -E -v '^( )*$' | awk '{print $2}'
b
2
```

### 拼接

参考： 

+ <https://www.baeldung.com/linux/join-multiple-lines>

#### Pure Bash
todo
#### tr
todo
#### paste
todo
#### sed

```bash
$ sed ':a; N; $!ba; s/\n//g' input.txt 
I cameI sawI conquered!

$ sed ':a; N; $!ba; s/\n/,/g' input.txt 
I came,I saw,I conquered!

$ sed ':a; N; $!ba; s/\n/; /g' input.txt 
I came; I saw; I conquered!
```

+ `:a;` – we define a `label` called a
+ `N;` – append next line into sed‘s pattern space
+ `$!ba;` – if the current line is the last line (`$`), do not (`!`) jump to the label `:a` (a)
+ `s/\n/REPLACEMENT/g` – replace all line breaks with the given `REPLACEMENT`

#### awk

todo

### 去重

参考

+ [Linux使用awk去掉重复值的几种情况](https://blog.csdn.net/shenyuye/article/details/107725445)
+ [linux sed去除重复,删除文本中的重复行(sort+uniq/awk/sed)](https://blog.csdn.net/weixin_42348880/article/details/117278175)


#### awk

<p class="callout info">
  效率应该比<code>sort</code>后<code>uniq</code>高。（应该！因为未验证！todo）
</p>


#### sort+uniq

```bash
sort file | uniq
```
uniq将服务删除所有的重复行。经过排序后，所有相同的行都在相邻，因此unqi可以正常删除重复行。

#### ~~sort+awk~~

```bash
sort file | awk '{if ($0!=line) print;line=$0}'
```

#### ~~sort+sed~~

```bash
sort file | sed '$!N; /^.∗\n\1$/!P; D'
```

### json解析 - jq

参考

+ [ ] <https://spin.atomicobject.com/2021/06/08/jq-creating-updating-json/>

构建

```bash
AUTH_BODY=$(jq --null-input \
  --arg user "$USERNAME" \
  --arg password "$PASSWORD" \
  '{"user": $user, "password": $password}')
```

解析

```bash
AUTH_TOKEN_RESPONSE=$(curl -s \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -d "${AUTH_BODY}" \
  https://api.example.com/auth/token)
```

```bash
AUTH_TOKEN=$(echo "$AUTH_TOKEN_RESPONSE" | jq -r .data.token)
```

+ `-r`,`--raw-input` 将值提取出来（去除双引号`"..."`），并解析（如：“`\n`”）

搜索

```bash
> echo '{ "foo": "bar" }' | jq '.foo |= "baz"'
{
  "foo": "baz"
}
```

```bash
# These would likely be command-line arguments in a real script
VERSION=2.3.2
COMMAND_PATH="/releases/33/run.sh"

cat current.json | jq \
  --arg version "$VERSION" \
  --arg command_path "$COMMAND_PATH" \
 '(.definition.environment[] | select(.name == "VERSION") | .value) |= $version
  | .definition.command |= $command_path'
```

### 正则表达

#### grep

`egrep` 、 `grep -E` 扩展正则表达式

+ `.` `.{n,m}`
+ `?`
+ `*` 零次或多次
+ `+`
+ `[:alnum:]` `[0-9A-Za-z]`
+ `[:alpha:]` `[A-Za-z]`
+ `[:blank:]` 空格/制表符
+ ...
+  `\b` 
+  `\B`
+  `\<` 左侧有空格的字符或左边没字符
+  `\>`
+  `\w` 词语组分 `[_[:alnum:]]`
+  `\W` 非词语组分 `[^_[:alnum:]]`
+  ...

选项

+ `-e PATTERN` 或
+ `-f FILE` 从文件读取PATTERN
+ `-i` 忽略大小写
+ `-v` 反向选择
+ `-w` 匹配单词（左右有空格分开，或者开头、结尾）
+ `-x` 全匹配
+ `-n` 显示行数
+ `-c` 匹配数量

+ `-L` `--files-without-match` 列出内容非匹配的文件名 `grep -L workstation /etc/host*`
+ `-l` `--files-with-matches` 列出内容匹配的文件名

+ `-o` 只显示匹配的内容
+ `-q` 不显示输出，通过`$?`判断结果，0匹配到了，非0表示没有匹配到

```bash
[root@servera ~]# grep -e qmgr -e pickup -e cleanup /etc/postfix/master.cf
pickup    unix  n       -       n       60      1       pickup
cleanup   unix  n       -       n       -       0       cleanup
qmgr      unix  n       -       n       300     1       qmgr
#qmgr     unix  n       -       n       300     1       oqmgr
```

<p class="callout info">
  用来查文件内容有奇效 <br>
  查：哪个文件中有devices字段 <br>
  <code>grep devices */tuned.conf</code>
</p>

##### 问题：内容为空时，返回 1

```bash
$ echo "" | awk '!a[$0]++{print}' | grep  -v "^$" && echo ok
$ echo "" | grep  -v "^$" && echo ok
```

## 数组（array）

定义

```bash
a=()
a=(111 222 333)
a=(
111
222
333
"ssss"
)
```

添加 append

```bash
a+=("bbb")
```

长度

```bash
${#a[@]}
```

## 条件判断

### if

`if/then` \
`if/then/else` \
`if/then/elif/then/else`

+ `[]`   符合 `POSIX` 标准，兼容性更强
  + `-eq`、`-ne`
  + `-gt`、`-ge`、`-lt`、`-le`
  + `=`、`==`、`!=`
  + `-z` 空
  + `-n` 非空
+ `[[]]` 中能用 `< >` 表示 大于、小于
+ `[[]]` 中能用 `&&` `||` 表示 与、或
+ `[[]]` 中能用 `==` 进行模式匹配
+ `=~` 正则 `[[ "expression" =~ "string" ]]`

```bash
sudo systemctl is-active mariadb > /dev/null 2>&1
MARIADB_ACTIVE=$?

sudo systemctl is-active postgresql > /dev/null 2>&1
POSTGRESQL_ACTIVE=$?

if [ "$MARIADB_ACTIVE" -eq 0 ]; then
  mysql
elif [ "$POSTGRESQL_ACTIVE" -eq 0 ]; then
  psql
else
  sqlite3
fi
```

### test

`man test`

#### 数值比较

参数 | 说明
--- | ---
num1 -eq num2	| 判断 num1 是否和 num2 相等
num1 -ne num2	| 判断 num1 是否和 num2 不相等
num1 -gt num2	| 判断 num1 是否大于 num2
num1 -lt num2	| 判断 num1 是否小于 num2
num1 -ge num2	| 判断 num1 是否大于等于 num2
num1 -le num2	| 判断 num1 是否小于等于 num2

#### 字符串判断

参数 | 说明
--- | ---
z str	| 判断字符串 str 是否为空
-n str	| 判断宇符串 str 是否为非空
str1 = str2 与 str1 == str2 |	=和==是等价的，都用来判断 str1 是否和 str2 相等。
str1 \!\= str2 |	判断 str1 是否和 str2 不相等。
str1 \\\> str2	判断 str1 是否大于 str2。\\\>是\>的转义字符，这样写是为了防止\>被误认为成重定向运算符。
str1 \\\< str2 |	判断 str1 是否小于 str2。同样，\\\<也是转义字符

#### 文件类型判断

参数 | 说明
--- | ---
-b filename	| 判断文件是否存在，并且是否为块设备文件
-c filename	| 判断文件是否存在，并且是否为字符设备文件
-d filename	| 判断文件是否存在，并且是否为目录文件
-e filename	| 判断文件是否存在
-f filename	| 判断文件是否存在，井且是否为普通文件
-L filename	| 判断文件是否存在，并且是否为符号链接文件
-p filename	| 判断文件是否存在，并且是否为管道文件
-s filename	| 判断文件是否存在，并且是否为非空
-S filename	| 判断该文件是否存在，并且是否为套接字文件

#### 文件权限判断

参数 | 说明
--- | ---
-r filename	| 判断文件是否存在，并且是否拥有读权限
-w filename	| 判断文件是否存在，并且是否拥有写权限。
-x filename	| 判断文件是否存在，并且是否拥有执行权限
-u filename	| 判断文件是否存在，并且是否拥有 SUID 权限。
-g filename	| 判断文件是否存在，并且是否拥有 SGID 权限。
-k filename	| 判断该文件是否存在，并且是否拥有 SBIT 权限

#### 文件比较

参数 | 说明
--- | ---
filename1 -nt filename2	| 判断 filename1 的修改时间是否比 filename2 的新
filename -ot filename2	| 判断 filename1 的修改时间是否比 filename2 的旧
filename1 -ef filename2	| 判断 filename1 是否和 filename2 的 inode 号一致，可以理解为两个文件是否为同一个文件。这个判断用于判断硬链接是很好的方法

#### 逻辑运算

参数 | 说明
--- | ---
expression1 -a expression | 逻辑与
expression1 -o expression2 | 逻辑或
\!expression | 逻辑非

### case

```bash
case <VALUE> in
  <PATTERN1>)
    COMMAND1
    ....
    ;;
  <PATTERN2>)
    COMMAND2
    ...
    ;;
  <*>)
    COMMAND3
    ...
    ;;
esac
```

## 循环

### for

```bash
for 变量名 in 取值列表        
do 
   命令序列（命令行）
done
```

```bash
for PACKAGE in $(rpm -qa | grep kernel); \
do echo "SPACKAGE was installed on \
$(date -d @$(rpm -q --qf "%{INSTALLTIME}\n" SPACKAGE))"; done
```

```bash
for EVEN in $(seq 2 2 10); do echo "$EVEN"; done
```

`$*` `$@` 的区别

```bash
[student@workstation ~]$ ./a.sh 1 2 3 
1 2 3
1
2
3
[student@workstation ~]$ cat ./a.sh 
#!/bin/bash
for args in "$*"; do
  echo $args
done

for args in "$@"; do
  echo $args
done
```

#### 固定数量

```bash
for i in {1..10} 
```

<p class="callout warning">
  这里不能 <code>{1..$a}</code>
</p>

#### 变量

```bash
for (( i=1; i<=100; i++ ))
for (( i=1; i<=$a; i++ ))
```

#### 普通数组（array）

```bash
# 方式1
a=("1 222" 2 3); echo ${a[@]} ; for i in "${a[@]}" ; do  echo $i ; done 

# 方式2
array_var[0]="test0"
array_var[1]="test1"
array_var[2]="test2"
array_var[3]="test3"
# 打印所有值
echo ${array_var[@]} # test0 test1 test2 test3
echo ${array_var[*]} # test0 test1 test2 test3
# 长度
echo ${#array_var[@]} # 4
echo ${#array_var[*]} # 4
```

<https://blog.csdn.net/weixin_44324367/article/details/111312156>

#### 关联数组（map）

在普通数组中只能使用整数作为数组索引；在关联数组中可以使用任意文本作为数组索引。

```bash
# 声明关联数组
$ declare -A ass_array
# 定义
$ ass_array=([index1]=val1 [index2]=val2)
$ echo ${ass_array[index1]} # val1
# 独立赋值
$ ass_array[index1]=xxxxx
# 列出所有键、值
$ echo ${!ass_array[@]} # index1 index2
$ echo ${ass_array[@]} # xxxxx val2
```

### while

```bash
while <CONDITION>; do
  COMMAND1;
  ...
done
```

```bash
#!/bin/bash
while :
do
  systemctl is-active httpd.service &>/dev/null
  if [ $? -ne 0 ]; then
    system restart httpd.service &>/dev/null
  fi
  sleep 5
done
```

为了避免for的空格换行，可以使用`read`读

```bash
[student@workstation ~]$ cat dd.sh 
#!/bin/bash

echo "111 222 333
444 555 66 
7

112312" | while read line; do
echo "-- $line"
done

[student@workstation ~]$ ./dd.sh 
-- 111 222 333
-- 444 555 66
-- 7
-- 
-- 112312
```

但是通过管道符`|`后，`while`中的变量改变无法传到外面。

可以用下面这种写法，就能传递变量了

```bash
while IFS= read -r line
do
    echo "$line"
done <<< "$the_list"
```

参考

+ <https://stackoverflow.com/questions/13122441/how-do-i-read-a-variable-on-a-while-loop>


### until

```bash
until <CONDITION> ; do
  COMMAND1;
  ...
done
```

### continue

`continue n` —— n是跳到哪一层（不是跳几层）

```bash
[student@workstation ~]$ cat ./b.sh 
#!/bin/bash
for ((i=1; i<=5; i++)); do
  for ((j=1; j<=5; j++)); do
    if ((i*j==12)); then
      continue 2
    fi
    echo -n "$i*$j=$[$i*$j]"
  done
  echo 
done

[student@workstation ~]$ ./b.sh 
1*1=11*2=21*3=31*4=41*5=5
2*1=22*2=42*3=62*4=82*5=10
3*1=33*2=63*3=94*1=44*2=85*1=55*2=105*3=155*4=205*5=25
```

### break

`break n` 跳出哪层循环

## 函数

### function

todo

### exit

`exit n` —— n 返回值，默认0， 取值范围 0~255

exit 命令用于退出当前程序，并返回程序执行结果

一般，返回 0 表示成功，非0 表示失败（出错）

## 文件

### 路径处理

#### 获取路径文件名
```bash
$ basename "/var/services/backup//tmp//backup__2023-05-02_0.tar.gz"
backup__2023-05-02_0.tar.gz
```
#### 获取路径文件夹名
```bash
$ str="/var/services/backup//tmp//backup__2023-05-02_0.tar.gz"; 
$ echo "${str%/*}"
/var/services/backup//tmp/
```
解释：
+ `%/` ——  拿掉最后一个`/`及其右边的字符串

### 文件编辑

追加（append）、覆盖

```bash
sudo tee /etc/nginx/sites-available/$project_name <<EOF
server {
    listen 80;
    server_name test.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF
```

## 参数处理

参考

+ getopt - <https://man7.org/linux/man-pages/man1/getopt.1.html>
+ getopts - <https://man7.org/linux/man-pages/man1/getopts.1p.html>
+ <https://www.baeldung.com/linux/bash-parse-command-line-arguments>

+ [ ] <https://stackoverflow.com/questions/192249/how-do-i-parse-command-line-arguments-in-bash>
  + [x] 主要的回答
  + [ ] 其他回答
  + [ ] 回答中的链接
+ [x] <https://www.baeldung.com/linux/read-command>

### getopts（POSIX）

用法：`demo-getopts.sh -vf /etc/hosts foo bar`


```bash
cat >/tmp/demo-getopts.sh <<'EOF'
#!/bin/sh

# A POSIX variable
OPTIND=1         # Reset in case getopts has been used previously in the shell.

# Initialize our own variables:
output_file=""
verbose=0

while getopts "h?vf:" opt; do
  case "$opt" in
    h|\?)
      show_help
      exit 0
      ;;
    v)  verbose=1
      ;;
    f)  output_file=$OPTARG
      ;;
  esac
done

shift $((OPTIND-1))

[ "${1:-}" = "--" ] && shift

echo "verbose=$verbose, output_file='$output_file', Leftovers: $@"
EOF

chmod +x /tmp/demo-getopts.sh

/tmp/demo-getopts.sh -vf /etc/hosts foo bar
```

```bash
#!/bin/bash

while getopts ':abc:h' opt; do
  case "$opt" in
    a)
      echo "Processing option 'a'"
      ;;

    b)
      echo "Processing option 'b'"
      ;;

    c)
      arg="$OPTARG"
      echo "Processing option 'c' with '${OPTARG}' argument"
      ;;

    h)
      echo "Usage: $(basename $0) [-a] [-b] [-c arg]"
      exit 0
      ;;

    :)
      echo -e "option requires an argument.\nUsage: $(basename $0) [-a] [-b] [-c arg]"
      exit 1
      ;;

    ?)
      echo -e "Invalid command option.\nUsage: $(basename $0) [-a] [-b] [-c arg]"
      exit 1
      ;;
  esac
done
shift "$(($OPTIND -1))"
```

### getopt

```bash
GETOPT(1)                                                                       User Commands                                                                      GETOPT(1)

NAME
       getopt - parse command options (enhanced)

SYNOPSIS
       getopt optstring parameters

       getopt [options] [--] optstring parameters

       getopt [options] -o|--options optstring [options] [--] parameters

DESCRIPTION
       getopt is used to break up (parse) options in command lines for easy parsing by shell procedures, and to check for valid options. It uses the GNU getopt(3) routines
       to do this.
```

In the above script:

+ `-o` option represents the short command-line options
+ `–long` option represents the long command-line options

```bash
#!/bin/bash

VALID_ARGS=$(getopt -o abg:d: --long alpha,beta,gamma:,delta: -- "$@")
if [[ $? -ne 0 ]]; then
    exit 1;
fi

eval set -- "$VALID_ARGS"
while [ : ]; do
  case "$1" in
    -a | --alpha)
        echo "Processing 'alpha' option"
        shift
        ;;
    -b | --beta)
        echo "Processing 'beta' option"
        shift
        ;;
    -g | --gamma)
        echo "Processing 'gamma' option. Input argument is '$2'"
        shift 2
        ;;
    -d | --delta)
        echo "Processing 'delta' option. Input argument is '$2'"
        shift 2
        ;;
    --) shift; 
        break 
        ;;
  esac
done
```

#### Bash 空格分隔

例如，`--option argument`

用法：`demo-space-separated.sh -e conf -s /etc /etc/hosts`

```bash
cat >/tmp/demo-space-separated.sh <<'EOF'
#!/bin/bash

POSITIONAL_ARGS=()

while [[ $# -gt 0 ]]; do
  case $1 in
    -e|--extension)
      EXTENSION="$2"
      shift # past argument
      shift # past value
      ;;
    -s|--searchpath)
      SEARCHPATH="$2"
      shift # past argument
      shift # past value
      ;;
    --default)
      DEFAULT=YES
      shift # past argument
      ;;
    -*|--*)
      echo "Unknown option $1"
      exit 1
      ;;
    *)
      POSITIONAL_ARGS+=("$1") # save positional arg
      shift # past argument
      ;;
  esac
done

set -- "${POSITIONAL_ARGS[@]}" # restore positional parameters

echo "FILE EXTENSION  = ${EXTENSION}"
echo "SEARCH PATH     = ${SEARCHPATH}"
echo "DEFAULT         = ${DEFAULT}"
echo "Number files in SEARCH PATH with EXTENSION:" $(ls -1 "${SEARCHPATH}"/*."${EXTENSION}" | wc -l)

if [[ -n $1 ]]; then
    echo "Last line of file specified as non-opt/last argument:"
    tail -1 "$1"
fi
EOF

chmod +x /tmp/demo-space-separated.sh

/tmp/demo-space-separated.sh -e conf -s /etc /etc/hosts
```

#### Bash 等号分隔

例如，`--option=argument`

用法：`demo-equals-separated.sh -e=conf -s=/etc /etc/hosts`

```bash
cat >/tmp/demo-equals-separated.sh <<'EOF'
#!/bin/bash

for i in "$@"; do
  case $i in
    -e=*|--extension=*)
      EXTENSION="${i#*=}"
      shift # past argument=value
      ;;
    -s=*|--searchpath=*)
      SEARCHPATH="${i#*=}"
      shift # past argument=value
      ;;
    --default)
      DEFAULT=YES
      shift # past argument with no value
      ;;
    -*|--*)
      echo "Unknown option $i"
      exit 1
      ;;
    *)
      ;;
  esac
done

echo "FILE EXTENSION  = ${EXTENSION}"
echo "SEARCH PATH     = ${SEARCHPATH}"
echo "DEFAULT         = ${DEFAULT}"
echo "Number files in SEARCH PATH with EXTENSION:" $(ls -1 "${SEARCHPATH}"/*."${EXTENSION}" | wc -l)

if [[ -n $1 ]]; then
    echo "Last line of file specified as non-opt/last argument:"
    tail -1 $1
fi
EOF

chmod +x /tmp/demo-equals-separated.sh

/tmp/demo-equals-separated.sh -e=conf -s=/etc /etc/hosts
```

### 管道：read

```bash
$ read [options] [name...]
```

+ `options` —— 影响读取命令与输入交互方式
+ `name` —— 存储的变量名

---

默认会将`stdin`（标准输入流）中获取一行，分配给`REPLY`

```bash
$ read
baeldung is a cool tech site # what we type
$ echo $REPLY
baeldung is a cool tech site
```

---

默认情况下，读取命令将输入​​拆分为单词，将`<space>`、`<tab>`和`<newline>`字符视为“单词分隔符”。\
同时，可以指定参数名。

```bash
$ read input1 input2 input3
baeldung \ # what 
is a cool \ # we 
tech site   # type
$ echo "[$input1] [$input2] [$input3]"
[baeldung] [is] [a cool tech site]
```

---

内部字段分隔符(`IFS`)确定给定行中的单词边界

```bash
$ {
      IFS=";"
      read input1 input2 input3
      echo "[$input1] [$input2] [$input3]"
  }
baeldung;;is;a;cool;tech;site # what we type
[baeldung] [] [is;a;cool;tech;site]
```

```bash
$ {
IFS=" "
read input1 input2 input3
echo "[$input1] [$input2] [$input3]"
}
```

---

参数选项

+ `-s`：不将输入行回显到标准输出流
+ `-p prompt`：在从标准输入流请求输入之前打印提示文本，不带`<newline>`字符
+ `-a array`：将单词拆分操作的结果存储在一个数组中而不是单独的变量中
+ `-e`：使用`Bash`内置的`Readline`库读取输入行
+ `-i text`：将文本打印为标准输出流上的默认输入（只能与`-e`结合使用）

```bash
$ {
      prompt="You shall not pass:"
      read -p "$prompt" -s input
      echo -e "\n input word [$input]"
  }
You shall not pass: # invisible input here
input word [baledung is a cool site]
```
```bash
$ {
      declare -a input_array
      text="baeldung is a cool tech site"
      read -e -i "$text" -a input_array 
      for input in ${input_array[@]} 
          do
              echo -n "[$input] "
          done
  }
baeldung is a cool tech site # default input here
[baeldung] [is] [a] [cool] [tech] [site] 
```

---

高级语法

现在我们已经看到了`read`的实际效果，让我们来看看一些更高级的选项：

+ `-d delim`：指定输入行的分隔符而不是使用`<换行>`字符
+ `-u fd`：从给定的文件描述符中读取输入行
+ `-r`：按原样处理`<backslash>`字符（不能用于转义特殊字符）
+ `-t 超时`：尝试在给定的秒数内读取输入
+ `-N`：从输入中准确读取`N`个字符，除非发生超时或到达`EOF`


#### 例子：从其他命令读取

```bash
$ { 
      ls -ll / | { declare -a input
                   read
                   while read -a input; 
                   do
                       echo "${input[0]} ${input[8]}"
                   done }
  }

drwxr-xr-x bin
drwxr-xr-x boot
drwxr-xr-x dev
# some more folders
```

#### 例子：超时和特殊字符

在复杂的脚本中，我们可能想要更多的灵活性来避免阻塞读取调用。

此外，输入可能包含我们不想转义的特定`<backslash>`字符（例如在生成的密码中）：

```bash
$ {
    prompt="You shall not pass:"
    read -p "$prompt" -s -r -t 5 input
        if [ -z "$input" ]; then
            echo -e "\ntimeout occured!"
        else
            echo -e "\ninput word [$input]"
        fi
}

You shall not pass: # invisible input here
input word [baeldung\is]
```

#### 例子：正好读取 N 个字符

让我们把事情变得更复杂，假设我们想在输入中恰好有 11 个字符：

```bash
$ {
    prompt="Reading exactly 11 chars:"
    read -p "$prompt" -N 11 -t 5 input1 input2 
    echo -e "\ninput word1 [$input1]"
    echo "input word2 [$input2]"
}

Reading exactly 11 chars:baeldung is # no <newline> here
input word1 [baeldung is]
input word2 []
```

引入`-N`选项会导致三个主要的副作用：

+ 行分隔符不再重要
+ 它不再将输入拆分为单词，因为我们只想将 11 个字符分配给input1。
+ 如果发生超时，  read甚至会将部分输入分配给input1变量。

## 信息传递

### 重定向

+ [What's the difference between <<, <<< and < < in bash?](https://askubuntu.com/questions/678915/whats-the-difference-between-and-in-bash)
+ [bash: the difference between "<" and "<<<" redirect [duplicate]](https://stackoverflow.com/questions/48235261/bash-the-difference-between-and-redirect)

```bash
>/<         —— 输出/输入重定向到“文件”（覆盖）
>>/<<        —— 输出/输入重定向到“文件”（追加）
<<<       —— 输入重定向到字符串，同"|"
```

### 管道

```bash
cmd1 | cmd2 | cmd3 -
```

### 管道传递

```bash
#!/bin/bash

set -e

emsg="$(./test_error.sh)" || echo "other 1"
echo "emsg: \"$emsg\""

# error!        <== &2 in "test_error.sh"
# other 1       <== &1 in "here"
# emsg: "ok!"   <== &1 in "here" from &1 in "test_error.sh"

echo "==================="

emsg="$(./test_error.sh 2>&1)" || echo "other 2"
echo "emsg: \"$emsg\""

# other 2              <== &1 in "here"
# emsg: "ok!\nerror!"  <== &1 in "here" from &1+&2 in "test_error.sh"

echo "==================="

emsg="$(./test_error.sh 2>&1)" # no catch, throw here.
echo "emsg: \"$emsg\""

# nothing to print, case of "set -e" (throw when exception and no catch)
```
