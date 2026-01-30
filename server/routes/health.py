"""Health and root endpoints."""

from flask import Blueprint

health_bp = Blueprint("health", __name__)


@health_bp.get("/health")
def health():
    """Liveness/readiness check."""
    return {"status": "ok"}


@health_bp.get("/")
def home():
    """Root - basic status."""
    return {"status": "running"}
