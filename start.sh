#!/bin/bash
if command -v bun &> /dev/null; then
    bun run server.js
else
    npm start
fi
