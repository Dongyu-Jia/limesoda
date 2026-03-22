#!/usr/bin/env python3
"""
Limesoda Community Setup
========================
Onboarding CLI for self-hosted community installs.
Zero external dependencies — pure Python stdlib.

Usage:
    python3 get-started/setup.py
"""

import json
import os
import shutil
import subprocess
import sys
import urllib.error
import urllib.request
from pathlib import Path

# ── Paths ────────────────────────────────────────────────────────────────────
REPO_ROOT = Path(__file__).parent.parent
ENV_FILE = REPO_ROOT / ".env"

# ── Helpers ──────────────────────────────────────────────────────────────────
BOLD = "\033[1m"
GREEN = "\033[32m"
RED = "\033[31m"
CYAN = "\033[36m"
LIME = "\033[38;2;195;255;0m"  # HSL(74, 100%, 50%) — Limesoda brand color
DIM = "\033[2m"
RESET = "\033[0m"


def header(text):
    print(f"\n{BOLD}{CYAN}{text}{RESET}")


def ok(text):
    print(f"  {GREEN}✓{RESET} {text}")


def fail(text):
    print(f"  {RED}✗{RESET} {text}")


def info(text):
    print(f"  {DIM}{text}{RESET}")


def ask(prompt, secret=False, default=None):
    display = f"{BOLD}{prompt}{RESET}"
    if default:
        display += f" {DIM}[{default}]{RESET}"
    display += " → "
    if secret:
        import getpass

        val = getpass.getpass(display)
    else:
        val = input(display).strip()
    return val or default or ""


def check_command(cmd):
    return shutil.which(cmd) is not None


# ── Validators ────────────────────────────────────────────────────────────────


def validate_anthropic_key(key):
    """Call Anthropic models endpoint — returns (ok: bool, message: str)."""
    req = urllib.request.Request(
        "https://api.anthropic.com/v1/models",
        headers={"x-api-key": key, "anthropic-version": "2023-06-01"},
    )
    try:
        with urllib.request.urlopen(req, timeout=8) as r:
            data = json.loads(r.read())
            models = [m["id"] for m in data.get("data", [])]
            return True, f"valid — {len(models)} models available"
    except urllib.error.HTTPError as e:
        if e.code == 401:
            return False, "invalid key (401 Unauthorized)"
        return False, f"HTTP {e.code}"
    except Exception as e:
        return False, f"connection error: {e}"


def validate_github_token(token):
    """Call GitHub /user endpoint — returns (ok: bool, username: str | error)."""
    req = urllib.request.Request(
        "https://api.github.com/user",
        headers={
            "Authorization": f"token {token}",
            "Accept": "application/vnd.github+json",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=8) as r:
            data = json.loads(r.read())
            return True, data.get("login", "unknown")
    except urllib.error.HTTPError as e:
        if e.code == 401:
            return False, "invalid token (401 Unauthorized)"
        return False, f"HTTP {e.code}"
    except Exception as e:
        return False, f"connection error: {e}"


def validate_github_repo(token, repo_url):
    """Check the repo is accessible with the given token."""
    # Extract owner/repo from URL
    repo_url = repo_url.rstrip("/").replace(".git", "")
    parts = repo_url.split("github.com/")
    if len(parts) < 2:
        return False, "not a valid GitHub URL"
    owner_repo = parts[1].strip("/")
    req = urllib.request.Request(
        f"https://api.github.com/repos/{owner_repo}",
        headers={
            "Authorization": f"token {token}",
            "Accept": "application/vnd.github+json",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=8) as r:
            data = json.loads(r.read())
            perms = data.get("permissions", {})
            if not perms.get("push"):
                return False, "token has no push access to this repo"
            return True, owner_repo
    except urllib.error.HTTPError as e:
        if e.code == 404:
            return False, "repo not found or token has no read access"
        return False, f"HTTP {e.code}"
    except Exception as e:
        return False, f"connection error: {e}"


# ── Steps ─────────────────────────────────────────────────────────────────────


def step_prerequisites():
    header("Step 1 — Prerequisites")
    all_ok = True
    for cmd, install_hint in [
        ("docker", "https://docs.docker.com/get-docker/"),
        ("docker compose", "included with Docker Desktop"),
        ("git", "https://git-scm.com/downloads"),
        ("python3", "https://python.org/downloads"),
    ]:
        # "docker compose" is a subcommand, not a binary
        if " " in cmd:
            parts = cmd.split()
            found = (
                check_command(parts[0])
                and subprocess.run(parts, capture_output=True).returncode == 0
            )
        else:
            found = check_command(cmd)

        if found:
            ok(cmd)
        else:
            fail(f"{cmd} not found  →  {install_hint}")
            all_ok = False

    if not all_ok:
        print(f"\n{RED}Install missing tools above and re-run setup.{RESET}")
        sys.exit(1)


def step_anthropic(env):
    header("Step 2 — Anthropic API Key")
    info("Required to run Claude Code CLI agents.")
    info("Get a key at: https://console.anthropic.com/settings/keys")

    while True:
        key = ask(
            "ANTHROPIC_API_KEY", secret=True, default=env.get("ANTHROPIC_API_KEY")
        )
        if not key:
            fail("key cannot be empty")
            continue
        print("  Validating...", end="", flush=True)
        valid, msg = validate_anthropic_key(key)
        print(f"\r  ", end="")
        if valid:
            ok(msg)
            env["ANTHROPIC_API_KEY"] = key
            break
        else:
            fail(msg)
            retry = input("  Try again? [Y/n] ").strip().lower()
            if retry == "n":
                fail("Skipping validation — key stored but may not work")
                env["ANTHROPIC_API_KEY"] = key
                break


def step_github(env):
    header("Step 3 — GitHub Personal Access Token")
    info("Needs scopes: repo (full), workflow")
    info("Create at: https://github.com/settings/tokens/new")

    while True:
        token = ask("GITHUB_TOKEN", secret=True, default=env.get("GITHUB_TOKEN"))
        if not token:
            fail("token cannot be empty")
            continue
        print("  Validating...", end="", flush=True)
        valid, result = validate_github_token(token)
        print(f"\r  ", end="")
        if valid:
            ok(f"authenticated as @{result}")
            env["GITHUB_TOKEN"] = token
            env["GITHUB_USERNAME"] = result
            break
        else:
            fail(result)
            retry = input("  Try again? [Y/n] ").strip().lower()
            if retry == "n":
                env["GITHUB_TOKEN"] = token
                break


def step_target_repo(env):
    header("Step 4 — Target GitHub Repository")
    info("The repo where Limesoda will push SDLC artifacts (PRDs, LLDs, code).")
    info("Example: https://github.com/your-org/your-project")

    while True:
        repo_url = ask("GitHub repo URL", default=env.get("GITHUB_REPO_URL"))
        if not repo_url:
            fail("repo URL cannot be empty")
            continue
        print("  Checking access...", end="", flush=True)
        valid, result = validate_github_repo(env.get("GITHUB_TOKEN", ""), repo_url)
        print(f"\r  ", end="")
        if valid:
            ok(f"push access confirmed → {result}")
            env["GITHUB_REPO_URL"] = repo_url
            env["GITHUB_REPO"] = result  # owner/repo format
            break
        else:
            fail(result)
            retry = input("  Try again? [Y/n] ").strip().lower()
            if retry == "n":
                env["GITHUB_REPO_URL"] = repo_url
                break


def step_write_env(env):
    header("Step 5 — Writing .env")

    lines = [
        "# Limesoda Community — generated by get-started/setup.py",
        "# Do not commit this file.",
        "",
        "# Anthropic",
        f"ANTHROPIC_API_KEY={env.get('ANTHROPIC_API_KEY', '')}",
        "",
        "# GitHub",
        f"GITHUB_TOKEN={env.get('GITHUB_TOKEN', '')}",
        f"GITHUB_USERNAME={env.get('GITHUB_USERNAME', '')}",
        f"GITHUB_REPO_URL={env.get('GITHUB_REPO_URL', '')}",
        f"GITHUB_REPO={env.get('GITHUB_REPO', '')}",
        "",
        "# Database (default: local PostgreSQL via docker compose)",
        f"DATABASE_URL={env.get('DATABASE_URL', 'postgresql://limesoda:limesoda@localhost:5432/limesoda')}",
        "",
        "# Agent sandbox concurrency",
        f"MAX_SANDBOXES={env.get('MAX_SANDBOXES', '10')}",
        "",
        "# Human Tech Lead (GitHub username for PR assignments)",
        f"HUMAN_TECH_LEAD={env.get('HUMAN_TECH_LEAD', env.get('GITHUB_USERNAME', ''))}",
    ]

    ENV_FILE.write_text("\n".join(lines) + "\n")
    ok(f"written to {ENV_FILE.relative_to(Path.cwd())}")

    # Ensure .gitignore includes .env
    gitignore = REPO_ROOT / ".gitignore"
    if gitignore.exists():
        content = gitignore.read_text()
        if ".env" not in content:
            gitignore.write_text(content + "\n.env\n")
            ok(".env added to .gitignore")
    else:
        gitignore.write_text(".env\n")
        ok(".gitignore created with .env")


def step_next_steps(env):
    header("Done — Next Steps")
    print(f"""
  {GREEN}1. Start the stack:{RESET}
     docker compose up

  {GREEN}2. Open the Control Plane:{RESET}
     http://localhost:3000

  {GREEN}3. Run your first genesis prompt:{RESET}
     Navigate to /genesis and describe what you want to build.

  {DIM}Your target repo: {env.get('GITHUB_REPO_URL', 'not set')}
  Artifacts will be pushed as PRs for your review.{RESET}
""")


# ── Load existing .env ────────────────────────────────────────────────────────


def load_env():
    env = {}
    if ENV_FILE.exists():
        for line in ENV_FILE.read_text().splitlines():
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, _, v = line.partition("=")
                env[k.strip()] = v.strip()
    return env


# ── Main ─────────────────────────────────────────────────────────────────────


def main():
    print(f"""
{BOLD}{LIME}
  ██╗     ██╗███╗   ███╗███████╗███████╗ ██████╗ ██████╗  █████╗
  ██║     ██║████╗ ████║██╔════╝██╔════╝██╔═══██╗██╔══██╗██╔══██╗
  ██║     ██║██╔████╔██║█████╗  ███████╗██║   ██║██║  ██║███████║
  ██║     ██║██║╚██╔╝██║██╔══╝  ╚════██║██║   ██║██║  ██║██╔══██║
  ███████╗██║██║ ╚═╝ ██║███████╗███████║╚██████╔╝██████╔╝██║  ██║
  ╚══════╝╚═╝╚═╝     ╚═╝╚══════╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝
{RESET}
  {DIM}Community Edition — Self-Hosted Setup{RESET}
""")

    env = load_env()
    if env:
        info(f"Found existing .env — pre-filling values (press Enter to keep)")

    step_prerequisites()
    step_anthropic(env)
    step_github(env)
    step_target_repo(env)
    step_write_env(env)
    step_next_steps(env)


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print(f"\n\n{DIM}Setup interrupted. Re-run anytime to continue.{RESET}\n")
        sys.exit(0)
