"""MongoDB connection and collection access."""

from pymongo import MongoClient
from pymongo.database import Database
from pymongo.collection import Collection

from config import settings


_client: MongoClient | None = None


def _get_client() -> MongoClient:
    global _client
    if _client is None:
        _client = MongoClient(
            settings.MONGO_URI,
            serverSelectionTimeoutMS=5000,
        )
    return _client


def get_db() -> Database:
    return _get_client()[settings.DB_NAME]


def get_collection() -> Collection:
    return get_db()[settings.EVENTS_COLLECTION]
