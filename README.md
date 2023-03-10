# MixIO

## Windows-x64发行版
1. 下载、解压mixio_win_x64.zip
2. cd mixio_win_x64
3. mixio start 启动服务器（默认在8080端口）
4. mixio stop 关闭服务器
5. mixio help 查看更多指令
6. 亦可通过start.bat直接启动
7. 运行autoStart.bat添加开机自启动
8. 运行removeAutoStart.bat取消开机自启动
## Linux-arm64发行版
1. 下载mixio_linux_x64.tar.gz
2. tar -pzxvf mixio_linux_x64.tar.gz
3. cd mixio_linux_x64 
4. ./mixio start 启动服务器（默认在8080端口）
5. ./mixio stop 关闭服务器
6. ./mixio help 查看更多指令
7. ./install.sh 安装mixio服务
8. systemctl start mixio 启动服务器
9. systemctl status mixio 查看服务器状态
10. systemctl enable mixio 设置服务器开机自启动
11. systemctl stop mixio 关闭服务器

## For Developers
编译脚本见pkg_tools/
基本环境：nodejs16  npm i pkg -g