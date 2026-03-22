import hashlib
import hmac
import json
import os
from typing import Any

from fastapi import APIRouter, Header, HTTPException, Request

from app.webhooks.temporal import trigger_issue_assigned_workflow

router = APIRouter(prefix="/api/webhooks")


def verify_github_signature(payload: bytes, signature: str | None, secret: str) -> bool:
    if not signature or not signature.startswith("sha256="):
        return False

    digest = hmac.new(secret.encode("utf-8"), payload, hashlib.sha256).hexdigest()
    expected_signature = f"sha256={digest}"
    return hmac.compare_digest(expected_signature, signature)


def is_assigned_to_limesoda_bot(payload: dict[str, Any], bot_login: str) -> bool:
    if payload.get("action") != "assigned":
        return False
    if payload.get("assignee", {}).get("login") != bot_login:
        return False
    if "issue" not in payload:
        return False
    return True


@router.post("/github")
async def github_webhook(
    request: Request,
    x_hub_signature_256: str | None = Header(default=None),
    x_github_event: str | None = Header(default=None),
) -> dict[str, str]:
    payload = await request.body()

    secret = os.getenv("GITHUB_WEBHOOK_SECRET", "")
    if not secret or not verify_github_signature(payload, x_hub_signature_256, secret):
        raise HTTPException(status_code=401, detail="Invalid webhook signature")

    if x_github_event == "issues":
        try:
            data = json.loads(payload.decode("utf-8"))
        except json.JSONDecodeError as exc:
            raise HTTPException(status_code=400, detail="Invalid JSON payload") from exc
        bot_login = os.getenv("LIMESODA_BOT_LOGIN", "limesoda-bot")
        if is_assigned_to_limesoda_bot(data, bot_login):
            trigger_issue_assigned_workflow(data)

    return {"status": "ok"}
