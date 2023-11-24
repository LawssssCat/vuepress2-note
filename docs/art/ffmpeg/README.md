---
title: FFmpeg 使用笔记
tags:
  - ffmpeg
  - 音频
  - 视频
---

## 合并音频脚本

错误示例 （<https://www.jianshu.com/p/7ecaee04bdc6>）

1. 超级慢
2. 经过转码，音质损坏

```bash
#!/bin/bash
for line in `cat wav.txt`; do 
	echo "-------------"$line; 
	if [[ -f output.mp3 ]]; then
		mv output.mp3 temp.mp3;
		ffmpeg -i temp.mp3 -i $line -c:v copy -filter_complex "[0:0] [1:0] concat=n=2:v=0:a=1 [a]" -map [a] output.mp3; 
	else 
		cp $line output.mp3;
	fi
done
```

正确示例 （<https://www.python100.com/html/QG88S7G84MY5.html>）

1. 快
2. 无损

```bash
#!/bin/bash

dir=$1
suffix=$2

find $dir -name *.$suffix | awk '{print "file "$1}' > list.txt
ffmpeg -f concat -i list.txt -c copy output.$suffix
```

```bash
# $1 - 目录位置
# $2 - 文件后缀
./script.sh "MP3" "mp3"
```
