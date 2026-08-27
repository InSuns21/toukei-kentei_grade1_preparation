from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
CHAPTERS = [
    "textbook/volumes/01_probability/P1_01_事象と確率/index.md",
    "textbook/volumes/01_probability/P1_02_条件付き確率_独立_bayesの定理/index.md",
    "textbook/volumes/01_probability/P2_01_確率変数_pmf_pdf_cdf/index.md",
    "textbook/volumes/01_probability/P2_02_期待値_分散_共分散_母関数/index.md",
    "textbook/volumes/02_distributions/P3_01_主要な離散分布/index.md",
    "textbook/volumes/02_distributions/P3_02_主要な連続分布/index.md",
    "textbook/volumes/02_distributions/P3_03_多変量分布_条件付き分布/index.md",
    "textbook/volumes/02_distributions/P3_04_混合分布_潜在変数/index.md",
    "textbook/volumes/02_distributions/P3_05_重尾_切断_寿命派生分布/index.md",
    "textbook/volumes/02_distributions/P4_01_変数変換_順序統計量/index.md",
    "textbook/volumes/02_distributions/P4_02_確率変数の収束_大数則_中心極限定理/index.md",
    "textbook/volumes/03_inference/S1_01_標本分布とカイ二乗_t_f分布/index.md",
]

for rel in CHAPTERS:
    path = ROOT / rel
    text = path.read_text(encoding="utf-8")
    marker = "\n---\n"
    pos = text.find(marker)
    if pos < 0:
        raise RuntimeError(f"missing intro separator: {rel}")
    intro = text[:pos + len(marker)]
    body = text[pos + len(marker):]

    first = re.search(r"^(#{1,6}) ", body, flags=re.MULTILINE)
    if not first:
        raise RuntimeError(f"missing body heading: {rel}")
    level = len(first.group(1))
    delta = 2 - level
    if delta:
        def adjust(match):
            n = len(match.group(1)) + delta
            if not 1 <= n <= 6:
                raise RuntimeError(f"heading level overflow in {rel}")
            return "#" * n + " "
        body = re.sub(r"^(#{1,6}) ", adjust, body, flags=re.MULTILINE)

    # P3-03: keep the body reader-facing and remove the old editorial wording.
    if "P3_03_" in rel:
        body = body.replace(
            "## 1. 動機と試験での位置づけ",
            "## 1. 複数の変数を同時に扱う意味",
        )
        body = body.replace(
            "最初からブロック行列の公式を暗記する必要はありません。まず二変量で「条件を与えると平均がどう動き、分散がどれだけ小さくなるか」を計算し、その仕組みを理解してから3変量以上の行列表記へ進みます。",
            "まず二変量で「条件を与えると平均がどう動き、分散がどれだけ小さくなるか」を計算し、その仕組みを確認してから3変量以上の行列表記へ進みます。",
        )

    path.write_text(intro + body, encoding="utf-8")
    print(rel, "first body heading -> H2")
