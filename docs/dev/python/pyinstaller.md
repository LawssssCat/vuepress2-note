---
title: pyinstaller 使用笔记
---

::: danger
经过各种踩坑，得出以下总结：

使用 pyinstaller 把 python 打包成一个可执行文件属于脱裤子放屁。

**理由**：

1. 跨平台兼容性差： 由于语言的特性 pyinstaller 打包出来的二进制依赖系统的动态库。这导致程序可能可以跨平台跑，单大概率不能跑。要么动态库缺失，要么GLIBC版本要求太高，系统没有相关函数集。
1. 破坏项目结构： 打包后的程序依赖的文件路径会改变，要么在 `_internal` 中，要么在解压的 `/tmp` 临时目录中。处理这种路径的变化需要添加额外的代码。如果使用的第三方库没有这种兼容代码，则整个三方库无法选用（除非你自己开分支维护）。

**解决方案**：

很简单，直接使用 python 跑 py 文件即可，根本无需把 python 项目通过 pyinstaller 打包成可执行文件再跑程序。
环境需要安装 python 环境？
直接编译一个静态的 python 可执行文件，加上 venv 打包依赖到 site-packages 环境就能确保代码跨系统运行。
再交叉编译其他架构的 python 可执行文件即可跨架构运行。🎉

python 静态编译参考： [link](./python-build.md) 
:::

### 简单使用

参考： 

+ ~~<https://www.askpython.com/python/examples/compiling-applications-static-binary>~~ 太冗长

编译 py 文件生成 exe 文件

```bash
# 安装工具
pip install PyInstaller
# 生成 exe 文件
pyinstaller -F stusystem.py # stusystem.exe

# pyInstaller -F -w -p /dir1/;/dir2/ -i /dir3/icon.ico ***.py
# -F/--onefile
# -F 表示生成单一的exe文件
#    💡虽然生成了单一文件，但实际上还是压缩包形式存储全部文件，通过特殊方法可以解压 | todo 解压生成的单一文件
#    ⚠️单文件模式下，启动程序时会先将可执行文件进行解压缩到 /temp 目录 下，再执行。
#       所以被打包进去的数据文件在被解压的路径下，所以如果是在运行的路径下（即启动程序的目录下）搜索文件是找不到数据文件的！
# -w 表示生成的exe文件执行时去掉背后的dos窗口
# -p pyinstaller 手动提供包的位置（dir1，dir2），以分号隔开";"
# -i 加入图标
```

```bash
pyinstaller present_fasttext_txt.spec
```

#### 例子： 简单flask服务

```py
'''
初始化：所有的Flask都必须创建程序实例，
web服务器使用wsgi协议，把客户端所有的请求都转发给这个程序实例
程序实例是Flask的对象，一般情况下用如下方法实例化
Flask类只有一个必须指定的参数，即程序主模块或者包的名字，__name__是系统变量，该变量指的是本py文件的文件名
'''
from flask import Flask
import datetime

server=Flask(__name__)

@server.route('/time',methods=['post','get'])
def get_time():
    now=str(datetime.datetime.now())#把当前时间转换成字符串
    return "当前的时间是：%s"%now

server.run(port=8888)
```

```bash
# 直接运行
pip3 install flask
python3 app.py &
curl 127.0.0.1:8888
```

```bash
# 编译运行
pyinstaller app.py
./dist/app/app 
```

#### 问题： 资源文件的路径

在 py 中，资源文件放在项目根目录下，所以调用的时候直接用的文件名。

但打包成 exe 文件的后，资源文件会在 dist 文件夹下搜索文件，从而导致资源文件找不到的问题。

代码片段1：

```py
import os, sys
 
def resource_path(relative_path):
    """
    定义一个读取相对路径的函数
      """
    if hasattr(sys, "_MEIPASS"):
        base_path = sys._MEIPASS
    else:
        base_path = os.path.abspath(".")
    return os.path.join(base_path, relative_path)
```

调用

```py
# 前
classifier1 = fasttext.load_model("comment_fasttext_isinv.model.bin"， label_prefix='__label__')
# 后
classifier1 = fasttext.load_model(resource_path("comment_fasttext_isinv.model.bin"), label_prefix='__label__')
```

代码片段2：不能在代码中直接使用相对路径调用文件

```py
# 先获取当前运行时临时目录路径
if getattr(sys, 'frozen', None):
    basedir = sys._MEIPASS
else:
    basedir = path.dirname(__file__)
# 使用 os.path.join() 方法，将 临时目录路径与文件相对路径拼接
with open(path.join(basedir, 'file.txt'), 'r') as fp:
    pass
```

### spac 文件

```py
# -*- mode: python -*-
 
block_cipher = None
 
 
a = Analysis(['present_fasttext_txt.py'],
             pathex=['/home/km/PycharmProjects/fasttext'],
             binaries=[],
             # 类型：tuple，元素是两个字符串。第一个为文件源路径；第二个为文件生成路径（相对于生成的程序的路径）
             datas=[('comment_fasttext_isinv.model.bin','.'),('comment_fasttext_isneg.model.bin','.'),('comment_fasttext_issug.model.bin','.'),('comment_fasttext_isbug.model.bin','.'),('comment_fasttext_ispraise.model.bin','.')],
             hiddenimports=['fasttext.model'],
             hookspath=[],
             runtime_hooks=[],
             excludes=[],
             win_no_prefer_redirects=False,
             win_private_assemblies=False,
             cipher=block_cipher)
pyz = PYZ(a.pure, a.zipped_data,
             cipher=block_cipher)
exe = EXE(pyz,
          a.scripts,
          a.binaries,
          a.zipfiles,
          a.datas,
          name='present_fasttext_txt',
          debug=False,
          strip=False,
          upx=True,
          runtime_tmpdir=None,
          console=True )

# coll是用来在dist目录下生成程序文件夹的
# 💡如果加了 -F参数，生成的spac文件中没有coll内容
```

#### pyinstaller分步生成可执行文件

在一些其他情况下，通过修改spec文件，自定义可执行文件的生成过程

```bash
pyi-makespec options name.py
```

参数： <https://pythonhosted.org/PyInstaller/man/pyi-makespec.html?highlight=pyi>

```bash
pyi-makespec present_fasttext_txt.py -F --hidden-import fasttext.model
```

### 问题： 打包报 enable-shared 错误

参考： https://blog.csdn.net/zhouguoqionghai/article/details/103102724

编译安装 python

```bash
wget https://www.python.org/ftp/python/3.4.0/Python-3.4.0.tgz
tar -zxvf Python-3.4.0.tgz
cd Python-3.4.0
./configure
make
make install
```

使用 pyinstaller 将所有依赖打包到一个文件当中

```bash
pyinstaller --console --onefile script.py
```

结果报错

```bash
* On Debian/Ubuntu, you would need to install Python development packages
  * apt-get install python3-dev
  * apt-get install python-dev
* If you're building Python by yourself, please rebuild your Python with `--enable-shared` (or, `--enable-framework` on Darwin)
```

重新编译安装 python

```bash
./configure --enable-shared
```

报错： `error while loading shared libraries： `

```bash
# 搜动态库位置
$ find /usr -name 'libpython3.6m.so.1.0'
/usr/local/lib

# ldconfig 命令用来管理链接器的动态库搜索路径，默认的是 /lib 和 /usr/lib 已经 /etc/ld.so.conf 配置文件中包含的目录
# 该路径不在连链接器默认的动态库搜索范围里，可以 ldconfig -v | grep python 看不到该动态库。
# 若该库不在链接器的搜索范围内，执行 ldd $(which python3) 可查看到该库指向为 not found.
$ ldd $(which python3) 
        linux-vdso.so.1 =>  (0x00007ffd609e2000)
        libpython3.4m.so.1.0 => not found
        libpthread.so.0 => /lib64/libpthread.so.0 (0x00007f6e934cf000)
        libdl.so.2 => /lib64/libdl.so.2 (0x00007f6e932ca000)
        libutil.so.1 => /lib64/libutil.so.1 (0x00007f6e930c7000)
        libm.so.6 => /lib64/libm.so.6 (0x00007f6e92e43000)
        libc.so.6 => /lib64/libc.so.6 (0x00007f6e92aae000)
        /lib64/ld-linux-x86-64.so.2 (0x00007f6e93ba2000)
```

解决

```bash
# 方式一： ⚠️需要管理员权限
echo '/usr/local/lib' >> /etc/ld.so.conf # 将路径写入动态链接库配置
ldconfig # 刷新一下缓存

# 方式二：临时的替代方法就是修改预定义变量
LD_LIBRARY_PATH=/opt/python/lib
export LD_LIBRARY_PATH # 得子进程当中能够使用

# 方式三： 在编译配置时就指定动态链接库位置
./configure --enable-shared --prefix=/opt/python LDFLAGS=-Wl,-rpath=/opt/python/lib
```

### 问题： 运行时 No module named 'matplotlib.backends.backend_tkagg'

```bash
E:\0E207\soft\dist>.\dist\cellsim
Traceback (most recent call last):
  File "CellSim.pyw", line 6, in <module>
  File "F:\python35-32\lib\site-packages\pyinstaller-3.2.1-py3.5.egg\PyInstaller\loader\pyimod03_importers.py", line 389, in load_module
    exec(bytecode, module.__dict__)
  File "Lib\site-packages\matplotlib\pyplot.py", line 114, in <module>
  File "Lib\site-packages\matplotlib\backends\__init__.py", line 32, in pylab_setup
ImportError: No module named 'matplotlib.backends.backend_tkagg'
Failed to execute script CellSim
```

两种原因： 一个是依赖包没装，一个是依赖没被pyinstaller识别

+ 对于： 依赖包没装

  ```bash
  下载依赖，重新编译
  ```

+ 对于： 依赖没被pyinstaller识别

  加参数 `--hidden-import matplotlib.backends.backend_tkagg`

### 问题： GLIBC issue / 静态编译

::: waning
PyInstaller + StaticX 实测有问题。
todo 理解、解决方案
:::

参考：

+ GLIBC issue | https://github.com/orgs/pyinstaller/discussions/5669
+ Python 编译「静态」可执行文件 (PyInstaller + StaticX) | https://hydrotho.github.io/Compiling-Python-Application-Into-Static-Binary-Using-PyInstaller-And-StaticX/

```bash
# 打包项目为可执行文件（ELF），存放放在dist中 
pyinstaller main.py # 多文件
# or
pyinstaller main.py --onefile # 单文件
pyinstaller -F main.py
```

通过上面命令，可以将项目打包为可执行文件（ELF）。

但可执行文件仍然可能在其他机器（甚至同架构、同系统的机器）上运行报错。因为，其生成的可执行文件是动态链接的：

```bash
$ ldd dist/app/app 
        linux-vdso.so.1 (0x00007ffd52bf8000)
        libdl.so.2 => /lib/x86_64-linux-gnu/libdl.so.2 (0x00007f520b7dc000)
        libz.so.1 => /lib/x86_64-linux-gnu/libz.so.1 (0x00007f520b7c0000)
        libpthread.so.0 => /lib/x86_64-linux-gnu/libpthread.so.0 (0x00007f520b7bb000)
        libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007f520b592000)
        /lib64/ld-linux-x86-64.so.2 (0x00007f520b7e9000)
```

因为这种可执行文件不是完全静态的，所以它依赖于系统的 libc。
在 Linux 下，GLIBC 的 ABI 是向后兼容的，但不是向前兼容的。
因此，如果你用较新的 GLIBC 链接，你就不能在较旧的系统上运行编译好的可执行文件。

一种解决方法是在最老的系统上编译 Python 解释器及其模块，从而使用旧的 GLIBC 版本，但这必然引入安全问题。

彻底解决的方法是将 Python 应用程序编译成「静态」可执行文件。
这里，使用 StaticX 工具：

```bash
pip install -U staticx
staticx <动态可执行文件路径> <静态可执行文件路径>
```

```bash
$ staticx dist/app/app dist/app/app-staticx
$ file dist/app/app
dist/app/app: ELF 64-bit LSB executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, BuildID[sha1]=4900f1057c817d78f6abf8c33793107b79dcd1a7, for GNU/Linux 2.6.32, stripped
$ ldd dist/app/app
        linux-vdso.so.1 (0x00007ffec835e000)
        libdl.so.2 => /lib/x86_64-linux-gnu/libdl.so.2 (0x00007f19f2be6000)
        libz.so.1 => /lib/x86_64-linux-gnu/libz.so.1 (0x00007f19f2bca000)
        libpthread.so.0 => /lib/x86_64-linux-gnu/libpthread.so.0 (0x00007f19f2bc5000)
        libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007f19f299c000)
        /lib64/ld-linux-x86-64.so.2 (0x00007f19f2bf3000)
$ file dist/app/app-staticx 
dist/app/app-staticx: ELF 64-bit LSB executable, x86-64, version 1 (SYSV), statically linked, with debug_info, not stripped
$ ldd dist/app/app-staticx
        not a dynamic executable
```

::: warning
除了安装 StaticX 包，还需要确保已安装如下命令：

+ `ldd`
+ `readelf`
+ `objcopy`
+ `patchelf`

通过 `command -v <COMMAND>` 来检查命令是否存在。
:::

::: danger
**存在的问题**

StaticX 生成的「静态」可执行文件在运行时将在系统的 `/tmp/` 路径下创建随机临时文件夹，其中存放有应用程序运行所需的库，并且该目录将在应用程序退出时被自动清除。

应用程序在运行时以该临时文件夹为其工作目录，这意味着诸如 `__file__` 变量和 `os`, `pathlib` 等库所获取到的路径将出现异常。

因此：

1. 通过 `pyinstaller app.py` 生成的多文件形式不能使用这种方式。

  ```bash
  $ ./dist/app/app-staticx 
  [1141] Error loading Python lib '/tmp/staticx-EbFLcK/_internal/libpython3.10.so.1.0': dlopen: /tmp/staticx-EbFLcK/_internal/libpython3.10.so.1.0: cannot open shared object file: No such file or directory
  ```

1. 通过 `pyinstaller -F app.py` 生成的单文件形式也可能出现问题：

  ```bash
  $ staticx dist/app dist/app-staticx
  staticx: /tmp/staticx-pyi-ct_w5qq1/base_library.zip: Invalid ELF image: Magic number does not match
  ```
:::
