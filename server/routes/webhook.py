"""GitHub webhook endpoint."""

from flask import Blueprint, request, jsonify

from config import settings
from utils.security import verify_signature
from services.webhook_service import webhook_service

webhook_bp = Blueprint("webhook", __name__)


@webhook_bp.post("/webhook")
def webhook():
    """Handle GitHub webhook delivery (push, pull_request)."""
    signature = request.headers.get("X-Hub-Signature-256")
    raw_body = request.data

    if not verify_signature(settings.GITHUB_WEBHOOK_SECRET, raw_body, signature):
        return jsonify({"error": "Invalid signature"}), 401

    payload = request.get_json(silent=True)
    if payload is None:
        return jsonify({"error": "Invalid JSON"}), 400

    github_event = request.headers.get("X-GitHub-Event", "")
    response, status = webhook_service.handle_event(github_event, payload)
    return jsonify(response), status
