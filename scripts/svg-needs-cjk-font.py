#!/usr/bin/env python3
"""Report whether changed SVGs contain visible CJK text.

SVG <title> and <desc> aid accessibility but are not painted by CairoSVG.
Only text/tspan/textPath and foreignObject descendants may need CJK fonts
in the contact-sheet renderer.
"""

from __future__ import annotations

import argparse
from pathlib import Path
import sys
import xml.etree.ElementTree as ET


def is_cjk(character: str) -> bool:
    codepoint = ord(character)
    return (
        0x2E80 <= codepoint <= 0x9FFF
        or 0xAC00 <= codepoint <= 0xD7AF
        or 0xF900 <= codepoint <= 0xFAFF
    )


def has_visible_cjk(svg_source: str) -> bool:
    root = ET.fromstring(svg_source)
    for node in root.iter():
        if not isinstance(node.tag, str):
            continue
        name = node.tag.rsplit("}", 1)[-1]
        if name in {"text", "foreignObject"} and any(
            is_cjk(char) for char in "".join(node.itertext())
        ):
            return True
    return False


def self_test() -> None:
    assert not has_visible_cjk(
        "<svg><title>日本語</title><desc>山折り</desc><text>t=0</text></svg>"
    )
    assert has_visible_cjk(
        "<svg><text>t=<tspan>折り</tspan></text></svg>"
    )
    assert has_visible_cjk(
        '<svg xmlns="http://www.w3.org/2000/svg">'
        "<foreignObject><div>曲面</div></foreignObject></svg>"
    )
    assert not has_visible_cjk("<svg><text>Miura</text></svg>")
    print("SVG visible-CJK font detection self-test passed")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--paths-file", type=Path)
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test:
        self_test()
        return
    if args.paths_file is None:
        parser.error("--paths-file is required outside --self-test")
    paths = [
        Path(path.decode("utf-8"))
        for path in args.paths_file.read_bytes().split(b"\0")
        if path
    ]
    if any(has_visible_cjk(path.read_text(encoding="utf-8")) for path in paths):
        print("yes")
    else:
        print("no")


if __name__ == "__main__":
    main()
