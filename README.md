# MixIO

## Windows-x64发行版
1. 下载https://gitee.com/bnu_mixly/mixio-win32-x86-dist
2. cd mixio_win_x64
3. mixio start 启动服务器（默认在8080端口）
4. mixio stop 关闭服务器
5. mixio help 查看更多指令
6. 亦可通过start.bat直接启动
7. 运行autoStart.bat添加开机自启动
8. 运行removeAutoStart.bat取消开机自启动
## Linux-arm64发行版
1. 下载https://gitee.com/bnu_mixly/mixio-linux-arm64-dist.git
2. cd mixio_linux_x64 
3. ./mixio start 启动服务器（默认在8080端口）
4. ./mixio stop 关闭服务器
5. ./mixio help 查看更多指令
6. ./install.sh 安装mixio服务
7. systemctl start mixio 启动服务器
8. systemctl status mixio 查看服务器状态
9. systemctl enable mixio 设置服务器开机自启动
10. systemctl stop mixio 关闭服务器

## For Developers
编译脚本见pkg_tools/
基本环境：nodejs16  npm i pkg -g