#!/bin/zsh
# Double-click to run the Fun Zone site on this Mac: starts the local server
# (tools/local-server.cjs) and opens it in the browser. Close this window to stop.
cd "${0:A:h}"
PORT=8800
URL="http://localhost:$PORT/"

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is needed to run Fun Zone locally — install it from https://nodejs.org and try again."
  read -k1 "?Press any key to close…"
  exit 1
fi

if lsof -iTCP:$PORT -sTCP:LISTEN >/dev/null 2>&1; then
  echo "Fun Zone is already running — opening $URL"
  open "$URL"
  exit 0
fi

node tools/local-server.cjs $PORT &
SERVER=$!
trap 'kill $SERVER 2>/dev/null' EXIT INT TERM HUP
sleep 1
open "$URL"
wait $SERVER
