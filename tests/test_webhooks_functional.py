import hashlib
import hmac

from fastapi.testclient import TestClient

from app.main import app


def test_github_webhook_triggers_temporal_placeholder(monkeypatch):
    monkeypatch.setenv("GITHUB_WEBHOOK_SECRET", "test-secret")
    monkeypatch.setenv("LIMESODA_BOT_LOGIN", "limesoda-bot")

    triggered = {"called": False}

    def fake_trigger(payload):
        triggered["called"] = True
        assert payload["issue"]["number"] == 123

    monkeypatch.setattr(
        "app.webhooks.router.trigger_issue_assigned_workflow", fake_trigger
    )

    body = (
        '{"action":"assigned","assignee":{"login":"limesoda-bot"},'
        '"issue":{"number":123,"title":"test"}}'
    ).encode("utf-8")
    signature = "sha256=" + hmac.new(b"test-secret", body, hashlib.sha256).hexdigest()

    client = TestClient(app)
    response = client.post(
        "/api/webhooks/github",
        content=body,
        headers={
            "X-Hub-Signature-256": signature,
            "X-GitHub-Event": "issues",
            "Content-Type": "application/json",
        },
    )

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}
    assert triggered["called"] is True
