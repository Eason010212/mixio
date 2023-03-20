<p align="center">
  <a href="https://mixio.mixly.cn">
    <img src="img/shortcut.png" width="100" alt="MixIO">
  </a>
</p>
<h2 align="center">MixIO</h2>
<p align="center">
  面向自主可控信息科技教育的开源物联网服务器
</p>

![MIT协议](https://img.shields.io/badge/license-MPL-red)

![version](https://img.shields.io/badge/version-1.10.0-green)

---

## 主站（免费使用）
https://mixio.mixly.cn

## 私有部署发行版-v1.10.0

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