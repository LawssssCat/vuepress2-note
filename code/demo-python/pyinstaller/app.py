'''
初始化：所有的Flask都必须创建程序实例，
web服务器使用wsgi协议，把客户端所有的请求都转发给这个程序实例
程序实例是Flask的对象，一般情况下用如下方法实例化
Flask类只有一个必须指定的参数，即程序主模块或者包的名字，__name__是系统变量，该变量指的是本py文件的文件名
'''
from flask import Flask
import datetime

server=Flask(__name__)

@server.route('/time',methods=['post','get'])
def get_time():
    now=str(datetime.datetime.now())#把当前时间转换成字符串
    return "当前的时间是：%s"%now


server.run(port=8888)
