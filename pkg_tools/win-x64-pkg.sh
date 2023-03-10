curpath=$(cd "$(dirname "$0")"; pwd)
cd ${curpath}
version="{
    \"version\":\"1.10.0\",
    \"platform\":\"win-x64\",
    \"node-version\":\"16\"
}"
gitignore="config/*
logs/*
storage/*
"
cd ../../
rm -rf mixio_win_x64
mkdir mixio_win_x64
cd mixio_win_x64
echo "${version}" > version.json
echo "${gitignore}" > .gitignore
mkdir logs
mkdir storage
mkdir config
cd ../
chmod -R 777 mixio
cd mixio
npm install
pkg -t node16-win-x64 package.json
mv -f mixio ../mixio_win_x64/
cp -r config ../mixio_win_x64/
cd pkg_tools
cp win/autoStart.bat ../../mixio_win_x64/
cp win/removeAutoStart.bat ../../mixio_win_x64/
cp win/start.bat ../../mixio_win_x64/
cp mixio.empty.db ../../mixio_win_x64/storage/mixio.db
cp -r reserve ../../mixio_win_x64/storage/
cd ../../
chmod -R 777 mixio_win_x64
