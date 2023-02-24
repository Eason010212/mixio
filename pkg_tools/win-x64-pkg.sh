version="{
    \"version\":\"1.9.6\",
    \"platform\":\"win-x64\",
    \"node-version\":\"16\"
}"
cd ../../
rm -rf mixio_win_x64
mkdir mixio_win_x64
cd mixio_win_x64
echo "${version}" > version.json
mkdir src
mkdir logs
cd ../
chmod -R 777 mixio_server_latest
cd mixio_server_latest
cd node_modules/cliff/node_modules/winston/lib/winston
find -name 'common.js' | xargs perl -pi -e 's|target.padLevels|false|g'
cd ../../../../../../
cd src
pkg -t node16-win-x64 package.json
mv -f loader ../../mixio_win_x64/src/loader
cp -r certs ../../mixio_win_x64/src
cp config.json ../../mixio_win_x64/src/config.json
cd ../pkg_tools
cp mixio.empty.db ../../mixio_win_x64/src/mixio.db
cp -r reserve ../../mixio_win_x64/src
cd ../
pkg -t node16-win-x64 package.json
mv -f mixio ../mixio_win_x64/mixio
cd ../
chmod -R 777 mixio_win_x64