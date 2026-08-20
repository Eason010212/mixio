# Output: <mixio>/mixio_win_x64/mixio.exe  (same tree as source)
curpath=$(cd "$(dirname "$0")"; pwd)
MIXIO_ROOT=$(cd "${curpath}/.."; pwd)
cd "${MIXIO_ROOT}"

rm -rf mixio_win_x64
mkdir mixio_win_x64

npm install
pkg -t node18-win-x64 package.json --no-bytecode --public-packages "*" --public

# pkg has no --icon; inject via resedit after build (path relative to mixio/)
ICON="blockly/media/mark/mixio.ico"
if [ ! -f "$ICON" ]; then
  echo "[WARN] missing $ICON - skip icon inject"
elif [ ! -f "mixio.exe" ]; then
  echo "[WARN] mixio.exe not found - skip icon inject"
else
  echo "[icon] inject $ICON into mixio.exe"
  npx --yes resedit-cli --in mixio.exe --out mixio.icon.exe --icon "1,$ICON"
  if [ -f mixio.icon.exe ]; then
    mv -f mixio.icon.exe mixio.exe
  else
    echo "[WARN] resedit failed - keep original mixio.exe"
  fi
fi

if [ -f mixio.exe ]; then
  mv -f mixio.exe mixio_win_x64/
elif [ -f mixio ]; then
  mv -f mixio mixio_win_x64/
fi

echo "[done] ${MIXIO_ROOT}/mixio_win_x64"
