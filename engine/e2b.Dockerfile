# Limesoda Agent Sandbox
# Deploy with: e2b template build -n limesoda-agent
# Use in SDK:  AsyncSandbox.create(template="limesoda-agent")

FROM e2bdev/code-interpreter:latest

# System tools
RUN apt-get update && apt-get install -y \
    git \
    curl \
    jq \
    && rm -rf /var/lib/apt/lists/*

# GitHub CLI
RUN curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg \
    | dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg && \
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" \
    | tee /etc/apt/sources.list.d/github-cli.list > /dev/null && \
    apt-get update && apt-get install -y gh

# Claude Code CLI
RUN npm install -g @anthropic-ai/claude-code

# Python agent deps
RUN pip install --no-cache-dir \
    langchain-anthropic \
    langgraph \
    tavily-python
