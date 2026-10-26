#!/usr/bin/env python3
"""Render textbook SVGs at mobile and source widths for visual accessibility review.

No --paths-file: scan the existing small-text candidates (nightly/manual audit).
--paths-file: render every changed SVG (NUL-delimited paths from the PR diff).
Not a semantic proof: thumbnails reveal clipping and typography problems; review the math manually.
Dependencies: cairosvg, Pillow (needed only when actually rendering).
"""
import argparse
import base64
import io
import json
import os
import re
import tempfile
from pathlib import Path

ROOT = Path("textbook/volumes")
OUTPUT = Path("_svg_render_review")
FONT_RE = re.compile(r'<text\b([^>]*)>', re.S)
SIZE_RE = re.compile(r'\bfont-size\s*=\s*["\']([\d.]+)["\']')
VIEW_RE = re.compile(r'\bviewBox\s*=\s*["\']([^"\']+)["\']')


def audit_candidate(source):
    m = VIEW_RE.search(source)
    if not m:
        return False
    try:
        width = float(re.split(r'[\s,]+', m.group(1).strip())[2])
        if width <= 0:
            return False
    except (ValueError, IndexError):
        return False
    return any(
        (size := SIZE_RE.search(tag.group(1))) and
        float(size.group(1)) * min(1.0, 360 / width) < 12
        for tag in FONT_RE.finditer(source)
    )


def render(path, width):
    import cairosvg
    from PIL import Image

    # The CI environment has Noto CJK installed, but CairoSVG's CSS font fallback
    # may still select a Latin-only font for SVGs that declare Segoe UI or Noto Sans JP.
    # Apply a review-only font override; do NOT rewrite the textbook's SVG source.
    source = path.read_text("utf-8")
    source = re.sub(
        r'(<svg\b[^>]*>)',
        lambda match: match.group(1) +
            '<style>text,tspan{font-family:"Noto Sans CJK JP",sans-serif !important}</style>',
        source, count=1
    )
    return Image.open(io.BytesIO(
        cairosvg.svg2png(bytestring=source.encode("utf-8"), output_width=width)
    )).convert("RGBA")


def contact_sheet(entries, batch, font):
    from PIL import Image, ImageDraw

    tile_w, tile_h = 440, 335
    canvas = Image.new("RGB", (tile_w * 2, tile_h * 4), "#f4f5f7")
    draw = ImageDraw.Draw(canvas)
    for i, (label, png) in enumerate(entries):
        x, y = (i % 2) * tile_w, (i // 2) * tile_h
        draw.rectangle((x + 3, y + 3, x + tile_w - 4, y + tile_h - 4), fill="white", outline="#bfc6cf")
        # Always use ASCII for portable CI fonts; full Japanese paths stay in manifest.json.
        pieces = Path(label).parts
        short = "/".join(pieces[-3:])
        short = re.sub(r"[^\x20-\x7E]", "", short)
        lines = [short[:60], short[60:120]]
        for j, line in enumerate(lines):
            draw.text((x + 12, y + 6 + 15*j), line, fill="#202a35", font=font)
        area = png.copy()
        area.thumbnail((410, 288), Image.Resampling.LANCZOS)
        # Fit into white tile; use original 360px rendering (do not upscale).
        bg = Image.new("RGBA", area.size, "white")
        bg.alpha_composite(area)
        canvas.paste(bg.convert("RGB"), (x + (tile_w - area.width)//2, y + 41))
    return canvas


def read_changed_paths(path_file, repository_root=Path(".")):
    """Accept only existing SVGs below textbook/volumes from a NUL-separated git diff."""
    root = (repository_root / ROOT).resolve()
    selected = []
    seen = set()
    for raw in path_file.read_bytes().split(b"\0"):
        if not raw:
            continue
        relative = Path(os.fsdecode(raw))
        if relative.is_absolute() or ".." in relative.parts:
            raise ValueError(f"Unsafe SVG path from diff: {relative}")
        if relative.suffix.lower() != ".svg" or not relative.is_relative_to(ROOT):
            continue
        candidate = repository_root / relative
        if not candidate.is_file() or not candidate.resolve().is_relative_to(root):
            continue  # Deleted paths and paths outside the SVG tree cannot be rendered.
        if candidate not in seen:
            seen.add(candidate)
            selected.append(candidate)
    return sorted(selected)


def self_test():
    assert audit_candidate('<svg viewBox="0 0 500 200"><text font-size="14">a</text></svg>')
    assert not audit_candidate('<svg viewBox="0 0 500 200"><text font-size="20">a</text></svg>')
    with tempfile.TemporaryDirectory() as directory:
        repo = Path(directory)
        svg = repo / ROOT / "応用系" / "sample.svg"
        svg.parent.mkdir(parents=True)
        svg.write_text('<svg viewBox="0 0 100 100"/>', encoding="utf-8")
        paths = repo / "changed.nul"
        paths.write_bytes(
            os.fsencode(str(svg.relative_to(repo))) + b"\0" +
            b"textbook/volumes/missing.svg\0" +
            b"textbook/volumes/ignore.md\0" +
            b"outside.svg\0" +
            os.fsencode(str(svg.relative_to(repo))) + b"\0"
        )
        assert read_changed_paths(paths, repo) == [svg]
        paths.write_bytes(b"")
        assert read_changed_paths(paths, repo) == []
    print("SVG_RENDER_SCOPE_SELF_TEST passed")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--emit-contact-sheets", action="store_true",
                        help="Emit base64 sheet PNGs in CI log for the audit run.")
    parser.add_argument("--paths-file", type=Path,
                        help="NUL-separated changed SVG paths from git diff; render all listed SVGs.")
    parser.add_argument("--self-test", action="store_true",
                        help="Test changed-path filtering without rendering dependencies.")
    args = parser.parse_args()
    if args.self_test:
        self_test()
        return

    from PIL import Image, ImageFont

    OUTPUT.mkdir(exist_ok=True)
    font = ImageFont.load_default()
    errors, records, selected = [], [], []
    paths = read_changed_paths(args.paths_file) if args.paths_file else sorted(ROOT.rglob("*.svg"))
    for path in paths:
        text = path.read_text("utf-8")
        if not args.paths_file and not audit_candidate(text):
            continue
        try:
            small = render(path, 360)
            # At full source width, verify the same image actually renders as well.
            view = VIEW_RE.search(text)
            width = int(float(re.split(r'[\s,]+', view.group(1).strip())[2]))
            full = render(path, max(360, width))
            dest = OUTPUT / (str(len(selected)+1).zfill(3) + "-" + path.stem + "-360.png")
            bg = Image.new("RGBA", small.size, "white")
            bg.alpha_composite(small)
            bg.convert("RGB").save(dest)
            record = {"path": str(path), "source_width": width,
                      "rendered_width": 360, "rendered_height": small.height,
                      "normal_width": full.width, "normal_height": full.height,
                      "thumbnail": str(dest)}
            records.append(record)
            selected.append((str(path), small))
        except Exception as ex:
            errors.append({"path": str(path), "error": str(ex)})
    for n in range(0, len(selected), 8):
        batch = n // 8 + 1
        sheet = contact_sheet(selected[n:n+8], batch, font)
        outfile = OUTPUT / f"contact-sheet-{batch:02d}.png"
        sheet.save(outfile, optimize=True)
        if args.emit_contact_sheets:
            raw = io.BytesIO()
            sheet.save(raw, format="PNG", optimize=True)
            b64 = base64.b64encode(raw.getvalue()).decode("ascii")
            print(f"SVG_SHEET_BEGIN_{batch:02d}")
            print(b64)
            print(f"SVG_SHEET_END_{batch:02d}")
    manifest = {"count": len(records), "render_failures": errors,
                "contact_sheets": (len(selected)+7)//8, "figures": records}
    (OUTPUT / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2), "utf-8")
    print(f"SVG_RENDER_SUMMARY count={len(records)} failures={len(errors)} sheets={(len(selected)+7)//8}")
    for e in errors:
        print("SVG_RENDER_ERROR " + json.dumps(e, ensure_ascii=False))
    if errors:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
