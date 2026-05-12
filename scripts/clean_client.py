#!/usr/bin/env python3
"""
Delete generated client files that are no longer tracked by openapi-generator.

After openapi.json is patched and the client is regenerated, old model files
(stubs, duplicates from $defs) are left on disk but not listed in
.openapi-generator/FILES. This script removes them so imports don't break.

Usage:
    python3 scripts/clean_client.py src/client
"""

import os
import sys


def clean(client_dir):
    files_manifest = os.path.join(client_dir, ".openapi-generator", "FILES")
    if not os.path.exists(files_manifest):
        print(f"No FILES manifest found at {files_manifest}, skipping cleanup.")
        return

    with open(files_manifest) as f:
        tracked = {line.strip() for line in f if line.strip()}

    removed = 0
    for root, _, files in os.walk(client_dir):
        for name in files:
            abs_path = os.path.join(root, name)
            rel_path = os.path.relpath(abs_path, client_dir).replace(os.sep, "/")
            # skip generator metadata itself
            if rel_path.startswith(".openapi-generator"):
                continue
            if rel_path not in tracked:
                print(f"  removing orphan: {rel_path}")
                os.remove(abs_path)
                removed += 1

    print(f"Removed {removed} orphaned file(s) from {client_dir}")

    # Patch ApiClient.js: remove 'User-Agent' from defaultHeaders.
    # Browsers refuse to set this header (security restriction) and log an error.
    api_client_path = os.path.join(client_dir, "src", "ApiClient.js")
    if os.path.exists(api_client_path):
        with open(api_client_path) as f:
            src = f.read()
        patched = src.replace(
            "'User-Agent': 'OpenAPI-Generator/1.0.0/Javascript'",
            "// 'User-Agent' omitted: browsers refuse to set this header",
        )
        if patched != src:
            with open(api_client_path, "w") as f:
                f.write(patched)
            print("Patched ApiClient.js: removed User-Agent header")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    clean(sys.argv[1])
