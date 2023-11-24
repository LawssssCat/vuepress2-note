---
title: 大数据
---

## 路线图

<mermaid>
{{`
mindmap
  root((基础))
  ::icon(fa fa-check-square)
    数据结构和算法
    Linux操作系统
    计算机网络
    数据库
    消息队列
    Java语法基础
`}}
</mermaid>
<mermaid>
{{`
mindmap
  root((核心))
  ::icon(fa fa-check-square)
    数据仓库
    任务调度
    实时计算
    离线计算
    部署运维
    数据采集
    数据分析
    流/批处理
    BI分析
    数据传输
    算法
    ...
`}}
</mermaid>
<mermaid>
{{`
mindmap
  root((技术栈))
  ::icon(fa fa-check-square)
    HDFS
    Yarn
    Sqoop
    Flume
    Hive🔥
    Hbase🔥
    Zookeeper🔥
    Spark🔥
    Flink🔥 - 实时计算
    Scala🔥
    Kafka
    Presto
    Storm
    Mesos
    ...
`}}
</mermaid>

### 数据仓库

技术框架：

![ljilgmb4uqzJhA9T-image-1700621825912.png](https://s2.loli.net/2023/11/23/72afMcRVXko64JI.png)

ADS 应用数据层 - 数据集市 \
DWS 轻度汇总层 - 主题宽表 \
DWD 明细数据层 - dim表 \
ODS 原始数据层 \
STG 缓冲数据层

#### 数据开发

采集数据

#### ETL、BI

+ ETL - 聚类数据
+ BI - 可视化数据

<mermaid>
{{`
flowchart TD
subgraph S1["业务系统"]
  S1L1["财务系统"]
  S1L2["CRM系统"]
  S1L3["销售系统"]
  S1L4["人力资源系统"]
end
subgraph S2["数据仓库管理系统"]
  S2L1["ETL"]
  S2L2{"计算分析"}
  S2L3[("DB")]
  S2L1 --> S2L2 --> S2L3
end
S1L1 --> S2L1
S1L2 --> S2L1
S1L3 --> S2L1
S1L4 --> S2L1
`}}
</mermaid>

工作比较简单，但是需要经验，起薪高但瓶颈快。后期核能转数据开发、数据分析。

视频

+ [ ] 大数据开发项目实战：kettle开发案例、ETL电商订单综合案例【黑马程序员】 - <https://www.bilibili.com/video/BV13e411N7hk/>
+ [ ] 大数据ETL开发综合实战案例，轻松进阶ETL工程师--Python大数据开发V3.0系列教程第04部 - <https://www.bilibili.com/video/BV1AT411X7hd/>
+ [ ] 一套搞定大数据ETL开发工程师必备技能——Linux、MySQL、Excel、FineBI、ETL处理工具kettle - <https://www.bilibili.com/video/BV1mG41137WV/>
一[ ] 套搞定大数据ETL开发工程师必备技能——Linux、MySQL、Excel、FineBI、ETL处理工具kettle
+ [ ] ETL银行项目(项目流程&结构理论) - <https://www.bilibili.com/video/BV1k3411A7A7/>

#### 数据分析

加工数据
