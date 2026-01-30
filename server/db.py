import os
from pymongo import MongoClient

def get_collection():
    mongo_uri = os.getenv("MONGO_URI")
    db_name = os.getenv("DB_NAME", "github_webhooks")

    client = MongoClient(mongo_uri)
    db = client[db_name]
    return db["events"]
