curpath=$(cd "$(dirname "$0")"; pwd)
cd ${curpath}
cd ../../
rm -rf node18-alpine-arm64
mkdir node18-alpine-arm64
chmod -R 777 mixio
cd mixio
npm install
pkg -t node18-alpine-arm64 package.json
mv -f mixio ../node18-alpine-arm64/
cd ../
chmod -R 777 node18-alpine-arm64