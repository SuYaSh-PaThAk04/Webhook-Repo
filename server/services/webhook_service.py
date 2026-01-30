"""GitHub webhook payload processing."""

from utils.formatters import format_timestamp
from services.events_service import events_service


class WebhookService:

    def process_push(self, payload: dict) -> dict:
        author = payload["pusher"]["name"]
        to_branch = payload["ref"].split("/")[-1]
        timestamp = payload["head_commit"]["timestamp"]
        message = f'{author} pushed to "{to_branch}" on {format_timestamp(timestamp)}'
        events_service.insert_one({
            "event_type": "push",
            "author": author,
            "from_branch": None,
            "to_branch": to_branch,
            "timestamp": timestamp,
            "message": message,
        })
        return {"status": "push stored"}, 200

    def process_pull_request(self, payload: dict) -> tuple[dict, int]:
        action = payload.get("action")
        pr = payload["pull_request"]
        author = pr["user"]["login"]
        from_branch = pr["head"]["ref"]
        to_branch = pr["base"]["ref"]

        if action == "closed" and pr.get("merged") is True:
            merged_at = pr["merged_at"]
            message = f'{author} merged branch "{from_branch}" to "{to_branch}" on {format_timestamp(merged_at)}'
            events_service.insert_one({
                "event_type": "merge",
                "author": author,
                "from_branch": from_branch,
                "to_branch": to_branch,
                "timestamp": merged_at,
                "message": message,
            })
            return {"status": "merge stored"}, 200

        if action in ("opened", "reopened"):
            created_at = pr["created_at"]
            message = f'{author} submitted a pull request from "{from_branch}" to "{to_branch}" on {format_timestamp(created_at)}'
            events_service.insert_one({
                "event_type": "pull_request",
                "author": author,
                "from_branch": from_branch,
                "to_branch": to_branch,
                "timestamp": created_at,
                "message": message,
            })
            return {"status": "pull request stored"}, 200

        return {"status": f"ignored pull_request action {action}"}, 200

    def handle_event(self, event_type: str, payload: dict) -> tuple[dict, int]:
        if event_type == "push":
            return self.process_push(payload)
        if event_type == "pull_request":
            return self.process_pull_request(payload)
        return {"status": f"ignored event {event_type}"}, 200


webhook_service = WebhookService()
