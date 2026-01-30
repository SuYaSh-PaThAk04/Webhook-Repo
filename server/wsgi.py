"""WSGI entry point for production servers (e.g. gunicorn)."""

from app import app

__all__ = ["app"]
