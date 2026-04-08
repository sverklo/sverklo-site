#!/usr/bin/env bash
# Regenerate og.png from og.svg using whatever's available locally.
# Usage: ./scripts/generate-og.sh
set -euo pipefail

cd "$(dirname "$0")/.."
SVG=og.svg
PNG=og.png
W=1200
H=630

if ! [ -f "$SVG" ]; then
  echo "missing $SVG"
  exit 1
fi

CHROME_MAC="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

if command -v rsvg-convert >/dev/null 2>&1; then
  rsvg-convert -w "$W" -h "$H" "$SVG" -o "$PNG"
  tool=rsvg-convert
elif command -v magick >/dev/null 2>&1; then
  magick -background none -density 192 "$SVG" -resize "${W}x${H}" "$PNG"
  tool=imagemagick
elif command -v inkscape >/dev/null 2>&1; then
  inkscape --export-type=png --export-width="$W" --export-height="$H" --export-filename="$PNG" "$SVG"
  tool=inkscape
elif [ -x "$CHROME_MAC" ]; then
  # Headless Chrome — most accurate SVG renderer available on macOS by default.
  # Chrome's headless --window-size eats ~70px of vertical chrome, so we render
  # at H+OFFSET, then top-crop with Python/PIL to exactly W×H.
  OFFSET=80
  RENDER_H=$((H + OFFSET))
  "$CHROME_MAC" --headless=new --disable-gpu --no-sandbox \
    --window-size="${W},${RENDER_H}" --force-device-scale-factor=1 \
    --hide-scrollbars --default-background-color=0E0D0BFF \
    --screenshot="$(pwd)/$PNG" "file://$(pwd)/$SVG" >/dev/null 2>&1
  python3 - <<PYEOF
from PIL import Image
im = Image.open("$PNG")
im.crop((0, 0, $W, $H)).save("$PNG", optimize=True)
PYEOF
  tool=chrome-headless+pil-crop
else
  echo "No SVG-to-PNG converter found. Install one of: rsvg-convert, imagemagick, inkscape, Google Chrome."
  exit 1
fi

# Verify dimensions
if command -v sips >/dev/null 2>&1; then
  dims=$(sips -g pixelWidth -g pixelHeight "$PNG" 2>/dev/null | awk '/pixel/ {print $2}' | xargs)
  echo "wrote $PNG via $tool ($dims)"
else
  echo "wrote $PNG via $tool"
fi
