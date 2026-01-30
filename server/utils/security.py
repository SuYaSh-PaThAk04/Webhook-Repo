"""Security utilities (e.g. webhook signature verification)."""

import hmac
import hashlib


def verify_signature(secret: str, payload: bytes, signature_header: str | None) -> bool:
    """Verify GitHub webhook X-Hub-Signature-256 (sha256=...)."""
    if not secret:
        return True
    if not signature_header:
        return False
    try:
        sha_name, signature = signature_header.split("=")
    except ValueError:
        return False
    if sha_name != "sha256":
        return False
    mac = hmac.new(secret.encode(), msg=payload, digestmod=hashlib.sha256)
    expected = mac.hexdigest()
    return hmac.compare_digest(expected, signature)
