from pathlib import Path


def replace_once(path: str, old: str, new: str) -> None:
    p = Path(path)
    text = p.read_text(encoding="utf-8")
    count = text.count(old)
    if count != 1:
        raise RuntimeError(f"{path}: expected exactly one match, got {count}: {old!r}")
    p.write_text(text.replace(old, new, 1), encoding="utf-8")


replace_once(
    "textbook/volumes/03_inference/S1_03_標本抽出_研究設計/index.md",
    "正規近似を使い、信頼係数に対応する定数を $z$ とすると\n",
    "正規近似を使い、設計上選ぶ定数を $z$ とします。例えば95%相当の両側設計なら $z\\approx1.96$ です。ここでは $z$ を所与の設計定数として使い、**信頼係数**・被覆確率の正式な意味は [I2-02 区間推定](../I2_02_区間推定/index.md) で扱います。すると\n",
)

replace_once(
    "textbook/volumes/03_inference/S1_03_標本抽出_研究設計/chapter.yaml",
    "prerequisites:\n  - P3-01\n  - P4-02\n  - P2-02\n",
    "prerequisites:\n  - P3-01\n  - P4-02\n  - P2-02\nforward_references:\n  - confidence-coefficient\n",
)
