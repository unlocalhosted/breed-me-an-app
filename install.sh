#!/usr/bin/env bash
set -euo pipefail

SCRIPT_NAME="breed-me"
REPO="unlocalhosted/breed-me-an-app"
BRANCH="main"

# Drain stdin so curl doesn't report a broken pipe on early exit
drain() { cat > /dev/null 2>/dev/null || true; }
bail() { echo "Error: $*" >&2; drain; exit 1; }

# Check for gum
command -v gum &>/dev/null || bail "gum is required. Install with: brew install gum"

# Pick install dir — prefer /usr/local/bin if writable, else ~/.local/bin
# (sudo won't work when piped, so we never attempt it here)
if [[ -w /usr/local/bin ]]; then
  INSTALL_DIR="/usr/local/bin"
else
  INSTALL_DIR="$HOME/.local/bin"
  mkdir -p "$INSTALL_DIR"
fi

echo "Installing $SCRIPT_NAME to $INSTALL_DIR..."

TMP=$(mktemp)
trap 'rm -f "$TMP"' EXIT

curl -fsSL "https://raw.githubusercontent.com/$REPO/$BRANCH/breed-me" -o "$TMP" \
  || bail "Failed to download $SCRIPT_NAME. Check your internet connection."

install -m 755 "$TMP" "$INSTALL_DIR/$SCRIPT_NAME"

# Warn if install dir isn't in PATH
if [[ ":$PATH:" != *":$INSTALL_DIR:"* ]]; then
  echo ""
  echo "Warning: $INSTALL_DIR is not in your PATH."
  echo "  Add this to your shell config:"
  echo "    export PATH=\"$INSTALL_DIR:\$PATH\""
fi

echo ""
echo "Done! Run: $SCRIPT_NAME"
