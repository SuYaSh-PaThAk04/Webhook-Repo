"""Application factory and entry point."""

import os

from flask import Flask
from flask_cors import CORS

from config import settings
from routes import register_blueprints


def create_app() -> Flask:
    """Create and configure the Flask application."""
    app = Flask(__name__)
    app.config["ENV"] = settings.FLASK_ENV
    app.debug = settings.DEBUG

    CORS(app)

    register_blueprints(app)

    return app


app = create_app()


if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=settings.DEBUG)
