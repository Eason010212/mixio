curpath=$(cd "$(dirname "$0")"; pwd)
cd ${curpath}
cd ../../
rm -rf mixio_win_x64
mkdir mixio_win_x64
chmod -R 777 mixio
cd mixio
npm install
pkg -t node16-win-x64 package.json
mv -f mixio ../mixio_win_x64/
cd ../
chmod -R 777 mixio_win_x64