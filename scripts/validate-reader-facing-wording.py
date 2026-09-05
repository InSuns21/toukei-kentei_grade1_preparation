#!/usr/bin/env python3
"""Reject internal audit/editorial phrasing in reader-facing textbook pages."""

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CHAPTER_ROOT = ROOT / "textbook" / "volumes"

FORBIDDEN = {
    "公式シラバス補完": "use the actual statistical topic as the heading",
    "公式シラバスの **その他の手法**": "explain the statistical idea directly",
    "推定量の相対効率と「その他の手法」": "use the concrete topic '推定量の相対効率'",
    "共通演習規約に従い": "state the learner-facing exercise behavior directly",
    "Batch 1": "keep batch terminology in review/audit files",
    "missing を": "keep coverage-audit terminology in review/audit files",
    "監査上": "keep audit reasoning outside reader-facing textbook prose",
}


def main() -> int:
    violations: list[str] = []
    paths = sorted(CHAPTER_ROOT.glob("**/index.md"))

    for path in paths:
        text = path.read_text(encoding="utf-8")
        for token, guidance in FORBIDDEN.items():
            if token in text:
                rel = path.relative_to(ROOT)
                violations.append(f"{rel}: {token!r} — {guidance}")

    if violations:
        print("Reader-facing editorial wording found:")
        for violation in violations:
            print(f"  {violation}")
        return 1

    print(f"Reader-facing wording OK: {len(paths)} page(s) checked")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
