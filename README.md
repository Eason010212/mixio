# MixIO

## For Users
如果您是用户，请直接下载发行版进行使用。
### Windows
1. 下载、解压mixio_win_x64.zip
2. cd mixio_win_x64
3. mixio start 启动服务器（默认在8080端口）
4. mixio stop 关闭服务器
5. mixio help 查看更多指令
### Linux
1. 下载mixio_linux_x64.tar.gz
2. tar -pzxvf mixio_linux_x64.tar.gz
3. cd mixio_linux_x64
4. ./install.sh 安装mixio服务
5. systemctl start mixio 启动服务器
6. systemctl status mixio 查看服务器状态
7. systemctl enable mixio 设置服务器开机自启动
8. systemctl stop mixio 关闭服务器
### Mac
1. 下载mixio_darwin_x64.tar.gz
2. tar -pzxvf mixio_darwin_x64.tar.gz
3. cd mixio_darwin_x64
4. ./mixio start 启动服务器（默认在8080端口）
5. ./mixio stop 关闭服务器
6. ./mixio help 查看更多指令

## For Developers
编译教程：
1. 安装NodeJS v12.22
2. 在源码文件夹下npm install
3. cd src
4. npm install
5. cd ../../
6. 新建.sh脚本（内容如下），执行：

```
version="{
    \"version\":\"1.8.1\",
    \"platform\":\"{目标平台，例：win-x64}\",
    \"node-version\":\"12\"
}"
mkdir {编译产物目标文件夹}
cd {编译产物目标文件夹}
echo "${version}" > version.json
mkdir src
mkdir logs
cd ../
chmod -R 777 {源码文件夹}
cd {源码文件夹}
cd src
pkg -t {目标平台与node版本，例：node12-win-x64} package.json
mv -f loader ../../{编译产物目标文件夹}/src/loader
cp -r certs ../../{编译产物目标文件夹}/src
cp config.json ../../{编译产物目标文件夹}/src/config.json
cd ../../
cp {源码文件夹}/mixio.db {编译产物目标文件夹}/src/mixio.db
cd {源码文件夹}
pkg -t {目标平台与node版本，例：node12-win-x64} package.json
mv -f mixio ../{编译产物目标文件夹}/mixio
cd ../
chmod -R 777 {编译产物目标文件夹}
```
