curpath=$(cd "$(dirname "$0")"; pwd)
cd ${curpath}
cd ../../
rm -rf mixio_linux_arm64
mkdir mixio_linux_arm64
chmod -R 777 mixio
cd mixio
npm install
pkg -t node18-linux-arm64 package.json
mv -f mixio ../mixio_linux_arm64/
cd ../
chmod -R 777 mixio_linux_arm64