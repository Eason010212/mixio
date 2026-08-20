# Output: <mixio>/mixio_linux_arm64/  (ELF has no embedded icon; ship .desktop + png)
curpath=$(cd "$(dirname "$0")"; pwd)
MIXIO_ROOT=$(cd "${curpath}/.."; pwd)
cd "${MIXIO_ROOT}"

OUT=mixio_linux_arm64
rm -rf "${OUT}"
mkdir -p "${OUT}"

npm install
pkg -t node18-linux-arm64 package.json --no-bytecode --public-packages "*" --public

if [ ! -f mixio ]; then
  echo "[ERROR] pkg did not produce mixio binary"
  exit 1
fi

mv -f mixio "${OUT}/"
chmod +x "${OUT}/mixio"
PNG="blockly/media/mark/mixio.png"
if [ -f "$PNG" ]; then
  cp -f "$PNG" "${OUT}/mixio.png"
  cp -f "${curpath}/mixio.desktop" "${OUT}/mixio.desktop"
  echo "[icon] shipped mixio.png + mixio.desktop (Linux cannot embed icon in ELF)"
else
  echo "[WARN] missing $PNG — skip desktop icon files"
fi

echo "[done] ${MIXIO_ROOT}/${OUT}"
