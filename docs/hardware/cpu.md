---
title: 处理器
---

## 内存/缓存/MESI协议

参考：

+ 内存结构 <https://www.bilibili.com/video/BV16o4y1J71R/>
+ 缓存映射、替换 <https://www.bilibili.com/video/BV1yg4y1Y7kA/>

基于工程上的考虑（性能/成本），cpu 到主存储器之间的数据通信呈现如下结构：

```
cpu <-> cache (容量小，速度快) (SRAM) <-> 主存储器 (容量大，速度慢) (DRAM，俗称：内存/主存)

cache中存放主存储器的部分副本

+ 若cpu读出内容在cache中，则直接由cache传送给cpu
+ 若cpu读出内容不在cache中，则先将主存中一块固定数目的字读入cache中，然后再由cache将数据送给cpu
```

### 处理器缓存结构

上述缓存（cache）一般放在cpu内部。在单核/多核处理器的cache结构如下：

```
单核处理器中，通常包含两级cache。L1 cache 和 L2 cache。

+ L1 中指令和数据使用各自的缓存 L1I、L1D。通常 L1 空间 几十k。
+ L2 中程序和数据共用一套缓存。通常 L2 空间 几百k。

┌──────┐  
│Core  │  
└┬────┬┘  
┌▽──┐┌▽──┐
│L1D││L1I│
└┬──┘└┬──┘
┌▽────▽┐  
│L2    │  
└──────┘  

在多核处理器中，一般每个内核独享自己的L1、L2，所有内核共享一个容量更大的L3

┌───────┐┌──────────┐   
│Core1  ││Core2     │   
└┬─────┬┘└───┬─────┬┘   
┌▽───┐┌▽───┐┌▽───┐┌▽───┐
│L1I ││L1D ││L1D ││L1I │
└┬───┘└┬───┘└┬───┘└┬───┘
┌▽─────▽┐┌───▽─────▽┐   
│L2     ││L2        │   
└┬──────┘└┬─────────┘   
┌▽────────▽┐            
│L3        │            
└──────────┘  
```

### 处理器缓存映射方式

整个cache空间被划分成多个lines，每个line通常是32byte或者64byte等等。**cache line是cache和内存交换数据的最小单位。**

每个cache line至少包含如下3个部分：

```
cache line 0 = valid | tag | block
cache line 1 = valid | tag | block
cache line 2 = valid | tag | block
cache line 3 = valid | tag | block
...

valid 表示cache line是否有效
tag 记录该缓存数据对应的内存地址
block 记录该缓存地址对应的数据
```

::: tip
内存以字节为存储单位，但是由于内存和cache交换数据的最小单位是一个cache line，所以下面将内存也看成按line方式存储。
:::

Cache映射方式 | 直接映射 | 全关联cache <br>Full-associative Cache | 组关联cache <br> Set associative Cache
--- | --- | --- | ---
说明 | cache中一个块同时负责多个内存块数据 <table><tr><td>cache地址</td><td>内存地址</td></tr><tr><td>1</td><td>1,2,3,4,5,6,7,8</td></tr><tr><td>2</td><td>9,10,11,12,13,14,15,16</td></tr><tr><td colspan=2>...</td></tr></table> | 内存中的每一个line能够被映射到cache中的任意line中 | 对主存行号取模，同模的在cache组中随便放 <table><tr><td>cache地址</td><td>内存地址</td></tr><tr><td>组1：1,2,3,4</td><td>1,5,9,13,17,...</td></tr><tr><td>组2：5,6,7,8</td><td>2,6,10,14,18,...</td></tr><tr><td colspan=2>...</td></tr></table> 
主存物理地址 | 标记+cache行号+块内地址 | 标记+块内地址 | 标记+组号+块内地址
优点 | 硬件实现简单 
缺点 | <ul><li>块冲突高 —— 一个cache负责多个内存块</li><li>cache命中率低 —— 多数缓存不常被访问</li></ul> | 当判断一个数据不在cache时，需要匹配所有cache line的tag。所以处理成本太高，实际处理器不使用！

### 缓存替换策略

todo <https://www.bilibili.com/video/BV1yg4y1Y7kA/>

### 缓存一致性问题

在多处理机系统中，每个处理器都有一级或者二级cache。由此产生了cache一致性问题。

**cache一致性问题**： 同一个数据的多个副本可能同时存储在不同的cache中。如果处理器自由地修改它们的本地副本，则会导致不同处理器观察到的结果不一致。

为了解决cache一致性问题，引入了“写策略”和“cache一致性协议”：

#### 写策略

当 cache 中某一块被替换之前，必须考虑它是否被修改过。如果修改过，那么主存储器必须做出相应的修改，才可替换。

  策略 | 写直达（write through） | 回写（write back）
  --- | --- | ---
  描述 | 写操作对主存和cache同时进行，保证主存有效。 | 只在cache中修改，并设置修改位。<br>只有当块被替换，且修改位置位时，才将它写回主存。
  优点 | <ul><li>实现简单。主存储器总是有效的。</li><li>其他处理器可直接监视对主存储器的访问，以维护自己的cache一致性。</li></ul> | <ul><li>减少存储器的写入</li></ul>
  缺点 | <ul><li>产生大量的存储信息量，可能变成系统的瓶颈。</li></ul> | <ul><li>电路复杂</li><li>部分存储器是无效的，因此IO模块的存取只能通过cache进行。</li></ul>

  由于“写直达”有大量的访问内粗操作，效率低，所以大多数处理器都使用“写回”策略。

#### cache一致性协议

+ 监听协议
  + 各cache控制器都要维护cache一致性
  + 一个cache必须识别出何时它的行是与其他cache共享的
  + 对共享的cache行进行修改时，必须通过广播通知其他cache
  + 各cache控制器能监听网络，并对广播做出相应反应
+ 目录协议
  + 目录含有各局部cache内容的全局性状态信息
  + 目录检查cache控制器请求，并发出必要的命令
  + 目录负责维护状态信息的更新
  + 影响行的全局状态的局部动作必须上报中央控制器

##### MESI协议

参考：

+ MESI/Store Buffer/Invalid Queue - <https://www.bilibili.com/video/BV1kD4y1T7XU/>
+ 内存屏障/volatile/JMM - <https://www.bilibili.com/video/BV1cT411a7Sn/>

cache 行有下面四种状态，这四种状态能两两转换

简写 | 全称 | 描述 | 监听任务
--- | --- | --- | ---
M | Modify 修改 | 该cache line有效，数据和内存中的数据不一致（数据被修改了），数据只存在与本cache中 | 监听所有读取该缓存行相对主存的操作。要求这些读操作必须在该缓存行被写回主存并设置状态为S（共享）前被延迟执行
E | Exclusive 独占 | 该cache line有效，数据和内存中的数据一致，数据只存在与本cache中 | 监听所有读取该缓存行相对主存的操作。一旦有这种操作，该缓存行需要变为S（共享）状态
S | Share 共享 | 该cache line有效，数据和内存中的数据一致，数据存在与很多cache中 | 监听其他缓存使该缓存行I（无效）或者E（独享）的请求
I | Invalid 失效 | 该cache line无效 | 无

<table>
  <thead>
    <th>当前状态</th>
    <th>事件</th>
    <th>行为</th>
    <th>下一个状态</th>
  </thead>
  <tbody>
    <!-- Modify -->
    <tr>
      <td rowspan=4>M</td>
      <td>local read</td>
      <td>从cache中读，状态不变</td>
      <td>M</td>
    </tr>
    <tr>
      <td>local write</td>
      <td>修改cache数据，状态不变</td>
      <td>M</td>
    </tr>
    <tr>
      <td>remote read</td>
      <td>这行数据被写入到内存中，使其他cpu核心能使用到最新的数据，状态改为S</td>
      <td>S</td>
    </tr>
    <tr>
      <td>remote write</td>
      <td>这行数据被写入到内存中，其他cpu核心可以获取到最新的数据。由于其他cpu核心修改这条数据，所以本地cache变为I</td>
      <td>I</td>
    </tr>
    <!-- Exclusive -->
    <tr>
      <td rowspan=4>E</td>
      <td>local read</td>
      <td>从cache中读数据，状态不变</td>
      <td>E</td>
    </tr>
    <tr>
      <td>local write</td>
      <td>修改数据，状态为M</td>
      <td>M</td>
    </tr>
    <tr>
      <td>remote read</td>
      <td>数据和其他cpu核心共享，变成S</td>
      <td>S</td>
    </tr>
    <tr>
      <td>remote write</td>
      <td>数据被修改，本地缓存失效，变成I</td>
      <td>I</td>
    </tr>
    <!-- Share -->
    <tr>
      <td rowspan=4>S</td>
      <td>local read</td>
      <td>从cache中读数据，状态不变</td>
      <td>S</td>
    </tr>
    <tr>
      <td>local write</td>
      <td>修改数据，状态为M；其他cpu核心的cache line状态变成I</td>
      <td>M</td>
    </tr>
    <tr>
      <td>remote read</td>
      <td>数据和其他cpu核心共享，状态不变</td>
      <td>S</td>
    </tr>
    <tr>
      <td>remote write</td>
      <td>数据被修改，本地缓存失效，变成I</td>
      <td>I</td>
    </tr>
    <!-- Invalid -->
    <tr>
      <td rowspan=4>I</td>
      <td>local read</td>
      <td>
        <ul>
          <li>如果其他cpu核心中没有这份数据，本次缓存从内存中取该数据，状态变为E</li>
          <li>如果其他cpu核心中有这份数据，且缓存行状态为M，则先把该缓存行数据写回到内存，然后本地cache再从内存读取数据。这时两边的cache状态都是S</li>
          <li>如果其他cpu核心中有这份数据，且缓存行状态为S或者E，则本地cache从内存中取数据，并且将相关的缓存状态变为S</li>
        </ul>
      </td>
      <td>E或者S</td>
    </tr>
    <tr>
      <td>local write</td>
      <td>
        <li>如果其他cpu核心中没有这份数据，本次缓存从内存中取该数据，然后修改。状态变为M</li>
        <li>如果其他cpu核心中有这份数据，且缓存行状态为M，则先把该缓存行数据写回到内存，然后本地cache再从内存读取数据，然后修改。本地状态M，其他原数据cache line状态I</li>
        <li>如果其他cpu核心中有这份数据，且缓存行状态为S或者E，则本地cache从内存中取数据。本地状态M，其他原数据cache line状态I</li>
      </td>
      <td>M</td>
    </tr>
    <tr>
      <td>remote read</td>
      <td>本地为Invalid，别的cpu操作不影响</td>
      <td>I</td>
    </tr>
    <tr>
      <td>remote write</td>
      <td>本地为Invalid，别的cpu操作不影响</td>
      <td>I</td>
    </tr>
  </tbody>
</table>
