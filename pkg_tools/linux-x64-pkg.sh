curpath=$(cd "$(dirname "$0")"; pwd)
cd ${curpath}
cd ../../
rm -rf mixio_linux_x64
mkdir mixio_linux_x64
chmod -R 777 mixio
cd mixio
npm install
pkg -t node16-linux-x64 package.json
mv -f mixio ../mixio_linux_x64/
cd ../
chmod -R 777 mixio_linux_x64
