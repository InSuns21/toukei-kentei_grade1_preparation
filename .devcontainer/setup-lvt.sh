#!/usr/bin/env bash
set -euo pipefail
root="$(git rev-parse --show-toplevel)"
if [ ! -x "$HOME/.elan/bin/elan" ]; then
  installer="$(mktemp)"
  trap 'rm -f "$installer"' EXIT
  curl --fail --location --retry 3 --proto '=https' https://raw.githubusercontent.com/leanprover/elan/master/elan-init.sh -o "$installer"
  sh "$installer" -y --default-toolchain none
fi
toolchain="$(cat "$root/textbook/volumes/dream_thater/計算系/LVT/LVT1-02/lab/lean-toolchain")"
"$HOME/.elan/bin/elan" toolchain install "$toolchain"
(cd "$root/textbook/volumes/dream_thater/計算系/LVT/LVT1-02/lab" && "$HOME/.elan/bin/lean" --version)
python3 --version
node --version
