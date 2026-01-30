"""Events API endpoints."""

from flask import Blueprint, request, jsonify

from config import settings
from services.events_service import events_service

events_bp = Blueprint("events", __name__)


@events_bp.get("/events")
def get_events():
    """List recent GitHub events (query: limit)."""
    try:
        limit = int(request.args.get("limit", settings.EVENTS_DEFAULT_LIMIT))
    except (TypeError, ValueError):
        limit = settings.EVENTS_DEFAULT_LIMIT
    limit = min(max(1, limit), settings.EVENTS_MAX_LIMIT)
    docs = events_service.list_events(limit=limit)
    return jsonify(docs)
