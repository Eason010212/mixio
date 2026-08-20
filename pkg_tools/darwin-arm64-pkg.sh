# Output: <mixio>/mixio_darwin_arm64/MixIO.app
curpath=$(cd "$(dirname "$0")"; pwd)
MIXIO_ROOT=$(cd "${curpath}/.."; pwd)
cd "${MIXIO_ROOT}"

OUT=mixio_darwin_arm64
rm -rf "${OUT}"
mkdir -p "${OUT}"

npm install
pkg -t node18-darwin-arm64 package.json --no-bytecode --public-packages "*" --public

BIN=mixio
[ -f mixio ] || BIN=""
if [ -z "$BIN" ]; then
  echo "[ERROR] pkg did not produce mixio binary"
  exit 1
fi

# macOS: wrap binary in .app + AppIcon.icns (pkg has no native icon)
APP="${OUT}/MixIO.app"
mkdir -p "${APP}/Contents/MacOS" "${APP}/Contents/Resources"
mv -f mixio "${APP}/Contents/MacOS/MixIO"
chmod +x "${APP}/Contents/MacOS/MixIO"
cp -f "${curpath}/darwin-Info.plist" "${APP}/Contents/Info.plist"
ICNS="blockly/media/mark/mixio.icns"
PNG="blockly/media/mark/mixio.png"
if [ -f "$ICNS" ]; then
  cp -f "$ICNS" "${APP}/Contents/Resources/AppIcon.icns"
  echo "[icon] AppIcon.icns ok"
elif [ -f "$PNG" ]; then
  cp -f "$PNG" "${APP}/Contents/Resources/AppIcon.png"
  echo "[WARN] missing mixio.icns — shipped PNG only; convert on macOS with iconutil for Finder icon"
else
  echo "[WARN] no icon asset — app has no custom icon"
fi

echo "[done] ${MIXIO_ROOT}/${APP}"
