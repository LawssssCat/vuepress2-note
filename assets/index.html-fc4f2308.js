import{_ as t,o as d,c as e,e as i}from"./app-01e1299e.js";const a={},r=i('<p>todo https://www.bilibili.com/video/BV1MT411x7GH 完整版Kubernetes（K8S）全套入门+微服务实战项目，带你一站式深入掌握K8S核心能力</p><p>前置：</p><ul><li>Linux</li><li>Docker</li></ul><p>可选：</p><ul><li>Java 微服务</li><li>Redis</li><li>Elasticsearch</li><li>Prometheus</li><li>Jenkins</li></ul><h2 id="微服务" tabindex="-1"><a class="header-anchor" href="#微服务" aria-hidden="true">#</a> 微服务</h2><h3 id="微服务通信" tabindex="-1"><a class="header-anchor" href="#微服务通信" aria-hidden="true">#</a> 微服务通信</h3><p>通信协议：</p><ul><li>REST API</li><li>RPC</li><li>MQ</li></ul><h4 id="rpc框架" tabindex="-1"><a class="header-anchor" href="#rpc框架" aria-hidden="true">#</a> RPC框架</h4><p>考虑</p><ul><li>I/O、线程调度模型</li><li>序列化方式</li><li>多语言支持</li><li>服务治理</li></ul><p>流行的RPC框架</p><table><thead><tr><th>RPC对比</th><th>Dubbo/Dubbox</th><th>Motan</th><th>Thrift</th><th>Grpc</th></tr></thead><tbody><tr><td>开发团队</td><td>Dubbo - 阿里 <br> Dubbox - 当当</td><td>新浪微博</td><td>apache</td><td>google</td></tr><tr><td>开发语言</td><td>Java</td><td>Java</td><td>跨语言</td><td>跨语言</td></tr><tr><td>服务治理</td><td>✅</td><td>✅</td><td>❌</td><td>❌</td></tr><tr><td>多种序列化</td><td>✅</td><td>✅</td><td>只支持thrift</td><td>只支持protobuf</td></tr><tr><td>多种注册中心</td><td>✅</td><td>✅</td><td>❌</td><td>❌</td></tr><tr><td>管理中心</td><td>✅</td><td>✅</td><td>❌</td><td>❌</td></tr><tr><td>跨语言通信</td><td>❌</td><td>❌</td><td>✅</td><td>✅</td></tr><tr><td><s>整理性能</s></td><td>3</td><td>4</td><td>5</td><td>3</td></tr><tr><td>通信架构</td><td><img src="https://s2.loli.net/2024/03/06/yr5gho7T3i18bks.png" alt="image.png"></td><td><img src="https://s2.loli.net/2024/03/06/YANgHPkIZVjpoMz.png" alt="image.png"></td><td><img src="https://s2.loli.net/2024/03/06/25ZunBshdkGP7V9.png" alt="image.png"></td><td><img src="https://s2.loli.net/2024/03/06/8rgYWh3QyUMpfoc.png" alt="image.png"></td></tr></tbody></table><h3 id="服务发现" tabindex="-1"><a class="header-anchor" href="#服务发现" aria-hidden="true">#</a> 服务发现</h3><p>传统服务配置 —— 需要运维人员手动配置</p><p><img src="https://s2.loli.net/2024/03/06/8GRUtZn7J93apfC.png" alt="image.png"></p><p>客户端发现 —— 访问多个ip，ip后的服务器直接提供服务</p><p><img src="https://s2.loli.net/2024/03/06/5mMdiRu2sWTGweO.png" alt="image.png"></p><p>服务端发现 —— 访问一个ip，ip后的服务器通过正向代理方式提供服务</p><p><img src="https://s2.loli.net/2024/03/06/w9WSpPJIlG6AmZN.png" alt="image.png"></p><h3 id="服务部署、更新、扩容" tabindex="-1"><a class="header-anchor" href="#服务部署、更新、扩容" aria-hidden="true">#</a> 服务部署、更新、扩容</h3><p>传统方式 —— 准备代码、准备制品、准备服务器、修改配置，分配端口、运维部署应用（手动/脚本/自动化）、配置反向代理</p><p>服务编排 —— 服务发现、服务部署/更新/扩容</p><table><thead><tr><th>流行的服务编排工具</th><th>Mesos</th><th>Docker Swarm</th><th>Kubernetes</th></tr></thead><tbody><tr><td>todo</td><td></td><td></td><td></td></tr></tbody></table><h2 id="容器化介绍" tabindex="-1"><a class="header-anchor" href="#容器化介绍" aria-hidden="true">#</a> 容器化介绍</h2><h3 id="部署方式对比" tabindex="-1"><a class="header-anchor" href="#部署方式对比" aria-hidden="true">#</a> 部署方式对比</h3><p>todo 2</p>',28),h=[r];function l(p,n){return d(),e("div",null,h)}const o=t(a,[["render",l],["__file","index.html.vue"]]);export{o as default};
