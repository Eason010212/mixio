version="{
    \"version\":\"1.8.0\",
    \"platform\":\"darwin-x64\",
    \"node-version\":\"12\"
}"
rm -rf mixio_darwin_x64
mkdir mixio_darwin_x64
cd mixio_darwin_x64
echo "${version}" > version.json
mkdir src
mkdir logs
cd ../
chmod -R 777 mixio_server_latest
cd mixio_server_latest
cd src
pkg -t node12-darwin-x64 package.json
mv -f loader ../../mixio_darwin_x64/src/loader
cp -r certs ../../mixio_darwin_x64/src
cp config.json ../../mixio_darwin_x64/src/config.json
cd ../../
cp mixio.empty.db mixio_darwin_x64/src/mixio.db
cp -r reserve mixio_darwin_x64/src
cd mixio_server_latest
pkg -t node12-darwin-x64 package.json
mv -f mixio ../mixio_darwin_x64/mixio
cd ../
chmod -R 777 mixio_darwin_x64
rm -rf mixio_darwin_x64.tar.gz
tar -cvzpf mixio_darwin_x64.tar.gz mixio_darwin_x64