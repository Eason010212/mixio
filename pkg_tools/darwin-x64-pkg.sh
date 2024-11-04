curpath=$(cd "$(dirname "$0")"; pwd)
cd ${curpath}
cd ../../
rm -rf mixio_darwin_64
mkdir mixio_darwin_x64
chmod -R 777 mixio
cd mixio
npm install
pkg -t node16-darwin-x64 package.json
mv -f mixio ../mixio_darwin_x64/
cd ../
chmod -R 777 mixio_darwin_x64