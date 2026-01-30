"""Formatting utilities."""

from datetime import datetime, timezone


def format_timestamp(ts: str) -> str:
    dt = datetime.fromisoformat(ts.replace("Z", "+00:00")).astimezone(timezone.utc)
    day = dt.day
    suffix = "th"
    if day % 10 == 1 and day != 11:
        suffix = "st"
    elif day % 10 == 2 and day != 12:
        suffix = "nd"
    elif day % 10 == 3 and day != 13:
        suffix = "rd"
    return dt.strftime(f"{day}{suffix} %B %Y - %I:%M %p UTC")
