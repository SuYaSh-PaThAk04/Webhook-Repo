"""Events storage and retrieval."""

from pymongo.collection import Collection

from db import get_collection
from config import settings


class EventsService:
    """Service for storing and querying GitHub events."""

    def __init__(self):
        self._col: Collection | None = None

    @property
    def collection(self) -> Collection:
        if self._col is None:
            self._col = get_collection()
        return self._col

    def insert_one(self, document: dict) -> None:
        """Store a single event document."""
        self.collection.insert_one(document)

    def list_events(self, limit: int | None = None) -> list[dict]:
        """Return recent events, newest first, without _id."""
        limit = limit or settings.EVENTS_DEFAULT_LIMIT
        limit = min(limit, settings.EVENTS_MAX_LIMIT)
        cursor = self.collection.find(
            {},
            {"_id": 0},
        ).sort("timestamp", -1).limit(limit)
        return list(cursor)


events_service = EventsService()
