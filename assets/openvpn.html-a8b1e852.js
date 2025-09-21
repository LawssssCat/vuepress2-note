import{_ as l,r,o as p,c as o,a as n,b as e,d as i,e as a}from"./app-04e6f892.js";const t={},c={href:"https://openvpn.net/community-resources/how-to/#setting-up-your-own-certificate-authority-ca-and-generating-certificates-and-keys-for-an-openvpn-server-and-multiple-clients",target:"_blank",rel:"noopener noreferrer"},d=n("h2",{id:"服务端-server",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#服务端-server","aria-hidden":"true"},"#"),e(" 服务端（Server）")],-1),v=n("p",null,"参考：",-1),u={href:"https://openwrt.org/docs/guide-user/services/vpn/openvpn/server",target:"_blank",rel:"noopener noreferrer"},b={href:"https://openwrt.org/docs/guide-user/services/vpn/openvpn/extras",target:"_blank",rel:"noopener noreferrer"},m={href:"https://www.youtube.com/watch?v=P8JZnmXlzBw",target:"_blank",rel:"noopener noreferrer"},h={href:"https://www.youtube.com/watch?v=8mmPXGj-63o",target:"_blank",rel:"noopener noreferrer"},g={href:"https://github.com/DavBfr/luci-app-openvpn-server",target:"_blank",rel:"noopener noreferrer"},k=a('<h2 id="客户端-client" tabindex="-1"><a class="header-anchor" href="#客户端-client" aria-hidden="true">#</a> 客户端（Client）</h2><p>OpenVPN client using LuCI —— https://openwrt.org/docs/guide-user/services/vpn/openvpn/client-luci</p><p>How to Configure OpenVPN Client on OpenWRT —— https://www.youtube.com/watch?v=nT_-D5ufZgM</p><h2 id="场景" tabindex="-1"><a class="header-anchor" href="#场景" aria-hidden="true">#</a> 场景</h2><h3 id="在-openwrt-上通过-luci-配置服务端-客户端" tabindex="-1"><a class="header-anchor" href="#在-openwrt-上通过-luci-配置服务端-客户端" aria-hidden="true">#</a> 在 OpenWrt 上通过 luci 配置服务端/客户端</h3><p>参考：</p>',6),y={href:"https://ibrights.github.io/post/blog20210413/",target:"_blank",rel:"noopener noreferrer"},f=a(`<p>todo 图文</p><h4 id="原理" tabindex="-1"><a class="header-anchor" href="#原理" aria-hidden="true">#</a> 原理</h4><p>服务端的话，貌似 <code>luci-app-openvpn</code> + <code>openvpn-openssl</code> 就能解决问题。 <code>luci-app-openvpn-server</code> 提供的是一键搭建服务端的功能。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ opkg search /etc/init.d/openvpn 
openvpn-openssl - <span class="token number">2.5</span>.3-4

$ opkg list <span class="token operator">|</span> <span class="token function">grep</span> openvpn
luci-app-openvpn - git-23.013.73129-749268a
luci-app-openvpn-server - <span class="token number">2.0</span>
luci-i18n-openvpn-server-zh-cn - git-21.134.64880-4f62c44
luci-i18n-openvpn-zh-cn - git-23.090.62029-650e6d2
openvpn-easy-rsa - <span class="token number">3.0</span>.8-3
openvpn-openssl - <span class="token number">2.5</span>.3-4

$ opkg depends openvpn-openssl
openvpn-openssl depends on:
        libc
        kmod-tun
        liblzo2
        libopenssl1.1
$ opkg files openvpn-openssl
Package openvpn-openssl <span class="token punctuation">(</span><span class="token number">2.5</span>.3-4<span class="token punctuation">)</span> is installed on root and has the following files:
/etc/openvpn.user
/etc/hotplug.d/openvpn/01-user
/etc/init.d/openvpn
/lib/functions/openvpn.sh
/usr/sbin/openvpn
/usr/share/openvpn/openvpn.options
/lib/upgrade/keep.d/openvpn
/usr/libexec/openvpn-hotplug

$ opkg depends luci-app-openvpn
luci-app-openvpn depends on:
        libc
        luci-compat
$ opkg files luci-app-openvpn
Package luci-app-openvpn <span class="token punctuation">(</span>git-23.013.73129-749268a<span class="token punctuation">)</span> is installed on root and has the following files:
/usr/lib/lua/luci/model/cbi/openvpn-basic.lua
/usr/lib/lua/luci/controller/openvpn.lua
/usr/lib/lua/luci/model/cbi/openvpn.lua
/usr/lib/lua/luci/model/cbi/openvpn-advanced.lua
/usr/lib/lua/luci/view/openvpn/pageswitch.htm
/usr/lib/lua/luci/model/cbi/openvpn-file.lua
/usr/share/rpcd/acl.d/luci-app-openvpn.json
/usr/lib/lua/luci/view/openvpn/ovpn_css.htm
/usr/lib/lua/luci/view/openvpn/cbi-select-input-add.htm
/etc/config/openvpn_recipes

$ opkg depends luci-app-openvpn-server 
luci-app-openvpn-server depends on:
        libc
        openvpn-openssl
        openvpn-easy-rsa
        kmod-tun
$ opkg files luci-app-openvpn-server
Package luci-app-openvpn-server <span class="token punctuation">(</span><span class="token number">2.0</span><span class="token punctuation">)</span> is installed on root and has the following files:
/etc/openvpn/server.crt
/etc/openvpn/server.key
/usr/share/rpcd/acl.d/luci-app-openvpn-server.json
/etc/easy-rsa/keys/index.txt
/etc/genovpn.sh
/etc/easy-rsa/keys/client1.p12
/etc/config/openvpn
/usr/lib/lua/luci/view/openvpn/openvpn_status.htm
/etc/easy-rsa/keys/dh1024.pem
/etc/easy-rsa/keys/ca.crt
/etc/easy-rsa/keys/serial.old
/etc/openvpn/client1.crt
/etc/openvpncert.sh
/usr/lib/lua/luci/model/cbi/openvpn-server/openvpn-server.lua
/etc/easy-rsa/keys/ca.key
/etc/easy-rsa/keys/index.txt.attr.old
/usr/lib/lua/luci/controller/openvpn-server.lua
/etc/easy-rsa/keys/client1.crt
/etc/uci-defaults/openvpn
/etc/easy-rsa/keys/client1.csr
/etc/easy-rsa/keys/index.txt.old
/etc/openvpn/client1.key
/etc/openvpn/dh1024.pem
/etc/easy-rsa/keys/client1.key
/etc/easy-rsa/vars
/etc/easy-rsa/keys/serial
/etc/easy-rsa/keys/server.crt
/etc/easy-rsa/keys/server.csr
/etc/easy-rsa/keys/01.pem
/etc/easy-rsa/keys/server.key
/etc/easy-rsa/keys/02.pem
/etc/easy-rsa/keys/index.txt.attr
/etc/openvpn/ca.crt
/etc/ovpnadd.conf
/etc/easy-rsa/openssl-1.0.0.cnf
$ root@ImmortalWrt_D2550:~<span class="token comment"># cat /etc/config/openvpn</span>
config openvpn <span class="token string">&#39;myvpn&#39;</span>
        option dev <span class="token string">&#39;tun&#39;</span>
        option topology <span class="token string">&#39;subnet&#39;</span>
        option server <span class="token string">&#39;10.8.0.0 255.255.255.0&#39;</span>
        option comp_lzo <span class="token string">&#39;adaptive&#39;</span>
        option ca <span class="token string">&#39;/etc/openvpn/ca.crt&#39;</span>
        option dh <span class="token string">&#39;/etc/openvpn/dh1024.pem&#39;</span>
        option cert <span class="token string">&#39;/etc/openvpn/server.crt&#39;</span>
        option key <span class="token string">&#39;/etc/openvpn/server.key&#39;</span>
        option persist_key <span class="token string">&#39;1&#39;</span>
        option persist_tun <span class="token string">&#39;1&#39;</span>
        option user <span class="token string">&#39;nobody&#39;</span>
        option group <span class="token string">&#39;nogroup&#39;</span>
        option max_clients <span class="token string">&#39;10&#39;</span>
        option keepalive <span class="token string">&#39;10 120&#39;</span>
        option verb <span class="token string">&#39;3&#39;</span>
        option status <span class="token string">&#39;/var/log/openvpn_status.log&#39;</span>
        option log <span class="token string">&#39;/tmp/openvpn.log&#39;</span>
        list push <span class="token string">&#39;route 192.168.1.0 255.255.255.0&#39;</span>
        list push <span class="token string">&#39;comp-lzo adaptive&#39;</span>
        list push <span class="token string">&#39;redirect-gateway def1 bypass-dhcp&#39;</span>
        list push <span class="token string">&#39;dhcp-option DNS 192.168.1.1&#39;</span>
        option enabled <span class="token string">&#39;1&#39;</span>
        option ddns <span class="token string">&#39;hello.world.com&#39;</span>
        option port <span class="token string">&#39;1194&#39;</span>
        option proto <span class="token string">&#39;tcp6&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里注意到</p><p>todo</p><h4 id="场景-多用户接入-公用相同证书" tabindex="-1"><a class="header-anchor" href="#场景-多用户接入-公用相同证书" aria-hidden="true">#</a> 场景： 多用户接入（公用相同证书）</h4><p>todo <code>duplicate-cn 1</code></p><h2 id="问题" tabindex="-1"><a class="header-anchor" href="#问题" aria-hidden="true">#</a> 问题</h2><h3 id="compression-has-been-used-in-the-past-to-break-encryption" tabindex="-1"><a class="header-anchor" href="#compression-has-been-used-in-the-past-to-break-encryption" aria-hidden="true">#</a> Compression has been used in the past to break encryption</h3><p>警告： <code>Sun Feb 11 01:59:46 2024 daemon.warn openvpn(myvpn)[8141]: WARNING: Compression for receiving enabled. Compression has been used in the past to break encryption. Sent packets are not compressed unless &quot;allow-compression yes&quot; is also set.</code></p><p>todo 处理</p>`,12);function _(w,x){const s=r("ExternalLinkIcon");return p(),o("div",null,[n("p",null,[e("官方教程： "),n("a",c,[e("https://openvpn.net/community-resources/how-to/#setting-up-your-own-certificate-authority-ca-and-generating-certificates-and-keys-for-an-openvpn-server-and-multiple-clients"),i(s)])]),d,n("blockquote",null,[v,n("ul",null,[n("li",null,[n("p",null,[e("配置 | openwrt | OpenVPN server —— "),n("a",u,[e("https://openwrt.org/docs/guide-user/services/vpn/openvpn/server"),i(s)]),e(" 【❗重要】")])]),n("li",null,[n("p",null,[e("配置 | openwrt | OpenVPN extras —— "),n("a",b,[e("https://openwrt.org/docs/guide-user/services/vpn/openvpn/extras"),i(s)])])]),n("li",null,[n("p",null,[e("配置 - 视频 | youtube | OpenWRT - Configure OpenVPN Server —— "),n("a",m,[e("https://www.youtube.com/watch?v=P8JZnmXlzBw"),i(s)])])]),n("li",null,[n("p",null,[e("配置/证书 | youtube | Setting Up OpenWRT OpenVPN Server and Certificate Creation —— "),n("a",h,[e("https://www.youtube.com/watch?v=8mmPXGj-63o"),i(s)])])]),n("li",null,[n("p",null,[e("脚本 | github | DavBfr/luci-app-openvpn-server | —— "),n("a",g,[e("https://github.com/DavBfr/luci-app-openvpn-server"),i(s)])])])])]),k,n("ul",null,[n("li",null,[e("Openwrt Luci Openvpn 服务器多设备同时接入 —— "),n("a",y,[e("https://ibrights.github.io/post/blog20210413/"),i(s)])])]),f])}const P=l(t,[["render",_],["__file","openvpn.html.vue"]]);export{P as default};
