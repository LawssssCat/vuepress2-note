---
title: mpv 使用笔记
tags:
  - 媒体播放器
---

mpv 开源、跨平台、轻量、可配置（`mpv.conf`）

+ mpv官网：<https://mpv.io>
+ mpv手册：<https://mpv.io/manual/master/>

功能：

+ 软解码、硬解码 
+ 快捷键
    + 官方配置，不好用、难记忆
    + 自行配置
+ 脚本（Script） <https://github.com/mpv-player/mpv/wiki/User-Scripts>

## 配置

<https://mpv.io/manual/master/#files>

<div class="callout info">
  位置（<code>&lt;mpv_config_path&gt;</code>）：
  <ul>
    <li>
      Unix(Linux/macOS) —— <code>/usr/local/etc/mpv/</code>、<code>~/.config/mpv/</code>
    </li>
    <li>
      Window System —— <code>%appdata%\mpv\</code>
    </li>
    <li>
      Window Scoop —— <code>%appdata%\scoop\persist\mpv\portable_config</code>
    </li>
  </ul>
  配置：
  <ul>
    <li>
      <code>&lt;mpv_config_path&gt;/mpv.conf</code> —— 偏好（preference）配置
    </li>
    <li>
      <code>&lt;mpv_config_path&gt;/input.conf</code> —— 快捷键配置
    </li>
  </ul>
</div>

### mpv.conf


```bash
#####################################################
# mpv官网：https://mpv.io
#
# 配置参考：https://www.bilibili.com/read/cv13479755
#
# 使用方法：
# 复制以下内容到一个txt文件中，分别改名称和后缀为mpv.conf、Input.conf
# Windows —— %appdata%/mpv
# Linux   —— /usr/local/etc/mpv.conf。
#####################################################



# =======================================================
# 解码/渲染设置
# =======================================================

# vo=gpu
# hwdec=yes #硬解，改成no为软解
# hwdec-codecs=all #使用硬解的格式
# gpu-api=d3d11
# 双显卡笔记本选择，显卡名称参考设备管理器
# d3d11-adapter=NVIDIA GeForce RTX 3060
# d3d11-adapter=Intel(R) UHD Graphics
# d3d11-adapter=AMD Radeon Graphics

# 禁用默认快捷键方案
# no-input-default-bindings
# 播放网络视频时的向后缓存大小（KiB或MiB）
# demuxer-max-bytes=200MiB



# =======================================================
# 窗口设置
# =======================================================

# 无边框
# no-border
# 全屏
# fullscreen
# 运行MPV自动窗口最大化（无边框界面时的最大化类似“无边窗口模式”而非“全屏”）
# window-maximized=yes
# 关闭简易控制面板On Screen Controller(osc)
# no-osc
# script-opts=osc-layout=bottombar,osc-seekbarstyle=bar
# 关闭屏上信息条显示
# no-osd-bar
# OSD信息位置、字体大小(x横向左中右left/center/right,y纵向上中下top/center/buttom)
# osd-align-x=left
# osd-align-y=top
# osd-font-size=28
# 开始播放时短暂显示的信息：文件名
# osd-playing-msg = "${filename}"
# 设置OSD文本信息的持续时间（毫秒）（默认值：1000）
# osd-duration=1000
# 将窗口缩放窗口模式下至大、至小占屏幕的百分比
# autofit-larger=90%x90%
# autofit-smaller=30%x30%
# 设置默认打开的窗口大小为1280x720
# geometry=1280x720

# save-position-on-quit # 退出时记住播放状态



# =======================================================
# 视频/音频/字幕/截图设置
# =======================================================

# 视频同步
# video-sync=display-resample
# 变速播放时的音调修正
# audio-pitch-correction=yes
# 加载视频文件的外部字幕文件方式。（fuzzy 加载含有视频文件名的全部字幕文件）
# sub-auto=fuzzy
# 字体大小，默认55，此值是以高度为720的屏幕为比例，更大或更小的屏幕会缩放
# sub-font-size=55
# 强制ass字幕使用黑边， 如果字幕是纯文本形式，使用--sub-use-margins
# --sub-ass-force-margins
# 指定优先使用音轨（DVD使用ISO 639-1两位语言代码，MKV、MPEG-TS使用ISO 639-2 三位语言代码）
# alang=zh,chi
# 指定优先使用字幕轨（DVD使用ISO 639-1两位语言代码，MKV、MPEG-TS使用ISO 639-2 三位语言代码）
# slang=zh,chi
# 播放循环方式，循环写inf否则写no
loop-playlist=inf
# 设定程序启动后的默认音量、程序最大音量
# volume=90
# volume-max=100

# 截屏文件格式（可选：png、ppm、pgm、pgmyuv、tga、jpg、jpeg）
screenshot-format=jpg
# 截屏文件保存路径
# screenshot-directory=C:\Users\<User>\Pictures



# =======================================================
# MySelf
# =======================================================
vo=gpu
hwdec=yes #硬解，改成no为软解
hwdec-codecs=all #使用硬解的格式
demuxer-max-bytes=200MiB


osd-playing-msg = "${filename}"   # 开始播放时短暂显示的信息：文件名
osd-duration=1000                 # 设置OSD文本信息的持续时间（毫秒）（默认值：1000）


video-sync=display-resample        # 视频同步
audio-pitch-correction=yes         # 变速播放时的音调修正
--sub-ass-force-margins            # 强制ass字幕使用黑边， 如果字幕是纯文本形式，使用--sub-use-margins
loop-playlist=inf                  # 播放循环方式，循环写inf否则写no


screenshot-format=jpg              # 截屏文件格式（可选：png、ppm、pgm、pgmyuv、tga、jpg、jpeg）
screenshot-directory=C:\Users\pc\Pictures    # 截屏文件保存路径

```

###  input.conf

<div class="callout info">
  <b>常用快捷键：</b>
  <ul>
    <li>
      <code>←</code>/<code>→</code> —— 回退/快进
    </li>
    <li>
      <code>↑</code>/<code>↓</code> —— 声量+/声量-
    </li>
    <li>
      <code>l</code> —— 播放列表
    </li>
    <li>
      <code>PageUp</code>/<code>PageDown</code> —— 播放_Prev/播放_Next
    </li>
    <li>
      <code>TAB</code> —— 信息模式
      <ul>
        <li>
          <code>1</code> —— 片源详情（文件-File、视频-Video、音频-Audio）
        </li>
        <li>
          <code>2</code> —— 帧（Frame）
        </li>
        <li>
          <code>3</code> —— 缓存（Cache）
        </li>
        <li>
          <code>4</code> —— 快捷键（key binding）
        </li>
      </ul>
    </li>
    <li>
      <code>5</code> —— 保持最前
    </li>
    <li>
      <code>`</code> —— 控制台
      <ul>
        <li>
          <code>ESC</code> —— 退出
        </li>
      </ul>
    </li>
  </ul>
</div>


```bash
#####################################################
# mpv官网：https://mpv.io
#
# 配置参考：https://www.bilibili.com/read/cv13479755
#
# 快捷键：
# 类似potplayer默认方案的快捷键
#
# 使用方法：
# 复制以下内容到一个txt文件中，分别改名称和后缀为mpv.conf、Input.conf
# Windows —— %appdata%/mpv
# Linux   —— /usr/local/etc/mpv.conf。
#####################################################



# =======================================================
# 控制台、信息（播放列表、声音/视频轨道）、统计
# =======================================================
`             script-binding console/enable                #打开控制台，ESC退出

k             show_text ${track-list}                      #轨道-信息-显示
l             show_text ${playlist}                        #播放-列表-显示
TAB           script-binding stats/display-stats-toggle    #播放-信息-切换  【1234翻页，4查看激活的快捷键方案】
]             script-binding stats/display-stats           #播放-信息-显示
\             show-progress                                #播放-进度-显示



# =======================================================
# 截图
# =======================================================
=          screenshot video        #视频截图
+          screenshot              #带界面（OSC/OSD）截图



# =======================================================
# 播放、播放列表、窗口（全屏、保持最前）
# =======================================================
MBTN_LEFT     ignore                    #无操作  【鼠标_左键】

SPACE         cycle pause               #播放 切换 【空格】
MBTN_RIGHT    cycle pause               #播放 切换 【鼠标_右键】
MBTN_BACK     playlist-prev             #播放列表 Prev 【鼠标_侧键_向前】
MBTN_FORWARD  playlist-next             #播放列表 Next 【鼠标_侧键_向后】
PGUP          playlist-prev             #播放列表 Prev 【PageUp】
PGDWN         playlist-next             #播放列表 Next 【PageDown】
HOME          add chapter -1            #播放列表 Home 【PageHome】
END           add chapter 1             #播放列表 End 【PageEnd】

ESC           set fullscreen no         #窗口-全屏 退出 【ESC】
KP_ENTER      cycle fullscreen          #窗口-全屏 切换 【回车_小键盘】
ENTER         cycle fullscreen          #窗口-全屏 切换 【回车】
MBTN_LEFT_DBL cycle fullscreen          #窗口-全屏 切换 【鼠标_左键_双击】
1             set window-scale 0.5      #窗口-大小 0.50 【1】
2             set window-scale 0.67     #窗口-大小 0.67 【2】
3             set window-scale 0.75     #窗口-大小 0.75 【3】
4             set window-scale 1.0      #窗口-大小 1.0  【4】
5             cycle ontop               #窗口-最前 切换 【5】



# =======================================================
# 音量、播放进度、播放速度、音频延迟、字幕延迟
# =======================================================
UP           add volume 2         #音量 +2
DOWN         add volume -2        #音量 -1
Shift+UP     add volume  10       #音量 +10
Shift+DOWN   add volume -10       #音量 -10
WHEEL_UP     add volume 1         #音量 +1 【鼠标_滚轮_向上】
WHEEL_DOWN   add volume -1        #音量 -1 【鼠标_滚轮_向下】

d            frame-back-step      #播放进度 前一帧
f            frame-step           #播放进度 后一帧
WHEEL_LEFT   seek 2               #播放进度 向前2秒 【鼠标_滚轮_向左】
WHEEL_RIGHT  seek -2              #播放进度 向后2秒 【鼠标_滚轮_向右】
LEFT         seek -2              #播放进度 后退2秒 【左←】
RIGHT        seek  2              #播放进度 前进2秒 【右→】
Shift+LEFT   seek -30 exact       #播放进度
Shift+RIGHT  seek 30 exact        #播放进度 前进30秒 【Shift+右→】

z            set speed 1.0        #播放速度 1
c            add speed 0.1        #播放速度 +0.1
x            add speed -0.1       #播放速度 -0.1
Shift+c      multiply speed 2.0   #播放速度 x2
Shift+x      multiply speed 0.5   #播放速度 x0.5

Ctrl+UP      add audio-delay -0.1      #音频延迟 -0.1
Ctrl+DOWN    add audio-delay +0.1      #音频延迟 +0.1
Ctrl+LEFT    add sub-delay -0.1        #字幕延迟 -0.1
Ctrl+RIGHT   add sub-delay 0.1         #字幕延迟 +0.1



# =======================================================
# 字幕、音频
# =======================================================
A             cycle audio               #声音-切换
a             cycle mute                #声音-静音

s             cycle sub                 #字幕-切换
S             cycle sub-visibility      #字幕-隐藏
n             add sub-pos -1            #字母-位置 -1
m             add sub-pos +1            #字母-位置 +1
,             add sub-scale -0.05       #字幕-大小 -0.05
.             add sub-scale +0.05       #字幕-大小 +0.05



# =======================================================
# 亮度、对比度、伽马、饱和度、色相，q全部重置
# =======================================================
q          set contrast 0; set brightness 0; set gamma 0; set saturation 0; set hue 0    #全部重置

w          add brightness -1        #亮度
e          add brightness 1

r          add contrast -1          #对比度
t          add contrast 1

y          add gamma -1             #伽马
u          add gamma 1

i          add saturation -1        #饱和度
o          add saturation 1

p          add hue -1               #色相
[          add hue 1

Ctrl+h     cycle-values hwdec "auto" "no"               #硬解软解-切换
v          cycle deinterlace                            #反交错-切换



# =======================================================
# 媒体快捷键
# =======================================================
POWER quit
PLAY cycle pause
PAUSE cycle pause
PLAYPAUSE cycle pause
PLAYONLY set pause no
PAUSEONLY set pause yes
STOP quit
FORWARD seek 60
REWIND seek -60
NEXT playlist-next
PREV playlist-prev
VOLUME_UP add volume 2
VOLUME_DOWN add volume -2
MUTE cycle mute



# =======================================================
# MySelf
# =======================================================
Shift+RIGHT     multiply speed 2.0   #播放速度 x2
Shift+LEFT      multiply speed 0.5   #播放速度 x0.5

```

## 参考

配置

+ ~~<https://hooke007.github.io/mpv-lazy/mpv.html>~~
	+ 教程，非常全面
	+ 停更，移至 <https://hooke007.github.io/unofficial/mpv_start.html>
+ <https://www.bilibili.com/read/cv13479755> 
	+ 配置
	+ (๑•̀ㅂ•́)و✧
+ <https://www.bilibili.com/read/cv11615972>
	+ 配置（备）
+ <https://www.ghacks.net/2019/07/27/how-to-customize-the-settings-in-mpv/>


视频

+ [【软件分享】开源的全平台视频播放器MPV 使用教程](https://www.bilibili.com/video/BV1nQ4y1a7gw/)
