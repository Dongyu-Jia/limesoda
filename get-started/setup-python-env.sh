#!/usr/bin/env bash
# ──────────────────────────────────────────────────────────────────────────
# Limesoda — Python Environment Setup (uv Edition)
# ──────────────────────────────────────────────────────────────────────────
# Uses 'uv' for extremely fast and reliable environment setup.
# ──────────────────────────────────────────────────────────────────────────
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "═══════════════════════════════════════════════════════════"
echo "  Limesoda — Python Setup (uv)"
echo "═══════════════════════════════════════════════════════════"

# ── 0. Ensure uv is installed ────────────────────────────────────────────
if ! command -v uv >/dev/null 2>&1; then
  echo "→ 'uv' not found. Installing now..."
  curl -LsSf https://astral.sh/uv/install.sh | sh
  source $HOME/.local/bin/env 2>/dev/null || true
fi

# ── 1. Sync environment ──────────────────────────────────────────────────
echo "→ Syncing environment (based on pyproject.toml and uv.lock)..."
uv sync --frozen --python 3.13

# ── 2. Compile proto bindings ─────────────────────────────────────────────
echo "→ Compiling proto bindings..."
uv run python -m grpc_tools.protoc \
  -I="$REPO_ROOT/schema/proto" \
  --python_out="$REPO_ROOT/schema/proto" \
  "$REPO_ROOT/schema/proto/workflow.proto"

# ── 3. Generate Prisma client ─────────────────────────────────────────────
echo "→ Generating Prisma client..."
uv run prisma generate --schema="$REPO_ROOT/schema/prisma/schema.prisma"

echo ""
echo "✅ Done! All dependencies installed in .venv/"
echo "   Activate:  source .venv/bin/activate"
echo "   Run tests: uv run pytest"
echo "═══════════════════════════════════════════════════════════"
