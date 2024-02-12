---
title: OpenVPN 使用笔记
---

官方教程： <https://openvpn.net/community-resources/how-to/#setting-up-your-own-certificate-authority-ca-and-generating-certificates-and-keys-for-an-openvpn-server-and-multiple-clients>

## 服务端（Server）

> 参考：
>
> + 配置 | openwrt | OpenVPN server —— <https://openwrt.org/docs/guide-user/services/vpn/openvpn/server> 【❗重要】
> + 配置 | openwrt | OpenVPN extras —— <https://openwrt.org/docs/guide-user/services/vpn/openvpn/extras>
>
> + 配置 - 视频 | youtube | OpenWRT - Configure OpenVPN Server —— <https://www.youtube.com/watch?v=P8JZnmXlzBw>
>
> + 配置/证书 | youtube | Setting Up OpenWRT OpenVPN Server and Certificate Creation —— <https://www.youtube.com/watch?v=8mmPXGj-63o>
>
> + 脚本 | github | DavBfr/luci-app-openvpn-server | —— <https://github.com/DavBfr/luci-app-openvpn-server>

## 客户端（Client）

OpenVPN client using LuCI —— https://openwrt.org/docs/guide-user/services/vpn/openvpn/client-luci

How to Configure OpenVPN Client on OpenWRT —— https://www.youtube.com/watch?v=nT_-D5ufZgM

## 场景

### 在 OpenWrt 上通过 luci 配置服务端/客户端

参考：

+ Openwrt Luci Openvpn 服务器多设备同时接入 —— <https://ibrights.github.io/post/blog20210413/>

todo 图文

#### 原理

服务端的话，貌似 `luci-app-openvpn` + `openvpn-openssl` 就能解决问题。 `luci-app-openvpn-server` 提供的是一键搭建服务端的功能。

```bash
$ opkg search /etc/init.d/openvpn 
openvpn-openssl - 2.5.3-4

$ opkg list | grep openvpn
luci-app-openvpn - git-23.013.73129-749268a
luci-app-openvpn-server - 2.0
luci-i18n-openvpn-server-zh-cn - git-21.134.64880-4f62c44
luci-i18n-openvpn-zh-cn - git-23.090.62029-650e6d2
openvpn-easy-rsa - 3.0.8-3
openvpn-openssl - 2.5.3-4

$ opkg depends openvpn-openssl
openvpn-openssl depends on:
        libc
        kmod-tun
        liblzo2
        libopenssl1.1
$ opkg files openvpn-openssl
Package openvpn-openssl (2.5.3-4) is installed on root and has the following files:
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
Package luci-app-openvpn (git-23.013.73129-749268a) is installed on root and has the following files:
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
Package luci-app-openvpn-server (2.0) is installed on root and has the following files:
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
$ root@ImmortalWrt_D2550:~# cat /etc/config/openvpn
config openvpn 'myvpn'
        option dev 'tun'
        option topology 'subnet'
        option server '10.8.0.0 255.255.255.0'
        option comp_lzo 'adaptive'
        option ca '/etc/openvpn/ca.crt'
        option dh '/etc/openvpn/dh1024.pem'
        option cert '/etc/openvpn/server.crt'
        option key '/etc/openvpn/server.key'
        option persist_key '1'
        option persist_tun '1'
        option user 'nobody'
        option group 'nogroup'
        option max_clients '10'
        option keepalive '10 120'
        option verb '3'
        option status '/var/log/openvpn_status.log'
        option log '/tmp/openvpn.log'
        list push 'route 192.168.1.0 255.255.255.0'
        list push 'comp-lzo adaptive'
        list push 'redirect-gateway def1 bypass-dhcp'
        list push 'dhcp-option DNS 192.168.1.1'
        option enabled '1'
        option ddns 'hello.world.com'
        option port '1194'
        option proto 'tcp6'
```

这里注意到 

todo

#### 场景： 多用户接入（公用相同证书）

todo `duplicate-cn 1`

## 问题

### Compression has been used in the past to break encryption

警告： `Sun Feb 11 01:59:46 2024 daemon.warn openvpn(myvpn)[8141]: WARNING: Compression for receiving enabled. Compression has been used in the past to break encryption. Sent packets are not compressed unless "allow-compression yes" is also set.`

todo 处理
