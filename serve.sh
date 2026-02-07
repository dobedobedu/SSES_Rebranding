#!/bin/bash

# SSES Strategic Matrix - Serve Static Build
# Usage: ./serve.sh [port]

PORT=${1:-8080}

echo "Serving SSES Strategic Matrix on http://localhost:$PORT"
echo "Press Ctrl+C to stop"
cd dist && python3 -m http.server $PORT
