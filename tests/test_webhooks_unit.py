import hashlib
import hmac

from app.webhooks.router import is_assigned_to_limesoda_bot, verify_github_signature


def test_verify_github_signature_valid():
    payload = b'{"hello":"world"}'
    secret = "test-secret"
    sig = (
        "sha256="
        + hmac.new(secret.encode("utf-8"), payload, hashlib.sha256).hexdigest()
    )
    assert verify_github_signature(payload, sig, secret) is True


def test_verify_github_signature_invalid():
    payload = b'{"hello":"world"}'
    assert verify_github_signature(payload, "sha256=bad", "test-secret") is False


def test_is_assigned_to_limesoda_bot_true():
    payload = {
        "action": "assigned",
        "assignee": {"login": "limesoda-bot"},
        "issue": {"number": 1},
    }
    assert is_assigned_to_limesoda_bot(payload, "limesoda-bot") is True


def test_is_assigned_to_limesoda_bot_false_when_not_assigned():
    payload = {
        "action": "opened",
        "assignee": {"login": "limesoda-bot"},
        "issue": {"number": 1},
    }
    assert is_assigned_to_limesoda_bot(payload, "limesoda-bot") is False
