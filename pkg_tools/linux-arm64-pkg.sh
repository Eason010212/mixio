version="{
    \"version\":\"1.9.0\",
    \"platform\":\"linux-arm64\",
    \"node-version\":\"12\"
}"
rm -rf mixio_linux_arm64
mkdir mixio_linux_arm64
cd mixio_linux_arm64
echo "${version}" > version.json
mkdir src
mkdir logs
cd ../
chmod -R 777 mixio_server
cd mixio_server
cd src
pkg -t node12-linux-arm64 package.json
mv -f loader ../../mixio_linux_arm64/src/loader
cp -r certs ../../mixio_linux_arm64/src
cp config.json ../../mixio_linux_arm64/src/config.json
cd ../../
cp mixio.empty.db mixio_linux_arm64/src/mixio.db
cp -r reserve mixio_linux_arm64/src
cp install.sh mixio_linux_arm64/install.sh
cd mixio_server
pkg -t node12-linux-arm64 package.json
mv -f mixio ../mixio_linux_arm64/mixio
cd ../
chmod -R 777 mixio_linux_arm64
rm -rf mixio_linux_arm64.tar.gz
tar -cvzpf mixio_linux_arm64.tar.gz mixio_linux_arm64