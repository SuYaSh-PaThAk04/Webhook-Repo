"""Centralized configuration loaded from environment."""

import os
from pathlib import Path

from dotenv import load_dotenv

# Load .env from project root
_env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(_env_path)


class Settings:

    # Server
    FLASK_ENV: str = os.getenv("FLASK_ENV", "production")
    DEBUG: bool = os.getenv("FLASK_DEBUG", "false").lower() in ("true", "1", "yes")

    # MongoDB
    MONGO_URI: str = os.getenv("MONGO_URI", "")
    DB_NAME: str = os.getenv("DB_NAME", "github_webhooks")
    EVENTS_COLLECTION: str = os.getenv("EVENTS_COLLECTION", "events")

    # GitHub Webhook
    GITHUB_WEBHOOK_SECRET: str = os.getenv("GITHUB_WEBHOOK_SECRET", "")

    # API defaults
    EVENTS_DEFAULT_LIMIT: int = int(os.getenv("EVENTS_DEFAULT_LIMIT", "20"))
    EVENTS_MAX_LIMIT: int = int(os.getenv("EVENTS_MAX_LIMIT", "100"))


settings = Settings()
