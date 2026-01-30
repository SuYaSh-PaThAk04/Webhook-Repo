"""Flask blueprints - register all route modules here."""

from flask import Flask

from routes.health import health_bp
from routes.webhook import webhook_bp
from routes.events import events_bp


def register_blueprints(app: Flask) -> None:
    """Register all blueprints on the app."""
    app.register_blueprint(health_bp)
    app.register_blueprint(webhook_bp)
    app.register_blueprint(events_bp, url_prefix="/api")
