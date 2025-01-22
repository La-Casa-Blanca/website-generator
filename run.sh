#!/bin/bash
/usr/bin/google-chrome-stable --no-sandbox --lang=en --profile-directory=Default --user-data-directory=$HOME/.config/google-chrome --remote-debugging-port=9222&
node scrape.js $(curl -s localhost:9222/json/version | jq -r .webSocketDebuggerUrl)


