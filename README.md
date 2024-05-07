<p align="center">
  <a href="https://mixio.mixly.cn">
    <img src="img/shortcut.png" width="100" alt="MixIO">
  </a>
</p>
<h2 align="center">MixIO</h2>
<p align="center">
  面向自主可控信息科技教育的开源物联网服务器
</p>

<div align="center">
    <img src="https://img.shields.io/badge/license-MPL-red">
    <img src="https://img.shields.io/badge/version-1.10.0-green">
    <img src="https://img.shields.io/badge/nodejs-16.17.0-blue">
</div>

---

## 主站（免费使用）

https://mixio.mixly.cn

## 私有部署发行版-v1.10.1

### Windows-x64发行版（win10及以上）

https://gitee.com/bnu_mixly/mixio-win32-x86-dist/blob/master/mixio.exe

### Windows-x64发行版（win7）

https://gitee.com/bnu_mixly/mixio-win32-x86-dist/blob/win7/mixio.exe

### Linux-x64发行版

https://gitee.com/bnu_mixly/mixio-linux-x86-dist/blob/master/mixio

### Linux-arm64发行版

https://gitee.com/bnu_mixly/mixio-linux-arm64-dist/blob/master/mixio

### MacOS-x64发行版

https://gitee.com/bnu_mixly/mixio-linux-x86-dist/blob/darwin/mixio

## 指令说明

1. mixio start 启动服务器（默认在8080端口）
2. mixio stop 关闭服务器
3. mixio help 查看更多指令
4. Windows版可直接双击mixio.exe查看更多选项
5. Linux/MacOS版 可mixio install将mixio添加到systemctl中

## 不同版本间数据迁移

1. 复制服务器目录下的reserve文件夹进行替换，即可完成数据迁移
2. 复制服务器目录下的config文件夹进行替换，即可完成配置选项迁移（新老版本间的配置文件可能存在差异，建议手动配置）

## 从源码运行（debug模式）

1. git clone https://gitee.com/mixly2/mixio.git
2. node mixio.js debug

## 从源码构建

1. 编译脚本见pkg_tools/
2. 基本环境：node16(windows7为node12), python3, cmake, pkg.

## 安卓端运行服务器（experimental）

1. 安装termux（https://termux.dev/en/）
2. apt update
3. apt upgrade
4. pkg install nodejs-lts
5. pkg install python
6. pkg install binutils
7. pkg install git
8. git clone https://gitee.com/mixly2/mixio.git
9. cd mixio
10. npm i
11. node mixio.js debug

## 服务器配置文件（config/config.json）

1. 首次运行服务器后，会在相对应位置的config文件夹生成config.json
2. config.json内容可修改，重启服务器后生效
3. MIXIO_HTTP_PORT - int，HTTP端口，默认为8080
4. MIXIO_HTTPS_PORT - int，HTTP端口，默认为8443
5. MIXIO_MQTT_PORT - int, MQTT端口, 默认为1883
6. MIXIO_WS_PORT - int, MQTT over WebSocket端口, 默认为8083
7. MIXIO_WSS_PORT - int, MQTT over WebSocketS端口, 默认为8084
8. MAX_PROJECT_NUM_PER_USER - int，每个用户的最大项目数，默认为20
9. MAX_MESSAGE_PER_USER - int，每个用户的最大离线消息存储数，默认为1000
10. MAX_MESSAGE_PER_SECOND - int，每个用户每秒的最大消息数，默认为5
11. ALLOW_REGISTER - bool，是否允许自主注册，默认为true
12. ALLOW_HOOK - bool，是否允许离线存储消息，默认为true
13. OFFLINE_MODE - bool，是否禁用天气/地图数据，默认为true
14. BAIDU_MAP_AK - string，百度地图客户端应用AK（OFFLINE_MODE=false时必须配置），默认为""
15. BAIDU_MAP_SERVER_AK - string，百度地图服务端应用AK（OFFLINE_MODE=false时必须配置），默认为""
16. ADMIN_USERNAME - string，管理后台用户名，默认为"admin"
17. ADMIN_PASSWORD - string，管理后台密码，默认为"public"
18. STORAGE_ENGINE - string，数据库引擎，默认为"sqlite"
19. MYSQL_HOST - string，MySQL地址（STORAGE_ENGINE="mysql"时必须配置），默认为"localhost"
20. MYSQL_PORT - int，MySQL地址（STORAGE_ENGINE="mysql"时必须配置），默认为3306
21. MYSQL_USER - string，MySQL用户名（STORAGE_ENGINE="mysql"时必须配置），默认为""
22. MYSQL_PASS - string，MySQL密码（STORAGE_ENGINE="mysql"时必须配置），默认为""
23. MYSQL_DB - string，MySQL数据库名（STORAGE_ENGINE="mysql"时必须配置），默认为"mixio",
24. FOOTER - string，显示在首页的备案信息，公网部署时请务必配置此项（支持HTML语言，请注意为双引号添加转义字符\\），默认为""
