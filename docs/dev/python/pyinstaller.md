---
title: pyinstaller 使用笔记
---

编译 py 文件生成 exe 文件

```bash
# 安装工具
pip install PyInstaller
# 生成 exe 文件
pyinstaller -F stusystem.py # stusystem.exe

# pyInstaller -F -w -p /dir1/;/dir2/ -i /dir3/icon.ico ***.py
# -F 表示生成单一的exe文件
#    💡虽然生成了单一文件，但实际上还是压缩包形式存储全部文件，通过特殊方法可以解压 | todo 解压生成的单一文件
# -w 表示生成的exe文件执行时去掉背后的dos窗口
# -p pyinstaller 手动提供包的位置（dir1，dir2），以分号隔开";"
# -i 加入图标
```

```bash
pyinstaller present_fasttext_txt.spec
```

#### 例子： 

```py

```

#### spac 文件

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

#### 问题： 打包报 enable-shared 错误

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

#### 问题： 运行时 No module named 'matplotlib.backends.backend_tkagg'

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

#### 问题： GLIBC issue

参考：

+ GLIBC issue | https://github.com/orgs/pyinstaller/discussions/5669
+ Python 编译「静态」可执行文件 (PyInstaller + StaticX) | https://hydrotho.github.io/Compiling-Python-Application-Into-Static-Binary-Using-PyInstaller-And-StaticX/

todo

#### 问题： 打包成一个exe之后资源文件的路径

在 py 中，资源文件放在项目根目录下，所以调用的时候直接用的文件名。

但打包成 exe 文件的后，资源文件会在 dist 文件夹下搜索文件，从而导致资源文件找不到的问题。

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
