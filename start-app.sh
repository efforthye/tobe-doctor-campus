#!/bin/bash

# Detect platform
if [[ "$(uname)" == "Darwin" ]]; then
    # macOS specific - unset HOST variable which can interfere with React app
    echo "🍏 macOS detected, unsetting HOST variable..."
    unset HOST
    
    # Start the app with localhost setting
    echo "🚀 Starting the app with macOS-specific settings..."
    BROWSER=none WDS_SOCKET_HOST=localhost HOST=localhost yarn start
else
    # Other platforms
    echo "🚀 Starting the app..."
    yarn start
fi