import socket
import os
import sys

def retBanner(ip, port):
    try:
        socket.setdefaulttimeout(2)
        s = socket.socket()
        s.connect((ip, port))
        banner = s.recv(1024) # 读取套接字中接下来的 1024B 数据
        return banner
    except:
        return
lines = (
    "3Com 3CDaemon FTP Server Version 2.0",
    "Ability Server 2.34",
    "CCProxy Telnet Service Ready",
    "ESMTP TABS Mail Server for Windows NT",
    "FreeFloat Ftp Server (Version 1.00),"
    "IMAP4rev1 MDaemon 9.6.4 ready",
    "MailEnable Service, Version: 0-1.54",
    "NetDecision-HTTP-Server 1.0",
    "PSO Proxy 0.9",
    "SAMBAR",
    "Sami FTP Server 2.0.2",
    "Spipe 1.0",
    "TelSrv 1.5",
    "WDaemon 6.8.5",
    "WinGate 6.1.1",
    "Xitami",
    "YahooPOPs! Simple Mail Transfer Service Ready"
)
def checkVulns(banner):
    for line in lines:
        if line in banner:
            print('[+] Server is vulnerable: {}'.format(banner))
def main():
    portList = [21,22,25,80,110,443]
    for x in range(147,150):
        ip = '192.168.95.{}'.format(x)
        for port in portList:
            banner = retBanner(ip, port)
            if banner:
                print('[+] {}:{}'.format(ip, banner))
                checkVulns(banner)

if __name__ == '__main__':
    main()
