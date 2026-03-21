#!/bin/bash

# To run this script on a new machine:
# If you have curl:
# curl -fsSL https://raw.githubusercontent.com/Dongyu-Jia/limesoda/main/get-started/new-machine-setup.sh | bash
#
# If you have wget:
# wget -qO- https://raw.githubusercontent.com/Dongyu-Jia/limesoda/main/get-started/new-machine-setup.sh | bash
# for short:
# curl -sL https://tinyurl.com/dj123-setup | bash
# If you have neither:
# sudo apt update && sudo apt install curl -y && curl -fsSL https://raw.githubusercontent.com/Dongyu-Jia/limesoda/main/get-started/new-machine-setup.sh | bash

set -e

# --- 1. PVE & 系统底层增强 ---
echo "Configuring PVE specific utilities..."
sudo apt-get update
sudo apt-get install -y qemu-guest-agent cloud-guest-utils htop jq

# 启动 Agent 确保 PVE 界面能看到 IP
sudo systemctl enable --now qemu-guest-agent

# 自动扩容根分区（假设是 /dev/sda1 或 /dev/vda1）
sudo growpart /dev/sda 1 || true
sudo resize2fs /dev/sda1 || true

# Add Google Cloud CLI repository
if ! command -v gcloud &> /dev/null; then
    echo "Adding Google Cloud CLI repository..."
    # Ensure dependencies for adding repositories are present
    sudo apt-get update
    sudo apt-get install -y apt-transport-https ca-certificates gnupg curl
    
    # Add the GPG key
    curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo gpg --dearmor -o /usr/share/keyrings/cloud.google.gpg
    
    # Add the repository
    echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
fi

# Update package lists
sudo apt-get update

# Install common dependencies and utilities
echo "Installing common dependencies..."
sudo apt-get install -y \
    python3 \
    python3-pip \
    git \
    curl \
    wget \
    htop \
    vim \
    build-essential \
    tree \
    zip \
    unzip \
    tmux \
    google-cloud-cli \
    dnsutils \
    net-tools \
    iputils-ping \
    traceroute \
    nmap \
    socat \
    ripgrep \
    jq


# Install GitHub CLI if not already installed
if ! command -v gh &> /dev/null; then
    sudo apt-get install -y gh
fi

# Install npm and Node.js if not already installed
if ! command -v npm &> /dev/null; then
    sudo apt-get install -y npm
fi

# Install Claude Code if claude isn't installed
if ! command -v claude &> /dev/null; then
    sudo npm install -g @anthropic-ai/claude-code
fi

# Install Gemini CLI if gemini isn't installed
if ! command -v gemini &> /dev/null; then
    sudo npm install -g @google/gemini-cli
fi

# Install Tailscale if not already installed
if ! command -v tailscale &> /dev/null; then
    echo "Installing Tailscale..."
    curl -fsSL https://tailscale.com/install.sh | sh
fi

# Add SSH keys from GitHub users
echo "Adding SSH keys for Dongyu-Jia and Zway68..."
mkdir -p ~/.ssh
chmod 700 ~/.ssh
touch ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys

for user in Dongyu-Jia Zway68; do
    echo "Downloading keys for $user..."
    curl -s "https://github.com/$user.keys" >> ~/.ssh/authorized_keys
done

# Remove duplicate keys if any
temp_keys=$(mktemp)
sort -u ~/.ssh/authorized_keys > "$temp_keys"
mv "$temp_keys" ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys

# Configure history search by prefix
if ! grep -q "history-search-backward" ~/.bashrc; then
cat << 'EOF' >> ~/.bashrc

# Bind up and down arrow keys to history search by prefix
bind '"\e[A": history-search-backward'
bind '"\e[B": history-search-forward'
EOF
fi

# 登录 Tailscale
sudo tailscale up