import{_ as l,r as i,o as c,c as t,a as n,b as s,d as e,e as o}from"./app-04e6f892.js";const p={},m=n("p",null,[s("mpv 开源、跨平台、轻量、可配置（"),n("code",null,"mpv.conf"),s("）")],-1),d={href:"https://mpv.io",target:"_blank",rel:"noopener noreferrer"},v={href:"https://mpv.io/manual/master/",target:"_blank",rel:"noopener noreferrer"},r=n("p",null,"功能：",-1),u=n("li",null,"软解码、硬解码",-1),b=n("li",null,[s("快捷键 "),n("ul",null,[n("li",null,"官方配置，不好用、难记忆"),n("li",null,"自行配置")])],-1),k={href:"https://github.com/mpv-player/mpv/wiki/User-Scripts",target:"_blank",rel:"noopener noreferrer"},h=n("h2",{id:"配置",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#配置","aria-hidden":"true"},"#"),s(" 配置")],-1),f={href:"https://mpv.io/manual/master/#files",target:"_blank",rel:"noopener noreferrer"},_=o(`<div class="callout info"> 位置（<code>&lt;mpv_config_path&gt;</code>）： <ul><li> Unix(Linux/macOS) —— <code>/usr/local/etc/mpv/</code>、<code>~/.config/mpv/</code></li><li> Window System —— <code>%appdata%\\mpv\\</code></li><li> Window Scoop —— <code>%appdata%\\scoop\\persist\\mpv\\portable_config</code></li></ul> 配置： <ul><li><code>&lt;mpv_config_path&gt;/mpv.conf</code> —— 偏好（preference）配置 </li><li><code>&lt;mpv_config_path&gt;/input.conf</code> —— 快捷键配置 </li></ul></div><h3 id="mpv-conf" tabindex="-1"><a class="header-anchor" href="#mpv-conf" aria-hidden="true">#</a> mpv.conf</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#####################################################</span>
<span class="token comment"># mpv官网：https://mpv.io</span>
<span class="token comment">#</span>
<span class="token comment"># 配置参考：https://www.bilibili.com/read/cv13479755</span>
<span class="token comment">#</span>
<span class="token comment"># 使用方法：</span>
<span class="token comment"># 复制以下内容到一个txt文件中，分别改名称和后缀为mpv.conf、Input.conf</span>
<span class="token comment"># Windows —— %appdata%/mpv</span>
<span class="token comment"># Linux   —— /usr/local/etc/mpv.conf。</span>
<span class="token comment">#####################################################</span>



<span class="token comment"># =======================================================</span>
<span class="token comment"># 解码/渲染设置</span>
<span class="token comment"># =======================================================</span>

<span class="token comment"># vo=gpu</span>
<span class="token comment"># hwdec=yes #硬解，改成no为软解</span>
<span class="token comment"># hwdec-codecs=all #使用硬解的格式</span>
<span class="token comment"># gpu-api=d3d11</span>
<span class="token comment"># 双显卡笔记本选择，显卡名称参考设备管理器</span>
<span class="token comment"># d3d11-adapter=NVIDIA GeForce RTX 3060</span>
<span class="token comment"># d3d11-adapter=Intel(R) UHD Graphics</span>
<span class="token comment"># d3d11-adapter=AMD Radeon Graphics</span>

<span class="token comment"># 禁用默认快捷键方案</span>
<span class="token comment"># no-input-default-bindings</span>
<span class="token comment"># 播放网络视频时的向后缓存大小（KiB或MiB）</span>
<span class="token comment"># demuxer-max-bytes=200MiB</span>



<span class="token comment"># =======================================================</span>
<span class="token comment"># 窗口设置</span>
<span class="token comment"># =======================================================</span>

<span class="token comment"># 无边框</span>
<span class="token comment"># no-border</span>
<span class="token comment"># 全屏</span>
<span class="token comment"># fullscreen</span>
<span class="token comment"># 运行MPV自动窗口最大化（无边框界面时的最大化类似“无边窗口模式”而非“全屏”）</span>
<span class="token comment"># window-maximized=yes</span>
<span class="token comment"># 关闭简易控制面板On Screen Controller(osc)</span>
<span class="token comment"># no-osc</span>
<span class="token comment"># script-opts=osc-layout=bottombar,osc-seekbarstyle=bar</span>
<span class="token comment"># 关闭屏上信息条显示</span>
<span class="token comment"># no-osd-bar</span>
<span class="token comment"># OSD信息位置、字体大小(x横向左中右left/center/right,y纵向上中下top/center/buttom)</span>
<span class="token comment"># osd-align-x=left</span>
<span class="token comment"># osd-align-y=top</span>
<span class="token comment"># osd-font-size=28</span>
<span class="token comment"># 开始播放时短暂显示的信息：文件名</span>
<span class="token comment"># osd-playing-msg = &quot;\${filename}&quot;</span>
<span class="token comment"># 设置OSD文本信息的持续时间（毫秒）（默认值：1000）</span>
<span class="token comment"># osd-duration=1000</span>
<span class="token comment"># 将窗口缩放窗口模式下至大、至小占屏幕的百分比</span>
<span class="token comment"># autofit-larger=90%x90%</span>
<span class="token comment"># autofit-smaller=30%x30%</span>
<span class="token comment"># 设置默认打开的窗口大小为1280x720</span>
<span class="token comment"># geometry=1280x720</span>

<span class="token comment"># save-position-on-quit # 退出时记住播放状态</span>



<span class="token comment"># =======================================================</span>
<span class="token comment"># 视频/音频/字幕/截图设置</span>
<span class="token comment"># =======================================================</span>

<span class="token comment"># 视频同步</span>
<span class="token comment"># video-sync=display-resample</span>
<span class="token comment"># 变速播放时的音调修正</span>
<span class="token comment"># audio-pitch-correction=yes</span>
<span class="token comment"># 加载视频文件的外部字幕文件方式。（fuzzy 加载含有视频文件名的全部字幕文件）</span>
<span class="token comment"># sub-auto=fuzzy</span>
<span class="token comment"># 字体大小，默认55，此值是以高度为720的屏幕为比例，更大或更小的屏幕会缩放</span>
<span class="token comment"># sub-font-size=55</span>
<span class="token comment"># 强制ass字幕使用黑边， 如果字幕是纯文本形式，使用--sub-use-margins</span>
<span class="token comment"># --sub-ass-force-margins</span>
<span class="token comment"># 指定优先使用音轨（DVD使用ISO 639-1两位语言代码，MKV、MPEG-TS使用ISO 639-2 三位语言代码）</span>
<span class="token comment"># alang=zh,chi</span>
<span class="token comment"># 指定优先使用字幕轨（DVD使用ISO 639-1两位语言代码，MKV、MPEG-TS使用ISO 639-2 三位语言代码）</span>
<span class="token comment"># slang=zh,chi</span>
<span class="token comment"># 播放循环方式，循环写inf否则写no</span>
loop-playlist<span class="token operator">=</span>inf
<span class="token comment"># 设定程序启动后的默认音量、程序最大音量</span>
<span class="token comment"># volume=90</span>
<span class="token comment"># volume-max=100</span>

<span class="token comment"># 截屏文件格式（可选：png、ppm、pgm、pgmyuv、tga、jpg、jpeg）</span>
screenshot-format<span class="token operator">=</span>jpg
<span class="token comment"># 截屏文件保存路径</span>
<span class="token comment"># screenshot-directory=C:\\Users\\&lt;User&gt;\\Pictures</span>



<span class="token comment"># =======================================================</span>
<span class="token comment"># MySelf</span>
<span class="token comment"># =======================================================</span>
<span class="token assign-left variable">vo</span><span class="token operator">=</span>gpu
<span class="token assign-left variable">hwdec</span><span class="token operator">=</span>yes <span class="token comment">#硬解，改成no为软解</span>
hwdec-codecs<span class="token operator">=</span>all <span class="token comment">#使用硬解的格式</span>
demuxer-max-bytes<span class="token operator">=</span>200MiB


osd-playing-msg <span class="token operator">=</span> <span class="token string">&quot;<span class="token variable">\${filename}</span>&quot;</span>   <span class="token comment"># 开始播放时短暂显示的信息：文件名</span>
osd-duration<span class="token operator">=</span><span class="token number">1000</span>                 <span class="token comment"># 设置OSD文本信息的持续时间（毫秒）（默认值：1000）</span>


video-sync<span class="token operator">=</span>display-resample        <span class="token comment"># 视频同步</span>
audio-pitch-correction<span class="token operator">=</span>yes         <span class="token comment"># 变速播放时的音调修正</span>
--sub-ass-force-margins            <span class="token comment"># 强制ass字幕使用黑边， 如果字幕是纯文本形式，使用--sub-use-margins</span>
loop-playlist<span class="token operator">=</span>inf                  <span class="token comment"># 播放循环方式，循环写inf否则写no</span>


screenshot-format<span class="token operator">=</span>jpg              <span class="token comment"># 截屏文件格式（可选：png、ppm、pgm、pgmyuv、tga、jpg、jpeg）</span>
screenshot-directory<span class="token operator">=</span>C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>pc<span class="token punctuation">\\</span>Pictures    <span class="token comment"># 截屏文件保存路径</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="input-conf" tabindex="-1"><a class="header-anchor" href="#input-conf" aria-hidden="true">#</a> input.conf</h3><div class="callout info"><b>常用快捷键：</b><ul><li><code>←</code>/<code>→</code> —— 回退/快进 </li><li><code>↑</code>/<code>↓</code> —— 声量+/声量- </li><li><code>l</code> —— 播放列表 </li><li><code>PageUp</code>/<code>PageDown</code> —— 播放_Prev/播放_Next </li><li><code>TAB</code> —— 信息模式 <ul><li><code>1</code> —— 片源详情（文件-File、视频-Video、音频-Audio） </li><li><code>2</code> —— 帧（Frame） </li><li><code>3</code> —— 缓存（Cache） </li><li><code>4</code> —— 快捷键（key binding） </li></ul></li><li><code>5</code> —— 保持最前 </li><li><code>\`</code> —— 控制台 <ul><li><code>ESC</code> —— 退出 </li></ul></li></ul></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#####################################################</span>
<span class="token comment"># mpv官网：https://mpv.io</span>
<span class="token comment">#</span>
<span class="token comment"># 配置参考：https://www.bilibili.com/read/cv13479755</span>
<span class="token comment">#</span>
<span class="token comment"># 快捷键：</span>
<span class="token comment"># 类似potplayer默认方案的快捷键</span>
<span class="token comment">#</span>
<span class="token comment"># 使用方法：</span>
<span class="token comment"># 复制以下内容到一个txt文件中，分别改名称和后缀为mpv.conf、Input.conf</span>
<span class="token comment"># Windows —— %appdata%/mpv</span>
<span class="token comment"># Linux   —— /usr/local/etc/mpv.conf。</span>
<span class="token comment">#####################################################</span>



<span class="token comment"># =======================================================</span>
<span class="token comment"># 控制台、信息（播放列表、声音/视频轨道）、统计</span>
<span class="token comment"># =======================================================</span>
\`             script-binding console/enable                <span class="token comment">#打开控制台，ESC退出</span>

k             show_text <span class="token variable">\${track-list}</span>                      <span class="token comment">#轨道-信息-显示</span>
l             show_text <span class="token variable">\${playlist}</span>                        <span class="token comment">#播放-列表-显示</span>
TAB           script-binding stats/display-stats-toggle    <span class="token comment">#播放-信息-切换  【1234翻页，4查看激活的快捷键方案】</span>
<span class="token punctuation">]</span>             script-binding stats/display-stats           <span class="token comment">#播放-信息-显示</span>
<span class="token punctuation">\\</span>             show-progress                                <span class="token comment">#播放-进度-显示</span>



<span class="token comment"># =======================================================</span>
<span class="token comment"># 截图</span>
<span class="token comment"># =======================================================</span>
<span class="token operator">=</span>          screenshot video        <span class="token comment">#视频截图</span>
+          screenshot              <span class="token comment">#带界面（OSC/OSD）截图</span>



<span class="token comment"># =======================================================</span>
<span class="token comment"># 播放、播放列表、窗口（全屏、保持最前）</span>
<span class="token comment"># =======================================================</span>
MBTN_LEFT     ignore                    <span class="token comment">#无操作  【鼠标_左键】</span>

SPACE         cycle pause               <span class="token comment">#播放 切换 【空格】</span>
MBTN_RIGHT    cycle pause               <span class="token comment">#播放 切换 【鼠标_右键】</span>
MBTN_BACK     playlist-prev             <span class="token comment">#播放列表 Prev 【鼠标_侧键_向前】</span>
MBTN_FORWARD  playlist-next             <span class="token comment">#播放列表 Next 【鼠标_侧键_向后】</span>
PGUP          playlist-prev             <span class="token comment">#播放列表 Prev 【PageUp】</span>
PGDWN         playlist-next             <span class="token comment">#播放列表 Next 【PageDown】</span>
<span class="token environment constant">HOME</span>          <span class="token function">add</span> chapter <span class="token parameter variable">-1</span>            <span class="token comment">#播放列表 Home 【PageHome】</span>
END           <span class="token function">add</span> chapter <span class="token number">1</span>             <span class="token comment">#播放列表 End 【PageEnd】</span>

ESC           <span class="token builtin class-name">set</span> fullscreen no         <span class="token comment">#窗口-全屏 退出 【ESC】</span>
KP_ENTER      cycle fullscreen          <span class="token comment">#窗口-全屏 切换 【回车_小键盘】</span>
ENTER         cycle fullscreen          <span class="token comment">#窗口-全屏 切换 【回车】</span>
MBTN_LEFT_DBL cycle fullscreen          <span class="token comment">#窗口-全屏 切换 【鼠标_左键_双击】</span>
<span class="token number">1</span>             <span class="token builtin class-name">set</span> window-scale <span class="token number">0.5</span>      <span class="token comment">#窗口-大小 0.50 【1】</span>
<span class="token number">2</span>             <span class="token builtin class-name">set</span> window-scale <span class="token number">0.67</span>     <span class="token comment">#窗口-大小 0.67 【2】</span>
<span class="token number">3</span>             <span class="token builtin class-name">set</span> window-scale <span class="token number">0.75</span>     <span class="token comment">#窗口-大小 0.75 【3】</span>
<span class="token number">4</span>             <span class="token builtin class-name">set</span> window-scale <span class="token number">1.0</span>      <span class="token comment">#窗口-大小 1.0  【4】</span>
<span class="token number">5</span>             cycle ontop               <span class="token comment">#窗口-最前 切换 【5】</span>



<span class="token comment"># =======================================================</span>
<span class="token comment"># 音量、播放进度、播放速度、音频延迟、字幕延迟</span>
<span class="token comment"># =======================================================</span>
UP           <span class="token function">add</span> volume <span class="token number">2</span>         <span class="token comment">#音量 +2</span>
DOWN         <span class="token function">add</span> volume <span class="token parameter variable">-2</span>        <span class="token comment">#音量 -1</span>
Shift+UP     <span class="token function">add</span> volume  <span class="token number">10</span>       <span class="token comment">#音量 +10</span>
Shift+DOWN   <span class="token function">add</span> volume <span class="token parameter variable">-10</span>       <span class="token comment">#音量 -10</span>
WHEEL_UP     <span class="token function">add</span> volume <span class="token number">1</span>         <span class="token comment">#音量 +1 【鼠标_滚轮_向上】</span>
WHEEL_DOWN   <span class="token function">add</span> volume <span class="token parameter variable">-1</span>        <span class="token comment">#音量 -1 【鼠标_滚轮_向下】</span>

d            frame-back-step      <span class="token comment">#播放进度 前一帧</span>
f            frame-step           <span class="token comment">#播放进度 后一帧</span>
WHEEL_LEFT   seek <span class="token number">2</span>               <span class="token comment">#播放进度 向前2秒 【鼠标_滚轮_向左】</span>
WHEEL_RIGHT  seek <span class="token parameter variable">-2</span>              <span class="token comment">#播放进度 向后2秒 【鼠标_滚轮_向右】</span>
LEFT         seek <span class="token parameter variable">-2</span>              <span class="token comment">#播放进度 后退2秒 【左←】</span>
RIGHT        seek  <span class="token number">2</span>              <span class="token comment">#播放进度 前进2秒 【右→】</span>
Shift+LEFT   seek <span class="token parameter variable">-30</span> exact       <span class="token comment">#播放进度</span>
Shift+RIGHT  seek <span class="token number">30</span> exact        <span class="token comment">#播放进度 前进30秒 【Shift+右→】</span>

z            <span class="token builtin class-name">set</span> speed <span class="token number">1.0</span>        <span class="token comment">#播放速度 1</span>
c            <span class="token function">add</span> speed <span class="token number">0.1</span>        <span class="token comment">#播放速度 +0.1</span>
x            <span class="token function">add</span> speed <span class="token parameter variable">-0.1</span>       <span class="token comment">#播放速度 -0.1</span>
Shift+c      multiply speed <span class="token number">2.0</span>   <span class="token comment">#播放速度 x2</span>
Shift+x      multiply speed <span class="token number">0.5</span>   <span class="token comment">#播放速度 x0.5</span>

Ctrl+UP      <span class="token function">add</span> audio-delay <span class="token parameter variable">-0.1</span>      <span class="token comment">#音频延迟 -0.1</span>
Ctrl+DOWN    <span class="token function">add</span> audio-delay +0.1      <span class="token comment">#音频延迟 +0.1</span>
Ctrl+LEFT    <span class="token function">add</span> sub-delay <span class="token parameter variable">-0.1</span>        <span class="token comment">#字幕延迟 -0.1</span>
Ctrl+RIGHT   <span class="token function">add</span> sub-delay <span class="token number">0.1</span>         <span class="token comment">#字幕延迟 +0.1</span>



<span class="token comment"># =======================================================</span>
<span class="token comment"># 字幕、音频</span>
<span class="token comment"># =======================================================</span>
A             cycle audio               <span class="token comment">#声音-切换</span>
a             cycle mute                <span class="token comment">#声音-静音</span>

s             cycle sub                 <span class="token comment">#字幕-切换</span>
S             cycle sub-visibility      <span class="token comment">#字幕-隐藏</span>
n             <span class="token function">add</span> sub-pos <span class="token parameter variable">-1</span>            <span class="token comment">#字母-位置 -1</span>
m             <span class="token function">add</span> sub-pos +1            <span class="token comment">#字母-位置 +1</span>
,             <span class="token function">add</span> sub-scale <span class="token parameter variable">-0.05</span>       <span class="token comment">#字幕-大小 -0.05</span>
<span class="token builtin class-name">.</span>             <span class="token function">add</span> sub-scale +0.05       <span class="token comment">#字幕-大小 +0.05</span>



<span class="token comment"># =======================================================</span>
<span class="token comment"># 亮度、对比度、伽马、饱和度、色相，q全部重置</span>
<span class="token comment"># =======================================================</span>
q          <span class="token builtin class-name">set</span> contrast <span class="token number">0</span><span class="token punctuation">;</span> <span class="token builtin class-name">set</span> brightness <span class="token number">0</span><span class="token punctuation">;</span> <span class="token builtin class-name">set</span> gamma <span class="token number">0</span><span class="token punctuation">;</span> <span class="token builtin class-name">set</span> saturation <span class="token number">0</span><span class="token punctuation">;</span> <span class="token builtin class-name">set</span> hue <span class="token number">0</span>    <span class="token comment">#全部重置</span>

w          <span class="token function">add</span> brightness <span class="token parameter variable">-1</span>        <span class="token comment">#亮度</span>
e          <span class="token function">add</span> brightness <span class="token number">1</span>

r          <span class="token function">add</span> contrast <span class="token parameter variable">-1</span>          <span class="token comment">#对比度</span>
t          <span class="token function">add</span> contrast <span class="token number">1</span>

y          <span class="token function">add</span> gamma <span class="token parameter variable">-1</span>             <span class="token comment">#伽马</span>
u          <span class="token function">add</span> gamma <span class="token number">1</span>

i          <span class="token function">add</span> saturation <span class="token parameter variable">-1</span>        <span class="token comment">#饱和度</span>
o          <span class="token function">add</span> saturation <span class="token number">1</span>

p          <span class="token function">add</span> hue <span class="token parameter variable">-1</span>               <span class="token comment">#色相</span>
<span class="token punctuation">[</span>          <span class="token function">add</span> hue <span class="token number">1</span>

Ctrl+h     cycle-values hwdec <span class="token string">&quot;auto&quot;</span> <span class="token string">&quot;no&quot;</span>               <span class="token comment">#硬解软解-切换</span>
<span class="token function">v</span>          cycle deinterlace                            <span class="token comment">#反交错-切换</span>



<span class="token comment"># =======================================================</span>
<span class="token comment"># 媒体快捷键</span>
<span class="token comment"># =======================================================</span>
POWER quit
PLAY cycle pause
PAUSE cycle pause
PLAYPAUSE cycle pause
PLAYONLY <span class="token builtin class-name">set</span> pause no
PAUSEONLY <span class="token builtin class-name">set</span> pause <span class="token function">yes</span>
STOP quit
FORWARD seek <span class="token number">60</span>
REWIND seek <span class="token parameter variable">-60</span>
NEXT playlist-next
PREV playlist-prev
VOLUME_UP <span class="token function">add</span> volume <span class="token number">2</span>
VOLUME_DOWN <span class="token function">add</span> volume <span class="token parameter variable">-2</span>
MUTE cycle mute



<span class="token comment"># =======================================================</span>
<span class="token comment"># MySelf</span>
<span class="token comment"># =======================================================</span>
Shift+RIGHT     multiply speed <span class="token number">2.0</span>   <span class="token comment">#播放速度 x2</span>
Shift+LEFT      multiply speed <span class="token number">0.5</span>   <span class="token comment">#播放速度 x0.5</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2><p>配置</p>`,8),g={href:"https://hooke007.github.io/mpv-lazy/mpv.html",target:"_blank",rel:"noopener noreferrer"},y=n("li",null,"教程，非常全面",-1),w={href:"https://hooke007.github.io/unofficial/mpv_start.html",target:"_blank",rel:"noopener noreferrer"},x={href:"https://www.bilibili.com/read/cv13479755",target:"_blank",rel:"noopener noreferrer"},E=n("ul",null,[n("li",null,"配置"),n("li",null,"(๑•̀ㅂ•́)و✧")],-1),S={href:"https://www.bilibili.com/read/cv11615972",target:"_blank",rel:"noopener noreferrer"},P=n("ul",null,[n("li",null,"配置（备）")],-1),T={href:"https://www.ghacks.net/2019/07/27/how-to-customize-the-settings-in-mpv/",target:"_blank",rel:"noopener noreferrer"},N=n("p",null,"视频",-1),O={href:"https://www.bilibili.com/video/BV1nQ4y1a7gw/",target:"_blank",rel:"noopener noreferrer"};function D(L,M){const a=i("ExternalLinkIcon");return c(),t("div",null,[m,n("ul",null,[n("li",null,[s("mpv官网："),n("a",d,[s("https://mpv.io"),e(a)])]),n("li",null,[s("mpv手册："),n("a",v,[s("https://mpv.io/manual/master/"),e(a)])])]),r,n("ul",null,[u,b,n("li",null,[s("脚本（Script） "),n("a",k,[s("https://github.com/mpv-player/mpv/wiki/User-Scripts"),e(a)])])]),h,n("p",null,[n("a",f,[s("https://mpv.io/manual/master/#files"),e(a)])]),_,n("ul",null,[n("li",null,[n("s",null,[n("a",g,[s("https://hooke007.github.io/mpv-lazy/mpv.html"),e(a)])]),n("ul",null,[y,n("li",null,[s("停更，移至 "),n("a",w,[s("https://hooke007.github.io/unofficial/mpv_start.html"),e(a)])])])]),n("li",null,[n("a",x,[s("https://www.bilibili.com/read/cv13479755"),e(a)]),E]),n("li",null,[n("a",S,[s("https://www.bilibili.com/read/cv11615972"),e(a)]),P]),n("li",null,[n("a",T,[s("https://www.ghacks.net/2019/07/27/how-to-customize-the-settings-in-mpv/"),e(a)])])]),N,n("ul",null,[n("li",null,[n("a",O,[s("【软件分享】开源的全平台视频播放器MPV 使用教程"),e(a)])])])])}const I=l(p,[["render",D],["__file","mpv.html.vue"]]);export{I as default};
