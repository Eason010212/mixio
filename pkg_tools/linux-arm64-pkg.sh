version="{
    \"version\":\"1.9.6\",
    \"platform\":\"linux-arm64\",
    \"node-version\":\"16\"
}"
cd ../../
rm -rf mixio_linux_arm64
mkdir mixio_linux_arm64
cd mixio_linux_arm64
echo "${version}" > version.json
mkdir src
mkdir logs
cd ../
chmod -R 777 mixio
cd mixio
cd node_modules/cliff/node_modules/winston/lib/winston
find -name 'common.js' | xargs perl -pi -e 's|target.padLevels|false|g'
cd ../../../../../../
cd src
pkg -t node16-linux-arm64 package.json
mv -f loader ../../mixio_linux_arm64/src/loader
cp -r certs ../../mixio_linux_arm64/src
cp config.json ../../mixio_linux_arm64/src/config.json
cd ../pkg_tools
cp mixio.empty.db ../../mixio_linux_arm64/src/mixio.db
cp -r reserve ../../mixio_linux_arm64/src
cd ../
pkg -t node16-linux-arm64 package.json
mv -f mixio ../mixio_linux_arm64/mixio
cd ../
chmod -R 777 mixio_linux_arm64
tar -pzcvf mixio_linux_arm64.tar.gz mixio_linux_arm64