# MixIO私有化部署版丨MixIO Community Server

#### 介绍
MixIO是Mixly团队推出的开源物联网应用开发平台，立足于信息技术教育行业，支持组件化的物联网项目定制、数据收发和逻辑编写，赋予用户快速构建自定义物联网应用的基础能力。平台自2021年5月起上线运行（ http://mixio.mixly.org ），现已拥有上千名注册用户。
基于中小学信息技术教室的基本需要，MixIO服务器的开源工作（MixIO Community Server）自2021年12月起正式启动，旨在为中小学教师、科技场馆运营者提供一个可以快速启用的私有化MixIO服务端。2022年2月起，MixIO Community Server正式开始内部测试。

#### 软件架构
前端：JavaScript（Bootstrap+jQuery）
后端：Node.js (Express+Aedes)

#### 安装教程

1.  下载安装适合自己操作系统的NodeJS (http://nodejs.cn/download/)
2.  在控制台中切换到本目录
3.  在config.json中进行自定义配置
4.  执行命令 node index.js ，启动MixIO服务器
5.  本机浏览器访问localhost，内网/外网其他设备访问本机内网/外网IP地址，即可进入MixIO

#### config.json 字段说明

1.  MIXIO_HTTP_PORT MixIO服务的HTTP端口，默认80
2.  MIXIO_HTTPS_PORT MixIO服务的HTTPS端口，默认443
3.  HTTPS_PRIVATE_PEM HTTPS证书私钥，默认为自签名证书
4.  HTTPS_CRT_FILE HTTPS证书文件，默认为自签名证书
5.  MESSAGE_HOOK 离线消息功能模块，true=开启，false=关闭
6.  MAX_PROJECT_NUM_PER_USER 单个用户的最大项目数
7.  MAX_HOOKED_MESSAGE_NUM_PER_USER 单个用户的最大离线消息数
8.  OFFLINE_MODE 离线模式，true=开启（关闭天气、地图两个在线组件），false=关闭（开启天气、地图两个在线组件）
9.  BAIDU_MAP_AK 百度地图开发者客户端应用AK（在OFFLINE_MODE: false时，必须正确填写此项）
10. BAIDU_MAP_SERVER_AK 百度地图开发者服务端应用AK（在OFFLINE_MODE: false时，必须正确填写此项）