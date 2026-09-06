from pathlib import Path

EDITS = {
    Path('textbook/volumes/00_foundations/F0_00D2D_Lp_Holder_Minkowski/index.md'): [
        (
            '## 1. なぜ関数をa.e.で同一視するのか',
            '## 1. なぜ関数を「ほとんど至る所（almost everywhere; a.e.）」で同一視するのか',
        ),
    ],
    Path('textbook/volumes/00_foundations/F0_00P3D_pushforward_LOTUS_Doob_Dynkin/index.md'): [
        (
            '$m$ は一般に $P_Y$-a.e. の意味でしか一意ではありません。',
            '$m$ は一般に $P_Y$ に関してほとんど至る所（almost everywhere; a.e.）の意味でしか一意ではありません。',
        ),
        (
            '非負可測関数は単関数単調近似とMCT。',
            '非負可測関数は単関数単調近似と単調収束定理（Monotone Convergence Theorem; MCT）。',
        ),
    ],
}

changed = 0
for path, replacements in EDITS.items():
    text = path.read_text(encoding='utf-8')
    original = text
    for old, new in replacements:
        if new in text:
            continue
        if old not in text:
            raise SystemExit(f'replacement point not found: {path}: {old}')
        text = text.replace(old, new, 1)
    if text != original:
        path.write_text(text.rstrip() + '\n', encoding='utf-8')
        changed += 1

print(f'Applied acronym first-use fixes to {changed} page(s).')
