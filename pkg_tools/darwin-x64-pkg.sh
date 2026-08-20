# Output: <mixio>/mixio_darwin_x64/MixIO.app
curpath=$(cd "$(dirname "$0")"; pwd)
MIXIO_ROOT=$(cd "${curpath}/.."; pwd)
cd "${MIXIO_ROOT}"

OUT=mixio_darwin_x64
rm -rf "${OUT}"
mkdir -p "${OUT}"

npm install
pkg -t node16-darwin-x64 package.json --no-bytecode --public-packages "*" --public

if [ ! -f mixio ]; then
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
  echo "[WARN] missing mixio.icns — shipped PNG only"
else
  echo "[WARN] no icon asset"
fi

echo "[done] ${MIXIO_ROOT}/${APP}"
