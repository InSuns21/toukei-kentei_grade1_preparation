#!/usr/bin/env python3
import argparse
import subprocess
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from urllib.error import HTTPError, URLError
from urllib.parse import quote, urljoin
from urllib.request import Request, urlopen


def fetch(url, attempts=5):
    last = None
    for attempt in range(attempts):
        try:
            request = Request(url, headers={"User-Agent": "toukei-pages-smoke/2.0"})
            with urlopen(request, timeout=30) as response:
                status = response.status
                body = response.read()
                if not 200 <= status < 300:
                    raise RuntimeError(f"HTTP {status}: {url}")
                return body
        except (HTTPError, URLError, TimeoutError, RuntimeError) as exc:
            last = exc
            if attempt + 1 < attempts:
                time.sleep(2 * (attempt + 1))
    raise RuntimeError(f"{url}: {last}")


def changed_files(base_sha):
    if not base_sha or set(base_sha) == {"0"}:
        return []
    result = subprocess.run(
        ["git", "diff", "--name-only", "--diff-filter=ACMR", f"{base_sha}...HEAD"],
        check=True,
        text=True,
        capture_output=True,
    )
    return [line.strip() for line in result.stdout.splitlines() if line.strip()]


def map_changed_paths(paths, published):
    targets = set()
    for source in paths:
        if source in published:
            targets.add(source)

        if source.startswith("pages/"):
            candidate = source[len("pages/"):]
            if candidate in published:
                targets.add(candidate)
            continue

        if source.startswith(("statistical-mathematics/", "applied-rikou-80/", "references/")):
            if source in published:
                targets.add(source)
            continue

        if source.startswith("anki/"):
            if "anki/index.html" in published:
                targets.add("anki/index.html")
            continue

        if source.startswith("textbook/"):
            if source in published:
                targets.add(source)

            parts = source.split("/")
            if len(parts) >= 5 and parts[1] == "volumes":
                chapter_index = "/".join(parts[:4] + ["index.md"])
                if chapter_index in published:
                    targets.add(chapter_index)
            continue

    return targets


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--base-url", required=True)
    parser.add_argument("--mode", choices=("changed", "full"), required=True)
    parser.add_argument("--base-sha")
    parser.add_argument("--workers", type=int, default=16)
    args = parser.parse_args()

    base = args.base_url if args.base_url.endswith("/") else args.base_url + "/"
    manifest_url = urljoin(base, "pages-manifest.txt")
    manifest_body = fetch(manifest_url)
    published = {
        line.strip()
        for line in manifest_body.decode("utf-8").splitlines()
        if line.strip()
    }

    critical = {
        "index.html",
        "home.md",
        "_sidebar.md",
        "service-worker.js",
        "site-meta.json",
        "pages-manifest.txt",
        "pages-manifest.json",
    }

    if args.mode == "full":
        targets = set(published) | critical
        changed = []
    else:
        changed = changed_files(args.base_sha)
        targets = map_changed_paths(changed, published) | critical

    def check(path):
        encoded = quote(path, safe="/._-~")
        url = urljoin(base, encoded)
        fetch(url)
        return path

    failures = []
    with ThreadPoolExecutor(max_workers=args.workers) as pool:
        futures = {pool.submit(check, path): path for path in sorted(targets)}
        for future in as_completed(futures):
            path = futures[future]
            try:
                future.result()
            except Exception as exc:
                failures.append((path, str(exc)))

    if failures:
        print(f"Live GitHub Pages smoke test failed for {len(failures)} file(s):")
        for path, error in failures:
            print(f"- {path}: {error}")
        raise SystemExit(1)

    if args.mode == "full":
        print(f"Full live Pages smoke passed: {len(targets)} published/critical files returned HTTP 2xx.")
    else:
        print(
            "Changed live Pages smoke passed: "
            f"{len(changed)} source file(s) mapped to {len(targets)} published/critical checks."
        )
    print(f"Pages URL: {base}")


if __name__ == "__main__":
    main()
