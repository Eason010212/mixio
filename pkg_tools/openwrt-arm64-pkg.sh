# Output: <mixio>/mixio_openwrt_arm64/  (no desktop icon on OpenWrt; still ship png for branding)
curpath=$(cd "$(dirname "$0")"; pwd)
MIXIO_ROOT=$(cd "${curpath}/.."; pwd)
cd "${MIXIO_ROOT}"

OUT=mixio_openwrt_arm64
rm -rf "${OUT}"
mkdir -p "${OUT}"

npm install
pkg -t node16-alpine-arm64 package.json --no-bytecode --public-packages "*" --public

if [ ! -f mixio ]; then
  echo "[ERROR] pkg did not produce mixio binary"
  exit 1
fi

mv -f mixio "${OUT}/"
chmod +x "${OUT}/mixio"
PNG="blockly/media/mark/mixio.png"
if [ -f "$PNG" ]; then
  cp -f "$PNG" "${OUT}/mixio.png"
  echo "[icon] shipped mixio.png (OpenWrt/alpine ELF has no embedded icon)"
fi

echo "[done] ${MIXIO_ROOT}/${OUT}"
