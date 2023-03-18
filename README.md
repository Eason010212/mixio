# MixIO - 米思齐开源物联网服务器

## 发行版-v1.10.0

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

## 从源码构建
编译脚本见pkg_tools/

基本环境：node16(windows7为node12), python3, cmake, pkg.