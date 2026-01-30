import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

from db import get_collection
from utils import verify_signature, format_timestamp

load_dotenv()

app = Flask(__name__)
CORS(app)

events_col = get_collection()
SECRET = os.getenv("GITHUB_WEBHOOK_SECRET", "")


@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/")
def home():
    return {"status": "running"}


@app.post("/webhook")
def webhook():
    github_event = request.headers.get("X-GitHub-Event")
    signature = request.headers.get("X-Hub-Signature-256")
    raw_body = request.data

    if not verify_signature(SECRET, raw_body, signature):
        return jsonify({"error": "Invalid signature"}), 401

    payload = request.json

    # ---------------- PUSH ----------------
    if github_event == "push":
        author = payload["pusher"]["name"]
        to_branch = payload["ref"].split("/")[-1]
        timestamp = payload["head_commit"]["timestamp"]

        message = f'{author} pushed to "{to_branch}" on {format_timestamp(timestamp)}'

        events_col.insert_one({
            "event_type": "push",
            "author": author,
            "from_branch": None,
            "to_branch": to_branch,
            "timestamp": timestamp,
            "message": message
        })
        return {"status": "push stored"}

    # ---------------- PR + MERGE ----------------
    if github_event == "pull_request":
        action = payload.get("action")
        pr = payload["pull_request"]

        author = pr["user"]["login"]
        from_branch = pr["head"]["ref"]
        to_branch = pr["base"]["ref"]

        # MERGE detection:
        if action == "closed" and pr.get("merged") is True:
            merged_at = pr["merged_at"]
            message = f'{author} merged branch "{from_branch}" to "{to_branch}" on {format_timestamp(merged_at)}'

            events_col.insert_one({
                "event_type": "merge",
                "author": author,
                "from_branch": from_branch,
                "to_branch": to_branch,
                "timestamp": merged_at,
                "message": message
            })
            return {"status": "merge stored"}

        # PR submitted
        if action in ["opened", "reopened"]:
            created_at = pr["created_at"]
            message = f'{author} submitted a pull request from "{from_branch}" to "{to_branch}" on {format_timestamp(created_at)}'

            events_col.insert_one({
                "event_type": "pull_request",
                "author": author,
                "from_branch": from_branch,
                "to_branch": to_branch,
                "timestamp": created_at,
                "message": message
            })
            return {"status": "pull request stored"}

        return {"status": f"ignored pull_request action {action}"}

    return {"status": f"ignored event {github_event}"}, 200


@app.get("/api/events")
def get_events():
    limit = int(request.args.get("limit", 20))
    docs = list(events_col.find({}, {"_id": 0}).sort("timestamp", -1).limit(limit))
    return jsonify(docs)


if __name__ == "__main__":
    app.run(port=5000, debug=True)
