#!/bin/bash

set -e

# Install GitHub CLI if not already installed
if ! command -v gh &> /dev/null; then
    sudo apt-get update
    sudo apt-get install -y gh
fi

# Install npm and Node.js if not already installed
if ! command -v npm &> /dev/null; then
    sudo apt-get update
    sudo apt-get install -y npm
fi

# Install Claude Csode if claude isn't installed
if ! command -v claude &> /dev/null; then
    sudo npm install -g @anthropic-ai/claude-code
fi

# Configure history search by prefix
if ! grep -q "history-search-backward" ~/.bashrc; then
cat << 'EOF' >> ~/.bashrc

# Bind up and down arrow keys to history search by prefix
bind '"\e[A": history-search-backward'
bind '"\e[B": history-search-forward'
EOF
fi
