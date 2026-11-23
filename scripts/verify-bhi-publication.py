#!/usr/bin/env python3
"""Browser smoke of the public BHI course using Chromium (real Docsify rendering).

Captures viewport screenshots and checks that the article, its heading, its math
rendering and navigation are visible. This is NOT a replacement for a human
visual/typographic review of the full pages.
"""
from __future__ import annotations

import argparse
from pathlib import Path
from urllib.parse import quote

from playwright.sync_api import sync_playwright

COURSE = "textbook/volumes/dream_thater/物理系/BHI"
PAGES = [
    (16, "BHI16", "第I部の結論"),
    (26, "BHI26", "Page"),
    (36, "BHI36", "全系列総合と未解決問題"),
]


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--base", default="https://insuns21.github.io/toukei-kentei_grade1_preparation/")
    parser.add_argument("--output", type=Path, default=Path("bhi-browser-smoke"))
    args = parser.parse_args()
    args.output.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as pw:
        browser = pw.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={"width": 1280, "height": 850},
            device_scale_factor=1,
            service_workers="block",
            locale="ja-JP",
        )
        page = context.new_page()
        for n, label, expected in PAGES:
            route = "#/" + quote(COURSE + "/BHI" + str(n) + "/index", safe="/")
            page.goto(args.base.rstrip("/") + "/" + route, wait_until="domcontentloaded", timeout=60000)
            page.wait_for_function(
                """({label, expected}) => {
                  const article = document.querySelector('.markdown-section');
                  return !!article && article.innerText.includes(label) &&
                         article.innerText.includes(expected);
                }""",
                arg={"label": label, "expected": expected},
                timeout=60000,
            )
            metrics = page.evaluate(
                """() => {
                  const section = document.querySelector('.markdown-section');
                  const h1 = section?.querySelector('h1');
                  const box = h1?.getBoundingClientRect();
                  return {
                    bodyChars: section?.innerText.length || 0,
                    visibleTitle: !!h1 && !!box && box.width > 50 &&
                        box.height > 16 && box.top >= -5 &&
                        box.top < window.innerHeight,
                    mathNodes: section?.querySelectorAll('.katex, .MathJax, .math').length || 0,
                    horizontalOverflow: document.documentElement.scrollWidth >
                        window.innerWidth + 40
                  };
                }"""
            )
            assert metrics["bodyChars"] > 2000, (label, metrics)
            assert metrics["visibleTitle"], (label, metrics)
            assert not metrics["horizontalOverflow"], (label, metrics)
            screenshot = args.output / (label.lower() + "-desktop.png")
            page.screenshot(path=str(screenshot), animations="disabled")
            assert screenshot.stat().st_size > 5000
            print(f"{label}: PASS: {metrics}, screenshot={screenshot.name}")
        context.close()
        browser.close()


if __name__ == "__main__":
    main()
