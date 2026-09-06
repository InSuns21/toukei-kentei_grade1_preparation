from pathlib import Path


def replace_once(path: str, old: str, new: str) -> None:
    p = Path(path)
    text = p.read_text(encoding="utf-8")
    count = text.count(old)
    if count != 1:
        raise RuntimeError(f"{path}: expected exactly one match, got {count}: {old!r}")
    p.write_text(text.replace(old, new, 1), encoding="utf-8")


# 1) Case-folding makes these aliases identical; keep one canonical spelling each.
replace_once(
    "textbook/knowledge-dag.yaml",
    "      - type I error\n      - Type I error\n",
    "      - type I error\n",
)
replace_once(
    "textbook/knowledge-dag.yaml",
    "      - type II error\n      - Type II error\n",
    "      - type II error\n",
)
replace_once(
    "textbook/knowledge-dag.yaml",
    "      - p-value\n      - P-value\n",
    "      - p-value\n",
)

# 2) F0-00 uses null-hypothesis language only as a downstream application of sup/inf.
replace_once(
    "textbook/volumes/00_foundations/F0_00_統計検定1級のための数学速習/chapter.yaml",
    "forward_references:\n  - delta-method\n",
    "forward_references:\n  - delta-method\n  - null-hypothesis\n",
)

# 3) I1-01 explicitly previews that likelihood/score become test statistics later.
replace_once(
    "textbook/volumes/03_inference/I1_01_尤度_最尤推定/chapter.yaml",
    "  - score-test\n  - consistency\n",
    "  - score-test\n  - test-statistic\n  - consistency\n",
)

# 4) L1-01 genuinely performs regression hypothesis tests, so testing foundations are a prerequisite.
replace_once(
    "textbook/volumes/04_linear_models/L1_01_単回帰と最小二乗法/chapter.yaml",
    "  - I2-02\nofficial_scope:\n",
    "  - I2-02\n  - I3-01\nofficial_scope:\n",
)
replace_once(
    "textbook/curriculum.yaml",
    "  - { id: L1-01, title: 単回帰と最小二乗法, volume: linear_models, prerequisites: [ P2-02, P3-02, S1-01, F0-00, I2-02 ], official_scope:",
    "  - { id: L1-01, title: 単回帰と最小二乗法, volume: linear_models, prerequisites: [ P2-02, P3-02, S1-01, F0-00, I2-02, I3-01 ], official_scope:",
)
