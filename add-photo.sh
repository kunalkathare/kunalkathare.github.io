#!/usr/bin/env bash
# Install a profile photo into the portfolio.
#   ./add-photo.sh ~/Downloads/whatever-you-saved.jpg
set -euo pipefail
[ $# -eq 1 ] || { echo "usage: $0 <path-to-your-photo>"; exit 1; }
src="$1"
[ -f "$src" ] || { echo "error: no such file: $src"; exit 1; }
ext="${src##*.}"; ext="$(echo "$ext" | tr '[:upper:]' '[:lower:]')"
case "$ext" in jpg|jpeg|png|webp) ;; *) echo "error: use a .jpg, .png or .webp"; exit 1;; esac
dir="$(cd "$(dirname "$0")" && pwd)"
mkdir -p "$dir/assets"
rm -f "$dir"/assets/profile.jpg "$dir"/assets/profile.jpeg \
      "$dir"/assets/profile.png "$dir"/assets/profile.webp
cp "$src" "$dir/assets/profile.$ext"
echo "installed → assets/profile.$ext"
echo "open index.html — cartoon by default, hover for the original."
