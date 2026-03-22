#!/usr/bin/env python3
"""
Utility script to regenerate all PNG diagrams for process definitions.
Searches for all .textpb files in the engine/nodes/examples/ directory.
"""
import os
import subprocess
from pathlib import Path

def update_all():
    repo_root = Path(__file__).parent.parent.parent
    examples_dir = repo_root / "engine" / "nodes" / "examples"
    compiler_path = repo_root / "engine" / "nodes" / "compiler.py"

    print(f"→ Searching for .textpb files in {examples_dir}...")
    textpb_files = list(examples_dir.rglob("*.textpb"))

    if not textpb_files:
        print("❌ No .textpb files found.")
        return

    print(f"✓ Found {len(textpb_files)} files. Updating...")

    for textpb in textpb_files:
        print(f"  → Updating: {textpb.relative_to(repo_root)}")
        try:
            # Run the compiler via 'uv run' to ensure dependencies are available
            subprocess.run(
                ["uv", "run", str(compiler_path), str(textpb)],
                check=True,
                capture_output=True,
                text=True
            )
            print(f"    ✅ Success")
        except subprocess.CalledProcessError as e:
            print(f"    ❌ Failed: {e.stderr}")

if __name__ == "__main__":
    update_all()
