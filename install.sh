#!/usr/bin/env bash
set -euo pipefail

INSTALL_DIR="/usr/local/bin"
SCRIPT_NAME="new-project"
REPO="unlocalhosted/breed-me-an-app"
BRANCH="main"

echo "Installing $SCRIPT_NAME..."

# Check for gum
if ! command -v gum &>/dev/null; then
  echo "  gum is required. Install it with: brew install gum"
  exit 1
fi

curl -fsSL "https://raw.githubusercontent.com/$REPO/$BRANCH/new-project" \
  -o "$INSTALL_DIR/$SCRIPT_NAME"
chmod +x "$INSTALL_DIR/$SCRIPT_NAME"

echo "  Done! Run: new-project"
