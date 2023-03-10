curpath=$(cd "$(dirname "$0")"; pwd)
cd ${curpath}
version="{
    \"version\":\"1.10.0\",
    \"platform\":\"linux-arm64\",
    \"node-version\":\"16\"
}"
gitignore="config/*
logs/*
storage/*
"
cd ../../
rm -rf mixio_linux_arm64
mkdir mixio_linux_arm64
cd mixio_linux_arm64
echo "${version}" > version.json
echo "${gitignore}" > .gitignore
mkdir logs
mkdir storage
mkdir config
cd ../
chmod -R 777 mixio
cd mixio
npm install
pkg -t node16-linux-arm64 package.json
mv -f mixio ../mixio_linux_arm64/
cp -r config ../mixio_linux_arm64/
cd pkg_tools
cp linux/install.sh ../../mixio_linux_arm64/
cp mixio.empty.db ../../mixio_linux_arm64/storage/mixio.db
cp -r reserve ../../mixio_linux_arm64/storage/
cd ../../
chmod -R 777 mixio_linux_arm64
tar -pzcvf mixio_linux_arm64.tar.gz mixio_linux_arm64
