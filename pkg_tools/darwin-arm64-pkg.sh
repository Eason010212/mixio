curpath=$(cd "$(dirname "$0")"; pwd)
cd ${curpath}
cd ../../
rm -rf mixio_darwin_arm64
mkdir mixio_darwin_arm64
chmod -R 777 mixio
cd mixio
npm install
pkg -t node18-darwin-arm64 package.json --no-bytecode --public-packages "*" --public
mv -f mixio ../mixio_darwin_arm64
cd ../
chmod -R 777 mixio_darwin_arm64