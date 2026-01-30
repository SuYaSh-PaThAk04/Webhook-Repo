"""Database package - MongoDB connection and access."""

from db.connection import get_collection, get_db

__all__ = ["get_collection", "get_db"]
