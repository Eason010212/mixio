# MixIO

## Windows-x64发行版
1. 下载https://gitee.com/bnu_mixly/mixio-win32-x86-dist/repository/archive/master.zip，解压
2. mixio start 启动服务器（默认在8080端口）
3. mixio stop 关闭服务器
4. mixio help 查看更多指令
5. 亦可直接双击mixio.exe.查看更多选项
## Linux-arm64发行版
1. 下载https://gitee.com/bnu_mixly/mixio-linux-arm64-dist/repository/archive/master.zip，解压
2. ./mixio start 启动服务器（默认在8080端口）
3. ./mixio stop 关闭服务器
4. ./mixio help 查看更多指令
5. ./mixio install 将mixio添加到systemctl中

## For Developers
编译脚本见pkg_tools/
基本环境：nodejs16  npm i pkg -g